import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Card, Screen, Text, useTheme } from "@neuropi/ui";
import { useAuthStore } from "@/store/authStore";
import { isDemoMode } from "@/lib/api";

export default function MoreScreen() {
  const { t } = useTranslation();
  const { colors, space } = useTheme();
  const logout = useAuthStore((s) => s.logout);
  const email = useAuthStore((s) => s.email);

  const links: {
    label: string;
    href: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { label: t("more.theme"), href: "/settings/theme", icon: "color-palette-outline" },
    {
      label: t("more.notifications"),
      href: "/settings/notifications",
      icon: "notifications-outline",
    },
    {
      label: t("more.accessibility"),
      href: "/settings/accessibility",
      icon: "accessibility-outline",
    },
    { label: t("more.report"), href: "/report", icon: "document-text-outline" },
    { label: t("more.privacy"), href: "/privacidad", icon: "shield-checkmark-outline" },
    { label: t("more.terms"), href: "/terminos", icon: "reader-outline" },
  ];

  return (
    <Screen>
      <View style={{ gap: space("lg") }}>
        <Text variant="title" style={{ letterSpacing: 0.2 }}>
          {t("more.title")}
        </Text>
        {email ? (
          <Text variant="caption" muted>
            {email}
            {isDemoMode() ? ` · ${t("common.demo")}` : ""}
          </Text>
        ) : null}

        {links.map((l) => (
          <Card
            key={l.href}
            onPress={() => router.push(l.href as never)}
            accessibilityLabel={l.label}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: space("md"),
              }}
            >
              <Ionicons name={l.icon} size={22} color={colors.primary} />
              <Text variant="body" style={{ letterSpacing: 0.15 }}>
                {l.label}
              </Text>
            </View>
          </Card>
        ))}

        <Text variant="caption" muted style={{ lineHeight: 20 }}>
          {t("more.psychDeepLinkHint")}
        </Text>

        <Button
          label={t("common.logout")}
          variant="secondary"
          fullWidth
          onPress={() => {
            logout();
            router.replace("/(auth)/welcome");
          }}
        />
      </View>
    </Screen>
  );
}
