import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { DisclaimerBanner, Screen, Text, useTheme } from "@neuropi/ui";
import { useAssessmentStore } from "@/store/assessmentStore";
import { useJournalStore } from "@/store/journalStore";
import { useSettingsStore } from "@/store/settingsStore";
import { buildRiskProtectionProfile } from "@neuropi/shared";

export default function ReportScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const answers = useAssessmentStore((s) => s.answers);
  const completedModules = useAssessmentStore((s) => s.completedModules);
  const entries = useJournalStore((s) => s.entries);
  const latest = entries[0];
  const profile = buildRiskProtectionProfile(answers);

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text variant="title">{t("report.title")}</Text>
        <Text variant="body">{t("report.body")}</Text>
        <DisclaimerBanner locale={language} />

        <Text variant="label" muted>
          Módulos completados
        </Text>
        <Text variant="body">
          {completedModules.length
            ? completedModules.join(", ")
            : "Aún sin módulos"}
        </Text>

        <Text variant="label" muted>
          Último check-in
        </Text>
        {latest ? (
          <Text variant="body">
            NRS {latest.nrs} · {new Date(latest.createdAt).toLocaleDateString()}
            {latest.flareUp ? " · flare-up" : ""}
          </Text>
        ) : (
          <Text variant="body" muted>
            Sin registros
          </Text>
        )}

        <Text variant="label" muted>
          Orientación
        </Text>
        <Text variant="body">
          {language === "en" ? profile.summaryEn : profile.summaryEs}
        </Text>

        <Text variant="caption" muted>
          {t("report.shareHint")}
        </Text>
      </View>
    </Screen>
  );
}
