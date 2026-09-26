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
    "Creative Integration is part of our core training framework, empowering Facilitators / Sitters to encourage artistic expression—turning every inner journey into a continuous source of creativity and resilience.",
    "Transform unspeakable experiences into light and shadow that connect us all. Share your creation.",
  ],
  shareCta: "Share a piece",
  signInCta: "Sign in to share",
};

const zhHant: IntegrationPageContent = {
  metaTitle: "創意整合",
  metaDescription:
    "將難以言喻的體驗轉化為創意表達——同行陪伴與減害旅程中的整合。",
  title: "創意整合",
  intro: [
    "喺同行陪伴同減害（Harm Reduction）嘅完整旅程中，體驗只係開端，整合（Integration）先係真正改變嘅開始。",
    "然而，好多人喺經歷深層嘅意識探索之後面臨「無法言說（Ineffability）」嘅困境——巨大嘅情緒、抽象嘅視覺幾何、對宇宙或自我嘅全新頓悟，往往很難用邏輯語言精準描述。創意整合（Creative Integration）將難以言喻嘅精神體驗同深層情緒轉化為藝術過程係溫柔而強大嘅介面，透過繪畫、自由書寫、音樂創作、直覺肢體流動或手作等，將潛意識符號同混亂情緒表達喺創作之中，令瞬間嘅靈感閃現轉化成日常生活嘅療癒養分。",
  ],
  features: [
    {
      heading: "潛意識具象符號化（Non-verbal Processing）",
      body: "打破常規對話治療嘅限制，透過色彩、線條、音符、陶藝或者曼陀羅，令非言語感官記憶同情緒流動自然浮現。",
    },
    {
      heading: "由混亂到秩序（Structuring the Experience）",
      body: "創作提供一個嘅安全載體（Safe Container）幫助將散落嘅體驗碎片重組，賦予個人專屬嘅意義。",
    },
    {
      heading: "落地於日常（Grounded Action）",
      body: "藝術作品成為體驗後嘅「實體錨點（Physical Anchor）」。每次感受自己嘅創作可以重新連結返體驗中所獲得嘅洞察，落實於日常生活之中。",
    },
  ],
  closing: [
    "我哋將「創意整合」納入培訓體系，鼓勵 Facilitator / Sitter 引導善用藝術令每一次內在探索轉化為創造力與復原力。",
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
