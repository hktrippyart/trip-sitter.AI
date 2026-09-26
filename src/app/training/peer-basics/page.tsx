import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  TrainingPeerBasicsChat,
  type BasicsModuleSummary,
} from "@/components/training/TrainingPeerBasicsChat";
import { isSupabaseConfigured } from "@/lib/config";
import {
  getCurrentUserId,
  userHasTrainingCloudSave,
} from "@/lib/entitlements";
import { getTrainingPeerBasicsShellCopy } from "@/lib/chat/ui-copy";
import { getPeerBasicsModuleTitle } from "@/lib/chat/training-module-copy";
import { getLocale } from "@/lib/locale";
import { getPeerBasicsModules } from "@/lib/training/modules";
import type { PeerBasicsSlug } from "@/lib/training/progress";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const shell = getTrainingPeerBasicsShellCopy(locale);
  return { title: `${shell.trackLabel} · ${shell.pageTitleSuffix}` };
}

export default async function PeerBasicsTrainingPage() {
  const userId = await getCurrentUserId();
  if (isSupabaseConfigured() && !userId) {
    redirect(
      `/auth/login?next=${encodeURIComponent("/training/peer-basics")}`,
    );
  }

  const locale = await getLocale();
  const cloudSaveEnabled = await userHasTrainingCloudSave(userId);
  const shell = getTrainingPeerBasicsShellCopy(locale);
  const modules: BasicsModuleSummary[] = getPeerBasicsModules().map((m) => ({
    slug: m.slug as PeerBasicsSlug,
    order: m.order,
    title: getPeerBasicsModuleTitle(
      locale,
      m.slug as PeerBasicsSlug,
      m.title,
    ),
  }));

  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col">
      <div className="border-b border-line px-4 py-2 md:px-8">
        <Link href="/training" className="text-sm text-mist hover:text-fog">
          {shell.backLink}
        </Link>
        <p className="text-xs font-medium text-muted">{shell.trackLabel}</p>
      </div>
      <TrainingPeerBasicsChat
        locale={locale}
        modules={modules}
        cloudSaveEnabled={cloudSaveEnabled}
      />
    </div>
  );
}
