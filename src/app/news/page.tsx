import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listNewsArticles } from "@/lib/content/news/load-article";
import { getNewsContent } from "@/lib/content/news";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const content = getNewsContent(locale);
  return { title: content.title };
}

function formatDate(iso: string, locale: "en" | "zh-Hant"): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString(locale === "zh-Hant" ? "zh-HK" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const locale = await getLocale();
  const content = getNewsContent(locale);
  const articles = listNewsArticles(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fog md:text-5xl">
        {content.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-mist">{content.lede}</p>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-void p-6 text-sm leading-relaxed text-mist ring-1 ring-line md:text-base">
          {content.empty}
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/news/${article.slug}`}
                className="group block overflow-hidden rounded-3xl bg-void ring-1 ring-line transition hover:ring-ember/40"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={article.imageSrc}
                    alt={article.imageAlt[locale]}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <time
                    dateTime={article.publishedAt}
                    className="text-xs uppercase tracking-wide text-mist"
                  >
                    {formatDate(article.publishedAt, locale)}
                  </time>
                  <h2 className="text-xl font-semibold tracking-tight text-fog group-hover:text-ember-bright md:text-2xl">
                    {article.title[locale]}
                  </h2>
                  <p className="text-sm leading-relaxed text-mist md:text-base">
                    {article.excerpt[locale]}
                  </p>
                  <span className="inline-block pt-1 text-sm font-medium text-ember">
                    {locale === "zh-Hant" ? "閱讀全文 →" : "Read article →"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
