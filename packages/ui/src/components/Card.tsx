import { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../ThemeProvider";
import { MIN_TOUCH_TARGET } from "../tokens";

export interface CardProps {
  children: ReactNode;
  /**
   * Soft surface for interactive containers only.
   * Prefer plain layout for static content — cards are for taps / focus groups.
   */
  onPress?: PressableProps["onPress"];
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Soft card — use only when the block itself is interactive
 * (or wraps a focused interactive region). Avoid decorative cards.
 */
export function Card({
  children,
  onPress,
  disabled,
  accessibilityLabel,
  style,
  testID,
}: CardProps) {
  const { colors, space, radius } = useTheme();

  const surfaceStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius("lg"),
    padding: space("lg"),
  };

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: Boolean(disabled) }}
        disabled={disabled}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [
          surfaceStyle,
          styles.interactive,
          {
            opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
            minHeight: MIN_TOUCH_TARGET,
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[surfaceStyle, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  interactive: {
    justifyContent: "center",
  },
});
