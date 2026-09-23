"use client";

import { useRouter } from "next/navigation";
import { LessonDeck } from "@/components/LessonDeck";
import {
  markSlugComplete,
  parseProgress,
  PEER_BASICS_SLUGS,
  TRAINING_PROGRESS_KEY,
} from "@/lib/training/progress";
import type { Module } from "@/lib/training/modules";

type Props = {
  mod: Module;
  hasAccess: boolean;
};

export function TrainingLessonClient({ mod, hasAccess }: Props) {
  const router = useRouter();

  function handleComplete() {
    if (typeof window === "undefined") return;
    const progress = parseProgress(sessionStorage.getItem(TRAINING_PROGRESS_KEY));
    const next = markSlugComplete(progress, mod.slug);
    sessionStorage.setItem(TRAINING_PROGRESS_KEY, JSON.stringify(next));

    const basicsDone = PEER_BASICS_SLUGS.every((s) =>
      next.completedSlugs.includes(s),
    );
    if (mod.track === "peer-basics" && basicsDone) {
      router.push("/training?basics=complete");
      return;
    }
    router.push("/training");
  }

  if (!hasAccess) {
    return (
      <p className="mt-8 text-mist">
        Course access required.{" "}
        <a href="/training" className="text-ember hover:underline">
          Return to training
        </a>
      </p>
    );
  }

  return (
    <div className="mt-8">
      <LessonDeck
        title={mod.title}
        slides={mod.slides}
        moduleSlug={mod.slug}
        onCompleteModule={handleComplete}
      />
    </div>
  );
}
