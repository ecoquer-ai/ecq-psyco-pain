import { View, Switch } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen, Text, useTheme } from "@neuropi/ui";
import { useSettingsStore } from "@/store/settingsStore";

export default function NotificationsSettingsScreen() {
  const { t } = useTranslation();
  const { space } = useTheme();
  const enabled = useSettingsStore((s) => s.notificationsEnabled);
  const setEnabled = useSettingsStore((s) => s.setNotificationsEnabled);

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text variant="title">{t("settings.notifTitle")}</Text>
        <Text variant="body" muted>
          {t("settings.notifBody")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="label" style={{ flex: 1 }}>
            {t("onboarding.prefsNotif")}
          </Text>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>
        <Text variant="caption" muted>
          Los permisos del sistema se solicitarán cuando conectemos
          expo-notifications en un build nativo.
        </Text>
      </View>
    </Screen>
  );
}
