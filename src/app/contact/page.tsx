import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  getContactContent,
  getContactPageTitle,
} from "@/lib/content/contact";
import { isSupabaseConfigured } from "@/lib/config";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: getContactPageTitle(locale) };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const content = getContactContent(locale);
  const formEnabled = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        {content.title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
        {content.lede}
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        {content.crisisNote}
      </p>

      <div className="mt-10 rounded-3xl bg-void p-6 shadow-sm ring-1 ring-line md:p-8">
        <ContactForm copy={content.form} formEnabled={formEnabled} />
      </div>
    </div>
  );
}
