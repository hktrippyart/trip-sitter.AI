import type { PeerBasicsSlug } from "@/lib/training/progress";

export const TRAINING_MODULE_COMPLETE_MARKER = "[[ts:module-complete]]";

const MARKER_ALIASES = [
  TRAINING_MODULE_COMPLETE_MARKER,
  "[[module-complete]]",
  "[ts:module-complete]",
  "【ts:module-complete】",
];

function includesCompletionMarker(content: string): boolean {
  return MARKER_ALIASES.some((m) => content.includes(m));
}

const ZH_MODULE_NUM: Record<PeerBasicsSlug, string> = {
  "module-1": "一",
  "module-2": "二",
  "module-3": "三",
  "module-4": "四",
  "module-5": "五",
};

/** Fallback when the model declares completion in prose but omits the token. */
export function inferTrainingModuleComplete(
  content: string,
  activeModule: PeerBasicsSlug | null | undefined,
): boolean {
  if (!activeModule || !content.trim()) return false;

  const modNum = activeModule.replace("module-", "");
  const zh = ZH_MODULE_NUM[activeModule];

  const en = [
    new RegExp(
      `successfully completed[^\\n]{0,160}module\\s*${modNum}\\b`,
      "i",
    ),
    new RegExp(
      `module\\s*${modNum}[^\\n]{0,120}\\b(officially )?(complete|completed|finished)\\b`,
      "i",
    ),
    new RegExp(`\\ball (key )?(training|content)[^\\n]{0,80}module\\s*${modNum}\\b`, "i"),
  ];

  const zhPatterns = [
    new RegExp(`模組?${zh}[^\\n]{0,100}(訓練)?(正式)?完成`),
    new RegExp(`(順利|成功)完成[^\\n]{0,80}模組?${zh}`),
    new RegExp(`完成[^\\n]{0,50}模組?${zh}[^\\n]{0,50}(所有|全部|核心)`),
  ];

  return [...en, ...zhPatterns].some((r) => r.test(content));
}

export function parseTrainingModuleComplete(
  content: string,
  activeModule?: PeerBasicsSlug | null,
): {
  displayText: string;
  shouldComplete: boolean;
} {
  let displayText = content;
  for (const marker of MARKER_ALIASES) {
    displayText = displayText.replace(
      new RegExp(`\\s*${escapeRegExp(marker)}\\s*`, "g"),
      "",
    );
  }
  displayText = displayText.trimEnd();

  const shouldComplete =
    includesCompletionMarker(content) ||
    inferTrainingModuleComplete(content, activeModule);

  return { displayText, shouldComplete };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
