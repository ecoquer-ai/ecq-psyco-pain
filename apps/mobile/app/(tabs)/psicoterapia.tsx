import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MILESTONES } from "@neuropi/shared";
import {
  Button,
  DisclaimerBanner,
  ProgressBar,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";
import { moduleProgress, nextModuleId } from "@/domain/assessmentFlow";

export default function PsicoterapiaScreen() {
  const { t } = useTranslation();
  const { colors, space, radius } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const completed = useAssessmentStore((s) => s.completedModules);
  const answers = useAssessmentStore((s) => s.answers);
  const resultsReady = useAssessmentStore((s) => s.resultsReady);
  const completedLessons = useJournalStore((s) => s.completedLessons);
  const next = nextModuleId(completed, answers);
  const progress = moduleProgress(completed, answers);

  const totalLessons = MILESTONES.reduce((a, m) => a + m.lessons.length, 0);
  const programPct =
    totalLessons === 0 ? 0 : completedLessons.length / totalLessons;

  return (
    <Screen>
      <View style={{ gap: space("xl") }}>
        <View style={{ gap: space("sm") }}>
          <Text variant="title" style={{ letterSpacing: 0.2 }}>
            {t("psych.title")}
          </Text>
          <Text
            variant="body"
            style={{ lineHeight: 26, letterSpacing: 0.25 }}
          >
            {t("psych.intro")}
          </Text>
          <Text
            variant="body"
            muted
            style={{ lineHeight: 26, letterSpacing: 0.2 }}
          >
            {t("psych.validates")}
          </Text>
        </View>

        <View
          style={{
            padding: space("lg"),
            borderRadius: radius("lg"),
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            gap: space("md"),
            width: "100%",
            alignSelf: "stretch",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: space("sm"),
              flexWrap: "wrap",
            }}
          >
            <Ionicons name="medical-outline" size={22} color={colors.primary} />
            <Text variant="subtitle" style={{ flexShrink: 1 }}>
              {t("psych.whyNecessary")}
            </Text>
          </View>
          <Text
            variant="body"
            muted
            style={{ lineHeight: 24, flexShrink: 1, width: "100%" }}
          >
            {t("psych.whenHelps")}
          </Text>
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("psych.assessmentProgress")}
          </Text>
          <ProgressBar value={progress} showPercent />
          <Button
            label={
              resultsReady
                ? t("psych.ctaResults")
                : next
                  ? t("psych.ctaAssessment")
                  : t("psych.ctaStartUnderstand")
            }
            fullWidth
            onPress={() =>
              router.push(
                resultsReady
                  ? "/assessment/results"
                  : next
                    ? (`/assessment/${next}` as never)
                    : "/assessment",
              )
            }
          />
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("psych.programProgress")}
          </Text>
          <ProgressBar value={programPct} showPercent />
          <Button
            label={t("psych.ctaProgram")}
            variant="secondary"
            fullWidth
            onPress={() => router.push("/therapy/m1_understand_pain")}
          />
        </View>

        <Button
          label={t("psych.ctaConsult")}
          variant="secondary"
          fullWidth
          onPress={() => router.push("/report")}
        />
        <Button
          label={t("psych.ctaLibrary")}
          variant="ghost"
          fullWidth
          onPress={() => router.push("/(tabs)/library")}
        />

        <DisclaimerBanner locale={language} />
      </View>
    </Screen>
  );
}
