import type { Locale } from "@/lib/i18n";

export type IntegrationFeature = {
  heading: string;
  body: string;
};

export type IntegrationPageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string[];
  features: IntegrationFeature[];
  closing: string[];
  shareCta: string;
  signInCta: string;
};

const en: IntegrationPageContent = {
  metaTitle: "Creative Integration",
  metaDescription:
    "Transform unspeakable experiences into creative expression—peer integration and harm reduction after the journey.",
  title: "Creative Integration",
  intro: [
    "In the complete journey of peer companionship and harm reduction, the experience is merely the beginning—integration is where true transformation takes root.",
    "However, many individuals face the hurdle of ineffability after profound journeys of consciousness exploration. Intense emotions, abstract visual geometry, or sudden epiphanies about the universe and self are often impossible to capture using logical language alone. Creative Integration serves as a gentle yet powerful interface to transform unspeakable spiritual experiences and deep emotions into artistic form. Through painting, free writing, music composition, intuitive movement, or handicrafts, subconscious symbols and chaotic emotions find expression—turning fleeting sparks of insight into long-term nourishment for daily healing.",
  ],
  features: [
    {
      heading: "Non-verbal Processing",
      body: "Breaking through the boundaries of conventional talk therapy, elements like color, line, musical notes, ceramics, or mandalas allow non-verbal sensory memories and emotional flows to surface naturally.",
    },
    {
      heading: "Structuring the Experience",
      body: "Creative expression provides a tangible safe container, helping individuals reassemble fragmented memories of their journey infused with personal meaning.",
    },
    {
      heading: "Grounded Action",
      body: "The artwork becomes a physical anchor following the experience. Every view or touch reconnects them to the insights gained—translating them into lasting changes in daily life.",
    },
  ],
  closing: [
    "Creative Integration is part of our core training framework, empowering Facilitators / Sitters to encourage artistic expression—turning every inner journey into a continuous source of life creativity and resilience.",
    "Transform unspeakable experiences into light and shadow that connect us all. Share your creation.",
  ],
  shareCta: "Share a piece",
  signInCta: "Sign in to share",
};

const zhHant: IntegrationPageContent = {
  metaTitle: "創意整合",
  metaDescription:
    "將難以言喻的體驗轉化為創意表達——同行陪伴與減害旅程中的整合。",
  title: "創意整合（Creative Integration）",
  intro: [
    "在同行陪伴與減害（Harm Reduction）的完整旅程中，「體驗」只是開端，「整合（Integration）」才是真正改變的開始。",
    "然而，好多人喺經歷深層嘅意識探索之後面臨「無法言說（Ineffability）」嘅困境——巨大嘅情緒、抽象嘅視覺幾何、對宇宙或自我嘅全新頓悟，往往很難用邏輯語言精準描述。創意整合（Creative Integration）將難以言喻嘅精神體驗同深層情緒轉化為藝術嘅過程係溫柔且強大的介面，透過繪畫、自由書寫、音樂創作、直覺肢體流動或手作等，將潛意識符號同混亂情緒表達喺創作之中，令瞬間嘅靈感閃現轉化成日常生活嘅療癒養分。",
  ],
  features: [
    {
      heading: "潛意識的符號化（Non-verbal Processing）",
      body: "打破常規對話治療的限制，透過色彩、線條、音符、陶藝或曼陀羅，讓非言語的感官記憶與情緒流動自然浮現。",
    },
    {
      heading: "從混亂到秩序（Structuring the Experience）",
      body: "創作提供了一個具體的安全容器（Safe Container），幫助個案將散落的體驗片段重組，賦予其個人專屬的意義。",
    },
    {
      heading: "落地於日常（Grounded Action）",
      body: "藝術作品成為體驗後的「實體錨點（Physical Anchor）」。每次看見或觸摸自己的創作，就能重新連結體驗中所獲得的勇氣、平靜與洞察，並將其落實於日常行為與關係的改變中。",
    },
  ],
  closing: [
    "我哋將「創意整合」納入培訓體系，鼓勵 Facilitator / Sitter 引導求助者善用藝術令每一次的內在探索轉化為生命中綿延不絕的創造力與復原力。",
    "將難以言喻嘅體驗，成為彼此連結嘅光與影，分享你嘅作品。",
  ],
  shareCta: "分享作品",
  signInCta: "登入以分享",
};

export function getIntegrationPageContent(
  locale: Locale,
): IntegrationPageContent {
  return locale === "zh-Hant" ? zhHant : en;
}
