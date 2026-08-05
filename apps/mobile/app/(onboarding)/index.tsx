import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { PUBLIC_BRAND, TAGLINE } from "@neuropi/shared";
import { NeuropiLogo } from "@/components/NeuropiLogo";

export default function OnboardingWelcome() {
  const { t } = useTranslation();
  const { space } = useTheme();

  return (
    <Screen contentStyle={styles.screenContent}>
      <ProgressBar value={1 / 9} label="1 / 9" />
      <View style={[styles.hero, { gap: space("lg"), marginTop: space("xl") }]}>
        <NeuropiLogo size={64} />
        <Text variant="display" style={[styles.center, styles.brand]}>
          {PUBLIC_BRAND}
        </Text>
        <Text variant="subtitle" style={[styles.center, styles.tagline]}>
          {TAGLINE}
        </Text>
        <Text variant="body" muted style={[styles.center, styles.lede]}>
          {t("onboarding.welcomeBody")}
        </Text>
      </View>
      <View style={[styles.footer, { marginTop: space("xxxl") }]}>
        <Button
          label={t("common.continue")}
          fullWidth
          onPress={() => router.push("/(onboarding)/pain-is-real")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  hero: { alignItems: "center", paddingHorizontal: 8 },
  brand: {
    fontSize: 40,
    letterSpacing: 0.4,
  },
  center: { textAlign: "center" },
  tagline: {
    maxWidth: 300,
    letterSpacing: 0.35,
  },
  lede: {
    maxWidth: 340,
    lineHeight: 28,
    letterSpacing: 0.25,
  },
  footer: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
});
