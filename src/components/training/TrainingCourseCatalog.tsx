"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isPeerBasicsComplete,
  parseProgress,
  TRAINING_PROGRESS_KEY,
  type TrainingProgress,
} from "@/lib/training/progress";
import {
  getPeerBasicsModules,
  getTrainTheTrainerModules,
  type Module,
} from "@/lib/training/modules";

type Props = {
  hasAccess: boolean;
};

function ModuleCard({
  mod,
  hasAccess,
  progress,
  lockedReason,
}: {
  mod: Module;
  hasAccess: boolean;
  progress: TrainingProgress;
  lockedReason?: string;
}) {
  const completed = progress.completedSlugs.includes(mod.slug);
  const canOpen = hasAccess && !lockedReason;

  return (
    <article className="rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted">
          Module {mod.order} · ~{mod.estimateMinutes} min
        </p>
        {completed ? (
          <span className="shrink-0 rounded-full bg-moss px-2.5 py-0.5 text-xs font-medium text-glow">
            Completed
          </span>
        ) : null}
      </div>
      <h3 className="mt-2 font-display text-xl text-fog md:text-2xl">
        {mod.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{mod.subtitle}</p>
      {canOpen ? (
        <Link
          href={`/training/${mod.slug}`}
          className="mt-6 inline-flex rounded-full bg-glow px-4 py-2 text-sm font-semibold text-void"
        >
          {completed ? "Review module" : "Open module"}
        </Link>
      ) : (
        <p className="mt-6 text-sm text-muted">
          {lockedReason ?? (hasAccess ? "Unavailable" : "Locked until purchase")}
        </p>
      )}
    </article>
  );
}

export function TrainingCourseCatalog({ hasAccess }: Props) {
  const [progress, setProgress] = useState<TrainingProgress>({ completedSlugs: [] });

  useEffect(() => {
    const raw = sessionStorage.getItem(TRAINING_PROGRESS_KEY);
    setProgress(parseProgress(raw));
  }, []);

  const basicsComplete = isPeerBasicsComplete(progress);
  const peerModules = getPeerBasicsModules();
  const tttModules = getTrainTheTrainerModules();

  const tttLockedReason = !basicsComplete
    ? "Complete all Peer Support Basics modules to unlock"
    : undefined;

  return (
    <div className="mt-12 space-y-14">
      <section>
        <h2 className="font-display text-2xl font-semibold text-fog md:text-3xl">
          Peer Support Basics
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-mist md:text-base">
          Five modules from ethics and trauma-attuned care through crisis
          triage and integration—aligned with peer harm-reduction training
          principles.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {peerModules.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              hasAccess={hasAccess}
              progress={progress}
              lockedReason={undefined}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-fog md:text-3xl">
          Train-the-trainer
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-mist md:text-base">
          Event holding, team ops, and facilitation skills for leads who train
          other volunteers—unlocked after Peer Support Basics.
        </p>
        {!basicsComplete && hasAccess ? (
          <p className="mt-3 text-sm text-ember">
            Finish modules 1–5 above to unlock this track (
            {progress.completedSlugs.filter((s) => s.startsWith("module-")).length}
            /5 complete).
          </p>
        ) : null}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {tttModules.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              hasAccess={hasAccess}
              progress={progress}
              lockedReason={tttLockedReason}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
