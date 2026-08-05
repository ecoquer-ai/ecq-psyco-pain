import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";

export default function PainIsRealScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();

  return (
    <Screen contentStyle={styles.screenContent}>
      <ProgressBar value={2 / 9} label="2 / 9" />
      <View style={[styles.column, { gap: space("lg"), marginTop: space("xl") }]}>
        <Text variant="title" style={styles.title}>
          {t("onboarding.painRealTitle")}
        </Text>
        <Text variant="body" style={styles.prose}>
          {t("onboarding.painRealBody")}
        </Text>
        <Text variant="body" muted style={styles.prose}>
          Primero validamos tu experiencia. Después viene la explicación. El
          dolor que persiste merece ser tomado en serio.
        </Text>
      </View>
      <View style={[styles.footer, { marginTop: space("xxl") }]}>
        <Button
          label={t("common.continue")}
          fullWidth
          onPress={() => router.push("/(onboarding)/what-neuropi-does")}
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
  footer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
});
