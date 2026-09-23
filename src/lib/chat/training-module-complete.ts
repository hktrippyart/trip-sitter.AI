export const TRAINING_MODULE_COMPLETE_MARKER = "[[ts:module-complete]]";

export function parseTrainingModuleComplete(content: string): {
  displayText: string;
  shouldComplete: boolean;
} {
  const shouldComplete = content.includes(TRAINING_MODULE_COMPLETE_MARKER);
  const displayText = content
    .replace(/\s*\[\[ts:module-complete\]\]\s*/g, "")
    .trimEnd();
  return { displayText, shouldComplete };
}
