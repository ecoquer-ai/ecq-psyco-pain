import {
  Text as RNText,
  type StyleProp,
  type TextProps as RNTextProps,
  type TextStyle,
} from "react-native";
import { useTheme } from "../ThemeProvider";
import { typography } from "../tokens";

export type TextVariant =
  | "display"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "label";

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  muted?: boolean;
  /** Use display (serif) family for brand moments. */
  display?: boolean;
  style?: StyleProp<TextStyle>;
}

const VARIANT_SIZE: Record<TextVariant, keyof typeof typography.scale> = {
  display: "display",
  title: "xxl",
  subtitle: "xl",
  body: "md",
  caption: "sm",
  label: "sm",
};

type FontWeight = (typeof typography.weight)[keyof typeof typography.weight];

function resolveFontFamily(useDisplay: boolean, weight: FontWeight): string {
  if (useDisplay) {
    if (weight === typography.weight.bold) return "Fraunces-Bold";
    if (weight === typography.weight.semibold) return "Fraunces-SemiBold";
    return "Fraunces";
  }
  if (weight === typography.weight.bold) return "Source Sans 3 Bold";
  if (weight === typography.weight.semibold) return "Source Sans 3 SemiBold";
  if (weight === typography.weight.medium) return "Source Sans 3 Medium";
  return "Source Sans 3";
}

export function Text({
  variant = "body",
  muted = false,
  display = false,
  style,
  children,
  ...rest
}: TextProps) {
  const { colors, fontSize, typography: type } = useTheme();
  const useDisplay =
    display || variant === "display" || variant === "title";
  const sizeKey = VARIANT_SIZE[variant];
  const size = fontSize(type.scale[sizeKey]);
  const lineHeight =
    size *
    (variant === "display" || variant === "title"
      ? type.lineHeight.tight
      : variant === "body" || variant === "caption"
        ? type.lineHeight.relaxed
        : type.lineHeight.normal);

  let weight: FontWeight = type.weight.regular;
  if (variant === "display" || variant === "title") {
    weight = type.weight.bold;
  } else if (variant === "subtitle" || variant === "label") {
    weight = type.weight.semibold;
  }

  const family = resolveFontFamily(useDisplay, weight);

  return (
    <RNText
      accessibilityRole={
        variant === "display" || variant === "title" ? "header" : undefined
      }
      style={[
        {
          color: muted ? colors.textMuted : colors.text,
          fontSize: size,
          lineHeight,
          letterSpacing:
            variant === "body" || variant === "caption" ? 0.2 : 0.15,
          fontFamily: family,
          fontWeight: "400",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
