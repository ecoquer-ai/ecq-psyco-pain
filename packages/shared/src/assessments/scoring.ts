import type { AssessmentAnswersInput } from "./questions";

/**
 * Scoring and risk/protection profiling.
 * Clinical prudence: severity bands use orientation language —
 * never “usted tiene depresión” / “tienes dolor nociplástico”.
 */

export type AssessmentAnswers = AssessmentAnswersInput;

export type SeverityBandId =
  | "minimal"
  | "mild"
  | "moderate"
  | "moderately_severe"
  | "severe"
  | "low"
  | "elevated"
  | "high"
  | "compatible"
  | "not_compatible"
  | "unclear";

export type IaspMechanismHint =
  | "nociceptive_leaning"
  | "neuropathic_leaning"
  | "nociplastic_leaning"
  | "mixed_leaning"
  | "unclear";

export type IaspTemporalHint = "acute" | "chronic" | "recurrent" | "unclear";

export interface SeverityBand {
  id: SeverityBandId;
  labelEs: string;
  labelEn: string;
  /** Orientation copy — never a diagnosis statement. */
  guidanceEs: string;
  guidanceEn: string;
}

export interface ScoredInstrument {
  instrumentId: string;
  rawScore: number;
  maxScore: number;
  band: SeverityBand;
  itemCount: number;
  missingItems: string[];
  flags?: {
    phq9Item9Positive?: boolean;
    crisisPapActivated?: boolean;
    iaspMechanismHint?: IaspMechanismHint;
    iaspTemporalHint?: IaspTemporalHint;
  };
}

export interface AssessmentScores {
  phq9?: ScoredInstrument;
  pss10?: ScoredInstrument;
  painChronicity?: ScoredInstrument;
  functionalInterference?: ScoredInstrument;
  iaspMechanism?: ScoredInstrument;
  cbtAutomaticBeliefs?: ScoredInstrument;
  cbtLimitingBeliefs?: ScoredInstrument;
  pharmacologyBeliefs?: ScoredInstrument;
  lifestylePillars?: ScoredInstrument;
  crisisPap?: ScoredInstrument;
}

export type CareRecommendationPriority = "routine" | "soon" | "urgent" | "crisis";

export interface CareRecommendation {
  id: string;
  priority: CareRecommendationPriority;
  titleEs: string;
  titleEn: string;
  bodyEs: string;
  bodyEn: string;
}

export interface ProbableProfile {
  id: string;
  titleEs: string;
  titleEn: string;
  explanationEs: string;
  explanationEn: string;
  whatItDoesNotMeanEs: string;
  whatItDoesNotMeanEn: string;
  recommendedActions: string[];
}

export interface RiskProtectionProfile {
  scores: AssessmentScores;
  probableProfileIds: string[];
  protectiveFactorIds: string[];
  riskFactorIds: string[];
  recommendations: CareRecommendation[];
  redFlagTriggered: boolean;
  crisisSignal: boolean;
  summaryEs: string;
  summaryEn: string;
}

function num(answers: AssessmentAnswers, id: string): number | undefined {
  const v = answers[id];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return undefined;
}

function sumItems(
  answers: AssessmentAnswers,
  ids: string[],
): { sum: number; missing: string[]; count: number } {
  const missing: string[] = [];
  let sum = 0;
  let count = 0;
  for (const id of ids) {
    const v = num(answers, id);
    if (v === undefined) {
      missing.push(id);
    } else {
      sum += v;
      count += 1;
    }
  }
  return { sum, missing, count };
}

const PHQ9_IDS = [
  "phq9_1",
  "phq9_2",
  "phq9_3",
  "phq9_4",
  "phq9_5",
  "phq9_6",
  "phq9_7",
  "phq9_8",
  "phq9_9",
] as const;

const PSS10_IDS = [
  "pss10_1",
  "pss10_2",
  "pss10_3",
  "pss10_4",
  "pss10_5",
  "pss10_6",
  "pss10_7",
  "pss10_8",
  "pss10_9",
  "pss10_10",
] as const;

/** PSS-10 reverse-scored item ids. */
const PSS10_REVERSE = new Set(["pss10_4", "pss10_5", "pss10_7", "pss10_8"]);

function phq9Band(score: number): SeverityBand {
  if (score <= 4) {
    return {
      id: "minimal",
      labelEs: "Señales mínimas en este tamizaje",
      labelEn: "Minimal signals on this screen",
      guidanceEs:
        "En este momento el tamizaje no muestra muchas señales de ánimo bajo. Si algo cambia, puedes volver a revisar o conversarlo con un profesional.",
      guidanceEn:
        "Right now this screen does not show many low-mood signals. If something changes, you can recheck or talk with a professional.",
    };
  }
  if (score <= 9) {
    return {
      id: "mild",
      labelEs: "Algunas señales que vale la pena mirar con calma",
      labelEn: "Some signals worth looking at calmly",
      guidanceEs:
        "Aparecen algunas señales relacionadas con el ánimo y la energía. No significa que tengas un diagnóstico; sí puede ayudar conversarlo o seguir cuidándote.",
      guidanceEn:
        "Some mood and energy-related signals appear. This does not mean you have a diagnosis; talking it through or continuing self-care may help.",
    };
  }
  if (score <= 14) {
    return {
      id: "moderate",
      labelEs: "Señales que vale la pena evaluar",
      labelEn: "Signals worth evaluating",
      guidanceEs:
        "Hay un conjunto de señales que vale la pena evaluar con un profesional de la salud. Esto no es un diagnóstico de depresión; es una orientación para pedir apoyo oportuno.",
      guidanceEn:
        "There is a cluster of signals worth evaluating with a healthcare professional. This is not a depression diagnosis; it is guidance to seek timely support.",
    };
  }
  if (score <= 19) {
    return {
      id: "moderately_severe",
      labelEs: "Señales más intensas: conviene evaluación pronto",
      labelEn: "Stronger signals: evaluation soon is advisable",
      guidanceEs:
        "Las respuestas sugieren un impacto emocional relevante. Te recomendamos buscar evaluación clínica pronto. Neuropi no diagnostica; acompaña la derivación.",
      guidanceEn:
        "Your answers suggest a relevant emotional impact. We recommend seeking clinical evaluation soon. Neuropi does not diagnose; it supports referral.",
    };
  }
  return {
    id: "severe",
    labelEs: "Señales intensas: prioriza apoyo profesional",
    labelEn: "Intense signals: prioritize professional support",
    guidanceEs:
      "Este tamizaje muestra señales intensas que merecen atención profesional preferentemente pronto. Si hay riesgo de daño, busca ayuda inmediata. Esto no es un diagnóstico definitivo.",
    guidanceEn:
      "This screen shows intense signals that deserve professional attention preferably soon. If there is risk of harm, seek immediate help. This is not a definitive diagnosis.",
  };
}

function pss10Band(score: number): SeverityBand {
  if (score <= 13) {
    return {
      id: "low",
      labelEs: "Estrés percibido más bajo en este mes",
      labelEn: "Lower perceived stress this month",
      guidanceEs:
        "Tu nivel de estrés percibido en este tamizaje se ve relativamente contenido. Recuerda: el estrés agudo puede ser adaptativo; cuidamos sobre todo la carga sostenida.",
      guidanceEn:
        "Your perceived stress on this screen looks relatively contained. Remember: acute stress can be adaptive; we especially care for sustained load.",
    };
  }
  if (score <= 26) {
    return {
      id: "elevated",
      labelEs: "Estrés percibido elevado: señales a cuidar",
      labelEn: "Elevated perceived stress: signals to care for",
      guidanceEs:
        "Hay estrés percibido elevado. No es un diagnóstico; sí puede ayudar revisar ritmo, sueño y apoyo. El estrés no inventa el dolor; puede amplificarlo.",
      guidanceEn:
        "Perceived stress is elevated. This is not a diagnosis; reviewing pace, sleep, and support may help. Stress does not invent pain; it can amplify it.",
    };
  }
  return {
    id: "high",
    labelEs: "Estrés percibido alto: conviene apoyo y alivio",
    labelEn: "High perceived stress: support and relief are advisable",
    guidanceEs:
      "El estrés percibido se ve alto (carga sostenida). Vale la pena buscar alivio y, si es posible, apoyo profesional. No diagnostica un trastorno por estrés.",
    guidanceEn:
      "Perceived stress looks high (sustained load). It is worth seeking relief and, if possible, professional support. It does not diagnose a stress disorder.",
  };
}

export function scorePHQ9(answers: AssessmentAnswers): ScoredInstrument {
  const { sum, missing, count } = sumItems(answers, [...PHQ9_IDS]);
  const item9 = num(answers, "phq9_9") ?? 0;
  return {
    instrumentId: "phq9",
    rawScore: sum,
    maxScore: 27,
    band: phq9Band(sum),
    itemCount: count,
    missingItems: missing,
    flags: { phq9Item9Positive: item9 > 0 },
  };
}

export function scorePSS10(answers: AssessmentAnswers): ScoredInstrument {
  const missing: string[] = [];
  let sum = 0;
  let count = 0;
  for (const id of PSS10_IDS) {
    const v = num(answers, id);
    if (v === undefined) {
      missing.push(id);
      continue;
    }
    const scored = PSS10_REVERSE.has(id) ? 4 - v : v;
    sum += scored;
    count += 1;
  }
  return {
    instrumentId: "pss10",
    rawScore: sum,
    maxScore: 40,
    band: pss10Band(sum),
    itemCount: count,
    missingItems: missing,
  };
}

export function scorePainChronicity(answers: AssessmentAnswers): ScoredInstrument {
  const duration = answers.cps_duration;
  const frequency = answers.cps_frequency;
  const intensity = num(answers, "cps_intensity") ?? num(answers, "nrs_now");

  let raw = 0;
  const missing: string[] = [];

  if (duration === undefined || duration === null) {
    missing.push("cps_duration");
  } else if (duration === "yes_over_3m") {
    raw += 3;
  } else if (duration === "yes_1_to_3m") {
    raw += 1;
  }

  if (frequency === "daily") raw += 2;
  else if (frequency === "several_week") raw += 1;

  if (intensity !== undefined) {
    if (intensity >= 7) raw += 2;
    else if (intensity >= 4) raw += 1;
  } else {
    missing.push("cps_intensity");
  }

  const compatible = duration === "yes_over_3m";
  const band: SeverityBand = compatible
    ? {
        id: "compatible",
        labelEs: "Compatible con dolor persistente / crónico",
        labelEn: "Compatible with persistent / chronic pain",
        guidanceEs:
          "Tus respuestas son compatibles con dolor que persiste o recurre por más de 3 meses. Esto no es un diagnóstico definitivo; es una orientación para seguir evaluando y cuidarte con apoyo adecuado, incluida psicoterapia del dolor cuando corresponda.",
        guidanceEn:
          "Your answers are compatible with pain that persists or recurs for more than 3 months. This is not a definitive diagnosis; it is guidance to keep evaluating and caring for yourself with appropriate support, including pain psychotherapy when indicated.",
      }
    : duration === "no"
      ? {
          id: "not_compatible",
          labelEs: "No se observa patrón de dolor persistente ahora",
          labelEn: "No persistent pain pattern observed now",
          guidanceEs:
            "En este momento no describes dolor persistente de más de 3 meses. Si el dolor aparece o se prolonga, puedes volver a este tamizaje.",
          guidanceEn:
            "Right now you do not describe persistent pain over 3 months. If pain appears or lasts longer, you can return to this screen.",
        }
      : {
          id: "unclear",
          labelEs: "Duración aún en evolución o por aclarar",
          labelEn: "Duration still evolving or to clarify",
          guidanceEs:
            "La duración del dolor aún no cumple claramente el criterio de más de 3 meses, o falta información. Conviene seguimiento y evaluación clínica si persiste.",
          guidanceEn:
            "Pain duration does not clearly meet the over-3-months criterion yet, or information is missing. Follow-up and clinical evaluation are advisable if it persists.",
        };

  return {
    instrumentId: "chilean_pain_screen",
    rawScore: raw,
    maxScore: 7,
    band,
    itemCount: 3 - missing.length,
    missingItems: missing,
  };
}

function scoreLikertBlock(
  answers: AssessmentAnswers,
  instrumentId: string,
  ids: string[],
  maxPerItem: number,
  bandForAverage: (avg: number) => SeverityBand,
): ScoredInstrument {
  const { sum, missing, count } = sumItems(answers, ids);
  const avg = count > 0 ? sum / count : 0;
  return {
    instrumentId,
    rawScore: sum,
    maxScore: ids.length * maxPerItem,
    band: bandForAverage(avg),
    itemCount: count,
    missingItems: missing,
  };
}

function interferenceBand(avg: number): SeverityBand {
  if (avg < 1.5) {
    return {
      id: "low",
      labelEs: "Interferencia funcional más baja",
      labelEn: "Lower functional interference",
      guidanceEs: "El dolor parece interferir menos en tu vida diaria en este momento.",
      guidanceEn: "Pain seems to interfere less with daily life right now.",
    };
  }
  if (avg < 2.5) {
    return {
      id: "elevated",
      labelEs: "Interferencia funcional relevante",
      labelEn: "Relevant functional interference",
      guidanceEs:
        "El dolor está interfiriendo de forma notable en áreas importantes. Vale la pena trabajar función paso a paso.",
      guidanceEn:
        "Pain is interfering notably in important areas. It is worth working on function step by step.",
    };
  }
  return {
    id: "high",
    labelEs: "Alta interferencia funcional",
    labelEn: "High functional interference",
    guidanceEs:
      "Hay alta interferencia en la vida diaria. No es un veredicto permanente; sí es una señal para priorizar apoyo y pacing.",
    guidanceEn:
      "There is high interference in daily life. This is not a permanent verdict; it is a signal to prioritize support and pacing.",
  };
}

function burdenBand(
  avg: number,
  labels: { lowEs: string; lowEn: string; elevEs: string; elevEn: string; highEs: string; highEn: string },
): SeverityBand {
  if (avg < 1.5) {
    return {
      id: "low",
      labelEs: labels.lowEs,
      labelEn: labels.lowEn,
      guidanceEs: "Pocas señales en este módulo de orientación.",
      guidanceEn: "Few signals on this orientation module.",
    };
  }
  if (avg < 2.5) {
    return {
      id: "elevated",
      labelEs: labels.elevEs,
      labelEn: labels.elevEn,
      guidanceEs: "Hay señales a explorar con psicoeducación y, si cabe, psicoterapia del dolor.",
      guidanceEn: "There are signals to explore with psychoeducation and, if fitting, pain psychotherapy.",
    };
  }
  return {
    id: "high",
    labelEs: labels.highEs,
    labelEn: labels.highEn,
    guidanceEs:
      "Se concentran señales relevantes. Esto no diagnostica; sí sugiere explorar trabajo psicológico del dolor con tu equipo, si cabe.",
    guidanceEn:
      "Relevant signals concentrate. This does not diagnose; it does suggest exploring psychological pain work with your care team, if fitting.",
  };
}

export function scoreFunctionalInterference(
  answers: AssessmentAnswers,
): ScoredInstrument {
  return scoreLikertBlock(
    answers,
    "functional_interference",
    ["fi_work", "fi_home", "fi_social", "fi_mobility", "fi_enjoyment", "fi_selfcare"],
    4,
    interferenceBand,
  );
}

/**
 * IASP mechanism orientation — never diagnoses a mechanism.
 * Guidance uses “tus respuestas sugieren un patrón compatible con…”.
 */
export function scoreIaspMechanism(answers: AssessmentAnswers): ScoredInstrument {
  const nociceptive = num(answers, "iasp_clear_injury") ?? 0;
  const neuropathic = num(answers, "iasp_nerve_quality") ?? 0;
  const nociplastic = num(answers, "iasp_widespread_sensitized") ?? 0;
  const mixed = num(answers, "iasp_mixed_features") ?? 0;
  const temporalRaw = answers.iasp_temporal;

  const missing: string[] = [];
  const likertIds = [
    "iasp_clear_injury",
    "iasp_nerve_quality",
    "iasp_widespread_sensitized",
    "iasp_mixed_features",
  ];
  for (const id of likertIds) {
    if (num(answers, id) === undefined) missing.push(id);
  }
  if (temporalRaw === undefined || temporalRaw === null) missing.push("iasp_temporal");

  const scores = [
    { hint: "nociceptive_leaning" as const, v: nociceptive },
    { hint: "neuropathic_leaning" as const, v: neuropathic },
    { hint: "nociplastic_leaning" as const, v: nociplastic },
  ];
  const highCount = scores.filter((s) => s.v >= 3).length;
  let mechanismHint: IaspMechanismHint = "unclear";
  if (mixed >= 3 || highCount >= 2) {
    mechanismHint = "mixed_leaning";
  } else {
    const top = [...scores].sort((a, b) => b.v - a.v)[0];
    if (top && top.v >= 3) mechanismHint = top.hint;
    else if (top && top.v >= 2) mechanismHint = top.hint;
  }

  let temporalHint: IaspTemporalHint = "unclear";
  if (temporalRaw === "acute" || temporalRaw === "chronic" || temporalRaw === "recurrent") {
    temporalHint = temporalRaw;
  }

  const raw = nociceptive + neuropathic + nociplastic + mixed;
  const mechanismLabel: Record<IaspMechanismHint, { es: string; en: string }> = {
    nociceptive_leaning: {
      es: "patrón compatible con dolor de tipo más nociceptivo",
      en: "a pattern compatible with more nociceptive-type pain",
    },
    neuropathic_leaning: {
      es: "patrón compatible con dolor de tipo más neuropático",
      en: "a pattern compatible with more neuropathic-type pain",
    },
    nociplastic_leaning: {
      es: "patrón compatible con dolor de tipo más nociplástico",
      en: "a pattern compatible with more nociplastic-type pain",
    },
    mixed_leaning: {
      es: "patrón compatible con mecanismos mixtos (pueden coexistir)",
      en: "a pattern compatible with mixed mechanisms (they can coexist)",
    },
    unclear: {
      es: "patrón aún poco definido en este tamizaje",
      en: "a pattern still unclear on this screen",
    },
  };
  const temporalLabel: Record<IaspTemporalHint, { es: string; en: string }> = {
    acute: { es: "temporalidad aguda (<3 meses)", en: "acute temporality (<3 months)" },
    chronic: {
      es: "temporalidad persistente/crónica (>3 meses)",
      en: "persistent/chronic temporality (>3 months)",
    },
    recurrent: { es: "temporalidad recurrente", en: "recurrent temporality" },
    unclear: { es: "temporalidad por aclarar", en: "temporality to clarify" },
  };

  const m = mechanismLabel[mechanismHint];
  const t = temporalLabel[temporalHint];

  const band: SeverityBand = {
    id: mechanismHint === "unclear" ? "unclear" : "compatible",
    labelEs: `Orientación IASP: ${m.es}`,
    labelEn: `IASP orientation: ${m.en}`,
    guidanceEs: `Tus respuestas sugieren un ${m.es}, con ${t.es}. Esto es orientación, no un diagnóstico de mecanismo. Según IASP, los mecanismos pueden coexistir. Conversa la orientación con tu clínico; la psicoterapia del dolor ayuda a trabajar el perfil específico.`,
    guidanceEn: `Your answers suggest ${m.en}, with ${t.en}. This is orientation, not a mechanism diagnosis. Per IASP, mechanisms can coexist. Discuss orientation with your clinician; pain psychotherapy helps work with the specific profile.`,
  };

  return {
    instrumentId: "iasp_mechanism",
    rawScore: raw,
    maxScore: 16,
    band,
    itemCount: 4 - missing.filter((id) => id !== "iasp_temporal").length,
    missingItems: missing,
    flags: { iaspMechanismHint: mechanismHint, iaspTemporalHint: temporalHint },
  };
}

export function scoreCbtAutomaticBeliefs(answers: AssessmentAnswers): ScoredInstrument {
  return scoreLikertBlock(
    answers,
    "cbt_automatic_beliefs",
    [
      "cbt_auto_worst",
      "cbt_auto_forever",
      "cbt_auto_ruin",
      "cbt_auto_danger",
    ],
    4,
    (avg) =>
      burdenBand(avg, {
        lowEs: "Pocos pensamientos automáticos intensos en este módulo",
        lowEn: "Few intense automatic thoughts on this module",
        elevEs: "Pensamientos automáticos presentes (orientación TCC)",
        elevEn: "Automatic thoughts present (CBT orientation)",
        highEs: "Pensamientos automáticos intensos: conviene TCC del dolor",
        highEn: "Intense automatic thoughts: pain CBT is advisable",
      }),
  );
}

export function scoreCbtLimitingBeliefs(answers: AssessmentAnswers): ScoredInstrument {
  // Higher agreement on limiting myths = higher burden; therapy openness is protective (reverse).
  const mythIds = [
    "cbt_lim_only_meds",
    "cbt_lim_psych_imaginary",
    "cbt_lim_move_harm",
    "cbt_lim_identity",
  ];
  const { sum, missing, count } = sumItems(answers, mythIds);
  const openness = num(answers, "cbt_lim_therapy_necessary");
  if (openness === undefined) missing.push("cbt_lim_therapy_necessary");
  const avg = count > 0 ? sum / count : 0;
  const band = burdenBand(avg, {
    lowEs: "Pocas creencias limitantes intensas",
    lowEn: "Few intense limiting beliefs",
    elevEs: "Creencias limitantes presentes a trabajar",
    elevEn: "Limiting beliefs present to work on",
    highEs: "Creencias limitantes altas: puerta a psicoterapia del dolor",
    highEn: "High limiting beliefs: door to pain psychotherapy",
  });
  return {
    instrumentId: "cbt_limiting_beliefs",
    rawScore: sum,
    maxScore: 16,
    band,
    itemCount: count,
    missingItems: missing,
  };
}

export function scorePharmacologyBeliefs(answers: AssessmentAnswers): ScoredInstrument {
  return scoreLikertBlock(
    answers,
    "pharmacology_beliefs",
    ["pharm_instant", "pharm_addiction_sure", "pharm_more_dose", "pharm_only_solution"],
    4,
    (avg) =>
      burdenBand(avg, {
        lowEs: "Pocos mitos intensos sobre fármacos",
        lowEn: "Few intense medication myths",
        elevEs: "Mitos/miedos farmacológicos a aclarar con clínico",
        elevEn: "Pharmacology myths/fears to clarify with clinician",
        highEs: "Mitos farmacológicos altos: psicoeducación + clínico",
        highEn: "High pharmacology myths: psychoeducation + clinician",
      }),
  );
}

export function scoreLifestylePillars(answers: AssessmentAnswers): ScoredInstrument {
  // Burden items (higher = more load). Protective items reverse-scored into burden.
  const sleepQ = num(answers, "lp_sleep_quality");
  const sleepPain = num(answers, "lp_sleep_pain");
  const moveFear = num(answers, "lp_movement_fear");
  const nutrition = num(answers, "lp_nutrition");
  const substances = num(answers, "lp_substances");
  const stress = num(answers, "lp_stress_load");
  const efficacy = num(answers, "lp_self_efficacy");
  const support = num(answers, "lp_social_support");

  const ids = [
    "lp_sleep_quality",
    "lp_sleep_pain",
    "lp_movement_fear",
    "lp_nutrition",
    "lp_substances",
    "lp_stress_load",
    "lp_self_efficacy",
    "lp_social_support",
  ];
  const missing = ids.filter((id) => num(answers, id) === undefined);

  const burdenParts: number[] = [];
  if (sleepQ !== undefined) burdenParts.push(sleepQ);
  if (sleepPain !== undefined) burdenParts.push(sleepPain);
  if (moveFear !== undefined) burdenParts.push(moveFear);
  if (nutrition !== undefined) burdenParts.push(nutrition);
  if (substances !== undefined) burdenParts.push(substances);
  if (stress !== undefined) burdenParts.push(stress);
  // Reverse protective: low efficacy/support → higher burden
  if (efficacy !== undefined) burdenParts.push(4 - efficacy);
  if (support !== undefined) burdenParts.push(4 - support);

  const sum = burdenParts.reduce((a, b) => a + b, 0);
  const avg = burdenParts.length > 0 ? sum / burdenParts.length : 0;

  return {
    instrumentId: "lifestyle_pillars",
    rawScore: sum,
    maxScore: 32,
    band: burdenBand(avg, {
      lowEs: "Pilares con menor carga ahora",
      lowEn: "Pillars with lower load now",
      elevEs: "Pilares con señales a cuidar (sueño, movimiento, social…)",
      elevEn: "Pillars with signals to care for (sleep, movement, social…)",
      highEs: "Varios pilares con carga alta: trabajo integral recomendado",
      highEn: "Several pillars with high load: integrated work recommended",
    }),
    itemCount: burdenParts.length,
    missingItems: missing,
  };
}

export function scoreCrisisPap(
  answers: AssessmentAnswers,
  phq9?: ScoredInstrument,
): ScoredInstrument | undefined {
  const item9Positive = phq9?.flags?.phq9Item9Positive === true;
  const papNeed = answers.pap_need_now === "yes" || answers.pap_need_now === "unsure";
  const rfSelfHarm =
    answers.rf_self_harm === true ||
    answers.rf_self_harm === "yes" ||
    answers.rf_self_harm === 1;
  const activated = item9Positive || papNeed || rfSelfHarm;

  if (
    !activated &&
    answers.pap_need_now === undefined &&
    answers.pap_edu_abcde === undefined &&
    !item9Positive
  ) {
    return undefined;
  }

  const band: SeverityBand = activated
    ? {
        id: "severe",
        labelEs: "Ruta de crisis activada (PHQ-9 ítem 9 / PAP)",
        labelEn: "Crisis pathway activated (PHQ-9 item 9 / PAP)",
        guidanceEs:
          "Prioriza ayuda inmediata: Salud Responde 600 360 7777, SAMU 131, urgencias o alguien de confianza. Orientación PAP-ABCDE (inspiración UC): Escucha activa, Respiración, Categorizar necesidades, Derivación, Psicoeducación. Neuropi no entrega terapia PAP completa ni diagnostica TEPT.",
        guidanceEn:
          "Prioritize immediate help: Salud Responde 600 360 7777, SAMU 131, emergency care, or someone you trust. PAP-ABCDE orientation (UC inspiration): Active listening, Breathing, Categorize needs, Derivation, Psychoeducation. Neuropi does not deliver full PAP therapy or diagnose PTSD.",
      }
    : {
        id: "low",
        labelEs: "Ruta de crisis no activada ahora",
        labelEn: "Crisis pathway not activated now",
        guidanceEs:
          "Si en el futuro aparecen pensamientos de daño, usa la ruta de crisis y busca apoyo real de inmediato.",
        guidanceEn:
          "If harm thoughts appear later, use the crisis pathway and seek real support immediately.",
      };

  return {
    instrumentId: "crisis_pap",
    rawScore: activated ? 1 : 0,
    maxScore: 1,
    band,
    itemCount: 1,
    missingItems: [],
    flags: { crisisPapActivated: activated, phq9Item9Positive: item9Positive },
  };
}

function hasRedFlag(answers: AssessmentAnswers): boolean {
  const keys = [
    "rf_chest_breath",
    "rf_neuro_sudden",
    "rf_bowel_bladder",
    "rf_trauma_fracture",
    "rf_fever_infection",
    "rf_unexplained_weight",
    "rf_cancer_history",
    "rf_self_harm",
  ];
  return keys.some((k) => answers[k] === true || answers[k] === "yes" || answers[k] === 1);
}

function hasCrisis(answers: AssessmentAnswers, phq9?: ScoredInstrument): boolean {
  if (answers.rf_self_harm === true || answers.rf_self_harm === "yes") return true;
  if (answers.pap_need_now === "yes") return true;
  if (phq9?.flags?.phq9Item9Positive) return true;
  return false;
}

/**
 * Builds risk/protection orientation from scored modules.
 * Profile IDs align with `profiles.ts` rule engine.
 */
export function buildRiskProtectionProfile(
  answers: AssessmentAnswers,
): RiskProtectionProfile {
  const phq9 = hasAny(answers, PHQ9_IDS) ? scorePHQ9(answers) : undefined;
  const pss10 = hasAny(answers, PSS10_IDS) ? scorePSS10(answers) : undefined;
  const painChronicity =
    answers.cps_duration !== undefined ? scorePainChronicity(answers) : undefined;
  const functionalInterference = hasAny(answers, [
    "fi_work",
    "fi_home",
    "fi_social",
    "fi_mobility",
    "fi_enjoyment",
    "fi_selfcare",
  ])
    ? scoreFunctionalInterference(answers)
    : undefined;

  const iaspMechanism = hasAny(answers, [
    "iasp_temporal",
    "iasp_clear_injury",
    "iasp_nerve_quality",
    "iasp_widespread_sensitized",
    "iasp_mixed_features",
  ])
    ? scoreIaspMechanism(answers)
    : undefined;

  const cbtAutomaticBeliefs = hasAny(answers, [
    "cbt_auto_worst",
    "cbt_auto_forever",
    "cbt_auto_ruin",
    "cbt_auto_danger",
  ])
    ? scoreCbtAutomaticBeliefs(answers)
    : undefined;

  const cbtLimitingBeliefs = hasAny(answers, [
    "cbt_lim_only_meds",
    "cbt_lim_psych_imaginary",
    "cbt_lim_move_harm",
    "cbt_lim_identity",
  ])
    ? scoreCbtLimitingBeliefs(answers)
    : undefined;

  const pharmacologyBeliefs = hasAny(answers, [
    "pharm_instant",
    "pharm_addiction_sure",
    "pharm_more_dose",
    "pharm_only_solution",
  ])
    ? scorePharmacologyBeliefs(answers)
    : undefined;

  const lifestylePillars = hasAny(answers, [
    "lp_sleep_quality",
    "lp_sleep_pain",
    "lp_movement_fear",
    "lp_self_efficacy",
    "lp_social_support",
    "lp_nutrition",
    "lp_substances",
    "lp_stress_load",
  ])
    ? scoreLifestylePillars(answers)
    : undefined;

  const crisisPap = scoreCrisisPap(answers, phq9);

  const scores: AssessmentScores = {
    phq9,
    pss10,
    painChronicity,
    functionalInterference,
    iaspMechanism,
    cbtAutomaticBeliefs,
    cbtLimitingBeliefs,
    pharmacologyBeliefs,
    lifestylePillars,
    crisisPap,
  };

  const probableProfileIds: string[] = [];
  const protectiveFactorIds: string[] = [];
  const riskFactorIds: string[] = [];

  if (painChronicity?.band.id === "compatible") {
    probableProfileIds.push("persistent_pain_compatible");
    riskFactorIds.push("persistent_pain");
  }

  if (
    functionalInterference &&
    (functionalInterference.band.id === "high" ||
      functionalInterference.band.id === "elevated")
  ) {
    probableProfileIds.push("high_functional_interference");
    riskFactorIds.push("functional_interference");
  }

  if (pss10 && (pss10.band.id === "elevated" || pss10.band.id === "high")) {
    probableProfileIds.push("elevated_stress");
    riskFactorIds.push("stress");
  }

  if (phq9 && phq9.rawScore >= 10) {
    probableProfileIds.push("depressive_symptoms_relevant");
    riskFactorIds.push("depressive_symptoms");
  }

  const hint = iaspMechanism?.flags?.iaspMechanismHint;
  if (hint === "nociplastic_leaning") {
    probableProfileIds.push("iasp_nociplastic_leaning");
    riskFactorIds.push("mechanism_orientation");
  } else if (hint === "neuropathic_leaning") {
    probableProfileIds.push("iasp_neuropathic_leaning");
    riskFactorIds.push("mechanism_orientation");
  } else if (hint === "nociceptive_leaning") {
    probableProfileIds.push("iasp_nociceptive_leaning");
  } else if (hint === "mixed_leaning") {
    probableProfileIds.push("iasp_mixed_leaning");
    riskFactorIds.push("mechanism_orientation");
  }

  if (iaspMechanism?.flags?.iaspTemporalHint === "chronic") {
    probableProfileIds.push("chronic_temporality");
  }

  if (
    cbtAutomaticBeliefs &&
    (cbtAutomaticBeliefs.band.id === "elevated" || cbtAutomaticBeliefs.band.id === "high")
  ) {
    probableProfileIds.push("cbt_automatic_thoughts_relevant");
    riskFactorIds.push("automatic_thoughts");
  }

  if (
    cbtLimitingBeliefs &&
    (cbtLimitingBeliefs.band.id === "elevated" || cbtLimitingBeliefs.band.id === "high")
  ) {
    probableProfileIds.push("limiting_beliefs_block_therapy");
    riskFactorIds.push("limiting_beliefs");
  }

  if (
    pharmacologyBeliefs &&
    (pharmacologyBeliefs.band.id === "elevated" || pharmacologyBeliefs.band.id === "high")
  ) {
    probableProfileIds.push("pharmacology_myths_relevant");
    riskFactorIds.push("pharmacology_myths");
  }

  if (
    lifestylePillars &&
    (lifestylePillars.band.id === "elevated" || lifestylePillars.band.id === "high")
  ) {
    probableProfileIds.push("lifestyle_pillars_load");
    riskFactorIds.push("lifestyle_load");
  }

  const eduDisease = answers.cps_edu_chronic_disease;
  const eduPty = answers.cps_edu_psychotherapy;
  if (eduDisease === "no_new" || eduPty === "no_new") {
    probableProfileIds.push("low_pain_understanding");
    riskFactorIds.push("low_understanding");
  }

  const specialist = answers.cps_specialist;
  if (specialist === "no_followup" || specialist === "gp_only") {
    probableProfileIds.push("low_specialist_continuity");
    riskFactorIds.push("care_continuity");
  }

  const efficacy = num(answers, "lp_self_efficacy");
  const support = num(answers, "lp_social_support");
  if ((efficacy !== undefined && efficacy >= 3) || (support !== undefined && support >= 3)) {
    probableProfileIds.push("high_protective_factors");
    if (efficacy !== undefined && efficacy >= 3) protectiveFactorIds.push("self_efficacy");
    if (support !== undefined && support >= 3) protectiveFactorIds.push("social_support");
  }

  // Pain psychotherapy necessity narrative when chronic + beliefs/mechanisms cluster
  if (
    probableProfileIds.includes("persistent_pain_compatible") &&
    (probableProfileIds.includes("cbt_automatic_thoughts_relevant") ||
      probableProfileIds.includes("limiting_beliefs_block_therapy") ||
      probableProfileIds.includes("iasp_nociplastic_leaning") ||
      probableProfileIds.includes("iasp_mixed_leaning"))
  ) {
    probableProfileIds.push("pain_psychotherapy_indicated");
  }

  const biopsychosocialRiskCount = [
    riskFactorIds.includes("stress"),
    riskFactorIds.includes("depressive_symptoms"),
    riskFactorIds.includes("functional_interference"),
    riskFactorIds.includes("automatic_thoughts"),
    riskFactorIds.includes("limiting_beliefs"),
    riskFactorIds.includes("lifestyle_load"),
  ].filter(Boolean).length;

  if (biopsychosocialRiskCount >= 3) {
    probableProfileIds.push("multiple_biopsychosocial_risks");
  }

  const redFlagTriggered = hasRedFlag(answers);
  const crisisSignal = hasCrisis(answers, phq9);

  const recommendations: CareRecommendation[] = [];

  if (crisisSignal) {
    recommendations.push({
      id: "crisis_pap_support",
      priority: "crisis",
      titleEs: "Prioriza apoyo inmediato (ruta PAP)",
      titleEn: "Prioritize immediate support (PAP pathway)",
      bodyEs:
        "Aparecen señales de crisis o el ítem 9 del PHQ-9 es positivo. Busca ayuda ahora: Salud Responde 600 360 7777, SAMU 131, urgencias o alguien de confianza. Para quien te acompaña, el espíritu PAP-ABCDE (inspiración UC Chile) orienta Escucha activa, Respiración, Categorizar necesidades, Derivación y Psicoeducación. Neuropi no reemplaza esa atención ni diagnostica TEPT.",
      bodyEn:
        "Crisis signals appear or PHQ-9 item 9 is positive. Seek help now: Salud Responde 600 360 7777, SAMU 131, emergency care, or someone you trust. For helpers, the PAP-ABCDE spirit (UC Chile inspiration) orients Active listening, Breathing, Categorize needs, Derivation, and Psychoeducation. Neuropi does not replace that care or diagnose PTSD.",
    });
  }

  if (redFlagTriggered && !crisisSignal) {
    recommendations.push({
      id: "urgent_medical",
      priority: "urgent",
      titleEs: "Evalúa atención médica pronto",
      titleEn: "Seek medical care soon",
      bodyEs:
        "Marcaste una o más señales que no deberían esperar a una app. Contacta a tu médico o un servicio de urgencia según la gravedad.",
      bodyEn:
        "You marked one or more signals that should not wait for an app. Contact your doctor or emergency services as appropriate.",
    });
  }

  if (probableProfileIds.includes("depressive_symptoms_relevant")) {
    recommendations.push({
      id: "mood_evaluation",
      priority: "soon",
      titleEs: "Conversar el ánimo con un profesional",
      titleEn: "Talk about mood with a professional",
      bodyEs:
        "Hay señales de ánimo y energía que vale la pena evaluar. No significa que “tengas depresión”; sí que un profesional puede ayudarte a entender qué está pasando. El ánimo puede amplificar el dolor; no se presenta como su causa primaria.",
      bodyEn:
        "There are mood and energy signals worth evaluating. That does not mean “you have depression”; a professional can help you understand what is going on. Mood can amplify pain; it is not presented as its primary cause.",
    });
  }

  if (probableProfileIds.includes("pain_psychotherapy_indicated")) {
    recommendations.push({
      id: "pain_psychotherapy_necessary",
      priority: "soon",
      titleEs: "Psicoterapia del dolor: suele ser útil para tu perfil",
      titleEn: "Pain psychotherapy: often useful for your profile",
      bodyEs:
        "Tu patrón (dolor persistente + creencias/mecanismos) sugiere conversar con tu equipo sobre psicoterapia clínica del dolor como parte del cuidado integral — junto al plan médico, no en su lugar. Neuropi orienta; no indica tratamientos.",
      bodyEn:
        "Your pattern (persistent pain + beliefs/mechanisms) suggests talking with your team about clinical pain psychotherapy as part of integrated care — alongside the medical plan, not instead of it. Neuropi orients; it does not prescribe treatments.",
    });
  }

  if (probableProfileIds.includes("persistent_pain_compatible")) {
    recommendations.push({
      id: "pain_pathway",
      priority: "routine",
      titleEs: "Continuar ruta de comprensión del dolor",
      titleEn: "Continue the pain-understanding pathway",
      bodyEs:
        "Tu patrón es compatible con dolor persistente. Te sugerimos el programa por hitos de Neuropi (incluida psicoterapia del dolor) y, cuando puedas, hablar con tu equipo de salud sobre un plan integral.",
      bodyEn:
        "Your pattern is compatible with persistent pain. We suggest Neuropi’s milestone program (including pain psychotherapy) and, when you can, talking with your care team about an integrated plan.",
    });
  }

  if (probableProfileIds.includes("low_pain_understanding")) {
    recommendations.push({
      id: "psychoeducation",
      priority: "routine",
      titleEs: "Psicoeducación breve sobre dolor",
      titleEn: "Brief pain psychoeducation",
      bodyEs:
        "Hay espacio para comprender mejor el dolor persistente y la psicoterapia del dolor. La biblioteca y el primer hito de Neuropi están pensados para eso.",
      bodyEn:
        "There is room to better understand persistent pain and pain psychotherapy. Neuropi’s library and first milestone are designed for that.",
    });
  }

  if (probableProfileIds.includes("pharmacology_myths_relevant")) {
    recommendations.push({
      id: "pharm_psychoeducation",
      priority: "routine",
      titleEs: "Aclarar mitos de medicamentos con tu clínico",
      titleEn: "Clarify medication myths with your clinician",
      bodyEs:
        "Aparecen miedos o mitos frecuentes sobre fármacos. Neuropi no prescribe: prepara preguntas y conversa dosis, tiempos y riesgos solo con tu clínico tratante.",
      bodyEn:
        "Common medication fears or myths appear. Neuropi does not prescribe: prepare questions and discuss doses, timing, and risks only with your treating clinician.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "continue_care",
      priority: "routine",
      titleEs: "Seguir cuidándote con información y registro",
      titleEn: "Keep caring for yourself with information and logging",
      bodyEs:
        "Puedes continuar con educación, registro de dolor y el programa guiado. Si algo cambia, vuelve a evaluar.",
      bodyEn:
        "You can continue with education, pain logging, and the guided program. If something changes, reassess.",
    });
  }

  const uniqueProfiles = [...new Set(probableProfileIds)];

  const summaryEs = crisisSignal
    ? "Detectamos señales que requieren priorizar tu seguridad ahora (ruta PAP / PHQ-9 ítem 9). Busca apoyo inmediato; Neuropi puede acompañarte después."
    : uniqueProfiles.length === 0
      ? "Completaste el tamizaje. Por ahora no se concentran perfiles de riesgo altos; puedes seguir con educación y registro."
      : `Orientación: ${uniqueProfiles.length} perfil(es) probable(s) para explorar con prudencia clínica. Esto no es un diagnóstico.`;

  const summaryEn = crisisSignal
    ? "We detected signals that require prioritizing your safety now (PAP pathway / PHQ-9 item 9). Seek immediate support; Neuropi can accompany you afterward."
    : uniqueProfiles.length === 0
      ? "You completed the screen. For now, high-risk profiles are not concentrated; you can continue with education and logging."
      : `Orientation: ${uniqueProfiles.length} probable profile(s) to explore with clinical prudence. This is not a diagnosis.`;

  return {
    scores,
    probableProfileIds: uniqueProfiles,
    protectiveFactorIds: [...new Set(protectiveFactorIds)],
    riskFactorIds: [...new Set(riskFactorIds)],
    recommendations,
    redFlagTriggered,
    crisisSignal,
    summaryEs,
    summaryEn,
  };
}

function hasAny(answers: AssessmentAnswers, ids: readonly string[]): boolean {
  return ids.some((id) => answers[id] !== undefined && answers[id] !== null);
}
