import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/entitlements";
import {
  isPeerBasicsSlug,
  markModuleComplete,
} from "@/lib/training/peer-basics-completion";
import { isSupabaseConfigured } from "@/lib/config";

const bodySchema = z.object({
  slug: z.string().min(1),
});

export async function POST(request: Request) {
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

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid module." }, { status: 400 });
  }

  if (!isPeerBasicsSlug(parsed.slug)) {
    return NextResponse.json({ error: "Unknown module." }, { status: 400 });
  }

  const result = await markModuleComplete(userId, parsed.slug);
  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          "Complete modules in order (1 → 5) after working through each in the chat.",
        completedModules: result.completed,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    completedModules: result.completed,
    allDone: result.allDone,
  });
}
