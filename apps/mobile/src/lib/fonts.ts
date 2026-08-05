import { useFonts } from "expo-font";
import {
  Fraunces_400Regular,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from "@expo-google-fonts/fraunces";
import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from "@expo-google-fonts/source-sans-3";

/** Registers Neuropi display + body faces. Returns loaded flag for splash gate. */
export function useNeuropiFonts(): boolean {
  const [loaded] = useFonts({
    Fraunces: Fraunces_400Regular,
    "Fraunces-SemiBold": Fraunces_600SemiBold,
    "Fraunces-Bold": Fraunces_700Bold,
    "Source Sans 3": SourceSans3_400Regular,
    "Source Sans 3 Medium": SourceSans3_500Medium,
    "Source Sans 3 SemiBold": SourceSans3_600SemiBold,
    "Source Sans 3 Bold": SourceSans3_700Bold,
  });
  return loaded;
}

export function resolveDisplayFont(weight: string): string {
  if (weight === "700" || weight === "bold") return "Fraunces-Bold";
  if (weight === "600" || weight === "semibold") return "Fraunces-SemiBold";
  return "Fraunces";
}

export function resolveBodyFont(weight: string): string {
  if (weight === "700" || weight === "bold") return "Source Sans 3 Bold";
  if (weight === "600" || weight === "semibold") return "Source Sans 3 SemiBold";
  if (weight === "500" || weight === "medium") return "Source Sans 3 Medium";
  return "Source Sans 3";
}
