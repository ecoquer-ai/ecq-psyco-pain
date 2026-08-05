import { View, Switch } from "react-native";
import { useTranslation } from "react-i18next";
import { Chip, Screen, Text, useTheme } from "@neuropi/ui";
import { useSettingsStore, type AppLanguage } from "@/store/settingsStore";
import { setAppLanguage } from "@/lib/i18n";

export default function AccessibilitySettingsScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const neuroinclusive = useSettingsStore((s) => s.neuroinclusive);
  const setNeuroinclusive = useSettingsStore((s) => s.setNeuroinclusive);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const pickLang = (lang: AppLanguage) => {
    setLanguage(lang);
    setAppLanguage(lang);
  };

  return (
    <Screen>
      <View style={{ gap: space("xl") }}>
        <Text variant="title">{t("settings.a11yTitle")}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space("md"),
          }}
        >
          <View style={{ flex: 1, gap: space("xs") }}>
            <Text variant="label">{t("settings.a11yNeuro")}</Text>
            <Text variant="caption" muted>
              {t("settings.a11yHint")}
            </Text>
          </View>
          <Switch value={neuroinclusive} onValueChange={setNeuroinclusive} />
        </View>

        <View style={{ gap: space("sm") }}>
          <Text variant="label">{t("onboarding.prefsLang")}</Text>
          <View style={{ flexDirection: "row", gap: space("sm") }}>
            <Chip
              label="Español"
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
      </View>
    </Screen>
  );
}
