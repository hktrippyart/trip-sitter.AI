"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getTrainingSubscribeCardCopy,
  TRAINING_CLOUD_SAVE_PRODUCT_ID,
} from "@/lib/content/training-hub";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  signedIn: boolean;
};

export function TrainingSubscribeCard({ locale, signedIn }: Props) {
  const copy = getTrainingSubscribeCardCopy(locale);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startSubscribe() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: TRAINING_CLOUD_SAVE_PRODUCT_ID }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.status === 401) {
        window.location.href = `/auth/login?next=${encodeURIComponent("/training")}`;
        return;
      }
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <article className="mx-auto mt-8 max-w-6xl rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
      <h2 className="font-display text-xl font-semibold text-fog md:text-2xl">
        {copy.title}
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-deep/40 p-4 ring-1 ring-line">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {copy.freeHeading}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">{copy.freeBody}</p>
        </div>
        <div className="rounded-2xl bg-deep/40 p-4 ring-1 ring-line">
          <p className="text-xs font-medium uppercase tracking-wide text-ember">
            {copy.paidHeading}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">{copy.paidBody}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {signedIn ? (
          <button
            type="button"
            onClick={() => void startSubscribe()}
            disabled={loading}
            className="rounded-full bg-glow px-6 py-2.5 text-sm font-semibold text-void transition hover:bg-glow/90 disabled:opacity-60"
          >
            {loading ? copy.subscribeRedirecting : copy.subscribe}
          </button>
        ) : (
          <Link
            href={`/auth/login?next=${encodeURIComponent("/training")}`}
            className="rounded-full bg-glow px-6 py-2.5 text-sm font-semibold text-void transition hover:bg-glow/90"
          >
            {copy.signInToSubscribe}
          </Link>
        )}
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </article>
  );
}
