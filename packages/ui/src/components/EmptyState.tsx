import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../ThemeProvider";
import { Button } from "./Button";
import { Text } from "./Text";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  style,
  testID,
}: EmptyStateProps) {
  const { space } = useTheme();

  return (
    <View
      accessibilityRole="summary"
      style={[styles.root, { gap: space("md"), paddingVertical: space("xxl") }, style]}
      testID={testID}
    >
      <Text variant="subtitle" style={styles.center}>
        {title}
      </Text>
      {description ? (
        <Text variant="body" muted style={styles.center}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    textAlign: "center",
  },
});
