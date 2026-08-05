import { Stack } from "expo-router";
import { useTheme } from "@neuropi/ui";

export default function TherapyLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
        title: "Programa",
      }}
    />
  );
}
