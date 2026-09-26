import { NextResponse } from "next/server";
import { z } from "zod";
import { isStripeConfigured, isSupabaseConfigured } from "@/lib/config";
import { getProduct, getStripePriceId } from "@/lib/products";
import {
  getStripePriceIdForProduct,
  getTrainingCheckoutProduct,
} from "@/lib/training/catalog";
import { getAppUrl, getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  productId: z.string().min(1),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY and price IDs in env.",
      },
      { status: 503 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const trainingProduct = getTrainingCheckoutProduct(parsed.data.productId);
  const shop = getProduct(parsed.data.productId);

  if (!trainingProduct && !shop) {
    return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  }

  const priceId = trainingProduct
    ? getStripePriceIdForProduct(trainingProduct)
    : shop
      ? getStripePriceId(shop)
      : undefined;

  const stripePriceEnv = trainingProduct
    ? trainingProduct.stripePriceEnv
    : shop?.stripePriceEnv;

  if (!priceId || !stripePriceEnv) {
    return NextResponse.json(
      {
        error: `Missing ${stripePriceEnv}. Create the Stripe Price and add it to env.`,
      },
      { status: 503 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase Auth is required for training subscriptions." },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (trainingProduct && !user) {
    return NextResponse.json(
      { error: "Sign in before subscribing so we can unlock training access." },
      { status: 401 },
    );
  }

  const userId = user?.id;
  const email = user?.email ?? undefined;

  const stripe = getStripe();
  const appUrl = getAppUrl();

  if (trainingProduct) {
    const successUrl = `${appUrl}/training?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: `${appUrl}/training?checkout=cancel`,
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        product_id: trainingProduct.id,
        product_kind: "training",
        product_key: trainingProduct.productKey,
        user_id: userId || "",
      },
      subscription_data: {
        metadata: {
          product_id: trainingProduct.id,
          product_kind: "training",
          product_key: trainingProduct.productKey,
          user_id: userId || "",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }
    return NextResponse.json({ url: session.url });
  }

  const product = shop!;
  const successPath = "/shop?checkout=success";
  const successUrl = `${appUrl}${successPath}&session_id={CHECKOUT_SESSION_ID}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: `${appUrl}/shop?checkout=cancel`,
    customer_email: email,
    client_reference_id: userId,
    metadata: {
      product_id: product.id,
      product_kind: product.kind,
      user_id: userId || "",
    },
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "NZ", "HK", "SG", "JP"],
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
