/**
 * Assessment instrument / module metadata.
 * All entries are screening or psychoeducational orientation — never definitive diagnoses.
 * See `clinical/instrumentPolicy.ts` for Chile validation status.
 */

export type InstrumentId =
  | "chilean_pain_screen"
  | "nrs"
  | "vas"
  | "body_map"
  | "functional_interference"
  | "phq9"
  | "pss10"
  | "iasp_mechanism"
  | "cbt_automatic_beliefs"
  | "cbt_limiting_beliefs"
  | "pharmacology_beliefs"
  | "lifestyle_pillars"
  | "crisis_pap";

export interface InstrumentMeta {
  id: InstrumentId;
  nameEs: string;
  nameEn: string;
  /** Always false — Neuropi does not diagnose. */
  isDiagnostic: false;
  /** True when this is a Chile-oriented psychometric screen (PHQ-9, PSS-10, Chilean pain screen). */
  isPsychometricScreen: boolean;
  disclaimer: {
    es: string;
    en: string;
  };
  estimatedMinutes: number;
}

const SHARED_SCREENING_NOTE_ES =
  "Este módulo es de tamizaje y orientación. No entrega un diagnóstico clínico.";

const SHARED_SCREENING_NOTE_EN =
  "This module is for screening and guidance only. It does not provide a clinical diagnosis.";

const PSYCHOEDU_NOTE_ES =
  "Módulo psicoeducativo biopsicosocial. No es un instrumento psicométrico validado en Chile; orienta conversación y cuidado, no diagnostica.";

const PSYCHOEDU_NOTE_EN =
  "Biopsychosocial psychoeducation module. Not a Chile-validated psychometric instrument; it orients conversation and care, it does not diagnose.";

export const INSTRUMENTS: Record<InstrumentId, InstrumentMeta> = {
  chilean_pain_screen: {
    id: "chilean_pain_screen",
    nameEs: "Tamizaje chileno de dolor persistente",
    nameEn: "Chilean persistent pain screen",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 6,
    disclaimer: {
      es: `${SHARED_SCREENING_NOTE_ES} Cribado inspirado en dominios de la encuesta chilena de dolor crónico no oncológico (>3 meses). No es una escala validada bajo el nombre Neuropi.`,
      en: `${SHARED_SCREENING_NOTE_EN} Screen inspired by Chilean non-cancer chronic pain survey domains (>3 months). Not a scale validated under the Neuropi name.`,
    },
  },
  nrs: {
    id: "nrs",
    nameEs: "Escala numérica del dolor (NRS)",
    nameEn: "Numeric Rating Scale (NRS)",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 1,
    disclaimer: {
      es: "Mide la intensidad percibida del dolor en este momento (0–10). No explica la causa del dolor.",
      en: "Measures perceived pain intensity right now (0–10). It does not explain the cause of pain.",
    },
  },
  vas: {
    id: "vas",
    nameEs: "Escala visual analógica (EVA)",
    nameEn: "Visual Analogue Scale (VAS)",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 1,
    disclaimer: {
      es: "Permite indicar la intensidad del dolor de forma continua. Complementa, no reemplaza, la evaluación clínica.",
      en: "Allows continuous indication of pain intensity. Complements, does not replace, clinical assessment.",
    },
  },
  body_map: {
    id: "body_map",
    nameEs: "Mapa corporal del dolor",
    nameEn: "Pain body map",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 2,
    disclaimer: {
      es: "Ayuda a localizar dónde sientes dolor. No identifica lesiones ni diagnósticos estructurales.",
      en: "Helps locate where you feel pain. It does not identify injuries or structural diagnoses.",
    },
  },
  functional_interference: {
    id: "functional_interference",
    nameEs: "Interferencia funcional",
    nameEn: "Functional interference",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 3,
    disclaimer: {
      es: "Explora cómo el dolor interfiere con tu vida diaria. No mide discapacidad formal ni otorga certificados.",
      en: "Explores how pain interferes with daily life. It does not measure formal disability or issue certificates.",
    },
  },
  phq9: {
    id: "phq9",
    nameEs: "PHQ-9 (ánimo y energía)",
    nameEn: "PHQ-9 (mood and energy)",
    isDiagnostic: false,
    isPsychometricScreen: true,
    estimatedMinutes: 3,
    disclaimer: {
      es: `${SHARED_SCREENING_NOTE_ES} El PHQ-9 (uso/validación en Chile) orienta sobre síntomas depresivos; no confirma depresión mayor. El ítem 9 activa la ruta de crisis.`,
      en: `${SHARED_SCREENING_NOTE_EN} The PHQ-9 (Chile use/validation) screens for depressive symptoms; it does not confirm major depression. Item 9 activates the crisis pathway.`,
    },
  },
  pss10: {
    id: "pss10",
    nameEs: "PSS-10 (estrés percibido)",
    nameEn: "PSS-10 (perceived stress)",
    isDiagnostic: false,
    isPsychometricScreen: true,
    estimatedMinutes: 3,
    disclaimer: {
      es: `${SHARED_SCREENING_NOTE_ES} El PSS-10 estima estrés percibido reciente; no diagnostica un trastorno por estrés. El estrés agudo puede ser adaptativo; la carga crónica es distinta.`,
      en: `${SHARED_SCREENING_NOTE_EN} The PSS-10 estimates recent perceived stress; it does not diagnose a stress disorder. Acute stress can be adaptive; chronic load is different.`,
    },
  },
  iasp_mechanism: {
    id: "iasp_mechanism",
    nameEs: "Orientación de mecanismos (IASP)",
    nameEn: "Mechanism orientation (IASP)",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 5,
    disclaimer: {
      es: `${PSYCHOEDU_NOTE_ES} Orienta hacia patrones compatibles con mecanismos IASP (nociceptivo, neuropático, nociplástico, mixto) y temporalidad. Nunca diagnostica un mecanismo. Los mecanismos pueden coexistir.`,
      en: `${PSYCHOEDU_NOTE_EN} Orients toward patterns compatible with IASP mechanisms (nociceptive, neuropathic, nociplastic, mixed) and temporality. Never diagnoses a mechanism. Mechanisms can coexist.`,
    },
  },
  cbt_automatic_beliefs: {
    id: "cbt_automatic_beliefs",
    nameEs: "Pensamientos automáticos sobre el dolor (TCC)",
    nameEn: "Automatic thoughts about pain (CBT)",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 4,
    disclaimer: {
      es: `${PSYCHOEDU_NOTE_ES} Inspirado en TCC para dolor persistente (CBT-CP). No es la escala PCS ni otro instrumento validado en Chile; solo orientación para psicoeducación.`,
      en: `${PSYCHOEDU_NOTE_EN} Inspired by CBT for persistent pain (CBT-CP). Not the PCS scale or another Chile-validated instrument; orientation for psychoeducation only.`,
    },
  },
  cbt_limiting_beliefs: {
    id: "cbt_limiting_beliefs",
    nameEs: "Creencias limitantes sobre recuperación",
    nameEn: "Limiting beliefs about recovery",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 4,
    disclaimer: {
      es: `${PSYCHOEDU_NOTE_ES} Explora creencias sobre movimiento, identidad y terapia. Abre espacio a la psicoterapia del dolor como parte posible del cuidado — sin negar que tu dolor es real.`,
      en: `${PSYCHOEDU_NOTE_EN} Explores beliefs about movement, identity, and therapy. Opens space for pain psychotherapy as a possible part of care — without denying that your pain is real.`,
    },
  },
  pharmacology_beliefs: {
    id: "pharmacology_beliefs",
    nameEs: "Creencias sobre medicamentos y dolor",
    nameEn: "Beliefs about medications and pain",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 4,
    disclaimer: {
      es: `${PSYCHOEDU_NOTE_ES} Aborda mitos frecuentes sobre fármacos en dolor persistente. Neuropi no prescribe ni indica dosis. Conversar siempre con tu clínico tratante.`,
      en: `${PSYCHOEDU_NOTE_EN} Addresses common myths about drugs in persistent pain. Neuropi does not prescribe or set doses. Always talk with your treating clinician.`,
    },
  },
  lifestyle_pillars: {
    id: "lifestyle_pillars",
    nameEs: "Pilares biopsicosociales (estilo de vida)",
    nameEn: "Biopsychosocial lifestyle pillars",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 6,
    disclaimer: {
      es: `${PSYCHOEDU_NOTE_ES} Sueño, movimiento, nutrición, apoyo social, sustancias y estrés como factores que pueden amplificar o amortiguar la experiencia de dolor — no como “causa” primaria del dolor ni como escalas diagnósticas.`,
      en: `${PSYCHOEDU_NOTE_EN} Sleep, movement, nutrition, social support, substances, and stress as factors that may amplify or buffer the pain experience — not as a primary “cause” of pain nor as diagnostic scales.`,
    },
  },
  crisis_pap: {
    id: "crisis_pap",
    nameEs: "Ruta de crisis (PAP-ABCDE)",
    nameEn: "Crisis pathway (PAP-ABCDE)",
    isDiagnostic: false,
    isPsychometricScreen: false,
    estimatedMinutes: 3,
    disclaimer: {
      es: "Ruta de apoyo en crisis inspirada en el espíritu del protocolo PAP-ABCDE (UC Chile). La app no entrega terapia PAP completa ni diagnostica TEPT. Usa el ítem 9 del PHQ-9 como puerta principal.",
      en: "Crisis support pathway inspired by the PAP-ABCDE protocol spirit (UC Chile). The app does not deliver full PAP therapy or diagnose PTSD. Uses PHQ-9 item 9 as the primary gate.",
    },
  },
};

export const INSTRUMENT_IDS = Object.keys(INSTRUMENTS) as InstrumentId[];

export function getInstrument(id: InstrumentId): InstrumentMeta {
  return INSTRUMENTS[id];
}
