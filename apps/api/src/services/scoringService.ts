import {
  buildRiskProtectionProfile,
  resolveProbableProfiles,
  type AssessmentAnswers,
  type ProbableProfile,
  type RiskProtectionProfile,
} from "@neuropi/shared";

export interface ScoredAssessmentResult {
  riskProfile: RiskProtectionProfile;
  profiles: ProbableProfile[];
}

/**
 * Wraps shared scoring + profile resolution.
 * Clinical posture: orientation only — never definitive diagnosis.
 */
export function scoreAssessmentAnswers(
  answers: AssessmentAnswers,
): ScoredAssessmentResult {
  const riskProfile = buildRiskProtectionProfile(answers);
  const profiles = resolveProbableProfiles(riskProfile);
  return { riskProfile, profiles };
}

export function summarizeScoresForClient(result: ScoredAssessmentResult) {
  const { riskProfile, profiles } = result;
  return {
    summaryEs: riskProfile.summaryEs,
    summaryEn: riskProfile.summaryEn,
    scores: riskProfile.scores,
    probableProfileIds: riskProfile.probableProfileIds,
    protectiveFactorIds: riskProfile.protectiveFactorIds,
    riskFactorIds: riskProfile.riskFactorIds,
    recommendations: riskProfile.recommendations,
    redFlagTriggered: riskProfile.redFlagTriggered,
    crisisSignal: riskProfile.crisisSignal,
    profiles,
    disclaimerEs:
      "Este resultado es de tamizaje y orientación. No constituye un diagnóstico clínico. Consulta a un profesional de la salud para evaluación.",
  };
}
