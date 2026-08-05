import { useEffect } from "react";
import { router } from "expo-router";
import { Screen, Text } from "@neuropi/ui";

/** Deep-link shim: psicoterapia is now a main tab. */
export default function PainPsychologistRedirect() {
  useEffect(() => {
    router.replace("/(tabs)/psicoterapia");
  }, []);

  return (
    <Screen>
      <Text variant="body">…</Text>
    </Screen>
  );
}
