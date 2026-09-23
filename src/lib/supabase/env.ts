/** Public Supabase URL (browser + server). */
export function getSupabaseUrl(): string | undefined {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  return url || undefined;
}

/** Client-safe key: legacy anon JWT or new `sb_publishable_` key. */
export function getSupabaseAnonKey(): string | undefined {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  return key || undefined;
}

/** Server-only elevated key: legacy service_role or new `sb_secret_` key. */
export function getSupabaseServiceRoleKey(): string | undefined {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();
  return key || undefined;
}

export function isSupabasePublicConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
