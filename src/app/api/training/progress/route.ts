import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/entitlements";
import {
  getCompletedModuleSlugs,
  nextIncompleteModuleSlug,
  userHasCompletedPeerBasics,
} from "@/lib/training/peer-basics-completion";
import { isSupabaseConfigured } from "@/lib/config";
import { PEER_BASICS_SLUGS } from "@/lib/training/progress";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Training progress requires Supabase." },
      { status: 503 },
    );
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const completed = await getCompletedModuleSlugs(userId);
  const currentModule = nextIncompleteModuleSlug(completed);
  const allDone = await userHasCompletedPeerBasics(userId);

  return NextResponse.json({
    completedModules: completed,
    currentModule,
    allDone,
    moduleOrder: [...PEER_BASICS_SLUGS],
  });
}
