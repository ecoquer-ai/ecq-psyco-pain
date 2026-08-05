import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@neuropi/ui";

type IconName = ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<
  string,
  { active: IconName; inactive: IconName }
> = {
  index: { active: "home", inactive: "home-outline" },
  checkin: { active: "pulse", inactive: "pulse-outline" },
  psicoterapia: { active: "heart", inactive: "heart-outline" },
  library: { active: "library", inactive: "library-outline" },
  more: { active: "menu", inactive: "menu-outline" },
};

function NeuropiTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // Native: home indicator. Web: generous floor (embedded browsers often crop ~40px).
  const bottomPad =
    Platform.OS === "web"
      ? Math.max(insets.bottom, 36)
      : Math.max(insets.bottom, 10);

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      ]}
    >
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // Expo Router hides routes with href: null; also skip known non-tab screens.
          if (
            options.href === null ||
            route.name === "program" ||
            route.name === "journal"
          ) {
            return null;
          }

          const focused = state.index === index;
          const label =
            typeof options.title === "string"
              ? options.title
              : route.name;
          const icons = TAB_ICONS[route.name];
          const color = focused ? colors.primary : colors.textMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={
                options.tabBarAccessibilityLabel ?? label
              }
              onPress={onPress}
              style={styles.item}
            >
              {icons ? (
                <Ionicons
                  name={focused ? icons.active : icons.inactive}
                  size={22}
                  color={color}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                />
              ) : null}
              <Text
                numberOfLines={1}
                style={[styles.label, { color }]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {/* Spacer (not padding) so RN-web does not clip label glyphs. */}
      <View style={{ height: bottomPad }} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    overflow: "visible",
  },
  row: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 6,
    overflow: "visible",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: 2,
    overflow: "visible",
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: "Source Sans 3 Medium",
    letterSpacing: 0.15,
    textAlign: "center",
    includeFontPadding: false,
  },
});

export default function TabsLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tabs
      detachInactiveScreens
      tabBar={(props) => <NeuropiTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: "Source Sans 3 SemiBold",
          letterSpacing: 0.2,
        },
        headerShadowVisible: false,
        freezeOnBlur: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarAccessibilityLabel: t("tabs.home"),
        }}
      />
      <Tabs.Screen
        name="checkin"
        options={{
          title: t("tabs.checkin"),
          tabBarAccessibilityLabel: t("tabs.checkin"),
        }}
      />
      <Tabs.Screen
        name="psicoterapia"
        options={{
          title: t("tabs.psychotherapy"),
          tabBarAccessibilityLabel: t("tabs.psychotherapy"),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t("tabs.library"),
          tabBarAccessibilityLabel: t("tabs.library"),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t("tabs.more"),
          tabBarAccessibilityLabel: t("tabs.more"),
        }}
      />
      <Tabs.Screen name="program" options={{ href: null }} />
      <Tabs.Screen name="journal" options={{ href: null }} />
    </Tabs>
  );
}
