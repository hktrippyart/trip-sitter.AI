import type { Locale } from "@/lib/i18n";

export type NewsContent = {
  title: string;
  lede: string;
  empty: string;
};

const en: NewsContent = {
  title: "News",
  lede:
    "Latest developments in trip-sitting research, harm reduction, and community training — updates will be posted here.",
  empty:
    "No articles yet. Check back for study summaries, training updates, and platform news.",
};

const zhHant: NewsContent = {
  title: "最新消息",
  lede:
    "同行陪伴（Trip-sitting）研究、減害與社群培訓嘅最新動向——更新會喺呢度發布。",
  empty: "暫時未有文章。請稍後再睇研究摘要、培訓更新同平台消息。",
};

export function getNewsContent(locale: Locale): NewsContent {
  return locale === "zh-Hant" ? zhHant : en;
}
