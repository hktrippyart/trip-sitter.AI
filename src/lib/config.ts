import { isSupabasePublicConfigured } from "@/lib/supabase/env";

export function isSupabaseConfigured(): boolean {
  return isSupabasePublicConfigured();
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
