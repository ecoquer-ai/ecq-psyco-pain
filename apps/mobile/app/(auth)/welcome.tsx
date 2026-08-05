import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Link, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";
import { PUBLIC_BRAND, TAGLINE } from "@neuropi/shared";
import { NeuropiLogo } from "@/components/NeuropiLogo";
import { AtmosphereWash } from "@/components/AtmosphereWash";
import { useAuthStore } from "@/store/authStore";
import { isDemoMode } from "@/lib/api";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { space, reduceMotion } = useTheme();
  const loginDemo = useAuthStore((s) => s.loginDemo);
  const opacity = useSharedValue(reduceMotion ? 1 : 0);
  const translateY = useSharedValue(reduceMotion ? 0 : 12);

  useEffect(() => {
    if (reduceMotion) return;
    opacity.value = withTiming(1, { duration: 520 });
    translateY.value = withDelay(40, withTiming(0, { duration: 520 }));
  }, [opacity, translateY, reduceMotion]);

  const heroMotion = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Screen contentStyle={styles.screenContent} style={styles.root}>
      <AtmosphereWash />
      <Animated.View
        style={[
          styles.hero,
          { gap: space("lg"), paddingTop: space("xxl") },
          heroMotion,
        ]}
      >
        <NeuropiLogo size={72} />
        <Text variant="display" style={[styles.center, styles.brand]}>
          {PUBLIC_BRAND}
        </Text>
        <Text variant="subtitle" style={[styles.center, styles.tagline]}>
          {TAGLINE}
        </Text>
        <Text variant="body" muted style={[styles.center, styles.lede]}>
          {t("auth.welcomeBody")}
        </Text>
      </Animated.View>

      <View style={[styles.actions, { gap: space("md"), marginTop: space("xxl") }]}>
        <Button
          label={t("auth.register")}
          fullWidth
          onPress={() => router.push("/(auth)/register")}
        />
        <Button
          label={t("auth.login")}
          variant="secondary"
          fullWidth
          onPress={() => router.push("/(auth)/login")}
        />
        {isDemoMode() ? (
          <Button
            label={t("auth.demoEnter")}
            variant="ghost"
            fullWidth
            onPress={() => {
              loginDemo();
              router.replace("/(onboarding)");
            }}
          />
        ) : null}
      </View>

      <Link href="/(auth)/login" style={{ marginTop: space("lg"), alignSelf: "center" }}>
        <Text variant="caption" muted style={styles.center}>
          {t("auth.haveAccount")}
        </Text>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: "hidden",
  },
  screenContent: {
    justifyContent: "space-between",
    paddingBottom: 28,
    zIndex: 1,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  brand: {
    fontSize: 44,
    letterSpacing: 0.4,
  },
  actions: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  center: { textAlign: "center" },
  tagline: {
    marginTop: 4,
    maxWidth: 320,
    letterSpacing: 0.35,
  },
  lede: {
    maxWidth: 340,
    lineHeight: 28,
    letterSpacing: 0.25,
    marginTop: 4,
  },
});
