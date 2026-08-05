import { z } from "zod";
import type { InstrumentId } from "./instruments";

/**
 * Question banks for Neuropi assessments.
 * Primary copy: Spanish (Chile). English keys for i18n.
 * Clinical posture: validate pain as real; anti-iatrogenic; no unvalidated “instruments”.
 */

export type QuestionType =
  | "single_choice"
  | "multi_choice"
  | "likert"
  | "nrs"
  | "vas"
  | "boolean"
  | "body_map"
  | "text";

export interface QuestionOption {
  value: string | number | boolean;
  labelEs: string;
  labelEn: string;
  /** For reverse-scored items (e.g. PSS-10). */
  score?: number;
}

export interface Question {
  id: string;
  instrumentId: InstrumentId | "safety";
  key: string;
  type: QuestionType;
  textEs: string;
  textEn: string;
  helpEs?: string;
  helpEn?: string;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  required?: boolean;
  /** Items that should trigger crisis/urgent pathways when endorsed. */
  isRedFlag?: boolean;
}

export const Likert0to3Options: QuestionOption[] = [
  { value: 0, labelEs: "Para nada", labelEn: "Not at all", score: 0 },
  {
    value: 1,
    labelEs: "Varios días",
    labelEn: "Several days",
    score: 1,
  },
  {
    value: 2,
    labelEs: "Más de la mitad de los días",
    labelEn: "More than half the days",
    score: 2,
  },
  {
    value: 3,
    labelEs: "Casi todos los días",
    labelEn: "Nearly every day",
    score: 3,
  },
];

export const PssFrequencyOptions: QuestionOption[] = [
  { value: 0, labelEs: "Nunca", labelEn: "Never", score: 0 },
  { value: 1, labelEs: "Casi nunca", labelEn: "Almost never", score: 1 },
  { value: 2, labelEs: "A veces", labelEn: "Sometimes", score: 2 },
  { value: 3, labelEs: "Bastante a menudo", labelEn: "Fairly often", score: 3 },
  { value: 4, labelEs: "Muy a menudo", labelEn: "Very often", score: 4 },
];

export const InterferenceOptions: QuestionOption[] = [
  { value: 0, labelEs: "Nada", labelEn: "Not at all", score: 0 },
  { value: 1, labelEs: "Un poco", labelEn: "A little", score: 1 },
  { value: 2, labelEs: "Moderadamente", labelEn: "Moderately", score: 2 },
  { value: 3, labelEs: "Bastante", labelEn: "Quite a bit", score: 3 },
  { value: 4, labelEs: "Muchísimo", labelEn: "Extremely", score: 4 },
];

export const AgreeOptions: QuestionOption[] = [
  { value: 0, labelEs: "Totalmente en desacuerdo", labelEn: "Strongly disagree", score: 0 },
  { value: 1, labelEs: "En desacuerdo", labelEn: "Disagree", score: 1 },
  { value: 2, labelEs: "Ni de acuerdo ni en desacuerdo", labelEn: "Neutral", score: 2 },
  { value: 3, labelEs: "De acuerdo", labelEn: "Agree", score: 3 },
  { value: 4, labelEs: "Totalmente de acuerdo", labelEn: "Strongly agree", score: 4 },
];

/** Chilean-inspired persistent pain screen (>3 months criterion). */
export const CHILEAN_PAIN_SCREEN_QUESTIONS: Question[] = [
  {
    id: "cps_duration",
    instrumentId: "chilean_pain_screen",
    key: "pain_duration",
    type: "single_choice",
    textEs:
      "¿Has tenido dolor persistente o que vuelve una y otra vez por más de 3 meses?",
    textEn:
      "Have you had persistent or recurring pain for more than 3 months?",
    required: true,
    options: [
      { value: "yes_over_3m", labelEs: "Sí, por más de 3 meses", labelEn: "Yes, for more than 3 months" },
      { value: "yes_1_to_3m", labelEs: "Sí, entre 1 y 3 meses", labelEn: "Yes, between 1 and 3 months" },
      { value: "less_1m", labelEs: "Sí, pero menos de 1 mes", labelEn: "Yes, but less than 1 month" },
      { value: "no", labelEs: "No tengo dolor ahora", labelEn: "I do not have pain now" },
    ],
  },
  {
    id: "cps_frequency",
    instrumentId: "chilean_pain_screen",
    key: "pain_frequency",
    type: "single_choice",
    textEs: "¿Con qué frecuencia sientes este dolor?",
    textEn: "How often do you feel this pain?",
    options: [
      { value: "daily", labelEs: "Todos o casi todos los días", labelEn: "Every day or almost every day" },
      { value: "several_week", labelEs: "Varias veces a la semana", labelEn: "Several times a week" },
      { value: "weekly", labelEs: "Una vez a la semana o menos", labelEn: "Once a week or less" },
      { value: "episodic", labelEs: "Solo en episodios ocasionales", labelEn: "Only in occasional episodes" },
    ],
  },
  {
    id: "cps_intensity",
    instrumentId: "chilean_pain_screen",
    key: "typical_intensity",
    type: "nrs",
    textEs: "En una escala de 0 (sin dolor) a 10 (el peor dolor imaginable), ¿qué tan intenso suele ser tu dolor?",
    textEn: "On a scale from 0 (no pain) to 10 (worst imaginable pain), how intense is your pain usually?",
    min: 0,
    max: 10,
  },
  {
    id: "cps_location",
    instrumentId: "chilean_pain_screen",
    key: "pain_locations",
    type: "multi_choice",
    textEs: "¿Dónde sientes el dolor con más frecuencia? (puedes marcar más de una)",
    textEn: "Where do you feel pain most often? (you may select more than one)",
    options: [
      { value: "head_face", labelEs: "Cabeza o cara", labelEn: "Head or face" },
      { value: "neck", labelEs: "Cuello", labelEn: "Neck" },
      { value: "shoulders", labelEs: "Hombros", labelEn: "Shoulders" },
      { value: "upper_back", labelEs: "Espalda alta", labelEn: "Upper back" },
      { value: "lower_back", labelEs: "Espalda baja / lumbar", labelEn: "Lower back / lumbar" },
      { value: "chest", labelEs: "Pecho", labelEn: "Chest" },
      { value: "abdomen", labelEs: "Abdomen", labelEn: "Abdomen" },
      { value: "hips_pelvis", labelEs: "Caderas o pelvis", labelEn: "Hips or pelvis" },
      { value: "arms_hands", labelEs: "Brazos o manos", labelEn: "Arms or hands" },
      { value: "legs_feet", labelEs: "Piernas o pies", labelEn: "Legs or feet" },
      { value: "widespread", labelEs: "En varias zonas a la vez", labelEn: "In several areas at once" },
      { value: "other", labelEs: "Otra zona", labelEn: "Another area" },
    ],
  },
  {
    id: "cps_formal_dx",
    instrumentId: "chilean_pain_screen",
    key: "formal_diagnosis",
    type: "single_choice",
    textEs: "¿Tienes un diagnóstico médico formal para este dolor?",
    textEn: "Do you have a formal medical diagnosis for this pain?",
    helpEs: "Un diagnóstico formal es el que te entregó un médico en consulta o en ficha clínica.",
    helpEn: "A formal diagnosis is one given by a doctor in a visit or clinical record.",
    options: [
      { value: "yes", labelEs: "Sí", labelEn: "Yes" },
      { value: "no", labelEs: "No", labelEn: "No" },
      { value: "unsure", labelEs: "No estoy seguro/a", labelEn: "I am not sure" },
      { value: "in_process", labelEs: "Estoy en proceso de evaluación", labelEn: "I am in the process of evaluation" },
    ],
  },
  {
    id: "cps_specialist",
    instrumentId: "chilean_pain_screen",
    key: "specialist_treating",
    type: "single_choice",
    textEs:
      "¿Tu médico tratante es especialista en la enfermedad o condición que te afecta?",
    textEn:
      "Is your treating doctor a specialist in the disease or condition that affects you?",
    options: [
      { value: "yes_specialist", labelEs: "Sí, veo a un/a especialista", labelEn: "Yes, I see a specialist" },
      { value: "gp_only", labelEs: "Solo atención general / APS", labelEn: "Primary care / GP only" },
      { value: "no_followup", labelEs: "No tengo seguimiento médico ahora", labelEn: "I have no medical follow-up now" },
      { value: "multiple", labelEs: "Veo a varios profesionales", labelEn: "I see several professionals" },
    ],
  },
  {
    id: "cps_edu_chronic_disease",
    instrumentId: "chilean_pain_screen",
    key: "knows_chronic_pain_as_disease",
    type: "single_choice",
    textEs:
      "¿Sabías que hoy el dolor crónico puede considerarse una enfermedad en sí misma y no solo un síntoma?",
    textEn:
      "Did you know that chronic pain can today be considered a disease in itself and not only a symptom?",
    helpEs:
      "Esto no significa que “todo esté en tu cabeza”. Significa que el sistema nervioso puede mantener el dolor en el tiempo y merece atención integral.",
    helpEn:
      "This does not mean “it is all in your head”. It means the nervous system can sustain pain over time and deserves integrated care.",
    options: [
      { value: "yes_knew", labelEs: "Sí, lo sabía", labelEn: "Yes, I knew that" },
      { value: "heard_some", labelEs: "Había escuchado algo", labelEn: "I had heard something" },
      { value: "no_new", labelEs: "No, es nuevo para mí", labelEn: "No, this is new to me" },
    ],
  },
  {
    id: "cps_edu_psychotherapy",
    instrumentId: "chilean_pain_screen",
    key: "knows_pain_psychotherapy",
    type: "single_choice",
    textEs: "¿Sabías que existe psicoterapia clínica especializada para el dolor?",
    textEn: "Did you know there is clinical psychotherapy specialized for pain?",
    helpEs:
      "La psicoterapia del dolor no niega tu dolor: ayuda a entender tu perfil específico, recuperar función y regular el sistema nervioso. Para muchos perfiles suele ser útil junto al cuidado médico.",
    helpEn:
      "Pain psychotherapy does not deny your pain: it helps understand your specific profile, restore function, and regulate the nervous system. For many profiles it is often useful alongside medical care.",
    options: [
      { value: "yes_knew", labelEs: "Sí, lo sabía", labelEn: "Yes, I knew that" },
      { value: "heard_some", labelEs: "Había escuchado algo", labelEn: "I had heard something" },
      { value: "no_new", labelEs: "No, es nuevo para mí", labelEn: "No, this is new to me" },
    ],
  },
];

export const NRS_QUESTIONS: Question[] = [
  {
    id: "nrs_now",
    instrumentId: "nrs",
    key: "intensity_now",
    type: "nrs",
    textEs: "¿Cuánto dolor sientes ahora? (0 = sin dolor, 10 = el peor dolor imaginable)",
    textEn: "How much pain do you feel right now? (0 = no pain, 10 = worst imaginable)",
    min: 0,
    max: 10,
    required: true,
  },
];

export const VAS_QUESTIONS: Question[] = [
  {
    id: "vas_now",
    instrumentId: "vas",
    key: "intensity_vas",
    type: "vas",
    textEs: "Marca en la línea la intensidad de tu dolor ahora (0 a 100).",
    textEn: "Mark on the line the intensity of your pain now (0 to 100).",
    min: 0,
    max: 100,
    required: true,
  },
];

export const BODY_MAP_QUESTIONS: Question[] = [
  {
    id: "body_map_regions",
    instrumentId: "body_map",
    key: "regions",
    type: "body_map",
    textEs: "Toca las zonas del cuerpo donde sientes dolor ahora o en los últimos días.",
    textEn: "Tap the body areas where you feel pain now or in recent days.",
    required: true,
  },
];

export const FUNCTIONAL_INTERFERENCE_QUESTIONS: Question[] = [
  {
    id: "fi_work",
    instrumentId: "functional_interference",
    key: "work_study",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con tu trabajo o estudios?",
    textEn: "How much has pain interfered with your work or studies?",
    options: InterferenceOptions,
  },
  {
    id: "fi_home",
    instrumentId: "functional_interference",
    key: "home_tasks",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con las tareas del hogar?",
    textEn: "How much has pain interfered with household tasks?",
    options: InterferenceOptions,
  },
  {
    id: "fi_social",
    instrumentId: "functional_interference",
    key: "social_life",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con tu vida social o familiar?",
    textEn: "How much has pain interfered with your social or family life?",
    options: InterferenceOptions,
  },
  {
    id: "fi_mobility",
    instrumentId: "functional_interference",
    key: "mobility",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con caminar o moverte con normalidad?",
    textEn: "How much has pain interfered with walking or moving normally?",
    options: InterferenceOptions,
  },
  {
    id: "fi_enjoyment",
    instrumentId: "functional_interference",
    key: "enjoyment",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con disfrutar actividades que te importan?",
    textEn: "How much has pain interfered with enjoying activities that matter to you?",
    options: InterferenceOptions,
  },
  {
    id: "fi_selfcare",
    instrumentId: "functional_interference",
    key: "self_care",
    type: "likert",
    textEs: "¿Cuánto ha interferido el dolor con tu cuidado personal (baño, vestirte, etc.)?",
    textEn: "How much has pain interfered with self-care (bathing, dressing, etc.)?",
    options: InterferenceOptions,
  },
];

/** PHQ-9 — standard 9 items, 0–3. Screening only. Chile-validated pathway. */
export const PHQ9_QUESTIONS: Question[] = [
  {
    id: "phq9_1",
    instrumentId: "phq9",
    key: "anhedonia",
    type: "likert",
    textEs: "Poco interés o placer en hacer cosas",
    textEn: "Little interest or pleasure in doing things",
    helpEs: "Durante las últimas 2 semanas, ¿con qué frecuencia te ha molestado lo siguiente?",
    helpEn: "Over the last 2 weeks, how often have you been bothered by the following?",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_2",
    instrumentId: "phq9",
    key: "depressed_mood",
    type: "likert",
    textEs: "Te has sentido decaído/a, deprimido/a o sin esperanzas",
    textEn: "Feeling down, depressed, or hopeless",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_3",
    instrumentId: "phq9",
    key: "sleep",
    type: "likert",
    textEs: "Problemas para dormir o mantenerte dormido/a, o dormir demasiado",
    textEn: "Trouble falling or staying asleep, or sleeping too much",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_4",
    instrumentId: "phq9",
    key: "energy",
    type: "likert",
    textEs: "Te has sentido cansado/a o con poca energía",
    textEn: "Feeling tired or having little energy",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_5",
    instrumentId: "phq9",
    key: "appetite",
    type: "likert",
    textEs: "Poco apetito o comer en exceso",
    textEn: "Poor appetite or overeating",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_6",
    instrumentId: "phq9",
    key: "self_worth",
    type: "likert",
    textEs:
      "Te sientes mal contigo mismo/a — o que eres un fracaso o que has quedado mal contigo o con tu familia",
    textEn:
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_7",
    instrumentId: "phq9",
    key: "concentration",
    type: "likert",
    textEs:
      "Problemas para concentrarte en cosas como leer el diario o ver televisión",
    textEn:
      "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_8",
    instrumentId: "phq9",
    key: "psychomotor",
    type: "likert",
    textEs:
      "Te mueves o hablas tan lento que otras personas podrían haberlo notado, o al contrario: estás tan inquieto/a o agitado/a que te mueves mucho más de lo habitual",
    textEn:
      "Moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around a lot more than usual",
    options: Likert0to3Options,
    required: true,
  },
  {
    id: "phq9_9",
    instrumentId: "phq9",
    key: "self_harm_thoughts",
    type: "likert",
    textEs:
      "Pensamientos de que estarías mejor muerto/a o de hacerte daño de alguna manera",
    textEn:
      "Thoughts that you would be better off dead or of hurting yourself in some way",
    options: Likert0to3Options,
    required: true,
    isRedFlag: true,
  },
];

/**
 * PSS-10 — standard 10 items.
 * Reverse-scored items: 4, 5, 7, 8 (ids pss10_4, pss10_5, pss10_7, pss10_8).
 */
export const PSS10_QUESTIONS: Question[] = [
  {
    id: "pss10_1",
    instrumentId: "pss10",
    key: "upset_unexpected",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia te has sentido molesto/a por algo que ocurrió de forma inesperada?",
    textEn:
      "In the last month, how often have you been upset because of something that happened unexpectedly?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_2",
    instrumentId: "pss10",
    key: "unable_control",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has sentido que no podías controlar las cosas importantes de tu vida?",
    textEn:
      "In the last month, how often have you felt that you were unable to control the important things in your life?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_3",
    instrumentId: "pss10",
    key: "nervous_stressed",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia te has sentido nervioso/a y “estresado/a”?",
    textEn:
      "In the last month, how often have you felt nervous and “stressed”?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_4",
    instrumentId: "pss10",
    key: "confident_handle",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia te has sentido seguro/a de tu capacidad para manejar tus problemas personales?",
    textEn:
      "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_5",
    instrumentId: "pss10",
    key: "things_going_way",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has sentido que las cosas te salían como querías?",
    textEn:
      "In the last month, how often have you felt that things were going your way?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_6",
    instrumentId: "pss10",
    key: "could_not_cope",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has encontrado que no podías enfrentar todas las cosas que tenías que hacer?",
    textEn:
      "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_7",
    instrumentId: "pss10",
    key: "control_irritations",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has podido controlar las irritaciones de tu vida?",
    textEn:
      "In the last month, how often have you been able to control irritations in your life?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_8",
    instrumentId: "pss10",
    key: "on_top",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has sentido que tenías las cosas bajo control?",
    textEn:
      "In the last month, how often have you felt that you were on top of things?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_9",
    instrumentId: "pss10",
    key: "angered_outside",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia te has enojado porque cosas fuera de tu control te afectaban?",
    textEn:
      "In the last month, how often have you been angered because of things that were outside of your control?",
    options: PssFrequencyOptions,
    required: true,
  },
  {
    id: "pss10_10",
    instrumentId: "pss10",
    key: "difficulties_piling",
    type: "likert",
    textEs:
      "En el último mes, ¿con qué frecuencia has sentido que las dificultades se acumulaban tanto que no podías superarlas?",
    textEn:
      "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
    options: PssFrequencyOptions,
    required: true,
  },
];

/**
 * IASP-oriented mechanism screening — NOT diagnosis.
 * Language must stay: “patrón compatible con…”.
 */
export const IASP_MECHANISM_QUESTIONS: Question[] = [
  {
    id: "iasp_temporal",
    instrumentId: "iasp_mechanism",
    key: "temporal_pattern",
    type: "single_choice",
    textEs: "¿Cómo describirías mejor el tiempo de tu dolor?",
    textEn: "How would you best describe the timeline of your pain?",
    helpEs:
      "Según criterios habituales: agudo (<3 meses), persistente/crónico (>3 meses) o recurrente (va y vuelve).",
    helpEn:
      "Common criteria: acute (<3 months), persistent/chronic (>3 months), or recurrent (comes and goes).",
    required: true,
    options: [
      { value: "acute", labelEs: "Reciente: menos de 3 meses", labelEn: "Recent: less than 3 months" },
      {
        value: "chronic",
        labelEs: "Persistente: más de 3 meses casi continuo",
        labelEn: "Persistent: more than 3 months, nearly continuous",
      },
      {
        value: "recurrent",
        labelEs: "Recurrente: episodios que van y vuelven por meses",
        labelEn: "Recurrent: episodes that come and go for months",
      },
    ],
  },
  {
    id: "iasp_clear_injury",
    instrumentId: "iasp_mechanism",
    key: "clear_tissue_link",
    type: "likert",
    textEs:
      "Mi dolor se relaciona de forma clara con una lesión, inflamación o daño de tejidos que un clínico ha identificado",
    textEn:
      "My pain clearly relates to an injury, inflammation, or tissue damage a clinician has identified",
    helpEs: "Orientación hacia un patrón más compatible con dolor nociceptivo — no es un diagnóstico.",
    helpEn: "Orients toward a pattern more compatible with nociceptive pain — not a diagnosis.",
    options: AgreeOptions,
  },
  {
    id: "iasp_nerve_quality",
    instrumentId: "iasp_mechanism",
    key: "nerve_like_quality",
    type: "likert",
    textEs:
      "Siento ardor, hormigueo, descargas o sensibilidad al roce en una zona que sigue un trayecto nervioso",
    textEn:
      "I feel burning, tingling, electric shocks, or touch sensitivity in an area that follows a nerve path",
    helpEs: "Orientación hacia un patrón más compatible con dolor neuropático — no es un diagnóstico.",
    helpEn: "Orients toward a pattern more compatible with neuropathic pain — not a diagnosis.",
    options: AgreeOptions,
  },
  {
    id: "iasp_widespread_sensitized",
    instrumentId: "iasp_mechanism",
    key: "widespread_sensitized",
    type: "likert",
    textEs:
      "El dolor es difuso, cambia de zona, o el cuerpo se siente “hipersensible” aunque las pruebas no muestren daño nuevo proporcional",
    textEn:
      "Pain is diffuse, shifts location, or the body feels “hypersensitive” even when tests do not show proportional new damage",
    helpEs:
      "Orientación hacia un patrón más compatible con dolor nociplástico (sensibilización). Los mecanismos pueden coexistir (IASP).",
    helpEn:
      "Orients toward a pattern more compatible with nociplastic pain (sensitization). Mechanisms can coexist (IASP).",
    options: AgreeOptions,
  },
  {
    id: "iasp_mixed_features",
    instrumentId: "iasp_mechanism",
    key: "mixed_features",
    type: "likert",
    textEs:
      "Reconozco rasgos de más de un tipo a la vez (por ejemplo lesión clara + ardor + sensibilidad general)",
    textEn:
      "I recognize features of more than one type at once (for example clear injury + burning + general sensitivity)",
    helpEs: "Según IASP, los mecanismos pueden coexistir. Un patrón mixto es frecuente y no “invalida” tu dolor.",
    helpEn: "Per IASP, mechanisms can coexist. A mixed pattern is common and does not invalidate your pain.",
    options: AgreeOptions,
  },
  {
    id: "iasp_edu_coexist",
    instrumentId: "iasp_mechanism",
    key: "edu_mechanisms_coexist",
    type: "single_choice",
    textEs:
      "¿Te hace sentido que distintos mecanismos de dolor puedan coexistir y que eso no significa que el dolor sea “imaginario”?",
    textEn:
      "Does it make sense that different pain mechanisms can coexist and that this does not mean pain is “imaginary”?",
    options: [
      { value: "yes", labelEs: "Sí, me hace sentido", labelEn: "Yes, that makes sense" },
      { value: "partial", labelEs: "Más o menos", labelEn: "Somewhat" },
      { value: "new", labelEs: "Es nuevo para mí", labelEn: "This is new to me" },
    ],
  },
];

/** CBT automatic thoughts — psychoeducation, NOT PCS Chile-validated. */
export const CBT_AUTOMATIC_BELIEFS_QUESTIONS: Question[] = [
  {
    id: "cbt_auto_worst",
    instrumentId: "cbt_automatic_beliefs",
    key: "worst_case",
    type: "likert",
    textEs: "Cuando el dolor sube, mi mente salta rápido a lo peor que podría pasar",
    textEn: "When pain rises, my mind quickly jumps to the worst that could happen",
    helpEs:
      "Orientación psicoeducativa (inspirada en TCC del dolor). No es la escala PCS validada en Chile.",
    helpEn:
      "Psychoeducational orientation (pain CBT inspired). Not the Chile-validated PCS scale.",
    options: AgreeOptions,
  },
  {
    id: "cbt_auto_forever",
    instrumentId: "cbt_automatic_beliefs",
    key: "forever_thought",
    type: "likert",
    textEs: "Pienso “esto nunca va a mejorar” o “voy a quedar así para siempre”",
    textEn: "I think “this will never get better” or “I will stay like this forever”",
    options: AgreeOptions,
  },
  {
    id: "cbt_auto_ruin",
    instrumentId: "cbt_automatic_beliefs",
    key: "ruined_day",
    type: "likert",
    textEs: "Si el dolor está alto, siento que el día completo ya está “arruinado”",
    textEn: "If pain is high, I feel the whole day is already “ruined”",
    options: AgreeOptions,
  },
  {
    id: "cbt_auto_danger",
    instrumentId: "cbt_automatic_beliefs",
    key: "danger_signal",
    type: "likert",
    textEs: "Interpreto casi todo aumento de dolor como señal de daño grave e inmediato",
    textEn: "I interpret almost every pain increase as a signal of serious immediate damage",
    options: AgreeOptions,
  },
  {
    id: "cbt_auto_help_needed",
    instrumentId: "cbt_automatic_beliefs",
    key: "therapy_could_help",
    type: "likert",
    textEs:
      "Creo que trabajar estos pensamientos con psicoterapia del dolor podría ayudarme (sin negar que el dolor es real)",
    textEn:
      "I believe working on these thoughts with pain psychotherapy could help me (without denying that pain is real)",
    options: AgreeOptions,
  },
];

/** Limiting beliefs — gently open door to pain psychotherapy necessity. */
export const CBT_LIMITING_BELIEFS_QUESTIONS: Question[] = [
  {
    id: "cbt_lim_only_meds",
    instrumentId: "cbt_limiting_beliefs",
    key: "only_surgery_drugs",
    type: "likert",
    textEs: "El dolor solo se cura de verdad con cirugía o fármacos; lo psicológico “no cuenta”",
    textEn: "Pain is only truly cured by surgery or drugs; the psychological “does not count”",
    helpEs:
      "Tu dolor es real. La psicoterapia del dolor no lo inventa: trabaja el perfil específico de tu experiencia.",
    helpEn:
      "Your pain is real. Pain psychotherapy does not invent it: it works with the specific profile of your experience.",
    options: AgreeOptions,
  },
  {
    id: "cbt_lim_psych_imaginary",
    instrumentId: "cbt_limiting_beliefs",
    key: "psych_means_imaginary",
    type: "likert",
    textEs:
      "Pedir ayuda psicológica significaría admitir que el dolor es imaginario o “está en mi cabeza”",
    textEn:
      "Asking for psychological help would mean admitting the pain is imaginary or “in my head”",
    options: AgreeOptions,
  },
  {
    id: "cbt_lim_move_harm",
    instrumentId: "cbt_limiting_beliefs",
    key: "move_equals_harm",
    type: "likert",
    textEs: "Si me muevo, me daño; el descanso total es lo más seguro siempre",
    textEn: "If I move, I harm myself; total rest is always the safest option",
    options: AgreeOptions,
  },
  {
    id: "cbt_lim_identity",
    instrumentId: "cbt_limiting_beliefs",
    key: "identity_as_pain",
    type: "likert",
    textEs: "El dolor define quién soy; sin él “no sé quién sería”",
    textEn: "Pain defines who I am; without it “I would not know who I would be”",
    options: AgreeOptions,
  },
  {
    id: "cbt_lim_therapy_necessary",
    instrumentId: "cbt_limiting_beliefs",
    key: "therapy_necessary_openness",
    type: "likert",
    textEs:
      "Estoy abierto/a a que la psicoterapia del dolor sea útil para entender y tratar mi perfil de dolor",
    textEn:
      "I am open to pain psychotherapy being useful to understand and treat my pain profile",
    options: AgreeOptions,
  },
];

/** Pharmacology beliefs — myths without installing wrong medical advice. */
export const PHARMACOLOGY_BELIEFS_QUESTIONS: Question[] = [
  {
    id: "pharm_instant",
    instrumentId: "pharmacology_beliefs",
    key: "must_work_instantly",
    type: "likert",
    textEs: "Si un medicamento no me quita el dolor al instante, significa que no sirve",
    textEn: "If a medication does not take my pain away instantly, it means it does not work",
    helpEs:
      "Muchos fármacos para dolor persistente actúan con tiempos y mecanismos distintos. Esto no es indicación de dosis: conversa con tu clínico.",
    helpEn:
      "Many persistent-pain drugs act with different times and mechanisms. This is not dosing advice: talk with your clinician.",
    options: AgreeOptions,
  },
  {
    id: "pharm_addiction_sure",
    instrumentId: "pharmacology_beliefs",
    key: "addiction_inevitable",
    type: "likert",
    textEs: "Si uso analgésicos para dolor crónico, me voy a volver adicto/a sí o sí",
    textEn: "If I use analgesics for chronic pain, I will definitely become addicted",
    helpEs:
      "El riesgo depende del fármaco, dosis, tiempo y contexto. No generalices el miedo: evalúalo con tu equipo de salud. Neuropi no prescribe.",
    helpEn:
      "Risk depends on the drug, dose, time, and context. Do not generalize fear: evaluate it with your care team. Neuropi does not prescribe.",
    options: AgreeOptions,
  },
  {
    id: "pharm_more_dose",
    instrumentId: "pharmacology_beliefs",
    key: "more_dose_always_more_relief",
    type: "likert",
    textEs: "Más dosis siempre significa más alivio; si duele, hay que subir la dosis",
    textEn: "More dose always means more relief; if it hurts, the dose must go up",
    helpEs:
      "Eso no siempre es cierto y puede ser riesgoso. Nunca ajustes dosis por tu cuenta: habla con quien te indica el tratamiento.",
    helpEn:
      "That is not always true and can be risky. Never adjust doses on your own: talk with whoever prescribes your treatment.",
    options: AgreeOptions,
  },
  {
    id: "pharm_only_solution",
    instrumentId: "pharmacology_beliefs",
    key: "meds_only_solution",
    type: "likert",
    textEs: "Sin el medicamento “perfecto”, no hay nada más que hacer por el dolor",
    textEn: "Without the “perfect” medication, there is nothing else to do for the pain",
    options: AgreeOptions,
  },
  {
    id: "pharm_talk_clinician",
    instrumentId: "pharmacology_beliefs",
    key: "will_talk_clinician",
    type: "single_choice",
    textEs:
      "¿Puedes comprometerte a conversar dudas sobre medicamentos solo con tu clínico tratante (no con la app)?",
    textEn:
      "Can you commit to discussing medication questions only with your treating clinician (not with the app)?",
    options: [
      { value: "yes", labelEs: "Sí", labelEn: "Yes" },
      { value: "need_support", labelEs: "Sí, pero necesito apoyo para prepararme", labelEn: "Yes, but I need support to prepare" },
      { value: "unsure", labelEs: "Aún no estoy seguro/a", labelEn: "I am not sure yet" },
    ],
  },
];

/**
 * Lifestyle pillars — sleep, movement, nutrition, social, substances, stress.
 * Features (not validated instruments): sleep quality, fear-of-movement,
 * self-efficacy, social support reframed as pillars.
 */
export const LIFESTYLE_PILLARS_QUESTIONS: Question[] = [
  {
    id: "lp_sleep_quality",
    instrumentId: "lifestyle_pillars",
    key: "sleep_quality",
    type: "likert",
    textEs: "En la última semana, ¿cómo calificarías la calidad de tu sueño?",
    textEn: "In the last week, how would you rate your sleep quality?",
    helpEs: "Pilar de sueño: puede amplificar o amortiguar el dolor. No diagnostica trastorno del sueño.",
    helpEn: "Sleep pillar: can amplify or buffer pain. Does not diagnose a sleep disorder.",
    options: [
      { value: 0, labelEs: "Muy buena", labelEn: "Very good", score: 0 },
      { value: 1, labelEs: "Bastante buena", labelEn: "Fairly good", score: 1 },
      { value: 2, labelEs: "Regular", labelEn: "Fair", score: 2 },
      { value: 3, labelEs: "Mala", labelEn: "Poor", score: 3 },
      { value: 4, labelEs: "Muy mala", labelEn: "Very poor", score: 4 },
    ],
  },
  {
    id: "lp_sleep_pain",
    instrumentId: "lifestyle_pillars",
    key: "sleep_pain_loop",
    type: "likert",
    textEs: "¿Con qué frecuencia el dolor y el sueño se alimentan mutuamente (duele → duermo mal → duele más)?",
    textEn: "How often do pain and sleep feed each other (hurt → sleep poorly → hurt more)?",
    options: InterferenceOptions,
  },
  {
    id: "lp_movement_fear",
    instrumentId: "lifestyle_pillars",
    key: "fear_of_movement",
    type: "likert",
    textEs: "Evito moverme por miedo a empeorar el dolor, aunque la actividad sea importante para mí",
    textEn: "I avoid moving for fear of worsening pain, even when the activity matters to me",
    helpEs: "Pilar de movimiento / miedo al movimiento: feature de orientación, no escala de kinesiofobia validada.",
    helpEn: "Movement / fear-of-movement pillar: orientation feature, not a validated kinesiophobia scale.",
    options: AgreeOptions,
  },
  {
    id: "lp_self_efficacy",
    instrumentId: "lifestyle_pillars",
    key: "self_efficacy",
    type: "likert",
    textEs: "Siento que puedo manejar el dolor la mayor parte de los días (aunque no desaparezca)",
    textEn: "I feel I can manage pain most days (even if it does not disappear)",
    helpEs: "Autoeficacia como recurso protector — no mide carácter ni inteligencia.",
    helpEn: "Self-efficacy as a protective resource — does not measure character or intelligence.",
    options: AgreeOptions,
  },
  {
    id: "lp_social_support",
    instrumentId: "lifestyle_pillars",
    key: "social_support",
    type: "likert",
    textEs: "Hay personas con quienes puedo hablar o pedir ayuda práctica respecto al dolor",
    textEn: "There are people I can talk to or ask for practical help regarding pain",
    options: AgreeOptions,
  },
  {
    id: "lp_nutrition",
    instrumentId: "lifestyle_pillars",
    key: "nutrition_energy",
    type: "likert",
    textEs: "Mi alimentación y energía diaria se sienten desordenadas o muy irregulares por el dolor",
    textEn: "My daily eating and energy feel disordered or very irregular because of pain",
    options: AgreeOptions,
  },
  {
    id: "lp_substances",
    instrumentId: "lifestyle_pillars",
    key: "substances_cope",
    type: "likert",
    textEs:
      "Uso alcohol, tabaco u otras sustancias con más frecuencia para “aguantar” el dolor o dormir",
    textEn:
      "I use alcohol, tobacco, or other substances more often to “get through” pain or to sleep",
    helpEs: "Sin juicio. Si esto te preocupa, conversarlo con un profesional es un acto de cuidado.",
    helpEn: "No judgment. If this worries you, talking with a professional is an act of care.",
    options: AgreeOptions,
  },
  {
    id: "lp_stress_load",
    instrumentId: "lifestyle_pillars",
    key: "chronic_stress_load",
    type: "likert",
    textEs:
      "Siento una carga de estrés sostenida (semanas/meses) que me deja sin margen, distinta de un estrés puntual útil",
    textEn:
      "I feel a sustained stress load (weeks/months) that leaves me without margin, different from useful short-term stress",
    helpEs:
      "El estrés agudo puede ser adaptativo; la carga crónica (alostática) es otra cosa. Ninguno “inventa” el dolor: pueden amplificarlo. Ansiedad/ánimo no se presentan aquí como causa primaria del dolor.",
    helpEn:
      "Acute stress can be adaptive; chronic (allostatic) load is different. Neither “invents” pain: they can amplify it. Anxiety/mood are not presented here as the primary cause of pain.",
    options: AgreeOptions,
  },
];

/**
 * Crisis / PAP pathway — educational orientation for helpers.
 * Primary gate remains PHQ-9 item 9; these items deepen the pathway copy.
 */
export const CRISIS_PAP_QUESTIONS: Question[] = [
  {
    id: "pap_need_now",
    instrumentId: "crisis_pap",
    key: "need_immediate_help",
    type: "single_choice",
    textEs: "Ahora mismo, ¿necesitas apoyo inmediato por pensamientos de daño o crisis?",
    textEn: "Right now, do you need immediate support for harm thoughts or crisis?",
    helpEs:
      "Si la respuesta es sí: prioriza personas reales y números de Chile (Salud Responde 600 360 7777, SAMU 131, urgencias). Neuropi no reemplaza esa atención.",
    helpEn:
      "If yes: prioritize real people and Chile numbers (Salud Responde 600 360 7777, SAMU 131, emergency). Neuropi does not replace that care.",
    isRedFlag: true,
    options: [
      { value: "yes", labelEs: "Sí, ahora", labelEn: "Yes, now" },
      { value: "not_now", labelEs: "No en este momento", labelEn: "Not right now" },
      { value: "unsure", labelEs: "No estoy seguro/a", labelEn: "I am not sure" },
    ],
  },
  {
    id: "pap_edu_abcde",
    instrumentId: "crisis_pap",
    key: "pap_abcde_awareness",
    type: "single_choice",
    textEs:
      "Para quien te acompaña: el espíritu PAP-ABCDE (inspiración UC Chile) orienta a Escucha activa, Respiración, Categorizar necesidades, Derivación y Psicoeducación. ¿Quieres ver esta guía breve?",
    textEn:
      "For whoever supports you: the PAP-ABCDE spirit (UC Chile inspiration) orients Active listening, Breathing, Categorize needs, Derivation, and Psychoeducation. Do you want this brief guide?",
    helpEs:
      "La app NO entrega terapia PAP completa ni diagnostica TEPT u otros trastornos.",
    helpEn:
      "The app does NOT deliver full PAP therapy or diagnose PTSD or other disorders.",
    options: [
      { value: "yes", labelEs: "Sí, mostrar orientación", labelEn: "Yes, show orientation" },
      { value: "no", labelEs: "No ahora", labelEn: "Not now" },
    ],
  },
];

/** Safety red-flag questions (urgent symptoms). */
export const SAFETY_QUESTIONS: Question[] = [
  {
    id: "rf_chest_breath",
    instrumentId: "safety",
    key: "chest_breath",
    type: "boolean",
    textEs:
      "¿Tienes dolor en el pecho, dificultad para respirar o sensación de ahogo reciente e intensa?",
    textEn:
      "Do you have chest pain, difficulty breathing, or a recent intense feeling of suffocation?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_neuro_sudden",
    instrumentId: "safety",
    key: "neuro_sudden",
    type: "boolean",
    textEs:
      "¿Has tenido debilidad súbita, pérdida de sensibilidad, dificultad para hablar o cambio rápido de la visión?",
    textEn:
      "Have you had sudden weakness, loss of sensation, difficulty speaking, or rapid vision change?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_bowel_bladder",
    instrumentId: "safety",
    key: "bowel_bladder",
    type: "boolean",
    textEs:
      "¿Has perdido el control de orina o deposiciones, o tienes adormecimiento en la zona genital / “en silla de montar”?",
    textEn:
      "Have you lost bowel or bladder control, or have numbness in the genital / “saddle” area?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_trauma_fracture",
    instrumentId: "safety",
    key: "trauma_fracture",
    type: "boolean",
    textEs:
      "¿Tu dolor intenso apareció tras un golpe, caída o accidente, con sospecha de fractura o lesión grave?",
    textEn:
      "Did intense pain start after a blow, fall, or accident, with suspected fracture or serious injury?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_fever_infection",
    instrumentId: "safety",
    key: "fever_infection",
    type: "boolean",
    textEs:
      "¿Tienes fiebre alta, escalofríos, enrojecimiento o inflamación marcada junto con el dolor?",
    textEn:
      "Do you have high fever, chills, marked redness or swelling together with the pain?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_unexplained_weight",
    instrumentId: "safety",
    key: "unexplained_weight",
    type: "boolean",
    textEs:
      "¿Has bajado mucho de peso sin quererlo, o tienes sudores nocturnos o cansancio extremo reciente sin explicación?",
    textEn:
      "Have you lost a lot of weight unintentionally, or have night sweats or extreme unexplained recent fatigue?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_cancer_history",
    instrumentId: "safety",
    key: "cancer_history",
    type: "boolean",
    textEs:
      "¿Tienes antecedente de cáncer y un dolor nuevo o que cambia de carácter de forma preocupante?",
    textEn:
      "Do you have a history of cancer and new pain or pain that changes character in a worrying way?",
    isRedFlag: true,
    required: true,
  },
  {
    id: "rf_self_harm",
    instrumentId: "safety",
    key: "self_harm",
    type: "boolean",
    textEs:
      "¿Tienes pensamientos de hacerte daño, de no querer seguir viviendo, o de que otros estarían mejor sin ti?",
    textEn:
      "Do you have thoughts of harming yourself, of not wanting to go on living, or that others would be better off without you?",
    isRedFlag: true,
    required: true,
  },
];

export const ALL_QUESTIONS: Question[] = [
  ...SAFETY_QUESTIONS,
  ...CHILEAN_PAIN_SCREEN_QUESTIONS,
  ...NRS_QUESTIONS,
  ...VAS_QUESTIONS,
  ...BODY_MAP_QUESTIONS,
  ...FUNCTIONAL_INTERFERENCE_QUESTIONS,
  ...PHQ9_QUESTIONS,
  ...PSS10_QUESTIONS,
  ...IASP_MECHANISM_QUESTIONS,
  ...CBT_AUTOMATIC_BELIEFS_QUESTIONS,
  ...CBT_LIMITING_BELIEFS_QUESTIONS,
  ...PHARMACOLOGY_BELIEFS_QUESTIONS,
  ...LIFESTYLE_PILLARS_QUESTIONS,
  ...CRISIS_PAP_QUESTIONS,
];

export const QuestionAnswerSchema = z.object({
  questionId: z.string(),
  value: z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.string()),
    z.null(),
  ]),
});

export const AssessmentAnswersSchema = z.record(
  z.string(),
  z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.string()),
    z.null(),
  ]),
);

export type AssessmentAnswersInput = z.infer<typeof AssessmentAnswersSchema>;

export function getQuestionsForInstrument(
  instrumentId: InstrumentId | "safety",
): Question[] {
  return ALL_QUESTIONS.filter((q) => q.instrumentId === instrumentId);
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}
