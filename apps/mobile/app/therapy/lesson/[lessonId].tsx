import { View } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { MILESTONES } from "@neuropi/shared";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function LessonScreen() {
  const { lessonId, moduleId } = useLocalSearchParams<{
    lessonId: string;
    moduleId?: string;
  }>();
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const completeLesson = useJournalStore((s) => s.completeLesson);
  const completedLessons = useJournalStore((s) => s.completedLessons);

  const lesson = MILESTONES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, milestoneId: m.id })),
  ).find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <Screen>
        <Text variant="body">Lección no encontrada.</Text>
      </Screen>
    );
  }

  const title = language === "en" ? lesson.titleEn : lesson.titleEs;
  const summary = language === "en" ? lesson.summaryEn : lesson.summaryEs;
  const done = completedLessons.includes(lesson.id);

  const bodyEs = [
    summary,
    "",
    "Esta lección es psicoeducación y práctica suave. No reemplaza evaluación clínica.",
    "Ve a tu ritmo. Si el dolor sube mucho, pausa y vuelve más tarde.",
    "",
    lesson.type === "audio"
      ? "Cuando haya audio disponible, podrás escucharlo aquí. Por ahora, lee con calma."
      : lesson.type === "exercise"
        ? "Practica con dosis pequeña. El objetivo es seguridad y confianza, no rendimiento."
        : "Reflexiona sin exigirte la respuesta perfecta.",
  ].join("\n");

  return (
    <Screen>
      <Stack.Screen options={{ title }} />
      <View style={{ gap: space("lg") }}>
        <Text variant="title">{title}</Text>
        <Text variant="caption" muted>
          {lesson.durationMin} min · {lesson.type}
        </Text>
        <Text variant="body">{bodyEs}</Text>
        <Button
          label={done ? t("program.completed") : t("program.markComplete")}
          fullWidth
          disabled={done}
          onPress={() => {
            completeLesson(lesson.id);
            const mid = moduleId ?? lesson.milestoneId;
            router.back();
            if (mid) {
              // stay in flow
            }
          }}
        />
      </View>
    </Screen>
  );
}
