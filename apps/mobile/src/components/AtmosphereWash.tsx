import { View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "@neuropi/ui";

type Props = {
  style?: StyleProp<ViewStyle>;
};

/** Soft vertical wash behind heroes — atmosphere without flat single color. */
export function AtmosphereWash({ style }: Props) {
  const { colors } = useTheme();
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <View
        style={[
          styles.top,
          { backgroundColor: colors.surface, opacity: 0.55 },
        ]}
      />
      <View
        style={[
          styles.bottom,
          { backgroundColor: colors.background, opacity: 1 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "42%",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
});
