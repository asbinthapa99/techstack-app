import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  if (!stripe || !sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing config or signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;
    if (!orderId || !userId) {
      console.error("Webhook: missing metadata orderId or userId");
      return NextResponse.json({ received: true });
    }

    try {
      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: "paid" },
        }),
        prisma.payment.create({
          data: {
            orderId,
            userId,
            stripePaymentId: session.payment_intent as string | undefined,
            amount: session.amount_total ?? 0,
            status: "completed",
          },
        }),
      ]);
    } catch (e) {
      console.error("Webhook DB update error:", e);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
