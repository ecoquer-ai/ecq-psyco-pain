import { Stack } from "expo-router";
import { useTheme } from "@neuropi/ui";

export default function OnboardingLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Atrás",
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text, fontWeight: "600" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: "NeuroPi", headerShown: false }} />
      <Stack.Screen name="pain-is-real" options={{ title: "Tu dolor" }} />
      <Stack.Screen name="what-neuropi-does" options={{ title: "Neuroplasticidad" }} />
      <Stack.Screen name="goal" options={{ title: "Tu meta" }} />
      <Stack.Screen name="preferences" options={{ title: "Preferencias" }} />
      <Stack.Screen name="safety" options={{ title: "Seguridad" }} />
      <Stack.Screen name="consent" options={{ title: "Consentimiento" }} />
      <Stack.Screen
        name="beliefs-automatic"
        options={{ title: "Pensamientos" }}
      />
      <Stack.Screen
        name="beliefs-limiting"
        options={{ title: "Creencias" }}
      />
    </Stack>
  );
}
