import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "@neuropi/ui";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

/** Discrete 0–10 NRS control — large taps, clear numbers. */
export function NrsSlider({
  value,
  onChange,
  min = 0,
  max = 10,
  label,
}: Props) {
  const { colors, space, radius, minTouchTarget } = useTheme();
  const nums = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <View style={{ gap: space("sm") }}>
      {label ? (
        <Text variant="label" muted>
          {label}
        </Text>
      ) : null}
      <Text variant="title" style={{ color: colors.primary }}>
        {value}
      </Text>
      <View style={[styles.row, { gap: space("xs") }]}>
        {nums.map((n) => {
          const selected = n === value;
          return (
            <Pressable
              key={n}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${n}`}
              onPress={() => onChange(n)}
              style={{
                minWidth: Math.max(28, minTouchTarget - 12),
                minHeight: minTouchTarget,
                borderRadius: radius("sm"),
                backgroundColor: selected ? colors.primary : colors.surface,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <Text
                variant="caption"
                style={{ color: selected ? colors.background : colors.text }}
              >
                {n}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.ends}>
        <Text variant="caption" muted>
          {min === 0 ? "Sin dolor" : String(min)}
        </Text>
        <Text variant="caption" muted>
          {max === 10 ? "Máximo" : String(max)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "nowrap" },
  ends: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
