import type { Locale } from "@/lib/i18n";
import { toTraditionalHant } from "@/lib/i18n/simplified-to-traditional";

function tradUiCopy(copy: ChatUiCopy): ChatUiCopy {
  return {
    crisisStrip: toTraditionalHant(copy.crisisStrip),
    disclaimerTitle: toTraditionalHant(copy.disclaimerTitle),
    disclaimerBody: toTraditionalHant(copy.disclaimerBody),
    accept: toTraditionalHant(copy.accept),
    openingMessage: toTraditionalHant(copy.openingMessage),
    placeholder: toTraditionalHant(copy.placeholder),
    send: toTraditionalHant(copy.send),
    sending: toTraditionalHant(copy.sending),
    errorGeneric: toTraditionalHant(copy.errorGeneric),
    errorConfig: toTraditionalHant(copy.errorConfig),
    you: toTraditionalHant(copy.you),
    assistant: copy.assistant,
  };
}

function tradPartialCopy(patch: Partial<ChatUiCopy>): Partial<ChatUiCopy> {
  const out: Partial<ChatUiCopy> = {};
  for (const [key, value] of Object.entries(patch) as [keyof ChatUiCopy, string][]) {
    if (value !== undefined) {
      out[key] = key === "assistant" ? value : toTraditionalHant(value);
    }
  }
  return out;
}

export type ChatUiCopy = {
  crisisStrip: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  accept: string;
  /** First assistant message when chat opens */
  openingMessage: string;
  placeholder: string;
  send: string;
  sending: string;
  errorGeneric: string;
  errorConfig: string;
  you: string;
  assistant: string;
};

const en: ChatUiCopy = {
  crisisStrip:
    "If you or someone else is in immediate danger, call local emergency services now (e.g. 999 / 911).",
  disclaimerTitle: "Before we begin",
  disclaimerBody:
    "This is anonymous peer support — not medical care, therapy, or emergency services. I cannot diagnose, prescribe, or intervene physically. In a medical or self-harm emergency, call local emergency services or visit https://findahelpline.com. By continuing, you understand these limits.",
  accept: "I understand — continue",
  openingMessage:
    "Hi — I'm trip-sitter.AI. You're speaking with an AI peer supporter, not a human clinician. I'm here with you in this moment. What's happening for you right now?",
  placeholder: "Share what's coming up…",
  send: "Send",
  sending: "Sending…",
  errorGeneric: "Something went wrong. Please try again in a moment.",
  errorConfig:
    "Chat is temporarily unavailable (AI not configured). Please try again later.",
  you: "You",
  assistant: "trip-sitter.AI",
};

const zhHant: ChatUiCopy = {
  crisisStrip:
    "如你或他人正面臨即時危險，請立刻致電當地緊急服務（例如 999 / 911）。",
  disclaimerTitle: "開始之前",
  disclaimerBody:
    "呢度係匿名同儕支援——唔係醫療、心理治療或緊急服務。我唔可以診斷、開藥或提供實體介入。如遇醫療或自傷緊急情況，請致電當地緊急服務，或前往 https://findahelpline.com。繼續即表示你明白以上限制。",
  accept: "我明白 — 繼續",
  openingMessage:
    "你好，我係 trip-sitter.AI。你而家同 AI 做同儕支援傾偈，唔係真人醫護。我會陪住你。而家係咩情況？你想由邊度開始講？",
  placeholder: "寫下你而家嘅感受或情況…",
  send: "傳送",
  sending: "傳送中…",
  errorGeneric: "出咗啲問題，請稍後再試。",
  errorConfig: "對話暫時未能使用（AI 尚未設定）。請稍後再試。",
  you: "你",
  assistant: "trip-sitter.AI",
};

export function getChatCopy(locale: Locale): ChatUiCopy {
  return locale === "zh-Hant" ? tradUiCopy(zhHant) : en;
}

const trainingPeerEn: Partial<ChatUiCopy> = {
  openingMessage:
    "Welcome to Peer Support Basics. I'm your AI training coach. We'll move through ethics, trauma-attuned presence, triage, and integration—with scenarios and quick check-ins along the way. Would you like a quick orientation, or shall we start with Module 1?",
  placeholder: "Ask a question or try a scenario…",
  assistant: "Training coach · Basics",
  disclaimerBody:
    "This is AI-led educational training—not therapy, medical care, or a certification exam. In an emergency, call local emergency services or visit https://findahelpline.com. By continuing, you accept these limits.",
};

const trainingPeerZh: Partial<ChatUiCopy> = {
  openingMessage:
    "歡迎嚟同行者基礎技巧訓練。我係你嘅 AI 教練。我哋會用情境同小測驗，由倫理、陪伴、分流到整合逐步嚟。你想先要個簡介，定係直接由 Module 1 開始？",
  placeholder: "提問或者試吓情境…",
  assistant: "訓練教練 · 基礎",
  disclaimerBody:
    "呢度係 AI 教學訓練——唔係治療、醫療或正式認證考試。如遇緊急情況，請致電當地緊急服務或前往 https://findahelpline.com。繼續即表示你明白以上限制。",
};

const trainingTttEn: Partial<ChatUiCopy> = {
  openingMessage:
    "Welcome to Train-the-trainer. I'm your AI coach for event holding and teaching sitters—we'll work on zoning, team roles, briefings, drills, and after-actions. Are you preparing for a specific event, or building an ongoing volunteer program?",
  placeholder: "Describe your event or teaching challenge…",
  assistant: "Training coach · TTT",
  disclaimerBody:
    "This is AI-led facilitator training—not legal, medical, or licensing advice. In an emergency, call local emergency services. By continuing, you accept these limits.",
};

const trainingTttZh: Partial<ChatUiCopy> = {
  openingMessage:
    "歡迎嚟進階教練培訓。我係你嘅 AI 教練，專講活動運作同教義工——分區、團隊角色、簡報、演練同檢討。你係為緊某個活動定定係整緊長期義工培訓？",
  placeholder: "講吓你嘅活動或教學難題…",
  assistant: "訓練教練 · TTT",
  disclaimerBody:
    "呢度係 AI 帶領嘅培訓師訓練——唔係法律、醫療或牌照建議。如遇緊急情況，請致電當地緊急服務。繼續即表示你明白以上限制。",
};

export type TrainingPeerBasicsShellCopy = {
  backLink: string;
  trackLabel: string;
  nowModule: (order: number, title: string) => string;
  allDoneHint: string;
  goTrainTheTrainer: string;
  unlockTrainTheTrainer: string;
  loadingProgress: string;
  loadingIdle: string;
  errorLoadProgress: string;
  errorSaveProgress: string;
  pageTitleSuffix: string;
  continueToNextModule: (order: number, title: string) => string;
  continueFinishTrack: string;
};

const peerBasicsShellEn: TrainingPeerBasicsShellCopy = {
  backLink: "← Training",
  trackLabel: "Peer Support Basics",
  nowModule: (order, title) => `Now: Module ${order} — ${title}`,
  allDoneHint:
    "Peer Support Basics complete — continue in chat or open Train-the-trainer.",
  goTrainTheTrainer: "Go to Train-the-trainer",
  unlockTrainTheTrainer: "Unlock after Peer Support Basics",
  loadingProgress: "Loading your progress…",
  loadingIdle: "Loading…",
  errorLoadProgress: "Could not load progress.",
  errorSaveProgress: "Could not save progress.",
  pageTitleSuffix: "Training chat",
  continueToNextModule: (order, title) =>
    `Continue to Module ${order} — ${title}`,
  continueFinishTrack: "Finish Peer Support Basics",
};

const peerBasicsShellZh: TrainingPeerBasicsShellCopy = {
  backLink: "← 線上課程",
  trackLabel: "同行者基礎技巧",
  nowModule: (order, title) => `進行中：Module ${order} — ${title}`,
  allDoneHint:
    "同行者基礎技巧已完成 — 可以繼續傾計，或開始進階教練培訓。",
  goTrainTheTrainer: "前往進階教練培訓",
  unlockTrainTheTrainer: "完成同行者基礎技巧後解鎖",
  loadingProgress: "載入進度中…",
  loadingIdle: "載入中…",
  errorLoadProgress: "無法載入進度。",
  errorSaveProgress: "無法儲存進度。",
  pageTitleSuffix: "訓練對話",
  continueToNextModule: (order, title) =>
    `繼續 Module ${order} — ${title}`,
  continueFinishTrack: "完成同行者基礎技巧",
};

export function getTrainingPeerBasicsShellCopy(
  locale: Locale,
): TrainingPeerBasicsShellCopy {
  return locale === "zh-Hant" ? peerBasicsShellZh : peerBasicsShellEn;
}

export function getTrainingChatCopy(
  locale: Locale,
  track: "peer-basics" | "train-the-trainer",
): ChatUiCopy {
  const base = getChatCopy(locale);
  const patch =
    track === "peer-basics"
      ? locale === "zh-Hant"
        ? tradPartialCopy(trainingPeerZh)
        : trainingPeerEn
      : locale === "zh-Hant"
        ? tradPartialCopy(trainingTttZh)
        : trainingTttEn;
  return { ...base, ...patch };
}
