import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  email: z.string().trim().email().max(320),
  title: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(8000),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, code: "unavailable" },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const { email, title, message } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_inquiries").insert({
      email,
      title,
      message,
    });

    if (error) {
      console.error("contact_inquiries insert failed", error);
      return NextResponse.json(
        { ok: false, code: "storage" },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact POST failed", err);
    return NextResponse.json({ ok: false, code: "error" }, { status: 500 });
  }
}
