import {
  TRAINING_CLOUD_SAVE_KEY,
  TRAINING_FULL_KEY,
  TRAINING_PEER_BASICS_KEY,
  type TrainingTrackSlug,
} from "./product-keys";

/** Stripe subscription products (not tied to a single chat track). */
export type TrainingSubscriptionProduct = {
  id: string;
  productKey: string;
  name: string;
  priceDisplay: string;
  unitAmountCents: number;
  stripePriceEnv: string;
};

export const trainingSubscriptionProducts: TrainingSubscriptionProduct[] = [
  {
    id: "training-cloud-save",
    productKey: TRAINING_CLOUD_SAVE_KEY,
    name: "Training cloud save",
    priceDisplay: "$5 USD / month",
    unitAmountCents: 500,
    stripePriceEnv: "STRIPE_PRICE_TRAINING_CLOUD_MONTHLY",
  },
];

export type TrainingOffering = {
  id: string;
  track: TrainingTrackSlug;
  productKey: string;
  name: string;
  priceDisplay: string;
  unitAmountCents: number;
  stripePriceEnv: string;
  summary: string;
  chatPath: `/training/${TrainingTrackSlug}`;
};

export const trainingOfferings: TrainingOffering[] = [
  {
    id: "training-peer-basics",
    track: "peer-basics",
    productKey: TRAINING_PEER_BASICS_KEY,
    name: "Peer Support Basics",
    priceDisplay: "$20 USD / month",
    unitAmountCents: 2000,
    stripePriceEnv: "STRIPE_PRICE_PEER_BASICS_MONTHLY",
    summary:
      "Interactive AI training coach covering ethics, trauma-attuned care, substance basics, field triage, and integration—aligned with peer harm-reduction curriculum.",
    chatPath: "/training/peer-basics",
  },
  {
    id: "training-full",
    track: "train-the-trainer",
    productKey: TRAINING_FULL_KEY,
    name: "Train-the-trainer",
    priceDisplay: "$35 USD / month",
    unitAmountCents: 3500,
    stripePriceEnv: "STRIPE_PRICE_TRAINING_FULL_MONTHLY",
    summary:
      "Everything in Peer Support Basics plus an AI coach for event holding, team ops, and facilitation—training other volunteers to sit.",
    chatPath: "/training/train-the-trainer",
  },
];

export function getTrainingOffering(id: string): TrainingOffering | undefined {
  return trainingOfferings.find((o) => o.id === id);
}

export function getTrainingSubscriptionProduct(
  id: string,
): TrainingSubscriptionProduct | undefined {
  return trainingSubscriptionProducts.find((o) => o.id === id);
}

export function getTrainingCheckoutProduct(
  id: string,
): TrainingOffering | TrainingSubscriptionProduct | undefined {
  return getTrainingOffering(id) ?? getTrainingSubscriptionProduct(id);
}

export function getStripePriceIdForProduct(
  product: TrainingOffering | TrainingSubscriptionProduct,
): string | undefined {
  const value = process.env[product.stripePriceEnv];
  return value && value.length > 0 ? value : undefined;
}

export function getTrainingOfferingByTrack(
  track: TrainingTrackSlug,
): TrainingOffering | undefined {
  return trainingOfferings.find((o) => o.track === track);
}

export function getStripePriceIdForOffering(
  offering: TrainingOffering,
): string | undefined {
  return getStripePriceIdForProduct(offering);
}
