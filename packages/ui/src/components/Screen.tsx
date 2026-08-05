import { type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../ThemeProvider";

export interface ScreenProps {
  children: ReactNode;
  /** Wrap content in a ScrollView. Default true. */
  scroll?: boolean;
  /** Extra horizontal padding beyond token screen inset. */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Screen({
  children,
  scroll = true,
  padded = true,
  style,
  contentStyle,
  testID,
}: ScreenProps) {
  const { colors, space } = useTheme();
  const insets = useSafeAreaInsets();
  const pad = padded ? Math.max(space("screen"), 24) : 0;
  // Extra room so last cards clear tab labels / web phone-frame clip.
  const bottomPad = pad + Math.max(insets.bottom, 24);

  const rootStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const innerStyle: ViewStyle = {
    flexGrow: 1,
    paddingHorizontal: pad,
    paddingTop: pad,
    paddingBottom: bottomPad,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  };

  if (scroll) {
    return (
      <View style={[rootStyle, style]} testID={testID}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, innerStyle, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[rootStyle, innerStyle, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
