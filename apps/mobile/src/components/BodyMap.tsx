import { View, StyleSheet } from "react-native";
import { Chip, Text, useTheme } from "@neuropi/ui";

const REGIONS = [
  { id: "head_face", labelEs: "Cabeza / cara", labelEn: "Head / face" },
  { id: "neck", labelEs: "Cuello", labelEn: "Neck" },
  { id: "shoulders", labelEs: "Hombros", labelEn: "Shoulders" },
  { id: "upper_back", labelEs: "Espalda alta", labelEn: "Upper back" },
  { id: "lower_back", labelEs: "Espalda baja", labelEn: "Lower back" },
  { id: "chest", labelEs: "Pecho", labelEn: "Chest" },
  { id: "abdomen", labelEs: "Abdomen", labelEn: "Abdomen" },
  { id: "hips_pelvis", labelEs: "Caderas / pelvis", labelEn: "Hips / pelvis" },
  { id: "arms_hands", labelEs: "Brazos / manos", labelEn: "Arms / hands" },
  { id: "legs_feet", labelEs: "Piernas / pies", labelEn: "Legs / feet" },
] as const;

type Props = {
  selected: string[];
  onChange: (regions: string[]) => void;
  language?: "es" | "en";
};

/**
 * Tappable body regions as chips — silhouette drawing deferred;
 * clinically clear and accessible.
 */
export function BodyMap({ selected, onChange, language = "es" }: Props) {
  const { space } = useTheme();

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((r) => r !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <View style={[styles.wrap, { gap: space("sm") }]}>
      <Text variant="caption" muted>
        {language === "en"
          ? "Tap the areas where you feel pain"
          : "Toca las zonas donde sientes dolor"}
      </Text>
      <View style={[styles.row, { gap: space("sm") }]}>
        {REGIONS.map((r) => (
          <Chip
            key={r.id}
            label={language === "en" ? r.labelEn : r.labelEs}
            selected={selected.includes(r.id)}
            onPress={() => toggle(r.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
  row: { flexDirection: "row", flexWrap: "wrap" },
});
