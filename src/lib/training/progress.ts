export const TRAINING_PROGRESS_KEY = "ts_training_progress_v1";

export const PEER_BASICS_SLUGS = [
  "module-1",
  "module-2",
  "module-3",
  "module-4",
  "module-5",
] as const;

export type PeerBasicsSlug = (typeof PEER_BASICS_SLUGS)[number];

export type TrainingProgress = {
  completedSlugs: string[];
};

export function emptyProgress(): TrainingProgress {
  return { completedSlugs: [] };
}

export function parseProgress(raw: string | null): TrainingProgress {
  if (!raw) return emptyProgress();
  try {
    const data = JSON.parse(raw) as TrainingProgress;
    if (!Array.isArray(data.completedSlugs)) return emptyProgress();
    return { completedSlugs: data.completedSlugs.filter((s) => typeof s === "string") };
  } catch {
    return emptyProgress();
  }
}

export function isPeerBasicsComplete(progress: TrainingProgress): boolean {
  return PEER_BASICS_SLUGS.every((slug) => progress.completedSlugs.includes(slug));
}

export function nextIncompletePeerBasicsSlug(
  completed: readonly string[],
): PeerBasicsSlug | null {
  for (const slug of PEER_BASICS_SLUGS) {
    if (!completed.includes(slug)) return slug;
  }
  return null;
}

export function markSlugComplete(
  progress: TrainingProgress,
  slug: string,
): TrainingProgress {
  if (progress.completedSlugs.includes(slug)) return progress;
  return { completedSlugs: [...progress.completedSlugs, slug] };
}
