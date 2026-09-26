import type { Metadata } from "next";
import Link from "next/link";
import { getTrainingSubscribeComingSoonCopy } from "@/lib/content/training-hub";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getTrainingSubscribeComingSoonCopy(locale);
  return { title: copy.metaTitle };
}

export default async function TrainingSubscribeComingSoonPage() {
  const locale = await getLocale();
  const copy = getTrainingSubscribeComingSoonCopy(locale);

  return (
    <div className="mx-auto max-w-lg px-5 py-16 md:px-8 md:py-24">
      <Link href="/training" className="text-sm text-mist hover:text-fog">
        {copy.backLink}
      </Link>
      <h1 className="mt-6 font-display text-3xl font-semibold text-fog md:text-4xl">
        {copy.heading}
      </h1>
    </div>
  );
}
