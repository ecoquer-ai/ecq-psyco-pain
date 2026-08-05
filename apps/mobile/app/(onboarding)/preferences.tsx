import { View, Switch } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { THEME_IDS, THEMES, type ThemeId } from "@neuropi/shared";
import { Button, Chip, ProgressBar, Screen, Text, useTheme } from "@neuropi/ui";
import { useSettingsStore, type AppLanguage } from "@/store/settingsStore";
import { setAppLanguage } from "@/lib/i18n";

export default function PreferencesScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const language = useSettingsStore((s) => s.language);
  const themeId = useSettingsStore((s) => s.themeId);
  const neuroinclusive = useSettingsStore((s) => s.neuroinclusive);
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const setThemeId = useSettingsStore((s) => s.setThemeId);
  const setNeuroinclusive = useSettingsStore((s) => s.setNeuroinclusive);
  const setNotificationsEnabled = useSettingsStore(
    (s) => s.setNotificationsEnabled,
  );

  const pickLang = (lang: AppLanguage) => {
    setLanguage(lang);
    setAppLanguage(lang);
  };

  return (
    <Screen>
      <ProgressBar value={5 / 9} label="5 / 9" />
      <View style={{ gap: space("xl"), marginTop: space("xl") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("onboarding.prefsTitle")}
        </Text>

        <View style={{ gap: space("sm") }}>
          <Text variant="label">{t("onboarding.prefsLang")}</Text>
          <View style={{ flexDirection: "row", gap: space("sm") }}>
            <Chip
              label="Español (Chile)"
              selected={language === "es"}
              onPress={() => pickLang("es")}
            />
            <Chip
              label="English"
              selected={language === "en"}
              onPress={() => pickLang("en")}
            />
          </View>
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label">{t("onboarding.prefsTheme")}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space("sm") }}>
            {THEME_IDS.map((id: ThemeId) => (
              <Chip
                key={id}
                label={THEMES[id].nameEs}
                selected={themeId === id}
                onPress={() => setThemeId(id)}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space("md"),
          }}
        >
          <View style={{ flex: 1, gap: space("xs") }}>
            <Text variant="label">{t("onboarding.prefsNeuro")}</Text>
            <Text variant="caption" muted>
              {t("onboarding.prefsNeuroHint")}
            </Text>
          </View>
          <Switch
            value={neuroinclusive}
            onValueChange={setNeuroinclusive}
            accessibilityLabel={t("onboarding.prefsNeuro")}
            accessibilityRole="switch"
            accessibilityState={{ checked: neuroinclusive }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space("md"),
          }}
        >
          <Text variant="label" style={{ flex: 1 }}>
            {t("onboarding.prefsNotif")}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            accessibilityLabel={t("onboarding.prefsNotif")}
            accessibilityRole="switch"
            accessibilityState={{ checked: notificationsEnabled }}
          />
        </View>
      </View>

      <View style={{ marginTop: space("xxl") }}>
        <Button
          label={t("common.continue")}
          fullWidth
          onPress={() => router.push("/(onboarding)/safety")}
        />
      </View>
    </Screen>
  );
}
