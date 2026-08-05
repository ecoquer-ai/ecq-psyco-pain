import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { THEME_IDS, THEMES, type ThemeId } from "@neuropi/shared";
import { Chip, Screen, Text, useTheme } from "@neuropi/ui";
import { useSettingsStore } from "@/store/settingsStore";

export default function ThemeSettingsScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const themeId = useSettingsStore((s) => s.themeId);
  const setThemeId = useSettingsStore((s) => s.setThemeId);
  const language = useSettingsStore((s) => s.language);

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text variant="title">{t("settings.themeTitle")}</Text>
        <View style={{ gap: space("sm") }}>
          {THEME_IDS.map((id: ThemeId) => {
            const theme = THEMES[id];
            return (
              <Chip
                key={id}
                label={
                  language === "en" ? theme.nameEn : theme.nameEs
                }
                selected={themeId === id}
                onPress={() => setThemeId(id)}
                style={{ alignSelf: "stretch" }}
              />
            );
          })}
        </View>
        <Text variant="caption" muted>
          {THEMES[themeId].descriptionEs}
        </Text>
      </View>
    </Screen>
  );
}
