export type Locale = "en" | "zh-Hant";

export const LOCALE_COOKIE = "ts_locale";
export const defaultLocale: Locale = "en";

export type NavKey =
  | "about"
  | "home"
  | "training"
  | "news"
  | "integration"
  | "shop"
  | "resources"
  | "contact";

export type NavItem = {
  key: NavKey;
  href: string;
};

/** Full left-rail navigation, top to bottom */
export const sidebarNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "news", href: "/news" },
  { key: "home", href: "/" },
  { key: "training", href: "/training" },
  { key: "integration", href: "/integration" },
  { key: "shop", href: "/shop" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
];

type Dictionary = {
  nav: Record<NavKey, string>;
  signIn: string;
  signOut: string;
  homeEyebrow: string;
  homeTitleLine1: string;
  homeTitleLine2: string;
  homeLede: string;
  footerDisclaimer: string;
  footerBlurb: string;
};

const en: Dictionary = {
  nav: {
    about: "About Us",
    home: "trip-sitter.AI",
    training: "Online Courses",
    news: "News",
    integration: "Integration",
    shop: "Shop",
    resources: "Resources",
    contact: "Contact Us",
  },
  signIn: "Sign in",
  signOut: "Sign out",
  homeEyebrow: "trip-sitter.AI",
  homeTitleLine1: "Hold space.",
  homeTitleLine2: "Make meaning.",
  homeLede:
    "Skills for online trip-sitting, creative integration after the wave, and a small shop for harm-reduction tools.",
  footerDisclaimer:
    "If you or someone else is in immediate danger, contact local emergency services. We do not facilitate illegal activity.",
  footerBlurb:
    "Peer trip-sitting skills, creative integration, and harm-reduction pointers. Educational only — not medical, clinical, or legal advice.",
};

const zhHant: Dictionary = {
  nav: {
    about: "關於我們",
    home: "trip-sitter.AI",
    training: "線上課程",
    news: "最新消息",
    integration: "創意整合",
    shop: "商店",
    resources: "資源",
    contact: "聯絡我們",
  },
  signIn: "登入",
  signOut: "登出",
  homeEyebrow: "trip-sitter.AI",
  homeTitleLine1: "守住空間。",
  homeTitleLine2: "尋找意義。",
  homeLede:
    "線上陪行技能、旅程後的創意整合，以及小型減害工具商店。",
  footerDisclaimer:
    "如你或他人正面臨即時危險，請聯絡當地緊急服務。我們不協助任何違法活動。",
  footerBlurb:
    "同儕陪行技能、創意整合與減害資訊。僅供教育用途——非醫療、臨床或法律意見。",
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "zh-Hant": zhHant,
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "zh-Hant";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function htmlLang(locale: Locale): string {
  return locale === "zh-Hant" ? "zh-Hant" : "en";
}
