/**
 * Seed catalog for Biblioteca Neuropi.
 * Original Spanish (Chile) content — warm clinical tone.
 * Not licensed third-party book text.
 * Video/audio demos use public-domain / Creative Commons placeholders or isDemo.
 */

export type LibraryCategoryId =
  | "understand_pain"
  | "nervous_system"
  | "safe_movement"
  | "sleep"
  | "trust_body"
  | "talk_doctor"
  | "pain_psychotherapy"
  | "recovery_stories"
  | "guided_exercises";

export type LibraryItemType =
  | "audio_lesson"
  | "video_lesson"
  | "meditation"
  | "breathing"
  | "psychoeducation_card"
  | "medical_consult_question"
  | "psychotherapy_question";

export interface LibraryCategory {
  id: LibraryCategoryId;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
}

export interface LibraryItem {
  id: string;
  type: LibraryItemType;
  categoryId: LibraryCategoryId;
  titleEs: string;
  titleEn: string;
  summaryEs: string;
  summaryEn: string;
  durationMin?: number;
  bodyEs?: string;
  bodyEn?: string;
  tags: string[];
  /** Media URL — empty when isDemo and asset not yet produced. */
  url?: string;
  /** True for placeholder / demo media (e.g. Big Buck Bunny public domain). */
  isDemo?: boolean;
  /** Audio (and some cards) can be read aloud by the client. */
  supportsReadAloud?: boolean;
}

export const LIBRARY_CATEGORIES: LibraryCategory[] = [
  {
    id: "understand_pain",
    nameEs: "Entender el dolor",
    nameEn: "Understand pain",
    descriptionEs: "Psicoeducación clara sobre dolor persistente.",
  },
  {
    id: "nervous_system",
    nameEs: "Calmar el sistema nervioso",
    nameEn: "Calm the nervous system",
    descriptionEs: "Regulación, respiración y baja de alerta.",
  },
  {
    id: "safe_movement",
    nameEs: "Moverse sin flare-up",
    nameEn: "Move without flare-up",
    descriptionEs: "Movimiento seguro, gradual y con pacing.",
  },
  {
    id: "sleep",
    nameEs: "Dormir mejor",
    nameEn: "Sleep better",
    descriptionEs: "Sueño, descanso y noches difíciles.",
  },
  {
    id: "trust_body",
    nameEs: "Volver a confiar en tu cuerpo",
    nameEn: "Trust your body again",
    descriptionEs: "Relación con el cuerpo, valores y sentido.",
  },
  {
    id: "talk_doctor",
    nameEs: "Hablar con tu médico",
    nameEn: "Talk with your doctor",
    descriptionEs: "Preguntas útiles para la consulta.",
  },
  {
    id: "pain_psychotherapy",
    nameEs: "Psicoterapia del dolor",
    nameEn: "Pain psychotherapy",
    descriptionEs:
      "Qué es, por qué suele ser útil para muchos perfiles, y cómo pedir ayuda.",
  },
  {
    id: "recovery_stories",
    nameEs: "Historias de recuperación",
    nameEn: "Recovery stories",
    descriptionEs: "Relatos compositivos (no testimonios clínicos reales).",
  },
  {
    id: "guided_exercises",
    nameEs: "Ejercicios guiados",
    nameEn: "Guided exercises",
    descriptionEs: "Prácticas breves de regulación y movimiento.",
  },
];

/** Public-domain demo video (Blender Foundation — Big Buck Bunny). */
const DEMO_VIDEO_BBB =
  "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";

const audio = (
  n: number,
  categoryId: LibraryCategoryId,
  titleEs: string,
  titleEn: string,
  summaryEs: string,
  durationMin: number,
  tags: string[],
): LibraryItem => ({
  id: `audio_${String(n).padStart(2, "0")}`,
  type: "audio_lesson",
  categoryId,
  titleEs,
  titleEn,
  summaryEs,
  summaryEn: summaryEs,
  durationMin,
  tags,
  supportsReadAloud: true,
  isDemo: true,
  url: "",
});

const video = (
  n: number,
  categoryId: LibraryCategoryId,
  titleEs: string,
  titleEn: string,
  summaryEs: string,
  durationMin: number,
  tags: string[],
  url: string,
  isDemo = true,
): LibraryItem => ({
  id: `video_${String(n).padStart(2, "0")}`,
  type: "video_lesson",
  categoryId,
  titleEs,
  titleEn,
  summaryEs,
  summaryEn: summaryEs,
  durationMin,
  tags,
  url,
  isDemo,
  supportsReadAloud: false,
});

/** 24 base audio lessons — supportsReadAloud for TTS / narration clients */
export const AUDIO_LESSONS: LibraryItem[] = [
  audio(1, "understand_pain", "Tu dolor es real", "Your pain is real", "Validación: el dolor no es imaginario ni una debilidad de carácter.", 8, ["validacion", "psicoeducacion"]),
  audio(2, "understand_pain", "Dolor agudo y dolor que se queda", "Acute pain and pain that stays", "Diferencias útiles entre dolor reciente y dolor persistente.", 9, ["cronicidad"]),
  audio(3, "understand_pain", "El sistema de alarma del cuerpo", "The body's alarm system", "Cómo el sistema nervioso puede mantener la alarma encendida.", 10, ["neurociencia"]),
  audio(4, "understand_pain", "No es “solo un síntoma”", "Not “just a symptom”", "El dolor crónico puede merecer atención como fenómeno propio.", 8, ["enfermedad", "psicoeducacion"]),
  audio(5, "understand_pain", "Biología, emociones y contexto", "Biology, emotions, and context", "Modelo biopsicosocial sin reducir el dolor a “lo psicológico”.", 11, ["biopsicosocial"]),
  audio(6, "nervous_system", "Cuando el cuerpo no baja la guardia", "When the body will not stand down", "Estrés, amenaza y sensibilidad al dolor.", 9, ["estres", "alerta"]),
  audio(7, "nervous_system", "Señales de seguridad", "Safety signals", "Cómo cultivar señales que digan al sistema nervioso: estás a salvo ahora.", 8, ["seguridad", "regulacion"]),
  audio(8, "nervous_system", "La respiración como interrupción amable", "Breath as a gentle interrupt", "Usar la respiración sin forzar calma imposible.", 7, ["respiracion"]),
  audio(9, "safe_movement", "Miedo al movimiento, explicado con calma", "Fear of movement, calmly explained", "Por qué evitar moverse puede sostener el círculo del dolor.", 10, ["miedo", "evitacion"]),
  audio(10, "safe_movement", "Dosis pequeñas de movimiento", "Small doses of movement", "Cómo empezar sin perseguir el “entrenar duro”.", 8, ["pacing", "movimiento"]),
  audio(11, "safe_movement", "Después de moverte: qué observar", "After moving: what to notice", "Leer la respuesta del cuerpo sin catastrofizar.", 7, ["flare", "observacion"]),
  audio(12, "safe_movement", "Pacing: ni héroes ni abandono", "Pacing: neither heroes nor abandonment", "Alternar actividad y descanso de forma intencional.", 10, ["pacing"]),
  audio(13, "sleep", "Noches con dolor", "Nights with pain", "Estrategias suaves cuando el dolor interrumpe el sueño.", 9, ["sueno"]),
  audio(14, "sleep", "Bajar revoluciones antes de dormir", "Wind down before sleep", "Rutina de transición nocturna realista.", 8, ["rutina", "sueno"]),
  audio(15, "sleep", "Si no puedes dormir, qué sí puedes hacer", "If you cannot sleep, what you can still do", "Opciones de descanso sin pelear con el insomnio.", 8, ["insomnio"]),
  audio(16, "trust_body", "Habitar el cuerpo otra vez", "Inhabit the body again", "Reconectar con sensaciones no dolorosas y con el cuerpo como hogar.", 10, ["confianza", "cuerpo"]),
  audio(17, "trust_body", "Valores cuando duele", "Values when it hurts", "Vivir hacia lo que importa sin esperar dolor cero.", 9, ["valores", "act"]),
  audio(18, "trust_body", "Autocompasión sin resignación", "Self-compassion without resignation", "Trato amable contigo sin abandonar el cuidado activo.", 8, ["autocompasion"]),
  audio(19, "talk_doctor", "Cómo contar tu historia de dolor", "How to tell your pain story", "Estructura breve para la consulta: tiempo, impacto, lo que ya probaste.", 9, ["consulta"]),
  audio(20, "talk_doctor", "Pedir un plan, no solo un fármaco", "Ask for a plan, not only a drug", "Preguntas para ampliar opciones de cuidado integral.", 8, ["consulta", "plan"]),
  audio(21, "pain_psychotherapy", "Qué es la psicoterapia del dolor", "What pain psychotherapy is", "Objetivos: función, calidad de vida y afrontamiento — no negar el dolor. Suele ser útil para muchos perfiles.", 11, ["psicoterapia", "cuidado"]),
  audio(22, "pain_psychotherapy", "TCC, ACT y programas de manejo del dolor", "CBT, ACT, and pain management programs", "Mapa sencillo de enfoques psicológicos basados en evidencia.", 12, ["tcc", "act"]),
  audio(23, "recovery_stories", "Camila y el paso pequeño", "Camila and the small step", "Relato ilustrativo sobre pacing y volver a caminar al negocio del barrio.", 7, ["historia"]),
  audio(24, "recovery_stories", "Mateo y las noches menos enemigas", "Mateo and less hostile nights", "Relato ilustrativo sobre sueño, regulación y pedir ayuda.", 7, ["historia", "sueno"]),
];

/** Demo / placeholder video lessons (public-domain sample or empty url + isDemo). */
export const VIDEO_LESSONS: LibraryItem[] = [
  video(
    1,
    "understand_pain",
    "Mecanismos IASP en lenguaje simple",
    "IASP mechanisms in plain language",
    "Orientación (no diagnóstico) sobre nociceptivo, neuropático, nociplástico y mixto. Video propio en producción; mientras tanto hay un marcador temporal.",
    12,
    ["iasp", "mecanismos"],
    DEMO_VIDEO_BBB,
  ),
  video(
    2,
    "pain_psychotherapy",
    "Por qué la psicoterapia del dolor es parte del tratamiento",
    "Why pain psychotherapy is part of treatment",
    "La terapia no niega el dolor; ayuda a tratar el perfil específico. Contenido audiovisual propio en producción.",
    10,
    ["psicoterapia", "cuidado"],
    DEMO_VIDEO_BBB,
  ),
  video(
    3,
    "pain_psychotherapy",
    "Pensamientos automáticos y TCC del dolor",
    "Automatic thoughts and pain CBT",
    "Psicoeducación sobre pensamientos automáticos en dolor persistente. Próximamente con video Neuropi.",
    8,
    ["tcc", "pensamientos"],
    "",
  ),
  video(
    4,
    "nervous_system",
    "Estrés agudo vs carga crónica",
    "Acute stress vs chronic load",
    "El estrés puntual puede ser adaptativo; la carga sostenida es distinta. No se presenta como causa primaria del dolor.",
    7,
    ["estres", "alostasis"],
    DEMO_VIDEO_BBB,
  ),
  video(
    5,
    "safe_movement",
    "Miedo al movimiento: dosis seguras",
    "Fear of movement: safe doses",
    "Pacing y exposición gradual, con calma. Video Neuropi en producción.",
    9,
    ["movimiento", "pacing"],
    DEMO_VIDEO_BBB,
  ),
];

/** 8 meditations / regulation practices */
export const MEDITATIONS: LibraryItem[] = [
  {
    id: "med_01",
    type: "meditation",
    categoryId: "nervous_system",
    titleEs: "Ancla en la planta de los pies",
    titleEn: "Anchor in the soles of the feet",
    summaryEs: "Atención gentil a los pies para bajar la alerta.",
    summaryEn: "Gentle attention to the feet to lower alertness.",
    durationMin: 6,
    tags: ["meditacion", "cuerpo"],
  },
  {
    id: "med_02",
    type: "meditation",
    categoryId: "nervous_system",
    titleEs: "Lugar seguro imaginado",
    titleEn: "Imagined safe place",
    summaryEs: "Visualización breve de un entorno que transmita seguridad.",
    summaryEn: "Brief visualization of an environment that conveys safety.",
    durationMin: 8,
    tags: ["visualizacion", "seguridad"],
  },
  {
    id: "med_03",
    type: "meditation",
    categoryId: "trust_body",
    titleEs: "Escaneo amable (sin cazar el dolor)",
    titleEn: "Gentle scan (without hunting pain)",
    summaryEs: "Recorrido corporal que incluye zonas cómodas y neutrales.",
    summaryEn: "Body tour that includes comfortable and neutral areas.",
    durationMin: 10,
    tags: ["body-scan"],
  },
  {
    id: "med_04",
    type: "meditation",
    categoryId: "sleep",
    titleEs: "Descanso sin exigencia de dormir",
    titleEn: "Rest without demanding sleep",
    summaryEs: "Práctica nocturna para soltar la pelea con el insomnio.",
    summaryEn: "Night practice to release the fight with insomnia.",
    durationMin: 12,
    tags: ["sueno"],
  },
  {
    id: "med_05",
    type: "meditation",
    categoryId: "nervous_system",
    titleEs: "Manos tibias, mandíbula suave",
    titleEn: "Warm hands, soft jaw",
    summaryEs: "Soltar tensión habitual de cara y hombros.",
    summaryEn: "Release habitual face and shoulder tension.",
    durationMin: 5,
    tags: ["tension"],
  },
  {
    id: "med_06",
    type: "meditation",
    categoryId: "trust_body",
    titleEs: "Gratitud realista al cuerpo",
    titleEn: "Realistic gratitude to the body",
    summaryEs: "Reconocer lo que el cuerpo aún hace, sin forzarte a “amar” el dolor.",
    summaryEn: "Acknowledge what the body still does, without forcing yourself to “love” the pain.",
    durationMin: 7,
    tags: ["gratitud"],
  },
  {
    id: "med_07",
    type: "meditation",
    categoryId: "pain_psychotherapy",
    titleEs: "Observar el pensamiento catastrofista",
    titleEn: "Notice the catastrophic thought",
    summaryEs: "Ver el pensamiento como evento mental, no como hecho seguro.",
    summaryEn: "See the thought as a mental event, not as a certain fact.",
    durationMin: 8,
    tags: ["tcc", "pensamientos"],
  },
  {
    id: "med_08",
    type: "meditation",
    categoryId: "guided_exercises",
    titleEs: "Presencia en un solo sentido",
    titleEn: "Presence in one sense",
    summaryEs: "Anclarte en sonido o tacto por dos minutos.",
    summaryEn: "Anchor in sound or touch for two minutes.",
    durationMin: 4,
    tags: ["mindfulness"],
  },
];

/** 8 breathing practices */
export const BREATHING_PRACTICES: LibraryItem[] = [
  {
    id: "br_01",
    type: "breathing",
    categoryId: "guided_exercises",
    titleEs: "Respiración 4-6",
    titleEn: "4-6 breathing",
    summaryEs: "Inhala 4, exhala 6. Baja suave del ritmo cardíaco percibido.",
    summaryEn: "Inhale 4, exhale 6. Gentle lowering of perceived heart rate.",
    durationMin: 4,
    tags: ["respiracion"],
  },
  {
    id: "br_02",
    type: "breathing",
    categoryId: "guided_exercises",
    titleEs: "Suspiro fisiológico (doble inhalación)",
    titleEn: "Physiological sigh (double inhale)",
    summaryEs: "Dos inhalaciones nasales y una exhalación larga por la boca.",
    summaryEn: "Two nasal inhales and one long mouth exhale.",
    durationMin: 3,
    tags: ["respiracion", "rapido"],
  },
  {
    id: "br_03",
    type: "breathing",
    categoryId: "nervous_system",
    titleEs: "Respiración de caja suave",
    titleEn: "Gentle box breathing",
    summaryEs: "4-4-4-4 sin forzar si genera mareo; adaptar tiempos.",
    summaryEn: "4-4-4-4 without forcing if dizzy; adapt timings.",
    durationMin: 5,
    tags: ["respiracion"],
  },
  {
    id: "br_04",
    type: "breathing",
    categoryId: "nervous_system",
    titleEs: "Exhalación larga para flare-up",
    titleEn: "Long exhale for flare-up",
    summaryEs: "Priorizar exhalar más largo cuando el dolor sube.",
    summaryEn: "Prioritize a longer exhale when pain rises.",
    durationMin: 4,
    tags: ["flare", "respiracion"],
  },
  {
    id: "br_05",
    type: "breathing",
    categoryId: "sleep",
    titleEs: "Cuenta regresiva con el aire",
    titleEn: "Countdown with the breath",
    summaryEs: "Contar exhalaciones del 10 al 1 para noches agitadas.",
    summaryEn: "Count exhales from 10 to 1 for restless nights.",
    durationMin: 6,
    tags: ["sueno", "respiracion"],
  },
  {
    id: "br_06",
    type: "breathing",
    categoryId: "safe_movement",
    titleEs: "Respirar antes de moverte",
    titleEn: "Breathe before you move",
    summaryEs: "Preparar el sistema nervioso 60 segundos antes del micro-movimiento.",
    summaryEn: "Prepare the nervous system 60 seconds before micro-movement.",
    durationMin: 2,
    tags: ["movimiento", "respiracion"],
  },
  {
    id: "br_07",
    type: "breathing",
    categoryId: "guided_exercises",
    titleEs: "Respiración diafragmática acostado/a",
    titleEn: "Diaphragmatic breathing lying down",
    summaryEs: "Mano en el abdomen; inhalar expandiendo sin forzar pecho alto.",
    summaryEn: "Hand on abdomen; inhale expanding without forcing high chest.",
    durationMin: 5,
    tags: ["diafragma"],
  },
  {
    id: "br_08",
    type: "breathing",
    categoryId: "guided_exercises",
    titleEs: "Tres ciclos de calma en la fila",
    titleEn: "Three calm cycles in the queue",
    summaryEs: "Versión mínima para usar en el consultorio, la micro o el trabajo.",
    summaryEn: "Minimal version for the clinic, bus, or work.",
    durationMin: 1,
    tags: ["rapido", "respiracion"],
  },
];

/** 12 psychoeducation cards */
export const PSYCHOEDUCATION_CARDS: LibraryItem[] = [
  {
    id: "card_01",
    type: "psychoeducation_card",
    categoryId: "understand_pain",
    titleEs: "Dolor ≠ daño siempre",
    titleEn: "Pain ≠ damage always",
    summaryEs: "El dolor es una señal de protección; no siempre indica lesión nueva.",
    summaryEn: "Pain is a protection signal; it does not always mean new injury.",
    bodyEs:
      "En dolor persistente, el sistema nervioso puede volverse más sensible. Sentir dolor no implica automáticamente que se esté “rompiendo” algo en este instante. Eso no niega tu dolor: lo explica de otra forma.",
    bodyEn:
      "In persistent pain, the nervous system can become more sensitive. Feeling pain does not automatically mean something is “breaking” right now. That does not deny your pain: it explains it differently.",
    tags: ["psicoeducacion"],
  },
  {
    id: "card_02",
    type: "psychoeducation_card",
    categoryId: "understand_pain",
    titleEs: "Más de 3 meses importa",
    titleEn: "More than 3 months matters",
    summaryEs: "La duración ayuda a orientar el tipo de cuidado que necesitas.",
    summaryEn: "Duration helps orient the kind of care you need.",
    bodyEs:
      "Cuando el dolor persiste o recurre por más de 3 meses, conviene un abordaje que mire función, sueño, estrés y creencias, además de la evaluación médica.",
    bodyEn:
      "When pain persists or recurs for more than 3 months, an approach that looks at function, sleep, stress, and beliefs — alongside medical assessment — is advisable.",
    tags: ["cronicidad"],
  },
  {
    id: "card_03",
    type: "psychoeducation_card",
    categoryId: "nervous_system",
    titleEs: "Estrés no inventa el dolor",
    titleEn: "Stress does not invent pain",
    summaryEs: "El estrés puede amplificar; no significa que te lo estés inventando.",
    summaryEn: "Stress can amplify; it does not mean you are inventing it.",
    bodyEs:
      "El estrés y la amenaza percibida pueden subir el volumen del dolor. Eso es fisiología. Hablar de estrés no es decir que “es psicológico y punto”.",
    bodyEn:
      "Stress and perceived threat can turn up pain’s volume. That is physiology. Talking about stress is not saying “it is just psychological”.",
    tags: ["estres"],
  },
  {
    id: "card_04",
    type: "psychoeducation_card",
    categoryId: "safe_movement",
    titleEs: "Evitar todo también tiene costo",
    titleEn: "Avoiding everything also has a cost",
    summaryEs: "La evitación total puede aumentar miedo y desacondicionamiento.",
    summaryEn: "Total avoidance can increase fear and deconditioning.",
    bodyEs:
      "Descansar es útil; desaparecer de toda actividad suele empeorar el círculo. El pacing busca el medio: movimiento dosificado y seguro.",
    bodyEn:
      "Rest is useful; disappearing from all activity often worsens the cycle. Pacing seeks the middle: dosed, safe movement.",
    tags: ["evitacion", "pacing"],
  },
  {
    id: "card_05",
    type: "psychoeducation_card",
    categoryId: "sleep",
    titleEs: "Sueño y dolor se alimentan",
    titleEn: "Sleep and pain feed each other",
    summaryEs: "Mejorar el descanso puede ayudar a la sensibilidad al dolor.",
    summaryEn: "Improving rest can help pain sensitivity.",
    bodyEs:
      "Dormir mal puede hacer el dolor más intenso al día siguiente, y el dolor puede romper el sueño. Cuidar ambos es parte del tratamiento, no un lujo.",
    bodyEn:
      "Poor sleep can make pain more intense the next day, and pain can break sleep. Caring for both is part of treatment, not a luxury.",
    tags: ["sueno"],
  },
  {
    id: "card_06",
    type: "psychoeducation_card",
    categoryId: "pain_psychotherapy",
    titleEs: "Psicoterapia no niega tu dolor",
    titleEn: "Psychotherapy does not deny your pain",
    summaryEs: "El objetivo es vivir mejor con el dolor y recuperar función — suele ser útil para muchos perfiles.",
    summaryEn: "The goal is to live better with pain and restore function — often useful for many profiles.",
    bodyEs:
      "Un/a psicólogo/a del dolor no te dirá que “te lo inventas”. Trabajará creencias, miedo, ritmo, sueño y sentido, junto a tu cuidado médico. Para perfiles persistentes, esa terapia suele ser parte del cuidado integral, no un extra.",
    bodyEn:
      "A pain psychologist will not tell you that you “made it up”. They will work on beliefs, fear, pace, sleep, and meaning, alongside your medical care. For persistent profiles, that therapy is often part of integrated care, not an extra.",
    tags: ["psicoterapia", "cuidado"],
    supportsReadAloud: true,
  },
  {
    id: "card_07",
    type: "psychoeducation_card",
    categoryId: "talk_doctor",
    titleEs: "Llevar datos ayuda",
    titleEn: "Bringing data helps",
    summaryEs: "Un resumen de intensidad, localización e impacto ahorra tiempo en consulta.",
    summaryEn: "A summary of intensity, location, and impact saves time in the visit.",
    bodyEs:
      "Anota por unos días: intensidad, zonas, sueño, lo que empeora o alivia, y cómo interfiere en tu vida. Eso orienta mejor que “me duele mucho”.",
    bodyEn:
      "For a few days note: intensity, areas, sleep, what worsens or eases, and how it interferes with life. That orients better than “it hurts a lot”.",
    tags: ["consulta"],
  },
  {
    id: "card_08",
    type: "psychoeducation_card",
    categoryId: "trust_body",
    titleEs: "Función también es un logro",
    titleEn: "Function is also a win",
    summaryEs: "Bajar el dolor no es la única meta válida.",
    summaryEn: "Lowering pain is not the only valid goal.",
    bodyEs:
      "Volver a cocinar, salir, trabajar o jugar puede ser un avance enorme aunque la intensidad no baje al instante. Celebra la función.",
    bodyEn:
      "Returning to cooking, going out, working, or playing can be a huge advance even if intensity does not drop instantly. Celebrate function.",
    tags: ["funcion", "valores"],
  },
  {
    id: "card_09",
    type: "psychoeducation_card",
    categoryId: "understand_pain",
    titleEs: "Flare-up no es fracaso",
    titleEn: "A flare-up is not failure",
    summaryEs: "Los altos de dolor forman parte del curso; se pueden planificar respuestas.",
    summaryEn: "Pain spikes are part of the course; responses can be planned.",
    bodyEs:
      "Un flare-up no borra tu progreso. Tener un plan suave (respiración, pacing, apoyo) reduce el miedo a que “todo se echó a perder”.",
    bodyEn:
      "A flare-up does not erase your progress. Having a gentle plan (breathing, pacing, support) reduces the fear that “everything is ruined”.",
    tags: ["flare"],
  },
  {
    id: "card_10",
    type: "psychoeducation_card",
    categoryId: "nervous_system",
    titleEs: "Seguridad aprendida",
    titleEn: "Learned safety",
    summaryEs: "El sistema nervioso también puede aprender que el movimiento es seguro.",
    summaryEn: "The nervous system can also learn that movement is safe.",
    bodyEs:
      "Con exposiciones graduales y exitosas, el cuerpo puede recalibrar la alarma. Por eso el movimiento seguro se practica, no se impone de golpe.",
    bodyEn:
      "With gradual successful exposures, the body can recalibrate the alarm. That is why safe movement is practiced, not forced all at once.",
    tags: ["seguridad", "movimiento"],
  },
  {
    id: "card_11",
    type: "psychoeducation_card",
    categoryId: "pain_psychotherapy",
    titleEs: "No es magia ni cura garantizada",
    titleEn: "Not magic or a guaranteed cure",
    summaryEs: "Las apps y la psicoterapia ayudan; no prometen dolor cero.",
    summaryEn: "Apps and psychotherapy help; they do not promise zero pain.",
    bodyEs:
      "Neuropi orienta y educa. La mejor evidencia apunta a mejoras en función y afrontamiento; los resultados varían. La honestidad clínica también es cuidado.",
    bodyEn:
      "Neuropi guides and educates. Best evidence points to improvements in function and coping; results vary. Clinical honesty is also care.",
    tags: ["expectativas"],
  },
  {
    id: "card_12",
    type: "psychoeducation_card",
    categoryId: "recovery_stories",
    titleEs: "Recuperación no es línea recta",
    titleEn: "Recovery is not a straight line",
    summaryEs: "Altibajos son esperables; la dirección general importa más.",
    summaryEn: "Ups and downs are expected; overall direction matters more.",
    bodyEs:
      "Muchas personas avanzan en zigzag. Medir solo el peor día distorsiona. Mira semanas, no solo horas.",
    bodyEn:
      "Many people progress in a zigzag. Measuring only the worst day distorts. Look at weeks, not only hours.",
    tags: ["recuperacion"],
  },
];

/** 10 questions to ask a doctor */
export const MEDICAL_CONSULT_QUESTIONS: LibraryItem[] = [
  {
    id: "mdq_01",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Qué hipótesis maneja sobre mi dolor?",
    titleEn: "What hypotheses are you considering about my pain?",
    summaryEs: "Pedir claridad sobre posibles causas y lo que aún no se sabe.",
    summaryEn: "Ask for clarity on possible causes and what is still unknown.",
    bodyEs: "¿Qué hipótesis maneja sobre mi dolor y qué nos falta por aclarar?",
    bodyEn: "What hypotheses are you considering about my pain, and what still needs clarifying?",
    tags: ["consulta"],
  },
  {
    id: "mdq_02",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Qué señales de alarma debo vigilar?",
    titleEn: "What warning signs should I watch for?",
    summaryEs: "Distinguir lo urgente de lo esperable en tu caso.",
    summaryEn: "Distinguish the urgent from what is expected in your case.",
    bodyEs: "¿Qué señales de alarma me indicarían que debo consultar de urgencia?",
    bodyEn: "What warning signs would mean I should seek urgent care?",
    tags: ["seguridad"],
  },
  {
    id: "mdq_03",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Qué opciones hay además de fármacos?",
    titleEn: "What options exist besides medication?",
    summaryEs: "Abrir el menú: kinesiología, psicología del dolor, pacing, sueño.",
    summaryEn: "Open the menu: physiotherapy, pain psychology, pacing, sleep.",
    bodyEs: "Además de medicamentos, ¿qué otras opciones de manejo me recomienda?",
    bodyEn: "Besides medication, what other management options do you recommend?",
    tags: ["plan"],
  },
  {
    id: "mdq_04",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Es seguro moverme de esta forma?",
    titleEn: "Is it safe for me to move this way?",
    summaryEs: "Validar un plan de movimiento gradual con tu clínico.",
    summaryEn: "Validate a gradual movement plan with your clinician.",
    bodyEs: "¿Qué tipo de movimiento o actividad considera seguro para mí ahora?",
    bodyEn: "What kind of movement or activity do you consider safe for me now?",
    tags: ["movimiento"],
  },
  {
    id: "mdq_05",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Necesito derivación a especialista?",
    titleEn: "Do I need a specialist referral?",
    summaryEs: "Preguntar por unidad de dolor, reumatología, neurología u otra según el caso.",
    summaryEn: "Ask about a pain unit, rheumatology, neurology, or other as appropriate.",
    bodyEs: "¿Cree que conviene derivarme a un/a especialista o a una unidad de dolor?",
    bodyEn: "Do you think a referral to a specialist or pain unit is advisable?",
    tags: ["derivacion"],
  },
  {
    id: "mdq_06",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Cómo evaluamos si el plan funciona?",
    titleEn: "How will we know if the plan is working?",
    summaryEs: "Acordar metas de función e hitos de revisión.",
    summaryEn: "Agree on function goals and review milestones.",
    bodyEs: "¿En cuánto tiempo revisamos avances y qué indicadores usaremos (dolor, función, sueño)?",
    bodyEn: "When will we review progress and what indicators will we use (pain, function, sleep)?",
    tags: ["seguimiento"],
  },
  {
    id: "mdq_07",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Qué hago en un flare-up?",
    titleEn: "What should I do in a flare-up?",
    summaryEs: "Salir de la consulta con un plan escrito para los días difíciles.",
    summaryEn: "Leave with a written plan for hard days.",
    bodyEs: "Si el dolor sube mucho unos días, ¿qué pasos concretos me recomienda?",
    bodyEn: "If pain rises a lot for a few days, what concrete steps do you recommend?",
    tags: ["flare"],
  },
  {
    id: "mdq_08",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Cómo interactúan mis tratamientos?",
    titleEn: "How do my treatments interact?",
    summaryEs: "Medicamentos, kinesio y salud mental en un mismo mapa.",
    summaryEn: "Medications, physio, and mental health on one map.",
    bodyEs: "¿Cómo se coordinan mis tratamientos actuales y hay algo que deba ajustar?",
    bodyEn: "How do my current treatments coordinate, and is there anything I should adjust?",
    tags: ["coordinacion"],
  },
  {
    id: "mdq_09",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿El sueño y el ánimo entran en el plan?",
    titleEn: "Do sleep and mood enter the plan?",
    summaryEs: "Invitar al clínico a mirar el cuadro completo.",
    summaryEn: "Invite the clinician to look at the full picture.",
    bodyEs: "¿Podemos incluir sueño, estrés y ánimo en el plan de manejo del dolor?",
    bodyEn: "Can we include sleep, stress, and mood in the pain management plan?",
    tags: ["biopsicosocial"],
  },
  {
    id: "mdq_10",
    type: "medical_consult_question",
    categoryId: "talk_doctor",
    titleEs: "¿Qué debo evitar y qué sí puedo hacer?",
    titleEn: "What should I avoid and what can I still do?",
    summaryEs: "Salir con límites claros y permisos claros.",
    summaryEn: "Leave with clear limits and clear permissions.",
    bodyEs: "¿Hay actividades que deba evitar por ahora y otras que me anima a mantener?",
    bodyEn: "Are there activities I should avoid for now and others you encourage me to keep?",
    tags: ["actividad"],
  },
];

/** 10 questions related to pain psychotherapy */
export const PSYCHOTHERAPY_QUESTIONS: LibraryItem[] = [
  {
    id: "ptq_01",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Trabaja con dolor persistente?",
    titleEn: "Do you work with persistent pain?",
    summaryEs: "Primera pregunta al buscar terapeuta.",
    summaryEn: "First question when seeking a therapist.",
    bodyEs: "¿Tiene experiencia clínica trabajando con personas con dolor persistente o crónico?",
    bodyEn: "Do you have clinical experience working with people with persistent or chronic pain?",
    tags: ["busqueda"],
  },
  {
    id: "ptq_02",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Qué enfoque utiliza?",
    titleEn: "What approach do you use?",
    summaryEs: "TCC para dolor, ACT, mindfulness clínico, u otro.",
    summaryEn: "CBT for pain, ACT, clinical mindfulness, or other.",
    bodyEs: "¿Qué enfoques usa con dolor (por ejemplo TCC, ACT, programas de manejo del dolor)?",
    bodyEn: "What approaches do you use with pain (for example CBT, ACT, pain management programs)?",
    tags: ["enfoque"],
  },
  {
    id: "ptq_03",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Cómo se coordina con mi médico?",
    titleEn: "How do you coordinate with my doctor?",
    summaryEs: "Cuidado interdisciplinario cuando es posible.",
    summaryEn: "Interdisciplinary care when possible.",
    bodyEs: "¿Está abierto/a a coordinarse con mi médico o kinesiólogo/a si yo lo autorizo?",
    bodyEn: "Are you open to coordinating with my doctor or physiotherapist if I authorize it?",
    tags: ["interdisciplinario"],
  },
  {
    id: "ptq_04",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Cuáles serían nuestros objetivos?",
    titleEn: "What would our goals be?",
    summaryEs: "Función, calidad de vida, afrontamiento — no solo “quitar el dolor”.",
    summaryEn: "Function, quality of life, coping — not only “remove the pain”.",
    bodyEs: "Si trabajáramos juntos/as, ¿qué objetivos concretos propondría para los primeros meses?",
    bodyEn: "If we worked together, what concrete goals would you propose for the first months?",
    tags: ["objetivos"],
  },
  {
    id: "ptq_05",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Qué pasa si tengo un flare-up emocional?",
    titleEn: "What if I have an emotional flare-up?",
    summaryEs: "Clarificar contención y límites de la terapia.",
    summaryEn: "Clarify containment and therapy boundaries.",
    bodyEs: "Si en una semana el dolor o el ánimo empeoran mucho, ¿cómo lo abordamos entre sesiones?",
    bodyEn: "If in a given week pain or mood worsen a lot, how do we address that between sessions?",
    tags: ["crisis"],
  },
  {
    id: "ptq_06",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Trabaja miedo al movimiento?",
    titleEn: "Do you work on fear of movement?",
    summaryEs: "Exposición gradual y creencias sobre daño.",
    summaryEn: "Gradual exposure and beliefs about harm.",
    bodyEs: "¿Incluye en el trabajo el miedo a moverse y las creencias sobre daño?",
    bodyEn: "Does your work include fear of moving and beliefs about harm?",
    tags: ["miedo"],
  },
  {
    id: "ptq_07",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Cómo se trabaja el sueño?",
    titleEn: "How is sleep addressed?",
    summaryEs: "Higiene de sueño e intervención conductual cuando corresponde.",
    summaryEn: "Sleep hygiene and behavioral intervention when appropriate.",
    bodyEs: "¿Aborda problemas de sueño relacionados con el dolor dentro de la terapia?",
    bodyEn: "Do you address sleep problems related to pain within therapy?",
    tags: ["sueno"],
  },
  {
    id: "ptq_08",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Es presencial, online o mixto?",
    titleEn: "In-person, online, or hybrid?",
    summaryEs: "Acceso realista en Chile.",
    summaryEn: "Realistic access in Chile.",
    bodyEs: "¿Atiende de forma presencial, online o mixta, y en qué comunas o plataformas?",
    bodyEn: "Do you see people in person, online, or hybrid, and in which areas or platforms?",
    tags: ["acceso"],
  },
  {
    id: "ptq_09",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Qué no es esta terapia?",
    titleEn: "What is this therapy not?",
    summaryEs: "Alinear expectativas: no es negar el dolor ni prometer cura mágica.",
    summaryEn: "Align expectations: it is not denying pain or promising a magic cure.",
    bodyEs: "¿Cómo explica usted a sus pacientes lo que la psicoterapia del dolor no promete?",
    bodyEn: "How do you explain to patients what pain psychotherapy does not promise?",
    tags: ["expectativas"],
  },
  {
    id: "ptq_10",
    type: "psychotherapy_question",
    categoryId: "pain_psychotherapy",
    titleEs: "¿Puedo usar Neuropi en paralelo?",
    titleEn: "Can I use Neuropi in parallel?",
    summaryEs: "Complementar app y terapia sin sustituir el vínculo clínico.",
    summaryEn: "Complement app and therapy without replacing the clinical relationship.",
    bodyEs: "¿Le parece útil que use una app de educación y registro de dolor entre sesiones?",
    bodyEn: "Would you find it useful for me to use a pain education and logging app between sessions?",
    tags: ["app", "adherencia"],
  },
];

export const LIBRARY_CATALOG: LibraryItem[] = [
  ...AUDIO_LESSONS,
  ...VIDEO_LESSONS,
  ...MEDITATIONS,
  ...BREATHING_PRACTICES,
  ...PSYCHOEDUCATION_CARDS,
  ...MEDICAL_CONSULT_QUESTIONS,
  ...PSYCHOTHERAPY_QUESTIONS,
];

export function getLibraryItemsByCategory(
  categoryId: LibraryCategoryId,
): LibraryItem[] {
  return LIBRARY_CATALOG.filter((item) => item.categoryId === categoryId);
}

export function getLibraryItemsByType(type: LibraryItemType): LibraryItem[] {
  return LIBRARY_CATALOG.filter((item) => item.type === type);
}

export function getLibraryItemById(id: string): LibraryItem | undefined {
  return LIBRARY_CATALOG.find((item) => item.id === id);
}

export const LIBRARY_COUNTS = {
  audioLessons: AUDIO_LESSONS.length,
  videoLessons: VIDEO_LESSONS.length,
  meditations: MEDITATIONS.length,
  breathing: BREATHING_PRACTICES.length,
  psychoeducationCards: PSYCHOEDUCATION_CARDS.length,
  medicalConsultQuestions: MEDICAL_CONSULT_QUESTIONS.length,
  psychotherapyQuestions: PSYCHOTHERAPY_QUESTIONS.length,
  total: LIBRARY_CATALOG.length,
} as const;
