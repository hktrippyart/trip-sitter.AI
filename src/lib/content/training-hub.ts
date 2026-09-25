import type { Locale } from "@/lib/i18n";
import type { TrainingTrackSlug } from "@/lib/training/product-keys";

export type TrainingHubFeature = {
  title: string;
  body: string;
};

export type TrainingHubPageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lede: string;
  featuresHeading: string;
  features: TrainingHubFeature[];
};

export type TrainingTrackCardsCopy = {
  partLabel: (part: 1 | 2) => string;
  enterChat: string;
  unlockAfterBasics: string;
  offering: Record<TrainingTrackSlug, { name: string; summary: string }>;
};

export type TrainingTttShellCopy = {
  backLink: string;
  trackLabel: string;
  pageTitleSuffix: string;
};

export type TrainingSuccessContent = {
  metaTitle: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const hubEn: TrainingHubPageContent = {
  metaTitle: "Online Courses",
  metaDescription:
    "AI-driven interactive training for facilitators and peer sitters—Peer Support Basics and Train-the-trainer.",
  title: "AI-Driven Interactive Training",
  lede:
    "A standardized training curriculum designed for Facilitators and Peer Sitters. Powered by AI, you can ask questions anytime and practice within a simulated environment—turning every learning session into a warm, engaging, and interactive experience.",
  featuresHeading: "Key Features",
  features: [
    {
      title: "Standardized Training Content",
      body: "Benchmarked against international training standards, the curriculum systematically covers core skills in safety protocols, situational de-escalation, psychological support for harm reduction.",
    },
    {
      title: "24/7 Intelligent AI Q&A",
      body: "With an AI mentor on standby, you can ask questions at any time and receive detailed, targeted answers for a truly learner-centric and flexible experience. Through scenario simulations, case studies, and interactive dialogues, you can complete extensive hands-on practice before encountering complex real-world situations.",
    },
    {
      title: "Learn at Your Own Pace",
      body: "Designed with a progressive two-tier training framework, our curriculum includes Peer Support Basics and Train-the-trainer courses—with practical skills for setting up functional harm-reduction stations at large-scale events.",
    },
  ],
};

const hubZh: TrainingHubPageContent = {
  metaTitle: "線上課程",
  metaDescription:
    "為 Facilitator／Sitter 同行者而設嘅 AI 互動式標準培訓課程。",
  title: "AI 互動式培訓",
  lede:
    "為 Facilitator／Sitter「同行者」而設嘅標準培訓課程，具有 AI 雙向對答系統，唔使被動接收資訊；你可以喺模擬環境中隨時發問、即時演練，令每一次學習成為有溫度嘅互動體驗。",
  featuresHeading: "核心特色",
  features: [
    {
      title: "嚴謹標準化內容",
      body: "課程內容參照國際培訓標準，系統化涵蓋安全導航、情境應變、心理支援與減害（Harm Reduction）核心技巧。",
    },
    {
      title: "AI 智能即時對答",
      body: "AI 導師隨候命，你可以隨時提出任何疑惑，獲取針對性嘅詳細解答，實現真正「以學員為中心」嘅彈性學習。透過情境模擬、案例分析與模擬對話，令你喺實際遇到複雜狀況前進行多次實操演練。",
    },
    {
      title: "自主掌握學習節奏",
      body: "課程採取階梯式培訓體系設計，無論你想掌握基礎陪伴心法，定係希望成為培訓者籌劃大型活動減害站點，都可以獲取完整嘅實務指南。",
    },
  ],
};

const cardsEn: TrainingTrackCardsCopy = {
  partLabel: (part) => (part === 1 ? "Part 1" : "Part 2"),
  enterChat: "Enter training chat",
  unlockAfterBasics: "Unlock after Peer Support Basics",
  offering: {
    "peer-basics": {
      name: "Peer Support Basics",
      summary:
        "Interactive AI training coach covering ethics, trauma-attuned care, substance basics, field triage, and integration—aligned with peer harm-reduction curriculum.",
    },
    "train-the-trainer": {
      name: "Train-the-trainer",
      summary:
        "Everything in Peer Support Basics plus an AI coach for event holding, team ops, and facilitation—training other volunteers to sit.",
    },
  },
};

const cardsZh: TrainingTrackCardsCopy = {
  partLabel: (part) => (part === 1 ? "第一部份" : "第二部份"),
  enterChat: "進入訓練對話",
  unlockAfterBasics: "完成同儕支援基礎後解鎖",
  offering: {
    "peer-basics": {
      name: "同儕支援基礎",
      summary:
        "AI 訓練教練涵蓋倫理、創傷知情陪伴、物質基礎、現場分流同整合——對齊同儕減害課程。",
    },
    "train-the-trainer": {
      name: "培訓師培訓",
      summary:
        "包含同儕支援基礎全部內容，另加活動運作、團隊協作同帶領義工嘅 AI 教練。",
    },
  },
};

const tttShellEn: TrainingTttShellCopy = {
  backLink: "← Training",
  trackLabel: "Train-the-trainer",
  pageTitleSuffix: "Training chat",
};

const tttShellZh: TrainingTttShellCopy = {
  backLink: "← 線上課程",
  trackLabel: "培訓師培訓",
  pageTitleSuffix: "訓練對話",
};

const successEn: TrainingSuccessContent = {
  metaTitle: "Subscription started",
  eyebrow: "Thank you",
  title: "You’re subscribed",
  body:
    "If checkout completed, your training access should unlock within a few seconds via Stripe webhook. Then open your track and enter the training chat.",
  cta: "Go to training",
};

const successZh: TrainingSuccessContent = {
  metaTitle: "訂閱已開始",
  eyebrow: "多謝",
  title: "你已成功訂閱",
  body:
    "若付款已完成，Stripe 會喺幾秒內解鎖課程。之後選擇課程並進入訓練對話即可。",
  cta: "前往線上課程",
};

export function getTrainingHubPageContent(locale: Locale): TrainingHubPageContent {
  return locale === "zh-Hant" ? hubZh : hubEn;
}

export function getTrainingTrackCardsCopy(locale: Locale): TrainingTrackCardsCopy {
  return locale === "zh-Hant" ? cardsZh : cardsEn;
}

export function getTrainingTttShellCopy(locale: Locale): TrainingTttShellCopy {
  return locale === "zh-Hant" ? tttShellZh : tttShellEn;
}

export function getTrainingSuccessContent(locale: Locale): TrainingSuccessContent {
  return locale === "zh-Hant" ? successZh : successEn;
}
