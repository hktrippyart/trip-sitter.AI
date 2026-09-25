import type { Locale } from "@/lib/i18n";
import type { TrainingTrackSlug } from "@/lib/training/product-keys";

export type TrainingHubPageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lede: string;
};

export type TrainingTrackCardsCopy = {
  partLabel: (part: 1 | 2) => string;
  peerAiNote: string;
  tttAiNote: string;
  enterChat: string;
  signInHint: string;
  unlockAfterBasics: string;
  offering: Record<
    TrainingTrackSlug,
    { name: string; summary: string; priceDisplay: string }
  >;
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
    "Peer Support Basics and Train-the-trainer AI training chats.",
  title: "Online peer-support training",
  lede:
    "Pick a track and enter the AI training chat—built like our trip-sitter.AI peer coach, focused on teaching sitter skills. Educational only; not a clinical certification.",
};

const hubZh: TrainingHubPageContent = {
  metaTitle: "線上課程",
  metaDescription: "同儕支援基礎與培訓師培訓 AI 訓練對話。",
  title: "線上同儕支援培訓",
  lede:
    "選擇課程並進入 AI 訓練對話——風格同 trip-sitter.AI 同儕教練，專注陪行技能。僅供教育用途，並非臨床認證。",
};

const cardsEn: TrainingTrackCardsCopy = {
  partLabel: (part) => (part === 1 ? "Part 1" : "Part 2"),
  peerAiNote:
    "Interactive AI training chat—same style as trip-sitter.AI peer chat.",
  tttAiNote: "Event holding, team ops, and teaching volunteers.",
  enterChat: "Enter training chat",
  signInHint: "Sign in when prompted to save progress and unlock Part 2.",
  unlockAfterBasics: "Unlock after Peer Support Basics",
  offering: {
    "peer-basics": {
      name: "Peer Support Basics",
      summary:
        "Interactive AI training coach covering ethics, trauma-attuned care, substance basics, field triage, and integration—aligned with peer harm-reduction curriculum.",
      priceDisplay: "$20 USD / month",
    },
    "train-the-trainer": {
      name: "Train-the-trainer",
      summary:
        "Everything in Peer Support Basics plus an AI coach for event holding, team ops, and facilitation—training other volunteers to sit.",
      priceDisplay: "$35 USD / month",
    },
  },
};

const cardsZh: TrainingTrackCardsCopy = {
  partLabel: (part) => (part === 1 ? "第一部" : "第二部"),
  peerAiNote: "互動 AI 訓練對話——同 trip-sitter.AI 同儕聊天同一風格。",
  tttAiNote: "活動運作、團隊分工同教義工。",
  enterChat: "進入訓練對話",
  signInHint: "系統提示時請登入，以儲存進度並解鎖第二部。",
  unlockAfterBasics: "完成同儕支援基礎後解鎖",
  offering: {
    "peer-basics": {
      name: "同儕支援基礎",
      summary:
        "AI 訓練教練涵蓋倫理、創傷知情陪伴、物質基礎、現場分流同整合——對齊同儕減害課程。",
      priceDisplay: "USD $20／月",
    },
    "train-the-trainer": {
      name: "培訓師培訓",
      summary:
        "包含同儕支援基礎全部內容，另加活動運作、團隊協作同帶領義工嘅 AI 教練。",
      priceDisplay: "USD $35／月",
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
