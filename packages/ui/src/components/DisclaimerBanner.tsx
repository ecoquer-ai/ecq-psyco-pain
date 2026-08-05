import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { CLINICAL_DISCLAIMER } from "@neuropi/shared";
import { useTheme } from "../ThemeProvider";
import { Text } from "./Text";

export type DisclaimerLocale = "es" | "en";

export interface DisclaimerBannerProps {
  locale?: DisclaimerLocale;
  /** Override shared clinical disclaimer copy. */
  message?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Persistent clinical posture banner — Neuropi screens, educates, does not diagnose.
 */
export function DisclaimerBanner({
  locale = "es",
  message,
  style,
  testID,
}: DisclaimerBannerProps) {
  const { colors, space, radius } = useTheme();
  const copy = message ?? CLINICAL_DISCLAIMER[locale];

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={copy}
      testID={testID}
      style={[
        styles.root,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius("md"),
          padding: space("md"),
          gap: space("xs"),
        },
        style,
      ]}
    >
      <Text variant="label" muted>
        {locale === "es" ? "Aviso importante" : "Important notice"}
      </Text>
      <Text variant="caption" muted>
        {copy}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
