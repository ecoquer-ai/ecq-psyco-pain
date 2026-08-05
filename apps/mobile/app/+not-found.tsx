import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Button, Screen, Text, useTheme } from "@neuropi/ui";

export default function NotFoundScreen() {
  const { space } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "No encontrado" }} />
      <Screen scroll={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: space("lg"),
            alignItems: "center",
          }}
        >
          <Text variant="title">Esta pantalla no existe</Text>
          <Text variant="body" muted style={{ textAlign: "center" }}>
            Vuelve al inicio de Neuropi.
          </Text>
          <Link href="/" asChild>
            <Button label="Ir al inicio" />
          </Link>
        </View>
      </Screen>
    </>
  );
}
