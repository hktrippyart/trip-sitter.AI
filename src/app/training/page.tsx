import type { Metadata } from "next";
import { TrainingSubscribeCard } from "@/components/training/TrainingSubscribeCard";
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
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mist">{content.lede}</p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-fog md:text-2xl">
            {content.featuresHeading}
          </h2>
          <ul className="mt-5 space-y-4">
            {content.features.map((feature) => (
              <li
                key={feature.title}
                className="rounded-3xl bg-void p-5 shadow-sm ring-1 ring-line md:p-6"
              >
                <h3 className="font-semibold text-fog">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist md:text-base">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <TrainingTrackCards
        locale={locale}
        signedIn={signedIn}
        peerBasicsComplete={peerBasicsComplete}
      />

      <TrainingSubscribeCard locale={locale} />
    </div>
  );
}
