import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text as RNText,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../ThemeProvider";
import { MIN_TOUCH_TARGET } from "../tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  fullWidth = false,
  style,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const { colors, space, radius, fontSize, typography } = useTheme();
  const isDisabled = Boolean(disabled || loading);

  const height = size === "sm" ? MIN_TOUCH_TARGET : size === "lg" ? 52 : 48;
  const padH = size === "sm" ? space("md") : space("lg");
  const labelSize =
    size === "sm" ? fontSize(typography.scale.sm) : fontSize(typography.scale.md);

  let backgroundColor = colors.primary;
  let borderColor = colors.primary;
  let textColor = colors.background;
  let borderWidth = 0;

  if (variant === "secondary") {
    backgroundColor = colors.surface;
    borderColor = colors.border;
    textColor = colors.text;
    borderWidth = 1;
  } else if (variant === "ghost") {
    backgroundColor = "transparent";
    borderColor = "transparent";
    textColor = colors.primary;
  } else   if (variant === "danger") {
    backgroundColor = colors.danger;
    borderColor = colors.danger;
    textColor = "#FFFFFF";
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: Math.max(height, MIN_TOUCH_TARGET),
          paddingHorizontal: padH,
          borderRadius: radius("md"),
          backgroundColor,
          borderColor,
          borderWidth,
          opacity: isDisabled ? 0.5 : pressed ? 0.88 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          width: fullWidth ? "100%" : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <RNText
          style={{
            color: textColor,
            fontSize: labelSize,
            fontFamily: "Source Sans 3 SemiBold",
            letterSpacing: 0.2,
            textAlign: "center",
            width: "100%",
          }}
        >
          {label}
        </RNText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: MIN_TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
