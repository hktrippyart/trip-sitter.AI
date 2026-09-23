import Link from "next/link";
import { trainingOfferings } from "@/lib/training/catalog";

type Props = {
  signedIn: boolean;
  peerBasicsComplete: boolean;
};

export function TrainingTrackCards({ signedIn, peerBasicsComplete }: Props) {
  const peer = trainingOfferings.find((o) => o.track === "peer-basics")!;
  const ttt = trainingOfferings.find((o) => o.track === "train-the-trainer")!;

  const peerHref = signedIn
    ? peer.chatPath
    : `/auth/login?next=${encodeURIComponent(peer.chatPath)}`;

  const tttHref = signedIn
    ? ttt.chatPath
    : `/auth/login?next=${encodeURIComponent(ttt.chatPath)}`;

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <article className="flex flex-col rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Part 1
        </p>
        <h2 className="mt-2 font-display text-2xl text-fog md:text-3xl">
          {peer.name}
        </h2>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
          {peer.summary}
        </p>
        <p className="mt-3 text-xs text-muted">
          Interactive AI training chat—same style as trip-sitter.AI peer chat.
        </p>
        <Link
          href={peerHref}
          className="mt-6 inline-flex w-fit rounded-full bg-glow px-5 py-2.5 text-sm font-semibold text-void"
        >
          Enter training chat
        </Link>
        {!signedIn ? (
          <p className="mt-3 text-xs text-muted">
            Sign in when prompted to save progress and unlock Part 2.
          </p>
        ) : null}
      </article>

      <article className="flex flex-col rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Part 2
        </p>
        <h2 className="mt-2 font-display text-2xl text-fog md:text-3xl">
          {ttt.name}
        </h2>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
          {ttt.summary}
        </p>
        <p className="mt-3 text-xs text-muted">
          Event holding, team ops, and teaching volunteers.
        </p>

        {peerBasicsComplete ? (
          <Link
            href={tttHref}
            className="mt-6 inline-flex w-fit rounded-full bg-glow px-5 py-2.5 text-sm font-semibold text-void"
          >
            Enter training chat
          </Link>
        ) : (
          <span
            className="mt-6 inline-flex w-fit cursor-not-allowed rounded-full bg-glow/45 px-5 py-2.5 text-sm font-semibold text-void/90"
            aria-disabled="true"
          >
            Unlock after Peer Support Basics
          </span>
        )}
      </article>
    </div>
  );
}
