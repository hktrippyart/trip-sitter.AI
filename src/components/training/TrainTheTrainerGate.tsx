"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isPeerBasicsComplete,
  parseProgress,
  TRAINING_PROGRESS_KEY,
} from "@/lib/training/progress";

type Props = {
  children: React.ReactNode;
};

export function TrainTheTrainerGate({ children }: Props) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const progress = parseProgress(sessionStorage.getItem(TRAINING_PROGRESS_KEY));
    setAllowed(isPeerBasicsComplete(progress));
  }, []);

  if (allowed === null) {
    return (
      <p className="mt-8 text-sm text-muted">Checking course progress…</p>
    );
  }

  if (!allowed) {
    return (
      <div className="mt-8 rounded-3xl bg-void p-6 ring-1 ring-line">
        <h2 className="font-display text-xl text-fog">Train-the-trainer locked</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Complete all five Peer Support Basics modules first. Mark each module
          complete on the last slide of the lesson deck.
        </p>
        <Link
          href="/training"
          className="mt-4 inline-flex rounded-full bg-ember px-4 py-2 text-sm font-semibold text-void"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
