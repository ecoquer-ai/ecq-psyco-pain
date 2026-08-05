import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../ThemeProvider";

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  /** Circle avatar-style placeholder. */
  circle?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Skeleton({
  width = "100%",
  height = 16,
  circle = false,
  style,
  testID,
}: SkeletonProps) {
  const { colors, radius, reduceMotion } = useTheme();
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    if (reduceMotion) {
      opacity.setValue(0.55);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, reduceMotion]);

  const sizeStyle: ViewStyle = circle
    ? {
        width: typeof width === "number" ? width : height,
        height: typeof width === "number" ? width : height,
        borderRadius: radius("full"),
      }
    : {
        width,
        height,
        borderRadius: radius("sm"),
      };

  return (
    <Animated.View
      accessibilityRole="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      testID={testID}
      style={[
        styles.base,
        sizeStyle,
        { backgroundColor: colors.border, opacity },
        style,
      ]}
    />
  );
}

/** Horizontal row of skeleton lines for list placeholders. */
export function SkeletonBlock({
  lines = 3,
  style,
}: {
  lines?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { space } = useTheme();
  return (
    <View style={[{ gap: space("sm") }, style]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "70%" : "100%"}
          height={14}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});
