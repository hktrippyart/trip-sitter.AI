"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PeerChat } from "@/components/chat/PeerChat";
import { getTrainingPeerBasicsShellCopy } from "@/lib/chat/ui-copy";
import type { Locale } from "@/lib/i18n";
import {
  isPeerBasicsComplete,
  nextIncompletePeerBasicsSlug,
  parseProgress,
  TRAINING_PROGRESS_KEY,
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
  /** $5/mo cloud save — persisted progress in Supabase; else session-only. */
  cloudSaveEnabled: boolean;
};

function loadSessionProgress(): string[] {
  if (typeof window === "undefined") return [];
  return parseProgress(sessionStorage.getItem(TRAINING_PROGRESS_KEY))
    .completedSlugs;
}

function saveSessionProgress(completed: string[]) {
  try {
    sessionStorage.setItem(
      TRAINING_PROGRESS_KEY,
      JSON.stringify({ completedSlugs: completed }),
    );
  } catch {
    // ignore quota / private mode
  }
}

export function TrainingPeerBasicsChat({
  locale,
  modules,
  cloudSaveEnabled,
}: Props) {
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
  /** Coach signaled module done; user must confirm before chat advances. */
  const [pendingCompleteSlug, setPendingCompleteSlug] =
    useState<PeerBasicsSlug | null>(null);
  const [activeChatModule, setActiveChatModule] =
    useState<PeerBasicsSlug>("module-1");

  const applyProgress = useCallback((doneList: string[]) => {
    setCompleted(doneList);
    setAllDone(isPeerBasicsComplete({ completedSlugs: doneList }));
    setCurrentModule(nextIncompletePeerBasicsSlug(doneList));
  }, []);

  const loadProgress = useCallback(async () => {
    if (!cloudSaveEnabled) {
      const doneList = loadSessionProgress();
      applyProgress(doneList);
      setActiveChatModule(
        nextIncompletePeerBasicsSlug(doneList) ?? "module-5",
      );
      setLoading(false);
      return;
    }

    const res = await fetch("/api/training/progress");
    if (res.status === 401) {
      router.push(
        `/auth/login?next=${encodeURIComponent("/training/peer-basics")}`,
      );
      return;
    }
    if (!res.ok) {
      setError(shell.errorLoadProgress);
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
    setActiveChatModule(
      data.currentModule ??
        nextIncompletePeerBasicsSlug(data.completedModules) ??
        "module-5",
    );
    setLoading(false);
  }, [
    applyProgress,
    cloudSaveEnabled,
    router,
    shell.errorLoadProgress,
  ]);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  const onCoachModuleComplete = useCallback(
    (slug: PeerBasicsSlug) => {
      if (allDone || completing) return;
      if (slug !== activeChatModule) return;
      setPendingCompleteSlug((prev) => prev ?? slug);
    },
    [activeChatModule, allDone, completing],
  );

  const confirmAdvanceFromModule = useCallback(
    async (slug: PeerBasicsSlug) => {
      if (completing || allDone) return;
      setCompleting(true);
      setError(null);
      try {
        if (!cloudSaveEnabled) {
          const doneList = [...new Set([...completed, slug])];
          saveSessionProgress(doneList);
          applyProgress(doneList);
          const next = nextIncompletePeerBasicsSlug(doneList);
          if (next) {
            setActiveChatModule(next);
          }
          setPendingCompleteSlug(null);
          setError(null);
          return;
        }

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
          throw new Error(data.error || shell.errorSaveProgress);
        }
        const doneList = data.completedModules ?? [];
        applyProgress(doneList);
        const next = nextIncompletePeerBasicsSlug(doneList);
        if (next) {
          setActiveChatModule(next);
        }
        setPendingCompleteSlug(null);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : shell.errorSaveProgress,
        );
        if (cloudSaveEnabled) {
          void loadProgress();
        }
      } finally {
        setCompleting(false);
      }
    },
    [
      allDone,
      applyProgress,
      cloudSaveEnabled,
      completed,
      completing,
      loadProgress,
      router,
      shell.errorSaveProgress,
    ],
  );

  const activeMeta = modules.find((m) => m.slug === activeChatModule);

  const pendingMeta = pendingCompleteSlug
    ? modules.find((m) => m.slug === pendingCompleteSlug)
    : undefined;
  const pendingIdx = pendingCompleteSlug
    ? modules.findIndex((m) => m.slug === pendingCompleteSlug)
    : -1;
  const nextAfterPending =
    pendingIdx >= 0 && pendingIdx < modules.length - 1
      ? modules[pendingIdx + 1]
      : undefined;

  if (loading) {
    return (
      <p className="flex flex-1 items-center justify-center text-sm text-muted">
        {cloudSaveEnabled ? shell.loadingProgress : shell.loadingIdle}
      </p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line bg-deep/60 px-4 py-2 md:px-8">
        <div className="mx-auto flex max-w-2xl flex-wrap gap-2">
          {modules.map((mod) => {
            const done = completed.includes(mod.slug);
            const current = !allDone && mod.slug === activeChatModule;
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
        {activeMeta && !allDone ? (
          <p className="mx-auto mt-2 max-w-2xl text-xs text-mist">
            {shell.nowModule(activeMeta.order, activeMeta.title)}
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
        key={`${activeChatModule}-${locale}-open-v7`}
        locale={locale}
        mode="training"
        trainingTrack="peer-basics"
        trainingBasicsModule={activeChatModule}
        fillParent
        onTrainingModuleComplete={onCoachModuleComplete}
      />

      {pendingCompleteSlug === activeChatModule && pendingMeta ? (
        <div className="border-t border-line bg-deep/90 px-4 py-3 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-mist sm:max-w-md md:text-sm">
              {shell.moduleReadyReviewHint}
            </p>
            <button
              type="button"
              disabled={completing}
              onClick={() => void confirmAdvanceFromModule(pendingCompleteSlug)}
              className="shrink-0 rounded-full bg-glow px-4 py-2 text-sm font-semibold text-void transition hover:bg-glow/90 disabled:opacity-60"
            >
              {completing
                ? "…"
                : nextAfterPending
                  ? shell.continueToNextModule(
                      nextAfterPending.order,
                      nextAfterPending.title,
                    )
                  : shell.continueFinishTrack}
            </button>
          </div>
        </div>
      ) : null}

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
