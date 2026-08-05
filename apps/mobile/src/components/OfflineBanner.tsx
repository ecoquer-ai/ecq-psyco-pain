import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Network from "expo-network";
import { useTheme, Text } from "@neuropi/ui";

/** Soft banner when the device has no network — demo local still works. */
export function OfflineBanner() {
  const { colors, space, radius } = useTheme();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let alive = true;
    const check = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (alive) {
          setOffline(!(state.isConnected && state.isInternetReachable !== false));
        }
      } catch {
        if (alive) setOffline(false);
      }
    };
    check();
    const id = setInterval(check, 12_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!offline) return null;

  return (
    <View
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radius("md"),
        paddingVertical: space("sm"),
        paddingHorizontal: space("md"),
        marginBottom: space("md"),
      }}
    >
      <Text variant="caption" muted style={{ lineHeight: 20 }}>
        Sin conexión — puedes seguir en modo local/demo. Algunas funciones en
        línea esperarán.
      </Text>
    </View>
  );
}
