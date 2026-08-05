import { useMemo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import { useTheme } from "@neuropi/ui";

type Props = {
  text: string;
  /** Arc radius in px. Larger = gentler curve. */
  radius?: number;
  /** Arc span in degrees (how wide the smile). */
  arcDegrees?: number;
  fontSize?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  /** Invert curve (frown vs smile). Default smile / arch up. */
  invert?: boolean;
};

/**
 * Brand wordmark along a soft upward arc.
 * Built with per-letter SVG transforms (reliable on web + native).
 */
export function ArchedText({
  text,
  radius = 140,
  arcDegrees = 52,
  fontSize = 42,
  color,
  style,
  invert = false,
}: Props) {
  const { colors, typography } = useTheme();
  const fill = color ?? colors.text;
  const chars = useMemo(() => [...text], [text]);
  const n = Math.max(chars.length - 1, 1);
  const startAngle = -arcDegrees / 2;
  const step = arcDegrees / n;
  const direction = invert ? 1 : -1;

  const width = radius * 2 + fontSize;
  const height = radius * (1 - Math.cos((arcDegrees * Math.PI) / 360)) + fontSize * 1.8;

  // Center of the circle sits below (or above) the visible arc.
  const cx = width / 2;
  const cy = invert ? fontSize * 0.4 : height + radius * 0.15;

  return (
    <View
      style={[{ width, height, alignSelf: "center" }, style]}
      accessibilityRole="header"
      accessibilityLabel={text}
    >
      <Svg width={width} height={height}>
        {chars.map((ch, i) => {
          const angleDeg = startAngle + step * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = cx + radius * Math.sin(angleRad);
          const y = cy + direction * radius * Math.cos(angleRad);
          const rotate = angleDeg;

          return (
            <SvgText
              key={`${ch}-${i}`}
              x={x}
              y={y}
              fill={fill}
              fontSize={fontSize}
              fontWeight="700"
              fontFamily={typography.displayFont}
              textAnchor="middle"
              alignmentBaseline="middle"
              transform={`rotate(${rotate} ${x} ${y})`}
            >
              {ch === " " ? "\u00A0" : ch}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
