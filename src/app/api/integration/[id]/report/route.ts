import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Props) {
  const { id } = await params;
  const referer = request.headers.get("referer");

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      await supabase.from("integration_reports").insert({
        post_id: id,
        reporter_id: user?.id ?? null,
        reason: "flagged_from_ui",
      });
    } catch (err) {
      console.error("report failed", err);
    }
  }

  const destination = referer || new URL(`/integration/${id}`, request.url).toString();
  return NextResponse.redirect(destination, { status: 303 });
}
