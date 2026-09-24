import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export type NewsArticleSection = {
  heading: string;
  blocks: NewsBlock[];
};

export type NewsArticleMeta = {
  slug: string;
  publishedAt: string;
  imageSrc: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  imageAlt: Record<Locale, string>;
};

export type NewsArticle = NewsArticleMeta & {
  sections: NewsArticleSection[];
};

const ARTICLE_DIR = path.join(process.cwd(), "content/news");

function parseBlocks(body: string): NewsBlock[] {
  const blocks: NewsBlock[] = [];
  const chunks = body.split(/\n\n+/).map((c) => c.trim()).filter(Boolean);

  for (const chunk of chunks) {
    const lines = chunk.split("\n");
    if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({
        type: "bullets",
        items: lines.map((line) => line.slice(2).trim()),
      });
    } else {
      blocks.push({ type: "paragraph", text: chunk.replace(/\n/g, " ") });
    }
  }
  return blocks;
}

function parseArticleMarkdown(raw: string): NewsArticleSection[] {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\n(?=## )/);
  return parts.map((part) => {
    const lines = part.trim().split("\n");
    const heading = lines[0].replace(/^##\s*/, "").trim();
    const body = lines.slice(1).join("\n").trim();
    return { heading, blocks: parseBlocks(body) };
  });
}

function localeFileSuffix(locale: Locale): string {
  return locale === "zh-Hant" ? "zh-Hant" : "en";
}

export const newsArticleMetaList: NewsArticleMeta[] = [
  {
    slug: "fda-2026-psychedelics-hearing",
    publishedAt: "2026-09-24",
    imageSrc: "/news/fda-2026-psychedelics-hearing.jpg",
    title: {
      en: "Regulations Meet Tears: 5 Shocking Truths and Harm Reduction Reflections from the 2026 FDA Psychedelics Hearing",
      "zh-Hant":
        "當法規遇上眼淚：2026 年 FDA 迷幻藥物公聽會揭示五個震撼真相與減害思考",
    },
    excerpt: {
      en: "On September 14, 2026, at FDA headquarters in Silver Spring, a Part 15 hearing became a collision of data, ethics, and community harm reduction—and a turning point for who gets access when systems move faster than care.",
      "zh-Hant":
        "2026 年 9 月 14 日，馬里蘭州銀泉市 FDA 總部一場 Part 15 公聽會，讓數據、倫理與社群減害正面交鋒——也逼問：當體系尚未準備好，我們如何安全接住每一個靈魂？",
    },
    imageAlt: {
      en: "A supervised psychedelic therapy lounge with a patient resting while two clinicians monitor the session.",
      "zh-Hant": "受監督迷幻治療空間：病人休息，兩名監測人員在場陪伴。",
    },
  },
];

export function getNewsArticleMeta(slug: string): NewsArticleMeta | undefined {
  return newsArticleMetaList.find((a) => a.slug === slug);
}

export function loadNewsArticle(slug: string, locale: Locale): NewsArticle | null {
  const meta = getNewsArticleMeta(slug);
  if (!meta) return null;

  const file = path.join(ARTICLE_DIR, `${slug}.${localeFileSuffix(locale)}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const sections = parseArticleMarkdown(raw);

  return { ...meta, sections };
}

export function listNewsArticles(locale: Locale): NewsArticle[] {
  return newsArticleMetaList
    .map((meta) => loadNewsArticle(meta.slug, locale))
    .filter((a): a is NewsArticle => a !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}
