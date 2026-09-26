import { isSupabaseConfigured } from "@/lib/config";
import { TRAINING_CLOUD_SAVE_KEY } from "@/lib/training/product-keys";
import { userHasCompletedPeerBasics } from "@/lib/training/peer-basics-completion";

export async function getCurrentUserId(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

/** Part 1 chat — free; sign-in required at route level. */
export async function userHasPeerBasicsTrainingAccess(
  userId: string | null,
): Promise<boolean> {
  return Boolean(userId) || !isSupabaseConfigured();
}

/** Part 2 chat — after Part 1 marked complete on the signed-in account. */
export async function userHasTrainTheTrainerAccess(
  userId: string | null,
): Promise<boolean> {
  if (!userId) return false;
  return userHasCompletedPeerBasics(userId);
}

export async function userHasTrainingCloudSave(
  userId: string | null,
): Promise<boolean> {
  if (!userId || !isSupabaseConfigured()) return false;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entitlements")
      .select("active")
      .eq("user_id", userId)
      .eq("product_key", TRAINING_CLOUD_SAVE_KEY)
      .maybeSingle();
    if (error) {
      console.error("entitlements read failed", error.message);
      return false;
    }
    return Boolean(data?.active);
  } catch {
    return false;
  }
}
