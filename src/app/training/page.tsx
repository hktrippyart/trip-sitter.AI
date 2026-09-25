import type { Metadata } from "next";
import { TrainingTrackCards } from "@/components/training/TrainingTrackCards";
import { getTrainingHubPageContent } from "@/lib/content/training-hub";
import { getCurrentUserId } from "@/lib/entitlements";
import { getLocale } from "@/lib/locale";
import { userHasCompletedPeerBasics } from "@/lib/training/peer-basics-completion";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = getTrainingHubPageContent(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function TrainingPage() {
  const locale = await getLocale();
  const content = getTrainingHubPageContent(locale);
  const userId = await getCurrentUserId();
  const signedIn = Boolean(userId);
  const peerBasicsComplete = userId
    ? await userHasCompletedPeerBasics(userId)
    : false;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        {content.title}
      </h1>
      <p className="mt-4 max-w-2xl text-mist">{content.lede}</p>

      <TrainingTrackCards
        locale={locale}
        signedIn={signedIn}
        peerBasicsComplete={peerBasicsComplete}
      />
    </div>
  );
}
