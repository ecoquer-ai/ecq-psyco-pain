import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";

export default function WhatNeuropiDoesScreen() {
  const { t } = useTranslation();
  const { space, colors, radius } = useTheme();

  return (
    <Screen contentStyle={styles.screenContent}>
      <ProgressBar value={3 / 9} label="3 / 9" />
      <View style={[styles.column, { gap: space("lg"), marginTop: space("xl") }]}>
        <Text variant="title" style={styles.title}>
          {t("onboarding.neuroTitle")}
        </Text>
        <Text variant="body" style={styles.prose}>
          {t("onboarding.neuroWhat")}
        </Text>
        <Text variant="body" muted style={styles.prose}>
          {t("onboarding.neuroPain")}
        </Text>

        <View
          style={[
            styles.callout,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius("lg"),
              padding: space("lg"),
              gap: space("sm"),
            },
          ]}
        >
          <Text variant="label" style={{ letterSpacing: 0.4 }}>
            {t("onboarding.bpsTitle")}
          </Text>
          <Text variant="body" muted style={styles.prose}>
            {t("onboarding.bpsBody")}
          </Text>
        </View>

        <Text variant="caption" muted style={styles.footnote}>
          {t("onboarding.neuroFootnote")}
        </Text>
      </View>
      <View style={[styles.footer, { marginTop: space("xxl") }]}>
        <Button
          label={t("common.continue")}
          fullWidth
          onPress={() => router.push("/(onboarding)/goal")}
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
  column: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  title: {
    letterSpacing: 0.15,
    lineHeight: 36,
  },
  prose: {
    lineHeight: 28,
    letterSpacing: 0.2,
  },
  callout: {
    borderWidth: 1,
    marginTop: 4,
  },
  footnote: {
    lineHeight: 22,
    letterSpacing: 0.15,
  },
  footer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
});
