import { useState } from "react";
import { View, TextInput } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors, space, radius } = useTheme();
  const login = useAuthStore((s) => s.login);
  const onboardingDone = useSettingsStore((s) => s.onboardingDone);
  const [email, setEmail] = useState("demo@neuropi.cl");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError("Revisa correo y contraseña.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.replace(onboardingDone ? "/(tabs)" : "/(onboarding)");
    } catch {
      setError("No pudimos iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius("md"),
    padding: space("md"),
    color: colors.text,
    minHeight: 48,
  };

  return (
    <Screen>
      <View
        style={{
          gap: space("lg"),
          paddingTop: space("xxl"),
          width: "100%",
          maxWidth: 420,
          alignSelf: "center",
        }}
      >
        <Text variant="title">{t("auth.login")}</Text>
        <View style={{ gap: space("sm") }}>
          <Text variant="label" nativeID="login-email-label">
            {t("auth.email")}
          </Text>
          <TextInput
            accessibilityLabel={t("auth.email")}
            accessibilityLabelledBy="login-email-label"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={inputStyle}
          />
        </View>
        <View style={{ gap: space("sm") }}>
          <Text variant="label" nativeID="login-password-label">
            {t("auth.password")}
          </Text>
          <TextInput
            accessibilityLabel={t("auth.password")}
            accessibilityLabelledBy="login-password-label"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={inputStyle}
          />
        </View>
        {error ? (
          <Text variant="caption" style={{ color: colors.danger }}>
            {error}
          </Text>
        ) : null}
        <Button
          label={t("auth.login")}
          fullWidth
          loading={loading}
          onPress={onSubmit}
        />
        <Button
          label={t("auth.noAccount")}
          variant="ghost"
          fullWidth
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </Screen>
  );
}
