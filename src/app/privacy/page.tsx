import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fog">
        Privacy policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 20, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-mist">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">What we collect</h2>
          <p>
            Account email and display name (via Supabase Auth), purchase metadata
            needed for entitlements (via Stripe), integration posts and uploads you
            choose to publish, and basic technical logs (e.g. request errors).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">How we use it</h2>
          <p>
            To run the site, unlock paid training, fulfill shop orders, show the
            creative integration gallery, improve reliability, and respond when you
            contact us. We do not sell your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Processors</h2>
          <p>
            We rely on infrastructure providers such as Vercel (hosting), Supabase
            (auth, database, storage), and Stripe (payments). Their processing is
            governed by their own policies in addition to ours.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Your choices</h2>
          <p>
            You may request access, correction, or deletion of account data by
            contacting us. Public integration posts can be removed by you when
            signed in, or flagged for review.
          </p>
        </section>

        <p>
          <Link href="/contact" className="text-ember hover:text-ember-bright">
            Contact us
          </Link>{" "}
          for privacy requests.
        </p>
      </div>
    </div>
  );
}
