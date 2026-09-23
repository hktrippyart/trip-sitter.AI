import type { Locale } from "@/lib/i18n";
import type { PeerBasicsSlug } from "@/lib/training/progress";

const openingsEn: Record<PeerBasicsSlug, string> = {
  "module-1":
    "Module 1 — we'll start with why peer support is not clinical care. What do you already know about the sitter role?",
  "module-2":
    "Module 2 — trauma-attuned presence. First beat: what does a consent check-in sound like in one sentence?",
  "module-3":
    "Module 3 — set, setting, and harm-reduction framing (no dosing). What would you like to unpack first?",
  "module-4":
    "Module 4 — grounding and triage. Ready to walk through one yellow-zone scenario?",
  "module-5":
    "Module 5 — integration and handoffs. What would you want to offer someone the morning after a hard night?",
};

/** One small beat per opener — full module unfolds in chat. */
const openingsZh: Record<PeerBasicsSlug, string> = {
  "module-1":
    "Module 1 開始。同儕角色唔係臨床治療 — 你想先由邊個概念講起？",
  "module-2":
    "Module 2 開始。第一句「邀請式」同意確認可以點樣講？",
  "module-3":
    "Module 3 開始。減害角度下，set/setting 係咩 — 你想先問邊一部分？",
  "module-4":
    "Module 4 開始。試一個「黃色」現場情境 — 你會先做咩？",
  "module-5":
    "Module 5 開始。整合同事後照顧 — 「翌朝」你會同對方講咩？",
};

export const peerBasicsModuleTitleZh: Record<PeerBasicsSlug, string> = {
  "module-1": "倫理、安全基礎同義工自我照顧",
  "module-2": "創傷知情陪伴同同意",
  "module-3": "物質基礎同 set/setting",
  "module-4": "現場指南：落地、危機分流同紅旗",
  "module-5": "整合同交接",
};

export function getPeerBasicsModuleTitle(
  locale: Locale,
  slug: PeerBasicsSlug,
  titleEn: string,
): string {
  return locale === "zh-Hant" ? peerBasicsModuleTitleZh[slug] : titleEn;
}

export function getTrainingBasicsModuleOpening(
  locale: Locale,
  slug: PeerBasicsSlug,
): string {
  const map = locale === "zh-Hant" ? openingsZh : openingsEn;
  return map[slug];
}
