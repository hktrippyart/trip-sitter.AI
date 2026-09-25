import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PeerChat } from "@/components/chat/PeerChat";
import { isSupabaseConfigured } from "@/lib/config";
import { getTrainingTttShellCopy } from "@/lib/content/training-hub";
import {
  getCurrentUserId,
  userHasTrainTheTrainerAccess,
} from "@/lib/entitlements";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const shell = getTrainingTttShellCopy(locale);
  return { title: `${shell.trackLabel} · ${shell.pageTitleSuffix}` };
}

export default async function TrainTheTrainerPage() {
  const userId = await getCurrentUserId();
  if (isSupabaseConfigured() && !userId) {
    redirect(
      `/auth/login?next=${encodeURIComponent("/training/train-the-trainer")}`,
    );
  }

  const hasAccess = await userHasTrainTheTrainerAccess(userId);
  if (!hasAccess) {
    redirect("/training");
  }

  const locale = await getLocale();
  const shell = getTrainingTttShellCopy(locale);

  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col">
      <div className="border-b border-line px-4 py-2 md:px-8">
        <Link href="/training" className="text-sm text-mist hover:text-fog">
          {shell.backLink}
        </Link>
        <p className="text-xs font-medium text-muted">{shell.trackLabel}</p>
      </div>
      <PeerChat
        locale={locale}
        mode="training"
        trainingTrack="train-the-trainer"
      />
    </div>
  );
}
