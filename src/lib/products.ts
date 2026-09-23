export type ProductKind = "course" | "tee" | "kit";

export type ShopProduct = {
  id: string;
  kind: ProductKind;
  name: string;
  description: string;
  priceDisplay: string;
  /** Env var name holding the Stripe Price ID */
  stripePriceEnv: string;
  /** Fallback price in cents for display / demo checkout messaging */
  unitAmountCents: number;
  currency: string;
  badge?: string;
  fulfillmentNote: string;
};

export const products: ShopProduct[] = [
  {
    id: "tee",
    kind: "tee",
    name: "Grounded Anchor Tee",
    description:
      "Soft cotton tee with the trip-sitter.AI mark. Printed on demand; ships to select regions.",
    priceDisplay: "$36",
    stripePriceEnv: "STRIPE_PRICE_TEE",
    unitAmountCents: 3600,
    currency: "usd",
    badge: "Apparel",
    fulfillmentNote: "Manual / POD fulfillment email to shop admin after Stripe payment.",
  },
  {
    id: "test-kit",
    kind: "kit",
    name: "Starter Reagent Test Kit",
    description:
      "Introductory reagent kit for personal substance checking education. Not a purity guarantee. Ships where legally permitted.",
    priceDisplay: "$42",
    stripePriceEnv: "STRIPE_PRICE_TEST_KIT",
    unitAmountCents: 4200,
    currency: "usd",
    badge: "Harm reduction",
    fulfillmentNote: "Ships to allowlisted regions only. Age confirmation at checkout.",
  },
];

export function getProduct(id: string): ShopProduct | undefined {
  return products.find((p) => p.id === id);
}

export function getStripePriceId(product: ShopProduct): string | undefined {
  const value = process.env[product.stripePriceEnv];
  return value && value.length > 0 ? value : undefined;
}
