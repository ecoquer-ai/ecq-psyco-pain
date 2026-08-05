import { useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "@neuropi/ui";
import { I18nextProvider } from "react-i18next";
import i18n, { setAppLanguage } from "@/lib/i18n";
import { useSettingsStore } from "@/store/settingsStore";
import { useAuthStore } from "@/store/authStore";
import { isDemoMode, setAuthToken } from "@/lib/api";
import { PUBLIC_BRAND, TAGLINE } from "@neuropi/shared";
import { useNeuropiFonts } from "@/lib/fonts";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export default function RootLayout() {
  const themeId = useSettingsStore((s) => s.themeId);
  const neuroinclusive = useSettingsStore((s) => s.neuroinclusive);
  const language = useSettingsStore((s) => s.language);
  const settingsHydrated = useSettingsStore((s) => s.hydrated);
  const authHydrated = useAuthStore((s) => s.hydrated);
  const [reduceMotion, setReduceMotion] = useState(false);
  const fontsLoaded = useNeuropiFonts();

  useEffect(() => {
    setAppLanguage(language);
  }, [language]);

  useEffect(() => {
    if (isDemoMode()) setAuthToken("demo");
  }, []);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const sub = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (settingsHydrated && authHydrated && fontsLoaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [settingsHydrated, authHydrated, fontsLoaded]);

  useEffect(() => {
    const t = setTimeout(() => {
      useSettingsStore.getState().setHydrated(true);
      useAuthStore.getState().setHydrated(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider
          key={`${themeId}-${neuroinclusive}`}
          initialThemeId={themeId}
          initialNeuroinclusive={neuroinclusive}
          systemReduceMotion={reduceMotion}
        >
          <RootNav />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

function RootNav() {
  const { colors, themeId } = useTheme();
  const isDark = themeId === "noche";

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.title = `${PUBLIC_BRAND} — ${TAGLINE}`;
    }
  }, []);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.text,
            fontFamily: "Fraunces-Bold",
          },
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="assessment" options={{ headerShown: false }} />
        <Stack.Screen name="therapy" options={{ title: "Programa" }} />
        <Stack.Screen name="library/[id]" options={{ title: "Biblioteca" }} />
        <Stack.Screen
          name="psych/pain-psychologist"
          options={{ title: "Psicoterapia del dolor" }}
        />
        <Stack.Screen name="report/index" options={{ title: "Resumen" }} />
        <Stack.Screen name="settings/theme" options={{ title: "Tema" }} />
        <Stack.Screen
          name="settings/notifications"
          options={{ title: "Notificaciones" }}
        />
        <Stack.Screen
          name="settings/accessibility"
          options={{ title: "Accesibilidad" }}
        />
        <Stack.Screen name="privacidad" options={{ title: "Privacidad" }} />
        <Stack.Screen name="terminos" options={{ title: "Términos" }} />
      </Stack>
    </>
  );
}
