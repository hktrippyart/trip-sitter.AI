import Link from "next/link";
import { getTrainingTrackCardsCopy } from "@/lib/content/training-hub";
import type { Locale } from "@/lib/i18n";
import { trainingOfferings } from "@/lib/training/catalog";

type Props = {
  locale: Locale;
  signedIn: boolean;
  peerBasicsComplete: boolean;
};

export function TrainingTrackCards({
  locale,
  signedIn,
  peerBasicsComplete,
}: Props) {
  const copy = getTrainingTrackCardsCopy(locale);
  const peer = trainingOfferings.find((o) => o.track === "peer-basics")!;
  const ttt = trainingOfferings.find((o) => o.track === "train-the-trainer")!;
  const peerCopy = copy.offering["peer-basics"];
  const tttCopy = copy.offering["train-the-trainer"];

  const peerHref = signedIn
    ? peer.chatPath
    : `/auth/login?next=${encodeURIComponent(peer.chatPath)}`;

  const tttHref = signedIn
    ? ttt.chatPath
    : `/auth/login?next=${encodeURIComponent(ttt.chatPath)}`;

  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
      <article className="flex flex-col rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {copy.partLabel(1)}
        </p>
        <h2 className="mt-2 font-display text-2xl text-fog md:text-3xl">
          {peerCopy.name}
        </h2>
        <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-mist">
          {peerCopy.summary}
        </p>
        <Link
          href={peerHref}
          className="mt-6 inline-flex w-fit rounded-full bg-glow px-5 py-2.5 text-sm font-semibold text-void"
        >
          {copy.enterChat}
        </Link>
      </article>

      <article className="flex flex-col rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {copy.partLabel(2)}
        </p>
        <h2 className="mt-2 font-display text-2xl text-fog md:text-3xl">
          {tttCopy.name}
        </h2>
        <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-mist">
          {tttCopy.summary}
        </p>

        {peerBasicsComplete ? (
          <Link
            href={tttHref}
            className="mt-6 inline-flex w-fit rounded-full bg-glow px-5 py-2.5 text-sm font-semibold text-void"
          >
            {copy.enterChat}
          </Link>
        ) : (
          <span
            className="mt-6 inline-flex w-fit cursor-not-allowed rounded-full bg-glow/45 px-5 py-2.5 text-sm font-semibold text-void/90"
            aria-disabled="true"
          >
            {copy.unlockAfterBasics}
          </span>
        )}
      </article>
    </div>
  );
}
