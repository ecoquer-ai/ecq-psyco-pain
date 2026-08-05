import { useState } from "react";
import { View, TextInput } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
});

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { colors, space, radius } = useTheme();
  const register = useAuthStore((s) => s.register);
  const setDisplayName = useSettingsStore((s) => s.setDisplayName);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const parsed = schema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError("Completa nombre, correo y una clave de al menos 4 caracteres.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(email, password, name);
      setDisplayName(name);
      router.replace("/(onboarding)");
    } catch {
      setError("No pudimos crear la cuenta.");
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
        <Text variant="title">{t("auth.register")}</Text>
        <View style={{ gap: space("sm") }}>
          <Text variant="label" nativeID="register-name-label">
            {t("auth.name")}
          </Text>
          <TextInput
            accessibilityLabel={t("auth.name")}
            accessibilityLabelledBy="register-name-label"
            value={name}
            onChangeText={setName}
            style={inputStyle}
          />
        </View>
        <View style={{ gap: space("sm") }}>
          <Text variant="label" nativeID="register-email-label">
            {t("auth.email")}
          </Text>
          <TextInput
            accessibilityLabel={t("auth.email")}
            accessibilityLabelledBy="register-email-label"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={inputStyle}
          />
        </View>
        <View style={{ gap: space("sm") }}>
          <Text variant="label" nativeID="register-password-label">
            {t("auth.password")}
          </Text>
          <TextInput
            accessibilityLabel={t("auth.password")}
            accessibilityLabelledBy="register-password-label"
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
          label={t("auth.register")}
          fullWidth
          loading={loading}
          onPress={onSubmit}
        />
      </View>
    </Screen>
  );
}
