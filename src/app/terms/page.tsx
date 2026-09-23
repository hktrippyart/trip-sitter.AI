import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fog">
        Terms of service
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 20, 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-mist">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Educational use only</h2>
          <p>
            trip-sitter.AI provides peer education, creative-integration sharing,
            curated links, and optional products. Nothing on this site is medical,
            clinical, psychiatric, or legal advice. We do not diagnose, treat, or
            prescribe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Accounts & purchases</h2>
          <p>
            You are responsible for your account credentials. Paid training access
            and shop orders are processed by Stripe. Physical goods ship only to
            allowlisted regions. Digital course access is personal and
            non-transferable unless we say otherwise at checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">User content</h2>
          <p>
            Integration posts must follow our guidelines: no illegal sourcing
            how-tos, no exploitation of others, no CSAM, and no content that
            creates imminent danger. We may remove or hide content and suspend
            accounts that violate these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Emergencies</h2>
          <p>
            If you or someone else is in immediate danger, contact local emergency
            services. This platform is not a crisis hotline and cannot dispatch
            help.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-fog">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, trip-sitter.AI and its
            operators are not liable for decisions you make based on site content,
            training materials, third-party links, or community posts.
          </p>
        </section>

        <p>
          Questions?{" "}
          <Link href="/contact" className="text-ember hover:text-ember-bright">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
