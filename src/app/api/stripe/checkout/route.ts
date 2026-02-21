import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { rateLimit, getClientIp } from "@/lib/ratelimit";

const CheckoutSchema = z.object({
  amount: z.number().int().min(100, "Minimum amount is $1 (100 cents)"),
  productName: z.string().min(1).max(200).optional(),
  priceId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 5 checkout requests per minute per user
  const limitRes = await rateLimit(user.id, "checkout", 5, 60);
  if (limitRes) return limitRes;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { amount, productName } = parsed.data;

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: amount,
        status: "pending",
      },
    });

    const baseUrl =
      process.env.APP_URL ??
      process.env.NEXTAUTH_URL ??
      request.headers.get("origin") ??
      "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName ?? "TechStack Service",
              description: "One-time payment",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/dashboard?success=1`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      metadata: {
        orderId: order.id,
        userId: user.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
