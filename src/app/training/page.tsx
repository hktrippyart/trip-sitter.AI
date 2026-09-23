import type { Metadata } from "next";
import { TrainingTrackCards } from "@/components/training/TrainingTrackCards";
import { getCurrentUserId } from "@/lib/entitlements";
import { userHasCompletedPeerBasics } from "@/lib/training/peer-basics-completion";

export const metadata: Metadata = {
  title: "Online Courses",
  description:
    "Peer Support Basics and Train-the-trainer AI training chats.",
};

export default async function TrainingPage() {
  const userId = await getCurrentUserId();
  const signedIn = Boolean(userId);
  const peerBasicsComplete = userId
    ? await userHasCompletedPeerBasics(userId)
    : false;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        Online peer-support training
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        Pick a track and enter the AI training chat—built like our trip-sitter.AI
        peer coach, focused on teaching sitter skills. Educational only; not a
        clinical certification.
      </p>

      <TrainingTrackCards
        signedIn={signedIn}
        peerBasicsComplete={peerBasicsComplete}
      />
    </div>
  );
}
