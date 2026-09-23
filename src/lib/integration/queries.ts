import { isSupabaseConfigured } from "@/lib/config";
import {
  seedIntegrationPosts,
  type IntegrationPost,
} from "@/lib/integration/seed";

export async function listIntegrationPosts(): Promise<IntegrationPost[]> {
  if (!isSupabaseConfigured()) {
    return seedIntegrationPosts;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("integration_posts")
      .select(
        "id, type, title, reflection, body, media_url, tags, published_at, profiles(display_name)",
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return seedIntegrationPosts;
    }

    return data.map((row) => {
      const profiles = row.profiles as
        | { display_name: string | null }
        | { display_name: string | null }[]
        | null;
      const profile = Array.isArray(profiles) ? profiles[0] : profiles;
      return {
        id: row.id as string,
        type: row.type as IntegrationPost["type"],
        title: row.title as string,
        reflection: row.reflection as string,
        body: (row.body as string | null) ?? null,
        media_url: (row.media_url as string | null) ?? null,
        tags: (row.tags as string[]) ?? [],
        author_name: profile?.display_name || "Member",
        published_at: row.published_at as string,
      };
    });
  } catch {
    return seedIntegrationPosts;
  }
}

export async function getIntegrationPost(
  id: string,
): Promise<IntegrationPost | null> {
  const seed = seedIntegrationPosts.find((p) => p.id === id);
  if (!isSupabaseConfigured()) {
    return seed ?? null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("integration_posts")
      .select(
        "id, type, title, reflection, body, media_url, tags, published_at, profiles(display_name)",
      )
      .eq("id", id)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) {
      return seed ?? null;
    }

    const profiles = data.profiles as
      | { display_name: string | null }
      | { display_name: string | null }[]
      | null;
    const profile = Array.isArray(profiles) ? profiles[0] : profiles;

    return {
      id: data.id as string,
      type: data.type as IntegrationPost["type"],
      title: data.title as string,
      reflection: data.reflection as string,
      body: (data.body as string | null) ?? null,
      media_url: (data.media_url as string | null) ?? null,
      tags: (data.tags as string[]) ?? [],
      author_name: profile?.display_name || "Member",
      published_at: data.published_at as string,
    };
  } catch {
    return seed ?? null;
  }
}
