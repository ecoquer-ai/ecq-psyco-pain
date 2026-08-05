import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../ThemeProvider";
import { Text } from "./Text";

export interface ProgressBarProps {
  /** Progress from 0 to 1. */
  value: number;
  /** Optional accessible label, e.g. "Paso 2 de 5". */
  label?: string;
  /** Show percentage text. Default false. */
  showPercent?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function ProgressBar({
  value,
  label,
  showPercent = false,
  style,
  testID,
}: ProgressBarProps) {
  const { colors, space, radius } = useTheme();
  const clamped = Math.max(0, Math.min(1, value));
  const percent = Math.round(clamped * 100);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? `Progreso ${percent}%`}
      accessibilityValue={{ min: 0, max: 100, now: percent }}
      style={style}
      testID={testID}
    >
      {(label || showPercent) && (
        <View style={[styles.meta, { marginBottom: space("xs") }]}>
          {label ? (
            <Text variant="caption" muted>
              {label}
            </Text>
          ) : (
            <View />
          )}
          {showPercent ? (
            <Text variant="caption" muted>
              {percent}%
            </Text>
          ) : null}
        </View>
      )}
      <View
        style={[
          styles.track,
          {
            backgroundColor: colors.border,
            borderRadius: radius("full"),
            height: 8,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: colors.primary,
              borderRadius: radius("full"),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
