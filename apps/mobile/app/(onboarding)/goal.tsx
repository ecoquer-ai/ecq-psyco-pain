import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Chip, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import {
  useSettingsStore,
  type OnboardingGoal,
} from "@/store/settingsStore";

const GOALS: { id: OnboardingGoal; key: string }[] = [
  { id: "understand", key: "onboarding.goalUnderstand" },
  { id: "order_symptoms", key: "onboarding.goalOrder" },
  { id: "prepare_consult", key: "onboarding.goalConsult" },
  { id: "psych_support", key: "onboarding.goalPsych" },
];

export default function GoalScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const goal = useSettingsStore((s) => s.goal);
  const setGoal = useSettingsStore((s) => s.setGoal);

  return (
    <Screen>
      <ProgressBar value={4 / 9} label="4 / 9" />
      <View style={{ gap: space("lg"), marginTop: space("xl") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("onboarding.goalTitle")}
        </Text>
        <View style={{ gap: space("sm") }}>
          {GOALS.map((g) => (
            <Chip
              key={g.id}
              label={t(g.key)}
              selected={goal === g.id}
              onPress={() => setGoal(g.id)}
              style={{ alignSelf: "stretch" }}
            />
          ))}
        </View>
      </View>
      <View style={{ marginTop: space("xxl") }}>
        <Button
          label={t("common.continue")}
          fullWidth
          disabled={!goal}
          onPress={() => router.push("/(onboarding)/preferences")}
        />
      </View>
    </Screen>
  );
}
