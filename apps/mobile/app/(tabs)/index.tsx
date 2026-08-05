import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Button,
  DisclaimerBanner,
  ProgressBar,
  Screen,
  Text,
  useTheme,
} from "@neuropi/ui";
import { PUBLIC_BRAND } from "@neuropi/shared";
import { InsightCard } from "@/components/InsightCard";
import { OfflineBanner } from "@/components/OfflineBanner";
import { useDashboard } from "@/hooks/useDashboard";
import { useSettingsStore } from "@/store/settingsStore";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const {
    greeting,
    latest,
    overallProgram,
    insight,
    nextAction,
    milestone,
  } = useDashboard();

  return (
    <Screen>
      <View style={{ gap: space("xl"), maxWidth: 480, alignSelf: "center", width: "100%" }}>
        <OfflineBanner />
        <View style={{ gap: space("sm") }}>
          <Text variant="display" display style={{ letterSpacing: 0.35 }}>
            {PUBLIC_BRAND}
          </Text>
          <Text variant="title" style={{ letterSpacing: 0.15, lineHeight: 34 }}>
            {greeting}
          </Text>
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("home.painSummary")}
          </Text>
          {latest ? (
            <Text variant="body" style={{ lineHeight: 24 }}>
              {t("home.nrsLabel")}: {latest.nrs}/10
              {latest.regions.length
                ? ` · ${latest.regions.length} ${language === "en" ? "areas" : "zonas"}`
                : ""}
            </Text>
          ) : (
            <Text variant="body" muted style={{ lineHeight: 24 }}>
              {t("home.noPainYet")}
            </Text>
          )}
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("home.programProgress")}
          </Text>
          <Text variant="body" style={{ lineHeight: 24 }}>
            {language === "en" ? milestone?.titleEn : milestone?.titleEs}
          </Text>
          <ProgressBar value={overallProgram} showPercent />
        </View>

        <View style={{ gap: space("sm") }}>
          <Button
            label={nextAction.label}
            fullWidth
            onPress={() => router.push(nextAction.href as never)}
          />
          {nextAction.href !== "/(tabs)/psicoterapia" ? (
            <Button
              label={t("home.ctaPsych")}
              variant="secondary"
              fullWidth
              onPress={() => router.push("/(tabs)/psicoterapia")}
            />
          ) : null}
          <Button
            label={t("home.intentionalCheckin")}
            variant="ghost"
            fullWidth
            onPress={() => router.push("/(tabs)/checkin")}
          />
        </View>

        <InsightCard title={t("home.dailyInsight")} body={insight} />

        <View style={{ gap: space("sm") }}>
          <Text variant="label" muted>
            {t("home.nextAction")}
          </Text>
          <Text variant="body" muted style={{ lineHeight: 24 }}>
            {t("home.psychHint")}
          </Text>
        </View>

        <DisclaimerBanner locale={language} />
      </View>
    </Screen>
  );
}
