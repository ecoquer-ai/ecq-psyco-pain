/**
 * Safety / red-flag / PAP-aligned crisis copy.
 * Clinical prudence: guide toward care, never alarm without pathway.
 * App does NOT deliver full PAP therapy or diagnose PTSD.
 */

export const SAFETY_COPY = {
  screenTitleEs: "Antes de continuar: señales que no deben esperar",
  screenTitleEn: "Before continuing: signals that should not wait",
  introEs:
    "Algunas situaciones requieren atención médica o de urgencia ahora, no una app. Revisa con calma. Si alguna te representa, prioriza cuidarte en persona.",
  introEn:
    "Some situations need medical or emergency care now, not an app. Review calmly. If any apply to you, prioritize in-person care.",
  ifYesTitleEs: "Si respondiste que sí a alguna",
  ifYesTitleEn: "If you answered yes to any",
  ifYesBodyEs:
    "Te recomendamos contactar a tu médico, ir a un servicio de urgencia o llamar a un número de emergencia según tu situación. Neuropi puede acompañarte después; ahora lo primero es tu seguridad.",
  ifYesBodyEn:
    "We recommend contacting your doctor, going to emergency services, or calling an emergency number as appropriate. Neuropi can support you afterward; your safety comes first now.",
  ifNoTitleEs: "Si ninguna te representa ahora",
  ifNoTitleEn: "If none apply right now",
  ifNoBodyEs:
    "Puedes continuar con el tamizaje. Si en cualquier momento aparece una señal urgente, detente y busca atención.",
  ifNoBodyEn:
    "You can continue with the screening. If an urgent signal appears at any time, stop and seek care.",
  chileEmergencyHintEs:
    "En Chile, ante una emergencia puedes llamar al 131 (SAMU) o acudir al servicio de urgencia más cercano. Para orientación en salud: Salud Responde 600 360 7777. Si tienes dudas, contacta a tu centro de salud o a un profesional de confianza.",
  chileEmergencyHintEn:
    "In Chile, for an emergency you can call 131 (SAMU) or go to the nearest emergency service. For health guidance: Salud Responde 600 360 7777. If unsure, contact your health center or a trusted professional.",
  crisisMentalEs:
    "Si tienes pensamientos de hacerte daño o de que la vida no vale la pena —incluido un PHQ-9 ítem 9 positivo— busca apoyo inmediato: urgencia, Salud Responde 600 360 7777, SAMU 131, o alguien de confianza. No estás solo/a.",
  crisisMentalEn:
    "If you have thoughts of harming yourself or that life is not worth living —including a positive PHQ-9 item 9— seek immediate support: emergency care, Salud Responde 600 360 7777, SAMU 131, or someone you trust. You are not alone.",
  papAbcdeTitleEs: "Orientación para quien te acompaña (espíritu PAP-ABCDE)",
  papAbcdeTitleEn: "Orientation for whoever supports you (PAP-ABCDE spirit)",
  papAbcdeBodyEs:
    "Inspirado en el protocolo PAP-ABCDE (UC Chile): (A) Escucha activa sin juzgar; (B) Respiración / bajar activación juntos; (C) Categorizar necesidades urgentes vs. diferibles; (D) Derivación a ayuda profesional o urgencia; (E) Psicoeducación breve y esperanza realista. Neuropi NO entrega terapia PAP completa ni diagnostica TEPT.",
  papAbcdeBodyEn:
    "Inspired by the PAP-ABCDE protocol (UC Chile): (A) Active listening without judgment; (B) Breathing / lower activation together; (C) Categorize urgent vs. deferrable needs; (D) Derivation to professional help or emergency care; (E) Brief psychoeducation and realistic hope. Neuropi does NOT deliver full PAP therapy or diagnose PTSD.",
  chileCrisisNumbersEs:
    "Números útiles en Chile: Salud Responde 600 360 7777 · SAMU 131 · Servicio de urgencia más cercano.",
  chileCrisisNumbersEn:
    "Useful numbers in Chile: Salud Responde 600 360 7777 · SAMU 131 · Nearest emergency service.",
  disclaimerEs:
    "Estas preguntas no reemplazan el criterio médico. Ante la duda, es preferible consultar.",
  disclaimerEn:
    "These questions do not replace medical judgment. When in doubt, it is better to seek care.",
  continueCtaEs: "Ninguna de estas señales me representa ahora",
  continueCtaEn: "None of these signals apply to me now",
  seekCareCtaEs: "Necesito orientación para buscar atención",
  seekCareCtaEn: "I need guidance to seek care",
} as const;

export const RED_FLAG_ITEMS = [
  {
    id: "rf_chest_breath",
    textEs:
      "Dolor en el pecho, dificultad para respirar o sensación de ahogo reciente e intensa",
    textEn:
      "Chest pain, difficulty breathing, or recent intense feeling of suffocation",
    urgency: "emergency" as const,
  },
  {
    id: "rf_neuro_sudden",
    textEs:
      "Debilidad súbita, pérdida de sensibilidad, dificultad para hablar, o alteración de la visión de aparición rápida",
    textEn:
      "Sudden weakness, loss of sensation, difficulty speaking, or rapid-onset vision changes",
    urgency: "emergency" as const,
  },
  {
    id: "rf_bowel_bladder",
    textEs:
      "Pérdida de control de orina o deposiciones, o adormecimiento en la zona genital / “en silla de montar”",
    textEn:
      "Loss of bowel or bladder control, or numbness in the genital / “saddle” area",
    urgency: "emergency" as const,
  },
  {
    id: "rf_trauma_fracture",
    textEs:
      "Dolor intenso tras un golpe, caída o accidente, con sospecha de fractura o lesión grave",
    textEn:
      "Intense pain after a blow, fall, or accident, with suspected fracture or serious injury",
    urgency: "urgent" as const,
  },
  {
    id: "rf_fever_infection",
    textEs:
      "Fiebre alta, escalofríos, enrojecimiento o inflamación marcada junto con el dolor",
    textEn:
      "High fever, chills, marked redness or swelling together with the pain",
    urgency: "urgent" as const,
  },
  {
    id: "rf_unexplained_weight",
    textEs:
      "Baja de peso no intencional importante, sudores nocturnos o cansancio extremo reciente sin explicación",
    textEn:
      "Significant unintentional weight loss, night sweats, or extreme recent unexplained fatigue",
    urgency: "urgent" as const,
  },
  {
    id: "rf_cancer_history",
    textEs:
      "Antecedente de cáncer y dolor nuevo o que cambia de carácter de forma preocupante",
    textEn:
      "History of cancer and new pain or pain that changes character in a worrying way",
    urgency: "urgent" as const,
  },
  {
    id: "rf_self_harm",
    textEs:
      "Pensamientos de hacerte daño, de no querer seguir viviendo, o de que otros estarían mejor sin ti",
    textEn:
      "Thoughts of harming yourself, of not wanting to go on living, or that others would be better off without you",
    urgency: "crisis" as const,
  },
] as const;

export type RedFlagItemId = (typeof RED_FLAG_ITEMS)[number]["id"];
