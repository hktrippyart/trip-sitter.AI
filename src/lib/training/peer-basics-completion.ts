import { isSupabaseConfigured } from "@/lib/config";
import {
  isPeerBasicsComplete,
  PEER_BASICS_SLUGS,
  type PeerBasicsSlug,
} from "@/lib/training/progress";

export function isPeerBasicsSlug(slug: string): slug is PeerBasicsSlug {
  return (PEER_BASICS_SLUGS as readonly string[]).includes(slug);
}

export async function getCompletedModuleSlugs(
  userId: string,
): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("training_progress")
    .select("completed_modules, peer_basics_completed_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("training_progress read failed", error.message);
    return [];
  }

  const fromArray = Array.isArray(data?.completed_modules)
    ? data.completed_modules.filter((s): s is string => typeof s === "string")
    : [];

  if (fromArray.length > 0) {
    return PEER_BASICS_SLUGS.filter((s) => fromArray.includes(s));
  }

  if (data?.peer_basics_completed_at) {
    return [...PEER_BASICS_SLUGS];
  }

  return [];
}

export async function userHasCompletedPeerBasics(
  userId: string | null,
): Promise<boolean> {
  if (!userId) return false;
  const completed = await getCompletedModuleSlugs(userId);
  return isPeerBasicsComplete({ completedSlugs: completed });
}

export function nextIncompleteModuleSlug(
  completed: string[],
): PeerBasicsSlug | null {
  for (const slug of PEER_BASICS_SLUGS) {
    if (!completed.includes(slug)) return slug;
  }
  return null;
}

export async function markModuleComplete(
  userId: string,
  slug: PeerBasicsSlug,
): Promise<{
  ok: boolean;
  completed: string[];
  allDone: boolean;
  reason?: "order" | "db" | "config";
}> {
  if (!isSupabaseConfigured()) {
    return { ok: false, completed: [], allDone: false, reason: "config" };
  }

  const existing = await getCompletedModuleSlugs(userId);
  if (existing.includes(slug)) {
    const allDone = isPeerBasicsComplete({ completedSlugs: existing });
    return { ok: true, completed: existing, allDone };
  }

  const nextAllowed = nextIncompleteModuleSlug(existing);
  if (nextAllowed !== slug) {
    return { ok: false, completed: existing, allDone: false, reason: "order" };
  }

  const completed = [...existing, slug];
  const allDone = isPeerBasicsComplete({ completedSlugs: completed });
  const now = new Date().toISOString();

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { error } = await supabase.from("training_progress").upsert(
    {
      user_id: userId,
      completed_modules: completed,
      peer_basics_completed_at: allDone ? now : null,
      updated_at: now,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    console.error("training_progress write failed", error.message);
    return { ok: false, completed: existing, allDone: false, reason: "db" };
  }

  return { ok: true, completed, allDone };
}
