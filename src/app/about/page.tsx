import type { Metadata } from "next";
import Link from "next/link";
import { getAboutContent } from "@/lib/content/about";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const locale = await getLocale();
  const content = getAboutContent(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        {content.title}
      </h1>

      <div className="mt-10 space-y-12">
        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-fog md:text-2xl">
              {section.heading}
            </h2>
            {section.body
              ? section.body.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-relaxed text-mist"
                  >
                    {paragraph}
                  </p>
                ))
              : null}
            {section.items ? (
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-3xl bg-void p-5 shadow-sm ring-1 ring-line"
                  >
                    <h3 className="font-semibold text-fog">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist md:text-base">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-12 text-base text-mist">
        {content.contactCta}{" "}
        <Link
          href="/contact"
          className="font-medium text-ember hover:text-ember-bright"
        >
          {content.contactLink}
        </Link>
      </p>
    </div>
  );
}
