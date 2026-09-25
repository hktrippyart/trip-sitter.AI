import type { Metadata } from "next";
import Link from "next/link";
import { getTrainingSuccessContent } from "@/lib/content/training-hub";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = getTrainingSuccessContent(locale);
  return { title: content.metaTitle };
}

export default async function TrainingSuccessPage() {
  const locale = await getLocale();
  const content = getTrainingSuccessContent(locale);

  return (
    <div className="mx-auto max-w-xl px-5 py-20 text-center md:px-8">
      <p className="text-sm font-medium text-ember">{content.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl text-fog">{content.title}</h1>
      <p className="mt-4 text-mist">{content.body}</p>
      <Link
        href="/training"
        className="mt-8 inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void"
      >
        {content.cta}
      </Link>
    </div>
  );
}
