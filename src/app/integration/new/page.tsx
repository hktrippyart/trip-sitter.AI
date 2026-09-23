import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IntegrationComposer } from "@/components/IntegrationComposer";
import { isSupabaseConfigured } from "@/lib/config";
import { getCurrentUserId } from "@/lib/entitlements";

export const metadata: Metadata = { title: "Share integration" };

export default async function NewIntegrationPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 md:px-8">
        <h1 className="font-display text-3xl text-fog">Sharing needs Auth</h1>
        <p className="mt-3 text-mist">
          Configure Supabase (Auth + Storage) to accept integration uploads.
          Seed gallery pieces remain visible on the public feed.
        </p>
        <Link href="/integration" className="mt-6 inline-block text-ember">
          ← Back to gallery
        </Link>
      </div>
    );
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/auth/login?next=/integration/new");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">
        Creative integration
      </p>
      <h1 className="mt-3 font-display text-4xl text-fog">Share a piece</h1>
      <p className="mt-3 text-mist">
        Guidelines: no illegal sourcing how-tos, no exploitation of others’
        images, no crisis content without resources. If you’re in danger, contact
        local emergency services.
      </p>
      <div className="mt-8">
        <IntegrationComposer />
      </div>
    </div>
  );
}
