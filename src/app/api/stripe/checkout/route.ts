import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
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

  try {
    const { priceId, amount, productName } = await request.json();
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount (min $1)" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: amount,
        status: "pending",
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL ?? request.headers.get("origin") ?? "http://localhost:3000";
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
