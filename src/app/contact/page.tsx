import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-sm font-medium text-ember">Contact us</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fog">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
        For partnerships, press, shop fulfillment questions, or privacy/terms
        requests, email us. We are not a crisis line — if someone is in immediate
        danger, call local emergency services.
      </p>

      <div className="mt-10 rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <p className="text-sm font-medium text-muted">Email</p>
        <a
          href="mailto:hello@trip-sitter.ai"
          className="mt-2 inline-block text-xl font-semibold text-ember hover:text-ember-bright"
        >
          hello@trip-sitter.ai
        </a>
        <p className="mt-6 text-sm text-mist">
          Prefer not to email? Use the flag controls on integration posts for
          content reports.
        </p>
      </div>
    </div>
  );
}
