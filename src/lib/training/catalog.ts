import {
  TRAINING_FULL_KEY,
  TRAINING_PEER_BASICS_KEY,
  type TrainingTrackSlug,
} from "./product-keys";

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

export function getTrainingOfferingByTrack(
  track: TrainingTrackSlug,
): TrainingOffering | undefined {
  return trainingOfferings.find((o) => o.track === track);
}

export function getStripePriceIdForOffering(
  offering: TrainingOffering,
): string | undefined {
  const value = process.env[offering.stripePriceEnv];
  return value && value.length > 0 ? value : undefined;
}
