"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PeerChat } from "@/components/chat/PeerChat";
import { getTrainingPeerBasicsShellCopy } from "@/lib/chat/ui-copy";
import type { Locale } from "@/lib/i18n";
import {
  nextIncompletePeerBasicsSlug,
  type PeerBasicsSlug,
} from "@/lib/training/progress";

export type BasicsModuleSummary = {
  slug: PeerBasicsSlug;
  order: number;
  title: string;
};

type Props = {
  locale: Locale;
  modules: BasicsModuleSummary[];
};

export function TrainingPeerBasicsChat({ locale, modules }: Props) {
  const shell = getTrainingPeerBasicsShellCopy(locale);
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<PeerBasicsSlug | null>(
    "module-1",
  );
  const [allDone, setAllDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    const res = await fetch("/api/training/progress");
    if (res.status === 401) {
      router.push(
        `/auth/login?next=${encodeURIComponent("/training/peer-basics")}`,
      );
      return;
    }
    if (!res.ok) {
      setError("Could not load progress.");
      setLoading(false);
      return;
    }
    const data = (await res.json()) as {
      completedModules: string[];
      currentModule: PeerBasicsSlug | null;
      allDone: boolean;
    };
    setCompleted(data.completedModules);
    setCurrentModule(data.currentModule);
    setAllDone(data.allDone);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  const completeCurrentModule = useCallback(
    async (slug: PeerBasicsSlug) => {
    if (completing || allDone) return;
    setCompleting(true);
    setError(null);
    try {
      const res = await fetch("/api/training/module-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.status === 401) {
        router.push(
          `/auth/login?next=${encodeURIComponent("/training/peer-basics")}`,
        );
        return;
      }
      const data = (await res.json()) as {
        error?: string;
        allDone?: boolean;
        completedModules?: string[];
      };
      if (!res.ok) {
        throw new Error(data.error || "Could not save module progress");
      }
      const doneList = data.completedModules ?? [];
      setCompleted(doneList);
      setAllDone(Boolean(data.allDone));
      setCurrentModule(nextIncompletePeerBasicsSlug(doneList));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save progress");
    } finally {
      setCompleting(false);
    }
  },
    [allDone, completing, router],
  );

  const activeChatModule: PeerBasicsSlug =
    currentModule ?? modules[modules.length - 1]?.slug ?? "module-1";

  const currentMeta = modules.find(
    (m) => m.slug === (currentModule ?? activeChatModule),
  );

  if (loading) {
    return (
      <p className="flex flex-1 items-center justify-center text-sm text-muted">
        {shell.loadingProgress}
      </p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line bg-deep/60 px-4 py-2 md:px-8">
        <div className="mx-auto flex max-w-2xl flex-wrap gap-2">
          {modules.map((mod) => {
            const done = completed.includes(mod.slug);
            const current = !allDone && mod.slug === currentModule;
            return (
              <span
                key={mod.slug}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  done
                    ? "bg-moss text-glow"
                    : current
                      ? "bg-ember/20 text-ember-bright ring-1 ring-ember/40"
                      : "bg-void text-muted ring-1 ring-line"
                }`}
              >
                {done ? "✓ " : ""}M{mod.order}
              </span>
            );
          })}
        </div>
        {currentMeta && !allDone ? (
          <p className="mx-auto mt-2 max-w-2xl text-xs text-mist">
            {shell.nowModule(currentMeta.order, currentMeta.title)}
          </p>
        ) : allDone ? (
          <p className="mx-auto mt-2 max-w-2xl text-xs text-mist">
            {shell.allDoneHint}
          </p>
        ) : null}
        {error ? (
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-danger">
            {error}
          </p>
        ) : null}
      </div>

      <PeerChat
        key={`${activeChatModule}-${locale}-open-v5`}
        locale={locale}
        mode="training"
        trainingTrack="peer-basics"
        trainingBasicsModule={activeChatModule}
        fillParent
        onTrainingModuleComplete={completeCurrentModule}
      />

      {allDone ? (
        <div className="border-t border-line bg-deep/80 px-4 py-2 md:px-8">
          <div className="mx-auto flex max-w-2xl justify-end">
            <Link
              href="/training/train-the-trainer"
              className="inline-flex rounded-full bg-glow px-4 py-2 text-sm font-semibold text-void"
            >
              {shell.goTrainTheTrainer}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
