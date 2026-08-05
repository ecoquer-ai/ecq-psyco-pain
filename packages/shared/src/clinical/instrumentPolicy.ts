/**
 * Chile validation / clinical use policy for Neuropi instruments and modules.
 * Source of truth for what may be presented as a psychometric screen vs
 * psychoeducational orientation. Never claim unvalidated tools as Chile-validated.
 */

export type ValidationStatus =
  | "chile_validated_or_adapted"
  | "chile_inspired_screen"
  | "widely_used_intensity_tool"
  | "psychoeducational_orientation"
  | "crisis_pathway"
  | "not_in_core_battery";

export type ClinicalModuleKind =
  | "psychometric_screen"
  | "intensity_mapping"
  | "biopsychosocial_pillar"
  | "mechanism_orientation"
  | "cbt_orientation"
  | "pharmacology_psychoeducation"
  | "crisis_support";

export interface InstrumentPolicyEntry {
  id: string;
  kind: ClinicalModuleKind;
  validationStatus: ValidationStatus;
  /** Spanish (Chile) note for clinicians / product. */
  noteEs: string;
  noteEn: string;
  inCoreBattery: boolean;
}

/**
 * Policy table. Instruments removed from the product (GAD-7, ITQ as core) remain
 * documented here as `not_in_core_battery` so the rationale is auditable.
 */
export const INSTRUMENT_POLICY: Record<string, InstrumentPolicyEntry> = {
  chilean_pain_screen: {
    id: "chilean_pain_screen",
    kind: "psychometric_screen",
    validationStatus: "chile_inspired_screen",
    inCoreBattery: true,
    noteEs:
      "Tamizaje inspirado en dominios de encuesta chilena de dolor crónico no oncológico; criterio >3 meses. No es una escala validada bajo el nombre Neuropi; orientación, no diagnóstico definitivo.",
    noteEn:
      "Screen inspired by Chilean non-cancer chronic pain survey domains; >3 months criterion. Not a scale validated under the Neuropi name; orientation, not definitive diagnosis.",
  },
  nrs: {
    id: "nrs",
    kind: "intensity_mapping",
    validationStatus: "widely_used_intensity_tool",
    inCoreBattery: true,
    noteEs: "Escala numérica de intensidad percibida (0–10). Herramienta clínica habitual; no explica mecanismo.",
    noteEn: "Numeric perceived intensity scale (0–10). Common clinical tool; does not explain mechanism.",
  },
  vas: {
    id: "vas",
    kind: "intensity_mapping",
    validationStatus: "widely_used_intensity_tool",
    inCoreBattery: true,
    noteEs: "Escala visual analógica de intensidad. Complementa NRS; no diagnostica.",
    noteEn: "Visual analogue intensity scale. Complements NRS; does not diagnose.",
  },
  body_map: {
    id: "body_map",
    kind: "intensity_mapping",
    validationStatus: "widely_used_intensity_tool",
    inCoreBattery: true,
    noteEs: "Mapa corporal de localización. No identifica lesiones estructurales.",
    noteEn: "Body map for location. Does not identify structural injuries.",
  },
  functional_interference: {
    id: "functional_interference",
    kind: "biopsychosocial_pillar",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Módulo de interferencia funcional (orientación). No es instrumento de discapacidad formal validado en Chile bajo este nombre.",
    noteEn:
      "Functional interference orientation module. Not a formal disability instrument validated in Chile under this name.",
  },
  phq9: {
    id: "phq9",
    kind: "psychometric_screen",
    validationStatus: "chile_validated_or_adapted",
    inCoreBattery: true,
    noteEs:
      "PHQ-9: instrumento de tamizaje depresivo con uso y validación/adaptación documentada en Chile. El ítem 9 es la puerta primaria de crisis en Neuropi. No diagnostica depresión mayor.",
    noteEn:
      "PHQ-9: depression screen with documented Chile use/validation/adaptation. Item 9 is Neuropi’s primary crisis gate. Does not diagnose major depression.",
  },
  pss10: {
    id: "pss10",
    kind: "psychometric_screen",
    validationStatus: "chile_validated_or_adapted",
    inCoreBattery: true,
    noteEs:
      "PSS-10: estrés percibido con uso/validación en contextos hispanohablantes incl. Chile. No diagnostica trastorno por estrés.",
    noteEn:
      "PSS-10: perceived stress with use/validation in Spanish-speaking contexts including Chile. Does not diagnose a stress disorder.",
  },
  iasp_mechanism: {
    id: "iasp_mechanism",
    kind: "mechanism_orientation",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Orientación IASP (nociceptivo / neuropático / nociplástico / mixto + temporalidad). No es diagnóstico de mecanismo. Lenguaje: “patrón compatible con…”.",
    noteEn:
      "IASP orientation (nociceptive / neuropathic / nociplastic / mixed + temporality). Not a mechanism diagnosis. Language: “pattern compatible with…”.",
  },
  cbt_automatic_beliefs: {
    id: "cbt_automatic_beliefs",
    kind: "cbt_orientation",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Tamizaje psicoeducativo de pensamientos automáticos (inspirado en CBT-CP). NO es PCS ni otro instrumento validado en Chile. Solo orientación.",
    noteEn:
      "Psychoeducational screen of automatic thoughts (CBT-CP inspired). NOT the PCS or another Chile-validated instrument. Orientation only.",
  },
  cbt_limiting_beliefs: {
    id: "cbt_limiting_beliefs",
    kind: "cbt_orientation",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Creencias limitantes sobre recuperación, movimiento, identidad y terapia. Psicoeducación; no escala diagnóstica.",
    noteEn:
      "Limiting beliefs about recovery, movement, identity, and therapy. Psychoeducation; not a diagnostic scale.",
  },
  pharmacology_beliefs: {
    id: "pharmacology_beliefs",
    kind: "pharmacology_psychoeducation",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Mitos y miedos sobre medicamentos para dolor persistente. La app no prescribe ni reemplaza al clínico tratante.",
    noteEn:
      "Myths and fears about persistent-pain medications. The app does not prescribe or replace the treating clinician.",
  },
  lifestyle_pillars: {
    id: "lifestyle_pillars",
    kind: "biopsychosocial_pillar",
    validationStatus: "psychoeducational_orientation",
    inCoreBattery: true,
    noteEs:
      "Pilares biopsicosociales (sueño, movimiento, nutrición, social, sustancias, estrés). NO son instrumentos psicométricos validados. Factores que pueden amplificar o amortiguar; no “causan” el dolor como explicación primaria.",
    noteEn:
      "Biopsychosocial pillars (sleep, movement, nutrition, social, substances, stress). NOT validated psychometric instruments. Factors that may amplify or buffer; do not “cause” pain as a primary explanation.",
  },
  crisis_pap: {
    id: "crisis_pap",
    kind: "crisis_support",
    validationStatus: "crisis_pathway",
    inCoreBattery: true,
    noteEs:
      "Ruta de crisis alineada al espíritu PAP-ABCDE (inspiración protocolo UC Chile). Usa PHQ-9 ítem 9 como puerta. La app NO entrega terapia PAP completa ni diagnostica TEPT.",
    noteEn:
      "Crisis pathway aligned with PAP-ABCDE spirit (UC Chile protocol inspiration). Uses PHQ-9 item 9 as gate. App does NOT deliver full PAP therapy or diagnose PTSD.",
  },
  /** Removed from core — documented for audit */
  gad7: {
    id: "gad7",
    kind: "psychometric_screen",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs:
      "REMOVIDO: GAD-7 no se presenta en Neuropi como instrumento psicométrico validado/adaptado en Chile en esta versión. Ansiedad se aborda vía pilares y psicoeducación, no vía GAD-7.",
    noteEn:
      "REMOVED: GAD-7 is not presented in Neuropi as a Chile-validated/adapted psychometric in this version. Anxiety is addressed via pillars and psychoeducation, not GAD-7.",
  },
  itq: {
    id: "itq",
    kind: "psychometric_screen",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs:
      "REMOVIDO de la batería central: ITQ / trauma screening. Crisis vía PHQ-9 ítem 9 + PAP. No se diagnostica TEPT.",
    noteEn:
      "REMOVED from core battery: ITQ / trauma screening. Crisis via PHQ-9 item 9 + PAP. PTSD is not diagnosed.",
  },
  sleep_as_instrument: {
    id: "sleep_as_instrument",
    kind: "biopsychosocial_pillar",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs:
      "Sueño ya no se trata como instrumento validado; vive dentro de lifestyle_pillars como pilar psicoeducativo.",
    noteEn:
      "Sleep is no longer treated as a validated instrument; it lives inside lifestyle_pillars as a psychoeducational pillar.",
  },
  fear_avoidance_as_instrument: {
    id: "fear_avoidance_as_instrument",
    kind: "biopsychosocial_pillar",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs:
      "Miedo al movimiento reframed en lifestyle_pillars + cbt_limiting_beliefs; no como escala de kinesiofobia validada en Chile.",
    noteEn:
      "Fear of movement reframed in lifestyle_pillars + cbt_limiting_beliefs; not as a Chile-validated kinesiophobia scale.",
  },
  self_efficacy_as_instrument: {
    id: "self_efficacy_as_instrument",
    kind: "biopsychosocial_pillar",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs: "Autoeficacia reframed como rasgo de pilar / recurso protector en lifestyle_pillars.",
    noteEn: "Self-efficacy reframed as a pillar feature / protective resource in lifestyle_pillars.",
  },
  social_support_as_instrument: {
    id: "social_support_as_instrument",
    kind: "biopsychosocial_pillar",
    validationStatus: "not_in_core_battery",
    inCoreBattery: false,
    noteEs: "Apoyo social reframed como pilar biopsicosocial en lifestyle_pillars.",
    noteEn: "Social support reframed as a biopsychosocial pillar in lifestyle_pillars.",
  },
};

export function getInstrumentPolicy(id: string): InstrumentPolicyEntry | undefined {
  return INSTRUMENT_POLICY[id];
}

export const CORE_BATTERY_IDS = Object.values(INSTRUMENT_POLICY)
  .filter((e) => e.inCoreBattery)
  .map((e) => e.id);
