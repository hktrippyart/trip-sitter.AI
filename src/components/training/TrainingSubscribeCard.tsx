"use client";

import { useRouter } from "next/navigation";
import { getTrainingSubscribeCardCopy } from "@/lib/content/training-hub";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function TrainingSubscribeCard({ locale }: Props) {
  const copy = getTrainingSubscribeCardCopy(locale);
  const router = useRouter();

  return (
    <article className="mx-auto mt-8 max-w-6xl rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
      <h2 className="font-display text-xl font-semibold text-fog md:text-2xl">
        {copy.title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mist md:text-base">
        {copy.body}
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => router.push("/training/subscribe")}
          className="rounded-full bg-glow px-6 py-2.5 text-sm font-semibold text-void transition hover:bg-glow/90"
        >
          {copy.subscribe}
        </button>
      </div>
    </article>
  );
}
