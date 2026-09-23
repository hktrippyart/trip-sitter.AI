import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";

const DEFAULT_AFTER_AUTH = "/training";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/") ? nextParam : DEFAULT_AFTER_AUTH;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      `${origin}/auth/login?next=${encodeURIComponent(next)}&error=supabase`,
    );
  }

  if (code) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        `${origin}/auth/login?next=${encodeURIComponent(next)}&error=confirm`,
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
