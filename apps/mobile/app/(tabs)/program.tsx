import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { MILESTONES } from "@neuropi/shared";
import { EmptyState, Screen, Text, useTheme } from "@neuropi/ui";
import { MilestoneCard } from "@/components/MilestoneCard";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function ProgramScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const completedLessons = useJournalStore((s) => s.completedLessons);
  const setCurrentMilestone = useJournalStore((s) => s.setCurrentMilestone);

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text variant="title">{t("program.title")}</Text>
        <Text variant="body" muted>
          {t("program.subtitle")}
        </Text>
        {MILESTONES.length === 0 ? (
          <EmptyState title="Sin hitos" />
        ) : (
          MILESTONES.map((m) => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              completedLessonIds={completedLessons}
              language={language}
              onPress={() => {
                setCurrentMilestone(m.id);
                router.push(`/therapy/${m.id}`);
              }}
            />
          ))
        )}
      </View>
    </Screen>
  );
}
