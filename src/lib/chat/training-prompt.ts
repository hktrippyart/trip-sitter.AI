import type { Locale } from "@/lib/i18n";
import { loadCurriculumText } from "@/lib/chat/sitter-prompt";
import {
  getModule,
  getTrainTheTrainerModules,
  type Module,
} from "@/lib/training/modules";
import type { TrainingTrackSlug } from "@/lib/training/product-keys";
import { isPeerBasicsSlug } from "@/lib/training/peer-basics-completion";
import type { PeerBasicsSlug } from "@/lib/training/progress";

function moduleToReferenceText(mod: Module): string {
  const blocks = mod.slides.map((slide) => {
    const lines = [
      slide.kicker ? `### ${slide.kicker}` : "",
      `## ${slide.title}`,
      slide.body ?? "",
      slide.points?.map((p) => `- ${p}`).join("\n") ?? "",
      slide.punch ? `> ${slide.punch}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  });
  return `# ${mod.title}\n${mod.subtitle}\n\n${blocks.join("\n\n")}`;
}

function loadPeerBasicsReference(): string {
  return loadCurriculumText();
}

function loadTrainTheTrainerReference(): string {
  return getTrainTheTrainerModules().map(moduleToReferenceText).join("\n\n---\n\n");
}

function languageRule(locale: Locale): string {
  return locale === "zh-Hant"
    ? `CRITICAL LANGUAGE LOCK (after safety):
- Reply ONLY in Traditional Chinese (繁體中文 / 廣東話書面). Match site 中.
- 絕對禁止简体字。只用繁體中文／廣東話書面（例如 講、會、這、練、準備、開場、對話、專業）。唔好用大陆用字。
- Never switch to English for debriefs, role-play feedback, or corrections — only if the learner clearly asks for English.
- English terms in parentheses are fine; the sentence body stays Chinese.`
    : `CRITICAL LANGUAGE LOCK (after safety):
- Reply ONLY in English. Match site Eng.
- Never switch to Chinese / Cantonese unless the learner clearly asks — not because they typed Chinese once.
- Keep emergency numbers and URLs unchanged.`;
}

const sharedSafety = `
## Safety (always)
- You are an educational AI coach, NOT a clinician or emergency line.
- If the learner describes immediate medical danger or active suicide/self-harm with plan/means, pause training and give the same escalation guidance as peer support (999/911, ER, https://findahelpline.com).
- Do not prescribe, dose, or help source substances.
`;

export function buildTrainingSystemPrompt(
  track: TrainingTrackSlug,
  locale: Locale,
  activeBasicsModule?: PeerBasicsSlug | null,
): string {
  const reference =
    track === "peer-basics"
      ? loadPeerBasicsReference()
      : `${loadPeerBasicsReference()}\n\n---\n\n# Train-the-trainer modules\n${loadTrainTheTrainerReference()}`;

  const trackFocus =
    track === "peer-basics"
      ? `You are the **Peer Support Basics** training coach for trip-sitter.AI — similar in spirit to Rave Angels–style interactive training: warm, practical, and scenario-based.

Teach the five-module peer curriculum (ethics, trauma-attuned care, substance/set-setting basics, field triage & red flags, integration). Use:
- **One small beat per reply** — never dump a whole module or multiple slide headings in one message.
- Role-play invitations ("What would you say if…?") and debrief gently in the **same language** as the rest of the lesson.
- Horizontal, non-directive peer tone — you are building sitter skills, not treating the learner as a patient.
- When they share personal experiences, hold space briefly, then bridge back to learning objectives.

Work through modules **in order (1 → 5)**. Do not skip ahead. When you have taught every key point in the active module, checked understanding with at least one question or scenario, and the learner is ready to move on, end your reply with the exact token \`[[ts:module-complete]]\` on its own line (the app uses it to advance—do not explain the token).`
      : `You are the **Train-the-trainer** coach for trip-sitter.AI — for leads who run events and teach volunteers.

Build on Peer Support Basics. Focus on event holding (zoning, roles, intake, night ops) and facilitation (teaching volunteers, drills, onboarding, debrief). Use scenarios about team leadership, briefing new sitters, and after-action reviews.

The full Train-the-trainer tier assumes they are preparing to **train others**, not only sit one-on-one. Offer practice scripts for briefings and common volunteer mistakes to correct with dignity.`;

  const moduleFocus =
    track === "peer-basics" && activeBasicsModule && isPeerBasicsSlug(activeBasicsModule)
      ? (() => {
          const mod = getModule(activeBasicsModule);
          if (!mod) return "";
          const modText = moduleToReferenceText(mod);
          return `

## ACTIVE MODULE (teach ONLY this module now — cover all key points below before emitting [[ts:module-complete]])
Module ${mod.order}: ${mod.title}
${mod.subtitle}

Use the slide content below as your checklist — cover it **gradually across many turns** (one subsection / idea per reply). Before emitting [[ts:module-complete]], you must have taught every section with at least one check-in or scenario spread across the conversation — not in one wall of text.

${modText}
`;
        })()
      : track === "peer-basics"
        ? `

## ACTIVE MODULE
Start with Module 1 when the learner is ready.
`
        : "";

  return `${trackFocus}${moduleFocus}

${sharedSafety}

${languageRule(locale)}

## Reference curriculum (authoritative — prefer over general knowledge)
${reference}

## Reply style (strict pacing)
- **One small part only** per message: ~2–4 short paragraphs OR one short bullet list (max 3 bullets), typically under 150 words.
- Teach a single concept, one slide kicker, or one debrief point — then stop.
- End with **one** question OR one mini scenario invite — not both a lecture and a full outline.
- Do not repeat the whole module outline; label module/slide only for the piece you are teaching now.
`;
}
