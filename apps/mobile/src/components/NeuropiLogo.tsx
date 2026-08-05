import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "@neuropi/ui";

type Props = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** Soft flame / dawn mark for Neuropi. */
export function NeuropiLogo({ size = 72, style }: Props) {
  const { colors } = useTheme();

  return (
    <View style={style} accessibilityRole="image" accessibilityLabel="NeuroPi">
      <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
        <Defs>
          <LinearGradient id="g" x1="36" y1="8" x2="36" y2="64" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={colors.secondary} />
            <Stop offset="1" stopColor={colors.primary} />
          </LinearGradient>
        </Defs>
        <Circle cx="36" cy="36" r="34" stroke={colors.border} strokeWidth="2" fill={colors.surface} />
        <Path
          d="M36 14c2 8-6 12-6 22 0 8 5 14 12 14 8 0 14-7 14-16 0-12-10-18-14-22-1 6-4 8-6 2z"
          fill="url(#g)"
        />
        <Path
          d="M34 40c1 4 4 7 8 7 3 0 5-2 5-5 0-4-3-6-5-8-1 3-3 4-8 6z"
          fill={colors.background}
          opacity={0.85}
        />
      </Svg>
    </View>
  );
}
