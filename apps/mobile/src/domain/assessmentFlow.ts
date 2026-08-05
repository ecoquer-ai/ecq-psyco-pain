import type { AssessmentAnswers, InstrumentId } from "@neuropi/shared";

/**
 * Core assessment order (shared clinical model).
 * CBT modules skipped when already completed in onboarding.
 * crisis_pap appended when PHQ-9 item 9 is positive.
 */
export const ASSESSMENT_MODULE_ORDER: InstrumentId[] = [
  "chilean_pain_screen",
  "iasp_mechanism",
  "nrs",
  "body_map",
  "lifestyle_pillars",
  "pharmacology_beliefs",
  "phq9",
  "pss10",
  "cbt_automatic_beliefs",
  "cbt_limiting_beliefs",
];

export const OPTIONAL_MODULES: InstrumentId[] = ["vas", "functional_interference"];

const CBT_MODULES: InstrumentId[] = [
  "cbt_automatic_beliefs",
  "cbt_limiting_beliefs",
];

function phq9Item9Positive(answers: AssessmentAnswers): boolean {
  const v = answers.phq9_9;
  return typeof v === "number" && v > 0;
}

/**
 * Build the effective queue for this user, honoring onboarding CBT completion
 * and conditional crisis pathway.
 */
export function buildAssessmentQueue(
  completed: InstrumentId[],
  answers: AssessmentAnswers = {},
  includeOptional = false,
): InstrumentId[] {
  let queue = [...ASSESSMENT_MODULE_ORDER];

  if (includeOptional) {
    const nrsIdx = queue.indexOf("nrs");
    if (nrsIdx >= 0 && !queue.includes("vas")) {
      queue.splice(nrsIdx + 1, 0, "vas");
    }
    const bodyIdx = queue.indexOf("body_map");
    if (bodyIdx >= 0 && !queue.includes("functional_interference")) {
      queue.splice(bodyIdx + 1, 0, "functional_interference");
    }
  }

  // Skip CBT if already done (e.g. onboarding)
  queue = queue.filter(
    (id) => !(CBT_MODULES.includes(id) && completed.includes(id)),
  );

  // crisis_pap immediately after PHQ-9 when item 9 positive (before PSS/CBT)
  if (phq9Item9Positive(answers) && !completed.includes("crisis_pap")) {
    if (!queue.includes("crisis_pap")) {
      const phqIdx = queue.indexOf("phq9");
      if (phqIdx >= 0) {
        queue.splice(phqIdx + 1, 0, "crisis_pap");
      } else {
        queue.unshift("crisis_pap");
      }
    }
  }

  return queue;
}

export function nextModuleId(
  completed: InstrumentId[],
  answers: AssessmentAnswers = {},
  includeOptional = false,
): InstrumentId | null {
  const queue = buildAssessmentQueue(completed, answers, includeOptional);
  return queue.find((id) => !completed.includes(id)) ?? null;
}

export function moduleProgress(
  completed: InstrumentId[],
  answers: AssessmentAnswers = {},
): number {
  const needCrisis = phq9Item9Positive(answers);
  const total = ASSESSMENT_MODULE_ORDER.length + (needCrisis ? 1 : 0);
  let done = ASSESSMENT_MODULE_ORDER.filter((id) =>
    completed.includes(id),
  ).length;
  if (needCrisis && completed.includes("crisis_pap")) done += 1;
  return total === 0 ? 0 : Math.min(done, total) / total;
}

/** Modules shown on the assessment picker. */
export function visibleAssessmentModules(
  completed: InstrumentId[],
  answers: AssessmentAnswers,
): InstrumentId[] {
  return buildAssessmentQueue(completed, answers, false);
}
