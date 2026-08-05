import { describe, expect, it } from "vitest";
import {
  buildRiskProtectionProfile,
  scoreIaspMechanism,
  scorePainChronicity,
  scorePHQ9,
  scorePSS10,
} from "./scoring";
import { INSTRUMENTS } from "./instruments";
import { SAFETY_COPY } from "../copy/safety";

describe("scorePHQ9", () => {
  it("scores minimal band for all zeros", () => {
    const answers = Object.fromEntries(
      Array.from({ length: 9 }, (_, i) => [`phq9_${i + 1}`, 0]),
    );
    const result = scorePHQ9(answers);
    expect(result.rawScore).toBe(0);
    expect(result.band.id).toBe("minimal");
    expect(result.band.labelEs.toLowerCase()).not.toContain("usted tiene depresión");
    expect(result.flags?.phq9Item9Positive).toBe(false);
  });

  it("uses prudent language for moderate scores", () => {
    const answers = Object.fromEntries(
      Array.from({ length: 9 }, (_, i) => [`phq9_${i + 1}`, i < 5 ? 2 : 1]),
    );
    const result = scorePHQ9(answers);
    expect(result.rawScore).toBeGreaterThanOrEqual(10);
    expect(result.rawScore).toBeLessThanOrEqual(14);
    expect(result.band.id).toBe("moderate");
    expect(result.band.labelEs).toMatch(/vale la pena evaluar/i);
    expect(result.band.guidanceEs.toLowerCase()).not.toContain("tiene depresión");
  });

  it("flags item 9 when positive and activates crisis in profile", () => {
    const answers = Object.fromEntries(
      Array.from({ length: 9 }, (_, i) => [`phq9_${i + 1}`, i === 8 ? 2 : 0]),
    );
    const result = scorePHQ9(answers);
    expect(result.flags?.phq9Item9Positive).toBe(true);

    const profile = buildRiskProtectionProfile(answers);
    expect(profile.crisisSignal).toBe(true);
    expect(profile.recommendations.some((r) => r.priority === "crisis")).toBe(true);
    expect(profile.recommendations.some((r) => r.id === "crisis_pap_support")).toBe(true);
    const crisisBody = profile.recommendations.find((r) => r.id === "crisis_pap_support")?.bodyEs ?? "";
    expect(crisisBody).toMatch(/600 360 7777/);
    expect(crisisBody).toMatch(/131/);
    expect(crisisBody.toLowerCase()).toMatch(/pap/);
  });
});

describe("instrument policy — GAD-7 removed", () => {
  it("does not expose gad7 as a core instrument", () => {
    expect("gad7" in INSTRUMENTS).toBe(false);
    expect(Object.keys(INSTRUMENTS)).not.toContain("gad7");
    expect(Object.keys(INSTRUMENTS)).not.toContain("itq_conditional");
  });
});

describe("scorePSS10", () => {
  it("reverse-scores items 4, 5, 7, and 8", () => {
    const answers: Record<string, number> = {};
    for (let i = 1; i <= 10; i += 1) {
      answers[`pss10_${i}`] = 0;
    }
    const result = scorePSS10(answers);
    expect(result.rawScore).toBe(16);
    expect(result.band.id).toBe("elevated");
  });

  it("scores low stress when reverse items are high and direct are low", () => {
    const answers: Record<string, number> = {};
    for (let i = 1; i <= 10; i += 1) {
      const id = `pss10_${i}`;
      answers[id] = [4, 5, 7, 8].includes(i) ? 4 : 0;
    }
    const result = scorePSS10(answers);
    expect(result.rawScore).toBe(0);
    expect(result.band.id).toBe("low");
  });
});

describe("scorePainChronicity", () => {
  it("marks compatible when duration > 3 months", () => {
    const result = scorePainChronicity({
      cps_duration: "yes_over_3m",
      cps_frequency: "daily",
      cps_intensity: 7,
    });
    expect(result.band.id).toBe("compatible");
    expect(result.band.labelEs.toLowerCase()).toContain("compatible");
    expect(result.band.guidanceEs.toLowerCase()).not.toContain("diagnóstico definitivo de");
  });

  it("marks not_compatible when no pain", () => {
    const result = scorePainChronicity({ cps_duration: "no" });
    expect(result.band.id).toBe("not_compatible");
  });
});

describe("scoreIaspMechanism", () => {
  it("uses compatible-pattern language, never diagnostic “tienes dolor nociplástico”", () => {
    const result = scoreIaspMechanism({
      iasp_temporal: "chronic",
      iasp_clear_injury: 1,
      iasp_nerve_quality: 1,
      iasp_widespread_sensitized: 4,
      iasp_mixed_features: 1,
    });
    expect(result.flags?.iaspMechanismHint).toBe("nociplastic_leaning");
    expect(result.flags?.iaspTemporalHint).toBe("chronic");
    expect(result.band.guidanceEs.toLowerCase()).toContain("sugieren un patrón compatible");
    expect(result.band.guidanceEs.toLowerCase()).toContain("no un diagnóstico");
    expect(result.band.guidanceEs.toLowerCase()).not.toMatch(/\btienes dolor nocipl[aá]stico\b/);
    expect(result.band.guidanceEs.toLowerCase()).toMatch(/coexist/);
  });

  it("marks mixed when multiple high features", () => {
    const result = scoreIaspMechanism({
      iasp_temporal: "recurrent",
      iasp_clear_injury: 4,
      iasp_nerve_quality: 4,
      iasp_widespread_sensitized: 2,
      iasp_mixed_features: 3,
    });
    expect(result.flags?.iaspMechanismHint).toBe("mixed_leaning");
    expect(result.flags?.iaspTemporalHint).toBe("recurrent");
  });
});

describe("buildRiskProtectionProfile", () => {
  it("emits depressive_symptoms_relevant and chronicity without GAD-7 anxiety profile", () => {
    const answers: Record<string, number | string> = {
      cps_duration: "yes_over_3m",
      cps_frequency: "daily",
      cps_intensity: 6,
      cps_edu_chronic_disease: "no_new",
      cps_edu_psychotherapy: "no_new",
      cps_specialist: "no_followup",
    };
    for (let i = 1; i <= 8; i += 1) answers[`phq9_${i}`] = 2;
    answers.phq9_9 = 0;
    for (let i = 1; i <= 10; i += 1) answers[`pss10_${i}`] = 3;

    const profile = buildRiskProtectionProfile(answers);
    expect(profile.probableProfileIds).toContain("persistent_pain_compatible");
    expect(profile.probableProfileIds).toContain("depressive_symptoms_relevant");
    expect(profile.probableProfileIds).toContain("elevated_stress");
    expect(profile.probableProfileIds).toContain("low_pain_understanding");
    expect(profile.probableProfileIds).toContain("low_specialist_continuity");
    expect(profile.probableProfileIds).not.toContain("anxiety_predominant");
    expect(profile.probableProfileIds).not.toContain("possible_trauma_component");
    expect(profile.scores).not.toHaveProperty("gad7");
    expect(profile.summaryEs.toLowerCase()).not.toContain("usted tiene depresión");
    expect(profile.crisisSignal).toBe(false);
  });

  it("does not add trauma ITQ profiles (removed from core)", () => {
    const profile = buildRiskProtectionProfile({
      cps_duration: "yes_over_3m",
      itq_gate: "yes",
      itq_reexperiencing: 3,
      itq_avoidance: 2,
      itq_sense_threat: 2,
    });
    expect(profile.probableProfileIds).not.toContain("possible_trauma_component");
    expect(profile.scores).not.toHaveProperty("itqConditional");
  });

  it("sets crisisSignal when red-flag self-harm is true", () => {
    const profile = buildRiskProtectionProfile({ rf_self_harm: true });
    expect(profile.crisisSignal).toBe(true);
    expect(profile.redFlagTriggered).toBe(true);
    expect(profile.recommendations.some((r) => r.priority === "crisis")).toBe(true);
  });

  it("flags pain_psychotherapy_indicated for chronic + nociplastic lean", () => {
    const profile = buildRiskProtectionProfile({
      cps_duration: "yes_over_3m",
      cps_frequency: "daily",
      cps_intensity: 6,
      iasp_temporal: "chronic",
      iasp_clear_injury: 0,
      iasp_nerve_quality: 1,
      iasp_widespread_sensitized: 4,
      iasp_mixed_features: 1,
    });
    expect(profile.probableProfileIds).toContain("persistent_pain_compatible");
    expect(profile.probableProfileIds).toContain("iasp_nociplastic_leaning");
    expect(profile.probableProfileIds).toContain("pain_psychotherapy_indicated");
  });
});

describe("PAP safety copy", () => {
  it("includes Chile crisis numbers and PAP-ABCDE orientation", () => {
    expect(SAFETY_COPY.chileCrisisNumbersEs).toMatch(/600 360 7777/);
    expect(SAFETY_COPY.chileCrisisNumbersEs).toMatch(/131/);
    expect(SAFETY_COPY.papAbcdeBodyEs).toMatch(/Escucha activa/i);
    expect(SAFETY_COPY.papAbcdeBodyEs.toLowerCase()).toContain("no entrega terapia pap completa");
    expect(SAFETY_COPY.papAbcdeBodyEs.toLowerCase()).toContain("tept");
  });
});
