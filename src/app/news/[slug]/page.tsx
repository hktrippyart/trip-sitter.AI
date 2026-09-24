import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/news/ArticleBody";
import {
  getNewsArticleMeta,
  loadNewsArticle,
  newsArticleMetaList,
} from "@/lib/content/news/load-article";
import { getNewsContent } from "@/lib/content/news";
import { getLocale } from "@/lib/locale";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsArticleMetaList.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const meta = getNewsArticleMeta(slug);
  if (!meta) return { title: "News" };
  return { title: meta.title[locale] };
}

function formatDate(iso: string, locale: "en" | "zh-Hant"): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString(locale === "zh-Hant" ? "zh-HK" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const hub = getNewsContent(locale);
  const article = loadNewsArticle(slug, locale);
  if (!article) notFound();

  const backLabel = locale === "zh-Hant" ? "返回最新消息" : "Back to news";

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <p className="text-sm">
        <Link
          href="/news"
          className="font-medium text-ember hover:text-ember-bright"
        >
          ← {backLabel}
        </Link>
      </p>

      <time
        dateTime={article.publishedAt}
        className="mt-6 block text-sm text-mist"
      >
        {formatDate(article.publishedAt, locale)}
      </time>

      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fog md:text-4xl">
        {article.title[locale]}
      </h1>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl bg-void ring-1 ring-line">
        <Image
          src={article.imageSrc}
          alt={article.imageAlt[locale]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <p className="mt-8 text-lg leading-relaxed text-mist">{article.excerpt[locale]}</p>

      <ArticleBody sections={article.sections} />

      <p className="mt-12 text-sm text-mist">
        <Link
          href="/news"
          className="font-medium text-ember hover:text-ember-bright"
        >
          {hub.title}
        </Link>
      </p>
    </article>
  );
}
