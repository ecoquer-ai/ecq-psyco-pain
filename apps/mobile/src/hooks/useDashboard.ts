import { useMemo } from "react";
import { MILESTONES, getMilestoneById } from "@neuropi/shared";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";
import { moduleProgress, nextModuleId } from "@/domain/assessmentFlow";

const INSIGHTS_ES = [
  "El dolor que persiste no significa que estés fallando: tu sistema nervioso puede mantener una alarma encendida.",
  "La psicoterapia del dolor no niega tu dolor: trabaja el perfil específico de tu experiencia.",
  "Hoy basta un paso pequeño. La recuperación rara vez es una línea recta.",
  "Moverte con cuidado no es rendirse. Es dosificar, no abandonar.",
  "Tu dolor es real. Merece comprensión y, a menudo, psicoterapia como parte del tratamiento.",
];

export function useDashboard() {
  const displayName = useSettingsStore((s) => s.displayName);
  const language = useSettingsStore((s) => s.language);
  const entries = useJournalStore((s) => s.entries);
  const completedLessons = useJournalStore((s) => s.completedLessons);
  const currentMilestoneId = useJournalStore((s) => s.currentMilestoneId);
  const completedModules = useAssessmentStore((s) => s.completedModules);
  const answers = useAssessmentStore((s) => s.answers);
  const resultsReady = useAssessmentStore((s) => s.resultsReady);

  return useMemo(() => {
    const latest = entries[0];
    const milestone =
      getMilestoneById(currentMilestoneId) ?? MILESTONES[0];
    const milestoneLessons = milestone?.lessons ?? [];
    const doneInMilestone = milestoneLessons.filter((l) =>
      completedLessons.includes(l.id),
    ).length;
    const programProgress =
      milestoneLessons.length === 0
        ? 0
        : doneInMilestone / milestoneLessons.length;

    const totalLessons = MILESTONES.reduce(
      (acc, m) => acc + m.lessons.length,
      0,
    );
    const overallProgram =
      totalLessons === 0 ? 0 : completedLessons.length / totalLessons;

    const dayIndex = new Date().getDate() % INSIGHTS_ES.length;
    const insight =
      language === "en"
        ? "Pain psychotherapy does not deny your pain — it works with your specific profile."
        : INSIGHTS_ES[dayIndex];

    const hour = new Date().getHours();
    const greetingBase =
      hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
    const name = displayName?.trim() || null;
    const greeting = name
      ? `${greetingBase}, ${name}`
      : `${greetingBase}`;

    const nextMod = nextModuleId(completedModules, answers);

    let nextAction: { label: string; href: string };
    if (!resultsReady && completedModules.length === 0) {
      nextAction = {
        label:
          language === "en"
            ? "Start understanding my pain"
            : "Comenzar a entender mi dolor",
        href: "/assessment",
      };
    } else if (!resultsReady && nextMod) {
      nextAction = {
        label:
          language === "en"
            ? "Continue assessment"
            : "Continuar el tamizaje",
        href: `/assessment/${nextMod}`,
      };
    } else {
      nextAction = {
        label:
          language === "en"
            ? "Go to pain psychotherapy"
            : "Ir a psicoterapia del dolor",
        href: "/(tabs)/psicoterapia",
      };
    }

    return {
      greeting,
      latest,
      programProgress,
      overallProgram,
      assessmentProgress: moduleProgress(completedModules, answers),
      completedModulesCount: completedModules.length,
      milestone,
      insight,
      nextAction,
      resultsReady,
    };
  }, [
    displayName,
    language,
    entries,
    completedLessons,
    currentMilestoneId,
    completedModules,
    answers,
    resultsReady,
  ]);
}
