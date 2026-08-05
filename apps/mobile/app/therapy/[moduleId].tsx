import { View } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { getMilestoneById } from "@neuropi/shared";
import { Card, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function TherapyModuleScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const completedLessons = useJournalStore((s) => s.completedLessons);
  const milestone = getMilestoneById(moduleId);

  if (!milestone) {
    return (
      <Screen>
        <Text variant="body">Hito no encontrado.</Text>
      </Screen>
    );
  }

  const done = milestone.lessons.filter((l) =>
    completedLessons.includes(l.id),
  ).length;
  const progress =
    milestone.lessons.length === 0 ? 0 : done / milestone.lessons.length;
  const title = language === "en" ? milestone.titleEn : milestone.titleEs;

  return (
    <Screen>
      <Stack.Screen options={{ title }} />
      <View style={{ gap: space("lg") }}>
        <Text variant="body" muted>
          {language === "en"
            ? milestone.descriptionEn
            : milestone.descriptionEs}
        </Text>
        <ProgressBar
          value={progress}
          label={`${done}/${milestone.lessons.length}`}
        />
        <Text variant="label" muted>
          {t("program.lessons")}
        </Text>
        {milestone.lessons.map((lesson) => {
          const completed = completedLessons.includes(lesson.id);
          return (
            <Card
              key={lesson.id}
              onPress={() =>
                router.push(`/therapy/lesson/${lesson.id}?moduleId=${moduleId}`)
              }
              accessibilityLabel={lesson.titleEs}
            >
              <Text variant="label">
                {language === "en" ? lesson.titleEn : lesson.titleEs}
              </Text>
              <Text variant="caption" muted>
                {lesson.durationMin} min · {lesson.type}
                {completed
                  ? ` · ${t("program.completed")}`
                  : ""}
              </Text>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
