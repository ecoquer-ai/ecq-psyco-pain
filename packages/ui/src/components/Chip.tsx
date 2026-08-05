import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../ThemeProvider";
import { MIN_TOUCH_TARGET } from "../tokens";
import { Text } from "./Text";

export interface ChipProps extends Omit<PressableProps, "children" | "style"> {
  label: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Chip({
  label,
  selected = false,
  disabled,
  style,
  accessibilityLabel,
  ...rest
}: ChipProps) {
  const { colors, space, radius, fontSize, typography } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected, disabled: Boolean(disabled) }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: MIN_TOUCH_TARGET,
          paddingHorizontal: space("md"),
          borderRadius: radius("md"),
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: 1,
          opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <Text
        variant="label"
        style={{
          color: selected ? colors.background : colors.text,
          fontSize: fontSize(typography.scale.sm),
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    minWidth: MIN_TOUCH_TARGET,
  },
});
