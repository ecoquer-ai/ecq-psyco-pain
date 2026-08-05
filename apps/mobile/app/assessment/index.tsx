import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { INSTRUMENTS, type InstrumentId } from "@neuropi/shared";
import {
  Button,
  Card,
  ProgressBar,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";
import {
  moduleProgress,
  nextModuleId,
  visibleAssessmentModules,
} from "@/domain/assessmentFlow";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useSettingsStore } from "@/store/settingsStore";

export default function AssessmentIndex() {
  const { t } = useTranslation();
  const { space, colors } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const completed = useAssessmentStore((s) => s.completedModules);
  const answers = useAssessmentStore((s) => s.answers);
  const resultsReady = useAssessmentStore((s) => s.resultsReady);
  const progress = moduleProgress(completed, answers);
  const next = nextModuleId(completed, answers);
  const modules = visibleAssessmentModules(completed, answers);

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text
          variant="body"
          muted
          style={{ lineHeight: 26, letterSpacing: 0.2 }}
        >
          {t("assessment.pickerHint")}
        </Text>
        <Text variant="caption" muted style={{ lineHeight: 22 }}>
          {t("assessment.psychWhy")}
        </Text>
        <ProgressBar value={progress} showPercent label="Progreso general" />

        {next ? (
          <Button
            label={t("assessment.continue")}
            fullWidth
            onPress={() => router.push(`/assessment/${next}`)}
          />
        ) : null}

        {(resultsReady || completed.length >= 3) && (
          <Button
            label={t("assessment.seeResults")}
            variant="secondary"
            fullWidth
            onPress={() => router.push("/assessment/results")}
          />
        )}

        {modules.map((id) => {
          const meta = INSTRUMENTS[id as InstrumentId];
          if (!meta) return null;
          const done = completed.includes(id);
          return (
            <Card
              key={id}
              onPress={() => router.push(`/assessment/${id}`)}
              accessibilityLabel={meta.nameEs}
            >
              <Text variant="label">
                {language === "en" ? meta.nameEn : meta.nameEs}
              </Text>
              <Text variant="caption" muted>
                ~{meta.estimatedMinutes} min
                {done
                  ? language === "en"
                    ? " · done"
                    : " · listo"
                  : ""}
              </Text>
              <Text
                variant="caption"
                muted
                style={{ marginTop: space("xs"), color: colors.textMuted }}
              >
                {language === "en"
                  ? meta.disclaimer.en
                  : meta.disclaimer.es}
              </Text>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
