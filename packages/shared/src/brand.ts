/**
 * Public brand and clinical posture for Neuropi.
 * Internal technical name remains ecq-psyco-pain.
 */

export const PUBLIC_BRAND = "Neuropi" as const;

export const TAGLINE =
  "Nuevo enfoque para el dolor" as const;

export const TECHNICAL_NAME = "ecq-psyco-pain" as const;

export const CLINICAL_DISCLAIMER = {
  es: [
    "Neuropi es una herramienta de tamizaje, orientación y educación sobre dolor persistente (enfoque biopsicosocial / neuroplasticidad).",
    "Presenta como instrumentos psicométricos con uso/validación o adaptación documentada en Chile en esta versión: PHQ-9 y PSS-10. El tamizaje de dolor chileno es un cribado inspirado en dominios publicados (no una escala Neuropi validada). El resto son módulos psicoeducativos.",
    "No diagnostica depresión, TEPT, mecanismos IASP ni dolor crónico de forma definitiva.",
    "No reemplaza la evaluación de un profesional de la salud ni la relación terapéutica; no prescribe medicamentos.",
    "Si presentas síntomas urgentes o te sientes en peligro, busca atención inmediata (Salud Responde 600 360 7777, SAMU 131, urgencias).",
  ].join(" "),
  en: [
    "Neuropi is a screening, guidance, and education tool for persistent pain (biopsychosocial / neuroplasticity approach).",
    "It presents as psychometric instruments with documented Chile use/validation or adaptation in this version: PHQ-9 and PSS-10. The Chilean pain screen is a crib inspired by published domains (not a Neuropi-validated scale). The rest are psychoeducational modules.",
    "It does not definitively diagnose depression, PTSD, IASP mechanisms, or chronic pain.",
    "It does not replace assessment by a healthcare professional or the therapeutic relationship; it does not prescribe medication.",
    "If you have urgent symptoms or feel unsafe, seek immediate care (Salud Responde 600 360 7777, SAMU 131, emergency services).",
  ].join(" "),
} as const;

export const BRAND = {
  publicName: PUBLIC_BRAND,
  tagline: TAGLINE,
  technicalName: TECHNICAL_NAME,
  disclaimer: CLINICAL_DISCLAIMER,
} as const;
