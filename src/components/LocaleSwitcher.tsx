"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `ts_locale=${next};path=/;max-age=31536000;samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Language"
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => setLocale("zh-Hant")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "zh-Hant"
            ? "bg-moss text-fog"
            : "text-mist hover:text-fog"
        }`}
      >
        中
      </button>
      <span className="text-muted" aria-hidden>
        ·
      </span>
      <button
        type="button"
        disabled={pending}
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "en" ? "bg-moss text-fog" : "text-mist hover:text-fog"
        }`}
      >
        Eng
      </button>
    </div>
  );
}
