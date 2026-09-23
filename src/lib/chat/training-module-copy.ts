import type { Locale } from "@/lib/i18n";
import { toTraditionalHant } from "@/lib/i18n/simplified-to-traditional";
import type { PeerBasicsSlug } from "@/lib/training/progress";

const openingsEn: Record<PeerBasicsSlug, string> = {
  "module-1": `Module 1 — Ethics, safety foundations & self-care. Welcome in.

You're not a therapist, a pharmacist, or someone's life coach with a saviour complex — you're a **peer**: a calm human beside them, not above them. Picture this: your friend is melting down on voice chat after a overwhelming night. Your job isn't to decode their soul — it's to help their nervous system feel less alone. Gold-star move: "I'm here with you. Want water, quiet, or just company?"

Another scene: a stranger at a chill-out tent says "I think I'm dying." You don't diagnose — you scan safety, co-regulate, and know when to call real-world help.

We'll unpack scope, boundaries, and keeping **you** regulated (because a fried sitter helps nobody). What do you already know about the peer role — or what makes you nervous about it?`,

  "module-2": `Module 2 — Trauma-attuned presence & consent. Hi again.

Trauma-informed doesn't mean treating everyone like a fragile egg — it means **not accidentally stepping on landmines**. Example: someone shares a hard childhood story mid-lesson. You don't rush to fix or ask for details; you notice, validate lightly, and ask what support would feel okay *right now*.

Try a consent line out loud: "Want to keep exploring this, or pause and ground?" That's peer magic — invitation, not interrogation.

We'll practice invitational language and staying non-directive (no "you should leave him" energy). What's one situation where you weren't sure if you had permission to keep asking questions?`,

  "module-3": `Module 3 — Substance basics & set/setting (harm reduction, **no dosing advice**).

Set = inner state (mood, fatigue, grief). Setting = room, people, noise, exits. Same substance, wildly different nights — like the same song hitting different at a funeral vs a birthday (weird example, but you get it).

Peer lane: help someone notice context and choices — not source, dose, or "this pill is fine." Example: "Sounds like the crowd and heat are stacking — want to step somewhere cooler with me?"

What part of set/setting confuses people most in your experience — or what would you like a clear example of?`,

  "module-4": `Module 4 — Field guide: grounding, triage & red flags.

Yellow zone: panic, looping, tears, overwhelm — stay, simplify, ground. Red zone: unresponsive, seizure, chest pain, clear danger — **emergency services**, not more peer poetry.

Mini-scene: guest says "my heart is racing and I can't breathe." You: calm voice, feet on floor, slow breath **with** them — and if it worsens or they faint, you escalate without guilt.

We'll walk one triage scenario together. Want to start with a festival-style overwhelm, or an online chat spiral?`,

  "module-5": `Module 5 — Integration, aftercare & handoffs.

The night ends; the nervous system doesn't always get the memo. Integration is the boring-brilliant stuff: sleep, food, gentle check-in, **no** forcing meaning on their experience.

Morning-after peer line: "How's your body today? No pressure to make sense of it — I'm still here if you want to talk."

We'll also cover when to encourage professional support and how to bow out with dignity. What would **you** want someone to say to you the day after a rough emotional wave?`,
};

/** 繁中開場：深度 + 例子；輕鬆友善、正經培訓語氣（繁體／廣東話書面）。 */
const openingsZh: Record<PeerBasicsSlug, string> = {
  "module-1": `Module 1 — 倫理、安全基礎同義工自我照顧。歡迎加入 Peer Support Basics。

你係 **同儕支援者**，唔係醫生、唔係治療師，亦都唔係「拯救所有人」嘅英雄。工作係企喺隔籬：陪伴、共調節、幫對方覺得安全，而唔係診斷或下指令。

場景一：朋友喺 voice chat 情緒好崩，你可以輕聲講：「我喺度。想飲水、定定神，定係有人陪就夠？」 — 簡單但好有用。

場景二：chill-out 帳篷有人好驚、驚到覺得自己會有危險。你唔做網絡醫生 — 你睇現場安全、陪呼吸、知幾時要叫 emergency。

跟住會逐段講 **範圍、邊界、同義工自我照顧**（自己先穩，先陪到人）。你對 sitter 角色已經有咩印象 — 或者邊部分你想先搞清楚？`,

  "module-2": `Module 2 — 創傷知情陪伴同同意。好開心你繼續留低。

Trauma-informed 即係：當人可能受過傷，我哋 **慢啲、問清楚、唔逼** — 唔係將人當玻璃，而係唔好亂踩敏感位。

例子：學員突然講起一段童年。你可以 reflect 一兩句，再問：「你想繼續傾呢 part，定係停一停、飲杯水？」 — 呢啲就係 **同意**。

我哋會練邀請式語句同非指令式陪伴。你有冇試過唔肯定自己仲可唔可以繼續問落去？`,

  "module-3": `Module 3 — 物質基礎同 set/setting（減害角度，**唔教劑量**）。

Set = 內在（心情、疲勞、壓力）。Setting = 外在（環境、人群、噪音、有冇安全出口）。同一晚可以好唔同，視乎身心同場地 — 呢個就係 peer 可以幫人「睇清楚」嘅位。

同儕可以傾 context、感受、減害 — 唔幫搵貨、唔教食幾多。例如：「聽落好焗，想唔想同我去靜少少嘅位？」

你想先由 set、定 setting、定係減害點樣同 peer 角色配合？`,

  "module-4": `Module 4 — 落地、危機分流同紅旗。

黃色 zone：好慌、loop、喊、 overwhelm — 通常可以留低、減刺激、做 grounding。紅色 zone：唔醒、抽搐、胸痛、明確生命危險 — **即刻 emergency**，唔再慢慢傾。

小場景：有人話心跳好快、透唔到氣。你保持聲線穩、腳貼地、一齊慢呼吸；如果惡化或暈，就升級求助 — 呢個係照顧，唔係失敗。

跟住一齊 walk 一個分流情境。你想由 festival 現場定 online chat 開始？`,

  "module-5": `Module 5 — 整合、事後照顧同交接。

經歷完一晚（或一場情緒大浪）之後，身體同心都需要 **慢慢落地** — 瞓、食、補充水分、輕輕 check-in 已經好重要。

整合唔係逼對方「悟出人生道理」，而係：而家安全嗎？明日有咩簡單支持？幾時值得建議專業協助？

翌朝一句可以係：「今日個身點？唔使整明白晒成晚 — 你想傾我仲喺度。」

如果你係當事人，第二日最想聽到咩？`,
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
  const text = map[slug];
  return locale === "zh-Hant" ? toTraditionalHant(text) : text;
}
