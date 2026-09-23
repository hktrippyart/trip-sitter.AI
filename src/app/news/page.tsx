import type { Metadata } from "next";
import { getNewsContent } from "@/lib/content/news";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = getNewsContent(locale);
  return { title: content.title };
}

export default async function NewsPage() {
  const locale = await getLocale();
  const content = getNewsContent(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        {content.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-mist">{content.lede}</p>
      <p className="mt-10 rounded-3xl bg-void p-6 text-sm leading-relaxed text-mist ring-1 ring-line md:text-base">
        {content.empty}
      </p>
    </div>
  );
}
