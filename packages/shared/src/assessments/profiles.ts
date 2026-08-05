import type { ProbableProfile, RiskProtectionProfile } from "./scoring";

/**
 * Rule-engine catalog of probable profiles.
 * Language: orientation, never definitive diagnosis.
 */

export type ProbableProfileId =
  | "persistent_pain_compatible"
  | "high_functional_interference"
  | "elevated_stress"
  | "depressive_symptoms_relevant"
  | "iasp_nociceptive_leaning"
  | "iasp_neuropathic_leaning"
  | "iasp_nociplastic_leaning"
  | "iasp_mixed_leaning"
  | "chronic_temporality"
  | "cbt_automatic_thoughts_relevant"
  | "limiting_beliefs_block_therapy"
  | "pharmacology_myths_relevant"
  | "lifestyle_pillars_load"
  | "pain_psychotherapy_indicated"
  | "low_pain_understanding"
  | "low_specialist_continuity"
  | "high_protective_factors"
  | "multiple_biopsychosocial_risks";

export const PROBABLE_PROFILES: Record<ProbableProfileId, ProbableProfile> = {
  persistent_pain_compatible: {
    id: "persistent_pain_compatible",
    titleEs: "Compatible con dolor persistente",
    titleEn: "Compatible with persistent pain",
    explanationEs:
      "Describes dolor que persiste o vuelve por más de 3 meses. Eso encaja con la definición habitual de dolor crónico como experiencia prolongada, no como etiqueta definitiva de una sola causa.",
    explanationEn:
      "You describe pain that persists or returns for more than 3 months. That fits the usual definition of chronic pain as a prolonged experience, not as a definitive single-cause label.",
    whatItDoesNotMeanEs:
      "No significa que “todo esté en tu cabeza”, ni que no exista una causa tratable, ni que no merezcas atención médica.",
    whatItDoesNotMeanEn:
      "It does not mean “it is all in your head”, nor that there is no treatable cause, nor that you do not deserve medical care.",
    recommendedActions: [
      "Completar el programa de hitos de Neuropi empezando por “Entender tu dolor”",
      "Registrar intensidad y localización unos días para llevar a consulta",
      "Conversar con tu equipo de salud sobre un plan biopsicosocial e incluir psicoterapia del dolor",
    ],
  },
  high_functional_interference: {
    id: "high_functional_interference",
    titleEs: "Alta interferencia en la vida diaria",
    titleEn: "High interference in daily life",
    explanationEs:
      "El dolor está limitando de forma importante trabajo, hogar, relaciones o movilidad. Recuperar función, a menudo, es un objetivo tan válido como bajar la intensidad.",
    explanationEn:
      "Pain is significantly limiting work, home, relationships, or mobility. Restoring function is often as valid a goal as reducing intensity.",
    whatItDoesNotMeanEs:
      "No significa que seas “flojo/a” o que debas rendirte. Tampoco certifica discapacidad formal.",
    whatItDoesNotMeanEn:
      "It does not mean you are “lazy” or that you should give up. It also does not certify formal disability.",
    recommendedActions: [
      "Practicar pacing (alternar actividad y descanso)",
      "Elegir 1–2 actividades valiosas y subirlas de forma gradual",
      "Revisar con un profesional metas funcionales concretas",
    ],
  },
  elevated_stress: {
    id: "elevated_stress",
    titleEs: "Estrés percibido elevado",
    titleEn: "Elevated perceived stress",
    explanationEs:
      "En el último mes has sentido que las demandas superan con frecuencia tus recursos. El estrés agudo puede ser adaptativo; la carga sostenida puede amplificar la sensibilidad al dolor sin inventar el dolor.",
    explanationEn:
      "Over the last month you have often felt demands exceed your resources. Acute stress can be adaptive; sustained load can amplify pain sensitivity without inventing the pain.",
    whatItDoesNotMeanEs:
      "No diagnostica un trastorno por estrés ni implica que “solo estés estresado/a” o que el estrés “cause” el dolor como explicación primaria.",
    whatItDoesNotMeanEn:
      "It does not diagnose a stress disorder and does not imply you are “just stressed” or that stress “causes” pain as a primary explanation.",
    recommendedActions: [
      "Usar ejercicios de respiración y regulación de la biblioteca",
      "Revisar sueño y sobrecarga diaria (pilares)",
      "Pedir apoyo práctico o emocional si está disponible",
    ],
  },
  depressive_symptoms_relevant: {
    id: "depressive_symptoms_relevant",
    titleEs: "Síntomas de ánimo relevantes",
    titleEn: "Relevant mood symptoms",
    explanationEs:
      "Aparecen señales de ánimo bajo, energía o interés que vale la pena evaluar (PHQ-9). El ánimo puede amplificar el dolor; no se presenta como su causa primaria. Ambos merecen cuidado.",
    explanationEn:
      "Signals of low mood, energy, or interest appear that are worth evaluating (PHQ-9). Mood can amplify pain; it is not presented as its primary cause. Both deserve care.",
    whatItDoesNotMeanEs:
      "No significa “usted tiene depresión”. Es una orientación de tamizaje, no un diagnóstico clínico.",
    whatItDoesNotMeanEn:
      "It does not mean “you have depression”. It is screening guidance, not a clinical diagnosis.",
    recommendedActions: [
      "Conversar con un profesional de salud mental o tu médico",
      "Mantener ritmos mínimos de actividad y sueño",
      "Si hay pensamientos de daño (ítem 9), buscar ayuda inmediata (ruta PAP)",
    ],
  },
  iasp_nociceptive_leaning: {
    id: "iasp_nociceptive_leaning",
    titleEs: "Orientación: patrón más compatible con nociceptivo",
    titleEn: "Orientation: pattern more compatible with nociceptive",
    explanationEs:
      "Tus respuestas sugieren un patrón compatible con dolor más ligado a lesión/inflamación de tejidos. Es orientación IASP, no un diagnóstico de mecanismo.",
    explanationEn:
      "Your answers suggest a pattern compatible with pain more linked to tissue injury/inflammation. This is IASP orientation, not a mechanism diagnosis.",
    whatItDoesNotMeanEs:
      "No significa “tienes dolor nociceptivo” como etiqueta definitiva, ni que otros mecanismos estén ausentes.",
    whatItDoesNotMeanEn:
      "It does not mean “you have nociceptive pain” as a definitive label, nor that other mechanisms are absent.",
    recommendedActions: [
      "Revisar la orientación con tu clínico tratante",
      "Mantener movimiento seguro según indicación médica",
      "Usar psicoeducación de Neuropi sin automedicarte",
    ],
  },
  iasp_neuropathic_leaning: {
    id: "iasp_neuropathic_leaning",
    titleEs: "Orientación: patrón más compatible con neuropático",
    titleEn: "Orientation: pattern more compatible with neuropathic",
    explanationEs:
      "Tus respuestas sugieren un patrón compatible con rasgos neuropáticos (p. ej. ardor, descargas). Orientación, no diagnóstico.",
    explanationEn:
      "Your answers suggest a pattern compatible with neuropathic features (e.g. burning, shocks). Orientation, not diagnosis.",
    whatItDoesNotMeanEs:
      "No diagnostica neuropatía ni “tienes dolor neuropático” de forma definitiva.",
    whatItDoesNotMeanEn:
      "It does not diagnose neuropathy or definitively state “you have neuropathic pain”.",
    recommendedActions: [
      "Llevar esta orientación a tu médico o especialista",
      "Explorar psicoterapia del dolor como complemento del plan médico",
      "Evitar concluir solo desde la app",
    ],
  },
  iasp_nociplastic_leaning: {
    id: "iasp_nociplastic_leaning",
    titleEs: "Orientación: patrón más compatible con nociplástico",
    titleEn: "Orientation: pattern more compatible with nociplastic",
    explanationEs:
      "Tus respuestas sugieren un patrón compatible con sensibilización / dolor nociplástico. El dolor sigue siendo real. En estos perfiles suele ayudar explorar psicoterapia del dolor con tu equipo, junto al plan médico.",
    explanationEn:
      "Your answers suggest a pattern compatible with sensitization / nociplastic pain. The pain remains real. In these profiles it often helps to explore pain psychotherapy with your care team, alongside the medical plan.",
    whatItDoesNotMeanEs:
      "Nunca digas “tengo dolor nociplástico” como si fuera un diagnóstico cerrado. Los mecanismos pueden coexistir (IASP).",
    whatItDoesNotMeanEn:
      "Never say “I have nociplastic pain” as if it were a closed diagnosis. Mechanisms can coexist (IASP).",
    recommendedActions: [
      "Completar hitos de TCC / psicoterapia del dolor en Neuropi",
      "Buscar terapeuta con experiencia en dolor persistente",
      "Trabajar sueño, pacing y miedo al movimiento como pilares",
    ],
  },
  iasp_mixed_leaning: {
    id: "iasp_mixed_leaning",
    titleEs: "Orientación: patrón compatible con mecanismos mixtos",
    titleEn: "Orientation: pattern compatible with mixed mechanisms",
    explanationEs:
      "Tus respuestas sugieren un patrón compatible con más de un mecanismo a la vez. Según IASP, los mecanismos pueden coexistir. Eso no invalida tu dolor.",
    explanationEn:
      "Your answers suggest a pattern compatible with more than one mechanism at once. Per IASP, mechanisms can coexist. That does not invalidate your pain.",
    whatItDoesNotMeanEs:
      "No es un diagnóstico mixto formal ni un veredicto de “caso imposible”.",
    whatItDoesNotMeanEn:
      "It is not a formal mixed diagnosis or a verdict of an “impossible case”.",
    recommendedActions: [
      "Plan integral: médico + kinesio + psicoterapia del dolor cuando sea posible",
      "Priorizar un foco semanal (pacing, sueño o creencias)",
      "Usar la biblioteca de mecanismos y psicoterapia",
    ],
  },
  chronic_temporality: {
    id: "chronic_temporality",
    titleEs: "Temporalidad persistente (>3 meses)",
    titleEn: "Persistent temporality (>3 months)",
    explanationEs:
      "Describes un patrón temporal compatible con dolor persistente/crónico. Eso orienta el tipo de cuidado (función, creencias, pilares), además de la evaluación médica.",
    explanationEn:
      "You describe a temporal pattern compatible with persistent/chronic pain. That orients the kind of care (function, beliefs, pillars), alongside medical evaluation.",
    whatItDoesNotMeanEs:
      "No fija un pronóstico ni niega mejoría posible.",
    whatItDoesNotMeanEn:
      "It does not fix a prognosis or deny possible improvement.",
    recommendedActions: [
      "Seguir el programa por hitos sin saltar psicoeducación",
      "Incluir psicoterapia del dolor en el plan de continuidad",
    ],
  },
  cbt_automatic_thoughts_relevant: {
    id: "cbt_automatic_thoughts_relevant",
    titleEs: "Pensamientos automáticos relevantes (TCC)",
    titleEn: "Relevant automatic thoughts (CBT)",
    explanationEs:
      "Aparecen pensamientos tipo catastrofista sobre el dolor. Esto es orientación psicoeducativa inspirada en TCC-CP; no es la escala PCS validada en Chile.",
    explanationEn:
      "Catastrophizing-style thoughts about pain appear. This is CBT-CP-inspired psychoeducational orientation; not the Chile-validated PCS scale.",
    whatItDoesNotMeanEs:
      "No significa que “te inventes” el dolor. Significa que la mente puede subir el volumen de la amenaza.",
    whatItDoesNotMeanEn:
      "It does not mean you are “making up” the pain. It means the mind can turn up the volume of threat.",
    recommendedActions: [
      "Hito de pensamientos y miedo en el programa Neuropi",
      "Practicar observar el pensamiento sin pelear contigo",
      "Considerar TCC para dolor con un/a clínico/a",
    ],
  },
  limiting_beliefs_block_therapy: {
    id: "limiting_beliefs_block_therapy",
    titleEs: "Creencias que pueden cerrar la puerta a la terapia",
    titleEn: "Beliefs that may close the door to therapy",
    explanationEs:
      "Hay creencias (p. ej. “solo fármacos/cirugía”, “psicología = imaginario”, “moverse daña”) que suelen bloquear un cuidado integral. Trabajarlas abre espacio a la psicoterapia del dolor como parte posible del cuidado — sin negar que tu dolor es real.",
    explanationEn:
      "Beliefs (e.g. “only drugs/surgery”, “psychology = imaginary”, “moving harms”) often block integrated care. Working on them opens space for pain psychotherapy as a possible part of care — without denying that your pain is real.",
    whatItDoesNotMeanEs:
      "No te culpa. Estas creencias son frecuentes y aprendidas; se pueden revisar con respeto.",
    whatItDoesNotMeanEn:
      "It does not blame you. These beliefs are common and learned; they can be reviewed with respect.",
    recommendedActions: [
      "Escuchar audios de “Psicoterapia del dolor” en la biblioteca",
      "Preparar preguntas para un/a psicólogo/a del dolor",
      "Revisar miedo al movimiento con pacing guiado",
    ],
  },
  pharmacology_myths_relevant: {
    id: "pharmacology_myths_relevant",
    titleEs: "Mitos o miedos sobre medicamentos",
    titleEn: "Myths or fears about medications",
    explanationEs:
      "Aparecen ideas frecuentes (alivio instantáneo, adicción inevitable, “más dosis = más alivio”). Neuropi no prescribe: la claridad se construye con tu clínico tratante.",
    explanationEn:
      "Common ideas appear (instant relief, inevitable addiction, “more dose = more relief”). Neuropi does not prescribe: clarity is built with your treating clinician.",
    whatItDoesNotMeanEs:
      "No es indicación de iniciar, suspender o cambiar fármacos.",
    whatItDoesNotMeanEn:
      "It is not an instruction to start, stop, or change medications.",
    recommendedActions: [
      "Llevar una lista de dudas a la próxima consulta",
      "No ajustar dosis por tu cuenta",
      "Combinar plan farmacológico con pilares y psicoterapia cuando corresponda",
    ],
  },
  lifestyle_pillars_load: {
    id: "lifestyle_pillars_load",
    titleEs: "Carga en pilares biopsicosociales",
    titleEn: "Load on biopsychosocial pillars",
    explanationEs:
      "Sueño, movimiento, nutrición, apoyo social, sustancias o carga de estrés sostenida aparecen como factores que pueden amplificar o amortiguar la experiencia de dolor. No son instrumentos diagnósticos ni “la causa” primaria del dolor.",
    explanationEn:
      "Sleep, movement, nutrition, social support, substances, or sustained stress load appear as factors that may amplify or buffer the pain experience. They are not diagnostic instruments nor the primary “cause” of pain.",
    whatItDoesNotMeanEs:
      "No reduce tu dolor a “mal estilo de vida” ni culpa tu ansiedad o ánimo como origen único.",
    whatItDoesNotMeanEn:
      "It does not reduce your pain to “bad lifestyle” or blame anxiety/mood as the sole origin.",
    recommendedActions: [
      "Elegir un pilar de la semana (sueño o movimiento seguro)",
      "Fortalecer autoeficacia y apoyo social como recursos",
      "Integrar pilares en psicoterapia del dolor",
    ],
  },
  pain_psychotherapy_indicated: {
    id: "pain_psychotherapy_indicated",
    titleEs: "Psicoterapia del dolor: suele ser útil considerar para tu perfil",
    titleEn: "Pain psychotherapy: often useful to consider for your profile",
    explanationEs:
      "Al combinar dolor persistente con creencias y/o orientación de mecanismos, el cuidado psicológico especializado del dolor suele ser útil para entender y tratar tu perfil — junto al plan médico, no en su lugar. La indicación formal la define tu equipo clínico.",
    explanationEn:
      "Combining persistent pain with beliefs and/or mechanism orientation, specialized psychological pain care is often useful to understand and treat your profile — alongside the medical plan, not instead of it. Formal indication belongs to your clinical team.",
    whatItDoesNotMeanEs:
      "No niega tu dolor ni dice que “todo es psicológico”. No reemplaza evaluación médica ni es una indicación clínica emitida por la app.",
    whatItDoesNotMeanEn:
      "It does not deny your pain or say “it is all psychological”. It does not replace medical evaluation and is not a clinical indication issued by the app.",
    recommendedActions: [
      "Completar el hito “Psicoterapia del dolor y plan de continuidad”",
      "Buscar terapeuta con experiencia en dolor persistente en Chile",
      "Usar Neuropi como complemento entre sesiones, no como sustituto",
    ],
  },
  low_pain_understanding: {
    id: "low_pain_understanding",
    titleEs: "Espacio para comprender mejor el dolor",
    titleEn: "Room to better understand pain",
    explanationEs:
      "Indicaste que ideas clave (dolor crónico como fenómeno complejo y existencia de psicoterapia del dolor) son nuevas o poco claras. La educación puede reducir miedo y abrir opciones de cuidado.",
    explanationEn:
      "You indicated that key ideas (chronic pain as a complex phenomenon and the existence of pain psychotherapy) are new or unclear. Education can reduce fear and open care options.",
    whatItDoesNotMeanEs:
      "No significa falta de inteligencia. Significa que el sistema de salud a menudo no explica bien el dolor persistente.",
    whatItDoesNotMeanEn:
      "It does not mean a lack of intelligence. It means the health system often fails to explain persistent pain well.",
    recommendedActions: [
      "Completar el hito “Entender tu dolor”",
      "Escuchar audiolecciones de “Entender el dolor” y “Psicoterapia del dolor”",
      "Llevar preguntas preparadas a tu próxima consulta",
    ],
  },
  low_specialist_continuity: {
    id: "low_specialist_continuity",
    titleEs: "Continuidad de cuidado a fortalecer",
    titleEn: "Care continuity to strengthen",
    explanationEs:
      "El seguimiento con especialista es limitado o ausente, o solo hay atención general. La continuidad ayuda a integrar tratamientos y a no quedarse solo/a con el dolor.",
    explanationEn:
      "Specialist follow-up is limited or absent, or only primary care is available. Continuity helps integrate treatments and not face pain alone.",
    whatItDoesNotMeanEs:
      "No invalida la atención en APS ni implica que debas “exigir” un especialista si no es accesible. Sí sugiere buscar la mejor red posible.",
    whatItDoesNotMeanEn:
      "It does not invalidate primary care and does not mean you must “demand” a specialist if inaccessible. It does suggest seeking the best network possible.",
    recommendedActions: [
      "Preparar un resumen para tu próxima consulta en APS",
      "Preguntar por derivación a especialidad, unidad de dolor o psicología del dolor si corresponde",
      "Usar el reporte de Neuropi como apoyo de conversación",
    ],
  },
  high_protective_factors: {
    id: "high_protective_factors",
    titleEs: "Factores protectores presentes",
    titleEn: "Protective factors present",
    explanationEs:
      "Aparecen recursos importantes: sensación de capacidad frente al dolor y/o apoyo social (pilares). Estos factores predicen mejor adaptación y merecen reconocerse.",
    explanationEn:
      "Important resources appear: a sense of capacity with pain and/or social support (pillars). These factors predict better adaptation and deserve recognition.",
    whatItDoesNotMeanEs:
      "No significa que “ya no necesites ayuda”. Significa que tienes bases sobre las cuales construir.",
    whatItDoesNotMeanEn:
      "It does not mean you “no longer need help”. It means you have foundations to build on.",
    recommendedActions: [
      "Nombrar y fortalecer lo que ya te ayuda",
      "Compartir avances con alguien de confianza",
      "Usar esos recursos al enfrentar flare-ups",
    ],
  },
  multiple_biopsychosocial_risks: {
    id: "multiple_biopsychosocial_risks",
    titleEs: "Varios factores biopsicosociales a la vez",
    titleEn: "Several biopsychosocial factors at once",
    explanationEs:
      "Se concentran varios ejes (estrés, ánimo, creencias, pilares, interferencia). Eso es frecuente en dolor persistente y se aborda mejor por capas, no de golpe — idealmente con psicoterapia del dolor.",
    explanationEn:
      "Several axes concentrate (stress, mood, beliefs, pillars, interference). That is common in persistent pain and is best addressed in layers, not all at once — ideally with pain psychotherapy.",
    whatItDoesNotMeanEs:
      "No significa que tu caso sea “imposible” ni que debas resolverlo todo esta semana.",
    whatItDoesNotMeanEn:
      "It does not mean your case is “impossible” or that you must solve everything this week.",
    recommendedActions: [
      "Elegir un solo foco de la semana (sueño, pacing o creencias)",
      "Seguir el programa por hitos sin saltar etapas",
      "Considerar evaluación interdisciplinaria cuando sea posible",
    ],
  },
};

export function getProbableProfile(id: ProbableProfileId): ProbableProfile {
  return PROBABLE_PROFILES[id];
}

/**
 * Resolves profile objects from a risk/protection result.
 */
export function resolveProbableProfiles(
  profile: RiskProtectionProfile,
): ProbableProfile[] {
  return profile.probableProfileIds
    .filter((id): id is ProbableProfileId => id in PROBABLE_PROFILES)
    .map((id) => PROBABLE_PROFILES[id]);
}

export const PROBABLE_PROFILE_IDS = Object.keys(
  PROBABLE_PROFILES,
) as ProbableProfileId[];
