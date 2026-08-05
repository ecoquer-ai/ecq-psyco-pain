import { Stack } from "expo-router";
import { useTheme } from "@neuropi/ui";

export default function AssessmentLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Tamizaje", headerBackTitle: "Atrás" }}
      />
      <Stack.Screen name="[moduleId]" options={{ title: "Módulo" }} />
      <Stack.Screen name="results" options={{ title: "Orientación" }} />
    </Stack>
  );
}
