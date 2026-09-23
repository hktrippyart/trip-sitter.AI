import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const form = await request.formData();
  const type = String(form.get("type") || "");
  const title = String(form.get("title") || "").trim();
  const reflection = String(form.get("reflection") || "").trim();
  const body = String(form.get("body") || "").trim();
  const tagsRaw = String(form.get("tags") || "");
  const file = form.get("file");

  if (!["text", "image", "video"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  if (!title || !reflection) {
    return NextResponse.json(
      { error: "Title and reflection are required" },
      { status: 400 },
    );
  }
  if (type === "text" && !body) {
    return NextResponse.json({ error: "Text body required" }, { status: 400 });
  }

  let mediaUrl: string | null = null;

  if (type === "image" || type === "video") {
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Media file required" }, { status: 400 });
    }
    const maxBytes = type === "image" ? 8_000_000 : 80_000_000;
    if (file.size > maxBytes) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }
    const ext = file.name.split(".").pop() || (type === "image" ? "jpg" : "mp4");
    const path = `${user.id}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("integration-media")
      .upload(path, buffer, {
        contentType: file.type || undefined,
        upsert: false,
      });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    const { data: publicData } = supabase.storage
      .from("integration-media")
      .getPublicUrl(path);
    mediaUrl = publicData.publicUrl;
  }

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);

  const { data, error } = await supabase
    .from("integration_posts")
    .insert({
      user_id: user.id,
      type,
      title,
      reflection,
      body: type === "text" ? body : null,
      media_url: mediaUrl,
      tags,
      published: true,
      published_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Insert failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: data.id });
}
