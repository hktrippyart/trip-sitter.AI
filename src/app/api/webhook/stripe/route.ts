import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function setEntitlementActive(
  userId: string,
  productKey: string,
  active: boolean,
  extras?: {
    stripeCheckoutSessionId?: string | null;
    stripeCustomerId?: string | null;
  },
) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("entitlements").upsert(
    {
      user_id: userId,
      product_key: productKey,
      active,
      stripe_checkout_session_id: extras?.stripeCheckoutSessionId ?? null,
      stripe_customer_id: extras?.stripeCustomerId ?? null,
    },
    { onConflict: "user_id,product_key" },
  );
  if (error) throw error;
}

function trainingMeta(meta: Stripe.Metadata | null | undefined) {
  if (!meta) return null;
  if (meta.product_kind !== "training") return null;
  const userId = meta.user_id?.trim();
  const productKey = meta.product_key?.trim();
  if (!userId || !productKey) return null;
  return { userId, productKey };
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = trainingMeta(session.metadata);
      const userId =
        meta?.userId ||
        session.metadata?.user_id ||
        session.client_reference_id ||
        null;
      const productKey = meta?.productKey || session.metadata?.product_key;

      if (
        session.mode === "subscription" &&
        userId &&
        productKey &&
        session.metadata?.product_kind === "training"
      ) {
        await setEntitlementActive(userId, productKey, true, {
          stripeCheckoutSessionId: session.id,
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : null,
        });
      } else if (session.metadata?.product_id) {
        console.info(
          `Shop purchase completed: product=${session.metadata.product_id} session=${session.id}`,
        );
      }
    }

    if (
      event.type === "customer.subscription.deleted" ||
      event.type === "customer.subscription.updated"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const meta = trainingMeta(subscription.metadata);
      if (meta) {
        const active =
          event.type === "customer.subscription.deleted"
            ? false
            : subscription.status === "active" ||
              subscription.status === "trialing";
        await setEntitlementActive(meta.userId, meta.productKey, active, {
          stripeCustomerId:
            typeof subscription.customer === "string"
              ? subscription.customer
              : null,
        });
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Entitlement write failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
