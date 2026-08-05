/**
 * Guided therapy milestones for Neuropi.
 * Inspired by product brief; original content stubs.
 */

export type LessonType = "lesson" | "audio" | "exercise" | "checkin" | "reflection";

export interface MilestoneLesson {
  id: string;
  titleEs: string;
  titleEn: string;
  durationMin: number;
  type: LessonType;
  summaryEs: string;
  summaryEn: string;
}

export interface Milestone {
  id: string;
  order: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  lessons: MilestoneLesson[];
}

export const MILESTONES: Milestone[] = [
  {
    id: "m1_understand_pain",
    order: 1,
    titleEs: "Entender tu dolor",
    titleEn: "Understand your pain",
    descriptionEs:
      "Validamos que tu dolor es real y abrimos una explicación simple de por qué el dolor puede persistir.",
    descriptionEn:
      "We validate that your pain is real and open a simple explanation of why pain can persist.",
    lessons: [
      {
        id: "m1_l1",
        titleEs: "Tu dolor es real",
        titleEn: "Your pain is real",
        durationMin: 8,
        type: "audio",
        summaryEs: "Validación clínica y humana: el dolor no es imaginario.",
        summaryEn: "Clinical and human validation: pain is not imaginary.",
      },
      {
        id: "m1_l2",
        titleEs: "Por qué el dolor puede durar más de 3 meses",
        titleEn: "Why pain can last more than 3 months",
        durationMin: 10,
        type: "lesson",
        summaryEs: "Introducción breve a la neurociencia del dolor persistente.",
        summaryEn: "Brief introduction to persistent pain neuroscience.",
      },
      {
        id: "m1_l3",
        titleEs: "Qué aprendí sobre mi dolor",
        titleEn: "What I learned about my pain",
        durationMin: 5,
        type: "reflection",
        summaryEs: "Escritura breve para integrar la psicoeducación.",
        summaryEn: "Short writing to integrate psychoeducation.",
      },
      {
        id: "m1_l4",
        titleEs: "Check-in de comprensión",
        titleEn: "Understanding check-in",
        durationMin: 3,
        type: "checkin",
        summaryEs: "Tres preguntas suaves para anclar lo aprendido.",
        summaryEn: "Three gentle questions to anchor what you learned.",
      },
    ],
  },
  {
    id: "m2_calm_nervous_system",
    order: 2,
    titleEs: "Calmar el sistema nervioso",
    titleEn: "Calm the nervous system",
    descriptionEs:
      "Aprendes herramientas de regulación para bajar la alerta sin negar el dolor.",
    descriptionEn:
      "You learn regulation tools to lower alertness without denying the pain.",
    lessons: [
      {
        id: "m2_l1",
        titleEs: "El cuerpo en alerta",
        titleEn: "The body on alert",
        durationMin: 7,
        type: "lesson",
        summaryEs: "Cómo estrés y amenaza percibida interactúan con el dolor.",
        summaryEn: "How stress and perceived threat interact with pain.",
      },
      {
        id: "m2_l2",
        titleEs: "Respiración ancla (4-6)",
        titleEn: "Anchor breathing (4-6)",
        durationMin: 6,
        type: "exercise",
        summaryEs: "Práctica guiada de respiración lenta.",
        summaryEn: "Guided slow breathing practice.",
      },
      {
        id: "m2_l3",
        titleEs: "Audio: suelo seguro",
        titleEn: "Audio: safe ground",
        durationMin: 8,
        type: "audio",
        summaryEs: "Regulación sensorial suave orientada a seguridad.",
        summaryEn: "Gentle sensory regulation oriented to safety.",
      },
      {
        id: "m2_l4",
        titleEs: "Qué me calma de verdad",
        titleEn: "What truly calms me",
        durationMin: 5,
        type: "reflection",
        summaryEs: "Identificar recursos personales de regulación.",
        summaryEn: "Identify personal regulation resources.",
      },
    ],
  },
  {
    id: "m3_safe_movement",
    order: 3,
    titleEs: "Moverte con seguridad",
    titleEn: "Move safely",
    descriptionEs:
      "Recuperas confianza en el movimiento con dosis pequeñas y seguras.",
    descriptionEn:
      "You rebuild confidence in movement with small, safe doses.",
    lessons: [
      {
        id: "m3_l1",
        titleEs: "Movimiento no es enemigo",
        titleEn: "Movement is not the enemy",
        durationMin: 8,
        type: "lesson",
        summaryEs: "Desarmar la idea de que moverse siempre daña.",
        summaryEn: "Disarm the idea that moving always harms.",
      },
      {
        id: "m3_l2",
        titleEs: "Micro-movimiento del día",
        titleEn: "Micro-movement of the day",
        durationMin: 7,
        type: "exercise",
        summaryEs: "Secuencia breve y adaptable a tu nivel.",
        summaryEn: "Short sequence adaptable to your level.",
      },
      {
        id: "m3_l3",
        titleEs: "Check-in de miedo al movimiento",
        titleEn: "Fear-of-movement check-in",
        durationMin: 3,
        type: "checkin",
        summaryEs: "Registrar temor y tolerancia después de moverte.",
        summaryEn: "Log fear and tolerance after moving.",
      },
    ],
  },
  {
    id: "m4_pacing_flareups",
    order: 4,
    titleEs: "Pacing y prevención de flare-ups",
    titleEn: "Pacing and flare-up prevention",
    descriptionEs:
      "Aprendes a dosificar actividad para evitar el ciclo de sobreesfuerzo y colapso.",
    descriptionEn:
      "You learn to dose activity to avoid the boom-and-bust cycle.",
    lessons: [
      {
        id: "m4_l1",
        titleEs: "El ciclo hacer-demasiado / pagar-después",
        titleEn: "The overdo / pay-later cycle",
        durationMin: 9,
        type: "lesson",
        summaryEs: "Reconocer el patrón de sobreesfuerzo y flare-up.",
        summaryEn: "Recognize the overexertion and flare-up pattern.",
      },
      {
        id: "m4_l2",
        titleEs: "Plan de pacing de 24 horas",
        titleEn: "24-hour pacing plan",
        durationMin: 10,
        type: "exercise",
        summaryEs: "Diseñar bloques de actividad y descanso.",
        summaryEn: "Design activity and rest blocks.",
      },
      {
        id: "m4_l3",
        titleEs: "Plan suave ante un flare-up",
        titleEn: "Gentle flare-up plan",
        durationMin: 8,
        type: "audio",
        summaryEs: "Pasos de cuidado cuando el dolor sube sin culparte.",
        summaryEn: "Care steps when pain rises without self-blame.",
      },
      {
        id: "m4_l4",
        titleEs: "Qué haré distinto esta semana",
        titleEn: "What I will do differently this week",
        durationMin: 5,
        type: "reflection",
        summaryEs: "Un compromiso concreto y alcanzable.",
        summaryEn: "One concrete, achievable commitment.",
      },
    ],
  },
  {
    id: "m5_thoughts_fear_selfcare",
    order: 5,
    titleEs: "Pensamientos, miedo y autocuidado",
    titleEn: "Thoughts, fear, and self-care",
    descriptionEs:
      "Observas pensamientos automáticos y creencias limitantes. La TCC del dolor no niega tu dolor: suele ayudar a entender y trabajar tu perfil junto al cuidado médico.",
    descriptionEn:
      "You notice automatic thoughts and limiting beliefs. Pain CBT does not deny your pain: it often helps understand and work on your profile alongside medical care.",
    lessons: [
      {
        id: "m5_l1",
        titleEs: "Pensamientos que encienden el dolor",
        titleEn: "Thoughts that turn pain up",
        durationMin: 9,
        type: "lesson",
        summaryEs:
          "Introducción a TCC del dolor: pensamientos automáticos (orientación, no escala PCS Chile).",
        summaryEn:
          "Intro to pain CBT: automatic thoughts (orientation, not Chile PCS scale).",
      },
      {
        id: "m5_l2",
        titleEs: "Creencias que cierran la puerta a la terapia",
        titleEn: "Beliefs that close the door to therapy",
        durationMin: 8,
        type: "lesson",
        summaryEs:
          "Desarmar “solo fármacos/cirugía” y “psicología = imaginario” sin invalidar el dolor.",
        summaryEn:
          "Disarm “only drugs/surgery” and “psychology = imaginary” without invalidating pain.",
      },
      {
        id: "m5_l3",
        titleEs: "Ejercicio: pensamiento → cuerpo → acción",
        titleEn: "Exercise: thought → body → action",
        durationMin: 8,
        type: "exercise",
        summaryEs: "Mapear una situación reciente con calma.",
        summaryEn: "Map a recent situation calmly.",
      },
      {
        id: "m5_l4",
        titleEs: "Por qué la psicoterapia del dolor puede ayudarme",
        titleEn: "Why pain psychotherapy may help me",
        durationMin: 6,
        type: "reflection",
        summaryEs:
          "Escribir en qué sentido la terapia psicológica del dolor puede ser útil para tu perfil.",
        summaryEn:
          "Write how psychological pain therapy may be useful for your profile.",
      },
    ],
  },
  {
    id: "m6_sleep_energy_lifestyle",
    order: 6,
    titleEs: "Sueño, energía y estilo de vida",
    titleEn: "Sleep, energy, and lifestyle",
    descriptionEs:
      "Cuidas el sueño y la energía como pilares del sistema nervioso y la recuperación.",
    descriptionEn:
      "You care for sleep and energy as pillars of the nervous system and recovery.",
    lessons: [
      {
        id: "m6_l1",
        titleEs: "Dolor y sueño: un círculo que se puede suavizar",
        titleEn: "Pain and sleep: a circle that can soften",
        durationMin: 8,
        type: "lesson",
        summaryEs: "Cómo el sueño alterado y el dolor se alimentan mutuamente.",
        summaryEn: "How disrupted sleep and pain feed each other.",
      },
      {
        id: "m6_l2",
        titleEs: "Rutina de bajada nocturna",
        titleEn: "Night wind-down routine",
        durationMin: 10,
        type: "exercise",
        summaryEs: "Diseñar 20–30 minutos de transición al sueño.",
        summaryEn: "Design 20–30 minutes of transition to sleep.",
      },
      {
        id: "m6_l3",
        titleEs: "Audio: descanso sin pelear",
        titleEn: "Audio: rest without fighting",
        durationMin: 9,
        type: "audio",
        summaryEs: "Práctica para noches difíciles sin exigencia de dormirse.",
        summaryEn: "Practice for hard nights without demanding sleep.",
      },
      {
        id: "m6_l4",
        titleEs: "Check-in de energía",
        titleEn: "Energy check-in",
        durationMin: 3,
        type: "checkin",
        summaryEs: "Registrar sueño y energía por tres días.",
        summaryEn: "Log sleep and energy for three days.",
      },
    ],
  },
  {
    id: "m7_trust_body",
    order: 7,
    titleEs: "Volver a confiar en tu cuerpo",
    titleEn: "Trust your body again",
    descriptionEs:
      "Reconectas con valores, sentido y una relación menos hostil con tu cuerpo.",
    descriptionEn:
      "You reconnect with values, meaning, and a less hostile relationship with your body.",
    lessons: [
      {
        id: "m7_l1",
        titleEs: "El cuerpo como aliado imperfecto",
        titleEn: "The body as an imperfect ally",
        durationMin: 8,
        type: "lesson",
        summaryEs: "Reencuadrar la relación cuerpo–dolor–identidad.",
        summaryEn: "Reframe the body–pain–identity relationship.",
      },
      {
        id: "m7_l2",
        titleEs: "Valores: qué sí importa aunque duela",
        titleEn: "Values: what still matters even when it hurts",
        durationMin: 10,
        type: "exercise",
        summaryEs: "Clarificar 2–3 valores y un paso pequeño alineado.",
        summaryEn: "Clarify 2–3 values and one small aligned step.",
      },
      {
        id: "m7_l3",
        titleEs: "Reflexión: gracias, cuerpo",
        titleEn: "Reflection: thank you, body",
        durationMin: 6,
        type: "reflection",
        summaryEs: "Práctica de gratitud realista, no forzada.",
        summaryEn: "Realistic, not forced, gratitude practice.",
      },
    ],
  },
  {
    id: "m8_pain_psychotherapy_continuity",
    order: 8,
    titleEs: "Psicoterapia del dolor y plan de continuidad",
    titleEn: "Pain psychotherapy and continuity plan",
    descriptionEs:
      "Consolidamos por qué la psicoterapia del dolor suele ser útil para tu tipo de dolor, y armamos un plan real más allá de la app.",
    descriptionEn:
      "We consolidate why pain psychotherapy is often useful for your pain type, and build a real plan beyond the app.",
    lessons: [
      {
        id: "m8_l1",
        titleEs: "Qué es (y qué no es) la psicoterapia del dolor",
        titleEn: "What pain psychotherapy is (and is not)",
        durationMin: 10,
        type: "lesson",
        summaryEs:
          "TCC/ACT y rehabilitación psicológica: no niega el dolor; trata el perfil biopsicosocial.",
        summaryEn:
          "CBT/ACT and psychological rehab: does not deny pain; treats the biopsychosocial profile.",
      },
      {
        id: "m8_l2",
        titleEs: "Tu perfil: por qué la terapia es parte del tratamiento",
        titleEn: "Your profile: why therapy is part of treatment",
        durationMin: 8,
        type: "lesson",
        summaryEs:
          "Vincular mecanismos/creencias/pilares con el valor de explorar psicoterapia clínica del dolor.",
        summaryEn:
          "Link mechanisms/beliefs/pillars to the value of exploring clinical pain psychotherapy.",
      },
      {
        id: "m8_l3",
        titleEs: "Preguntas para buscar un/a terapeuta",
        titleEn: "Questions for finding a therapist",
        durationMin: 7,
        type: "audio",
        summaryEs: "Guía práctica para la búsqueda de ayuda profesional en Chile.",
        summaryEn: "Practical guide to seeking professional help in Chile.",
      },
      {
        id: "m8_l4",
        titleEs: "Mi plan de continuidad 30 días",
        titleEn: "My 30-day continuity plan",
        durationMin: 12,
        type: "exercise",
        summaryEs: "Definir hábitos, señales de alerta, red de apoyo y primer contacto terapéutico.",
        summaryEn: "Define habits, warning signs, support network, and first therapy contact.",
      },
      {
        id: "m8_l5",
        titleEs: "Cierre del camino Neuropi",
        titleEn: "Closing the Neuropi path",
        durationMin: 5,
        type: "reflection",
        summaryEs: "Celebrar avances sin promesas mágicas de cura.",
        summaryEn: "Celebrate progress without magical cure promises.",
      },
      {
        id: "m8_l6",
        titleEs: "Check-in final",
        titleEn: "Final check-in",
        durationMin: 3,
        type: "checkin",
        summaryEs: "Revisar comprensión, función y próximos pasos hacia terapia.",
        summaryEn: "Review understanding, function, and next steps toward therapy.",
      },
    ],
  },
];

export function getMilestoneById(id: string): Milestone | undefined {
  return MILESTONES.find((m) => m.id === id);
}

export function getMilestoneByOrder(order: number): Milestone | undefined {
  return MILESTONES.find((m) => m.order === order);
}
