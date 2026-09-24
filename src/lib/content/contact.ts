import type { Locale } from "@/lib/i18n";

export type ContactContent = {
  title: string;
  lede: string;
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    titleLabel: string;
    titlePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    errorGeneric: string;
    errorUnavailable: string;
  };
};

const en: ContactContent = {
  title: "Get in touch",
  lede:
    "For partnerships, press or other comments — leave a message below.",
  form: {
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    titleLabel: "Subject",
    titlePlaceholder: "What is this about?",
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks — your message was received. We will reply to the email you provided.",
    errorGeneric: "Something went wrong. Please try again in a moment.",
    errorUnavailable:
      "The contact form is not available on this deployment yet. Please try again later.",
  },
};

const zhHant: ContactContent = {
  title: "聯絡我們",
  lede:
    "合作、傳媒或其他查詢——請喺下面留言。",
  form: {
    emailLabel: "你的電郵",
    emailPlaceholder: "you@example.com",
    titleLabel: "標題",
    titlePlaceholder: "查詢主題",
    messageLabel: "留言",
    messagePlaceholder: "想同我哋講咩？",
    submit: "送出留言",
    submitting: "傳送中…",
    success: "多謝——已收到你嘅留言，我哋會回覆到你提供嘅電郵。",
    errorGeneric: "未能送出，請稍後再試。",
    errorUnavailable: "此部署暫時未能使用聯絡表單，請稍後再試。",
  },
};

export function getContactContent(locale: Locale): ContactContent {
  return locale === "zh-Hant" ? zhHant : en;
}

export function getContactPageTitle(locale: Locale): string {
  return locale === "zh-Hant" ? "聯絡我們" : "Contact us";
}
