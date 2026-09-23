import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Subscription started" };

export default function TrainingSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20 text-center md:px-8">
      <p className="text-sm font-medium text-ember">Thank you</p>
      <h1 className="mt-3 font-display text-4xl text-fog">You’re subscribed</h1>
      <p className="mt-4 text-mist">
        If checkout completed, your training access should unlock within a few
        seconds via Stripe webhook. Then open your track and enter the training
        chat.
      </p>
      <Link
        href="/training"
        className="mt-8 inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-void"
      >
        Go to training
      </Link>
    </div>
  );
}
