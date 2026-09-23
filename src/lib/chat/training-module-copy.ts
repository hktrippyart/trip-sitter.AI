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

/** 繁中開場：深度 + 例子 + 無厘頭（冷面、离谱但贴地），唔尷尬笑話。 */
const openingsZh: Record<PeerBasicsSlug, string> = {
  "module-1": `Module 1 — 倫理、安全基礎同義工自我照顧。入嚟先，唔使立正。

你唔係醫生 — 如果你係，你而家应该喺 hospital 写报告，唔会坐喺度同 AI 学 peer。你亦都唔係「拯救苍生」mode 嘅 life coach；你係 **同儕**：企喺隔篱，唔好企喺人头顶扮神灯。

场景一：朋友喺 voice chat 崩潰，成晚劲到似 drummer 附身。你要做嘅唔系解梦 — 系令佢个身同心觉得「唔系得我一个喺度喊」。可以好 plain 咁讲：「我喺度。要水、要静、定系有人陪就算？」

场景二： chill-out 帐篷有人话「我觉得自己会死」。你唔好变身网络诊断师 — 你睇安全、陪呼吸、知几时可以叫真·救兵。

跟住会讲 **范围、边界、同点样唔好烧干自己**（烧干咗就似无电嘅风筒，吹唔到任何人）。你对 sitter 呢个角色，已经信几成 — 定系边 part 仍然心虚？`,

  "module-2": `Module 2 — 创伤知情同同意。又返嚟啦，上次无被吓走就好。

Trauma-informed 唔系将人当易碎玻璃供 — 系 **唔好踩「前任话题」类地雷**，一踩成条 trail 变红。

例子：学员突然讲童年一段事。你唔好好似访问节目咁追问「咁后来点」；轻轻 reflect，再问：「你想继续呢 part，定系停一停、饮杯水？」

同意确认就好似问：「可唔可以继续剧透人生？」 — 唔得就要识收声，唔系盘问到大结局。

我哋会练邀请式说话。你有无试过倾到一半，唔知自己仲有冇「牌照」继续问？`,

  "module-3": `Module 3 — 物质基础同 set/setting（减害，**唔教剂量**，重复多次怕你不信）。

Set = 内心状态（心情、攰到似 zombie）。Setting = 环境（人群、噪音、有冇得走）。同一晚、同一物质，可以似 funeral 播《喜帖街》，亦可以似 birthday 播《喜帖街》 — 歌一样，成件事唔同（无厘头归无厘头，道理系咁）。

同儕做嘅系帮人睇 context — 唔系帮搵货、唔系教「食几粒好正」、唔系「呢粒好安全好似 vitamins」。可以讲：「听落 crowd 同热力叠埋，想唔想同我去阴凉啲、唔使同 bass 搏斗嘅位？」

set/setting 边样你最常被问到哑口 — 定想我先由边个例讲起？`,

  "module-4": `Module 4 — 落地、分流、红旗（呢课唔玩梗玩到尽，该正经就正经）。

黄色 zone： panic、loop、喊到似开 concert — 留低、减刺激、grounding。红色 zone：唔醒、抽搐、胸痛、明显危险 — **叫 emergency**，唔系继续 peer 金句 battle。

小场景：有人话「心跳好快、透唔到气」。你声线稳、脚贴地、一齐慢呼吸 — 如果晕或者恶化，升级求助，唔使内疚（你唔系消防，亦都唔系神仙）。

跟住 walk 一个分流情境。你想由 festival 式 meltdown 开始，定系 online chat 螺旋？`,

  "module-5": `Module 5 — 整合、事后照顾、交接。

夜完咗，个 nervous system 未必跟住收工 — 好似 party 散咗但个耳膜仲喺度震。

整合就系好 mundane 但有用：瞓、食、轻轻 check-in — **唔** 逼佢为成晚赋予宇宙意义（唔系每段经历都要变 TED talk）。

翌朝可以好 plain：「今日个身点？唔使整明白晒 — 你想倾我仲喺度。」

仲会讲几时可以建议专业协助、点样有 dignity 地退场。如果你系当事人，大浪过后第二日最想听到咩 — 一句就得？`,
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
