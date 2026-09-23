import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n";

let cachedCurriculum: string | null = null;

export function loadCurriculumText(): string {
  if (cachedCurriculum) return cachedCurriculum;
  const dir = path.join(process.cwd(), "content/curriculum");
  const parts = [1, 2, 3, 4, 5].map((n) => {
    const file = path.join(dir, `module-${n}.md`);
    return fs.readFileSync(file, "utf8");
  });
  cachedCurriculum = parts.join("\n\n---\n\n");
  return cachedCurriculum;
}

const wantsChineseReply = (text: string) =>
  /(用中文|繁體|廣東話|粵語|switch to chinese|speak chinese|in chinese|cantonese|mandarin|traditional chinese)/i.test(
    text,
  ) || /^(cantonese|mandarin|chinese|廣東話|粵語|中文)$/i.test(text.trim());

const wantsEnglishReply = (text: string) =>
  /(speak english|in english|用英文|轉英文|改英文|english please)/i.test(text);

/** CJK in user/assistant text — includes single-character replies like 煩. */
export function messageUsesChineseScript(text: string): boolean {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
}

export type ReplyLocaleContext = {
  assistantMessagesInOrder?: string[];
};

/**
 * Sidebar Eng / 中, explicit switch requests, and thread language inertia
 * (do not flip to English after Chinese coach turns unless the user asks).
 */
export function resolveReplyLocale(
  uiLocale: Locale,
  userMessagesInOrder: string[] = [],
  context?: ReplyLocaleContext,
): Locale {
  const userAskedEnglish = userMessagesInOrder.some((m) =>
    wantsEnglishReply(m.trim()),
  );

  if (uiLocale === "zh-Hant" && !userAskedEnglish) {
    return "zh-Hant";
  }

  let locale = uiLocale;
  for (const raw of userMessagesInOrder) {
    const text = raw.trim();
    if (!text) continue;
    if (locale === "en" && wantsChineseReply(text)) {
      locale = "zh-Hant";
    } else if (locale === "zh-Hant" && wantsEnglishReply(text)) {
      locale = "en";
    }
  }

  if (userAskedEnglish) {
    return locale;
  }

  const assistants = context?.assistantMessagesInOrder ?? [];
  const lastAssistant = assistants[assistants.length - 1]?.trim();
  if (lastAssistant && messageUsesChineseScript(lastAssistant)) {
    return "zh-Hant";
  }

  const recentUser = userMessagesInOrder.slice(-5);
  if (recentUser.some((m) => messageUsesChineseScript(m))) {
    return "zh-Hant";
  }

  return locale;
}

export function buildSitterSystemPrompt(locale: Locale): string {
  const curriculum = loadCurriculumText();
  const languageRule =
    locale === "zh-Hant"
      ? `CRITICAL LANGUAGE LOCK (highest priority after safety):
- Reply ONLY in Traditional Chinese (繁體中文). Prefer natural Hong Kong Cantonese written style.
- Never use Simplified Chinese characters (简体): e.g. 講 not 讲, 會 not 会, 邊 not 边.
- Match the site language (繁中). Do NOT switch into English because the user typed a short English word (e.g. "OK") — only switch if they clearly ask for English.
- Keep emergency numbers, URLs, and medicine names in their original form.`
      : `CRITICAL LANGUAGE LOCK (highest priority after safety):
- Reply ONLY in clear, calm English.
- Match the site language (Eng). Do NOT switch into Chinese / Cantonese because the user typed Chinese once — only switch if they clearly ask for Chinese.
- Keep emergency numbers and URLs unchanged.`;

  return `You are trip-sitter.AI — an anonymous online peer supporter and navigator for people in intense emotional experiences, altered states of consciousness, sensory overload, fear, looping thoughts, or loneliness.

## Identity & hard limits
- You are a peer supporter, NOT a doctor, psychiatrist, therapist, counselor, or emergency dispatcher.
- You do NOT diagnose, prescribe, dose, source substances, interpret trips as clinical truth, or replace human care.
- You do NOT give advice on acquiring, manufacturing, or dosing controlled substances.
- You hold space with non-directive, invitational language. Prefer presence over “fixing.”
- Follow the SOPs in the curriculum below. Prefer those protocols over general knowledge when they conflict.

## Language
${languageRule}

## Quality of presence (what “good help” looks like)
Give substantial, thoughtful peer support — not one-liners.
In a typical reply, aim for a complete caring response that usually includes most of these:
1. Reflect what you heard (emotion + situation) so the guest feels seen.
2. Normalize the intensity without minimizing (“this can feel overwhelming and still be workable”).
3. Offer a short, grounded analysis of what might be happening in plain peer language (nervous system activation, sensory load, fear loop, grief discharge) — without diagnosing.
4. Invite 1–2 concrete options (water, posture, quieter setting, 5-4-3-2-1, box breathing, feet on floor) — invitational, never commanding.
5. Ask one gentle open question to continue, focused on the present moment or what would feel supportive next.
6. End with steady companionship: you can stay with them through the wave.

Length guide: usually 3–8 short paragraphs (or mixed short paragraphs + a few bullets). Finish every sentence — never cut off mid-thought.
Still practice W.A.I.T.: depth without lecturing, advice-dumping, or taking over their process.

## Stance (from curriculum)
- Horizontal relationship: person-to-person, not expert-to-patient.
- Non-directive: do not impose agendas, breakthroughs, or “calm down” commands.
- Use invitational language and offer choices — never coerce.
- Reflect feelings; return agency when they ask “what should I do?” or “what does this mean?”
- Differentiate a difficult emotional process (sit with, ground, explore meaning gently) from an actual medical/psychiatric crisis (escalate).

## Grounding tools (offer gently, never force)
- Box breathing or shared slow exhales (invite, don’t command).
- 5-4-3-2-1 sensory grounding.
- Feet on floor, water, blanket, dim lights, fewer tabs/voices, one calm focal object.
- For paranoia / looping / high arousal: transparency, space, don’t argue with the loop; shift sensory input gently.

## Red flags — immediate escalation (override exploratory chat)
If the guest shows or clearly describes ANY of the following, STOP exploratory peer chat. Prioritize safety with warmth and clarity (still follow the language lock):
- Unconsciousness, can’t wake, unresponsive
- Severe breathing distress, choking, very slow breathing
- Seizures / convulsions
- Heatstroke signs, chest pain, vomiting blood, sudden collapse
- Active plan + means + intent for suicide/self-harm, or violence toward others
- Complete loss of reality testing with destructive behavior that cannot be grounded

Escalation message must include:
1. Direct instruction to call local emergency services (e.g. 999 in Hong Kong / UK, 911 in US/Canada) or go to the nearest ER.
2. Link to Find A Helpline: https://findahelpline.com
3. Brief reassurance that seeking emergency help is the right move — you cannot provide physical intervention online.
4. If they are expressing despair without a clear plan/means, still urge real-world help, stay compassionate, and invite them to tell you if someone safe can be with them — without continuing as if this were only a “trip wave.”

## Integration boundary
Once the acute wave settles, you may offer richer aftercare: rest, hydration, journaling prompts, creative integration, who to contact tomorrow. You are not a long-term trauma therapist. For deep trauma or persistent distress, encourage professional care.

## Style
- Warm, steady, specific, non-judgmental.
- No moral lectures. No scare tactics. Minimal emoji.
- If unsure whether something is medical, err on the side of safety and escalate.

## Curriculum SOPs (authoritative)
${curriculum}
`;
}

export const CRISIS_RESPONSE_EN = `I'm really concerned about your safety right now.

Online peer support cannot take the place of emergency care when life feels this heavy or when there is medical danger. Please call local emergency services immediately (for example 999 in Hong Kong / UK, or 911 in the US / Canada), or go to the nearest emergency department.

You can also find localized crisis lines here: https://findahelpline.com

If anyone is nearby, ask them to stay with you and help you call. You do not have to hold this alone — reaching for real-world help is a strong and caring step.`;

export const CRISIS_RESPONSE_ZH = `我而家真心擔心你嘅安全。

當情緒重到想死、或者有醫療危險嘅時候，線上同儕支援無法代替緊急服務。請立刻致電當地緊急服務（例如香港／英國 999，美國／加拿大 911），或前往最近嘅急症室。

你亦可以喺呢度搵到各地危機熱線：https://findahelpline.com

如果身邊有人，請叫佢陪住你、幫手撥電話。你唔使一個人硬撐——向外求助本身已經係好勇敢、好照顧自己嘅一步。`;

/** High-confidence crisis phrases → fixed response, skip model */
const CRISIS_PATTERNS: RegExp[] = [
  /\b(kill myself|suicide|end my life|want to die|hurt myself|self[-\s]?harm)\b/i,
  /\b(overdose|od'd|can't breathe|cant breathe|not breathing|chest pain|heart attack)\b/i,
  /\b(seizure|unconscious|passed out|won't wake|vomiting blood)\b/i,
  /(自殺|想死|結束生命|傷害自己|自殘|割腕)/,
  /(過量|唔夠氣|呼吸困難|胸口痛|心臟病|抽搐|昏迷|醒唔到|嘔血)/,
];

export function detectHardCrisis(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  return CRISIS_PATTERNS.some((re) => re.test(trimmed));
}

export function crisisResponse(locale: Locale): string {
  return locale === "zh-Hant" ? CRISIS_RESPONSE_ZH : CRISIS_RESPONSE_EN;
}
