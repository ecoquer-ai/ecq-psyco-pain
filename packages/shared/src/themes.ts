/**
 * Visual themes for Neuropi.
 * Warm, hopeful, body-friendly — not hospital-cold, not purple-on-white.
 */

export type ThemeId =
  | "amanecer"
  | "bosque"
  | "oceano"
  | "noche"
  | "altoContraste";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  danger: string;
  success: string;
  border: string;
}

export interface Theme {
  id: ThemeId;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  colors: ThemeColors;
}

export const THEMES: Record<ThemeId, Theme> = {
  amanecer: {
    id: "amanecer",
    nameEs: "Amanecer",
    nameEn: "Dawn",
    descriptionEs: "Ámbar y durazno cálidos — luz suave de comienzo de día.",
    colors: {
      primary: "#C47A3A",
      secondary: "#E8A87C",
      background: "#FFF6EE",
      surface: "#FFE8D6",
      text: "#3D2A1F",
      textMuted: "#7A5C4A",
      accent: "#D4894A",
      danger: "#B84A3A",
      success: "#5A8F5C",
      border: "#E5C9B0",
    },
  },
  bosque: {
    id: "bosque",
    nameEs: "Bosque",
    nameEn: "Forest",
    descriptionEs: "Verdes salvia suaves — naturaleza y descanso.",
    colors: {
      primary: "#5B7F6A",
      secondary: "#8FAE9A",
      background: "#F3F7F4",
      surface: "#E4EDE6",
      text: "#24352C",
      textMuted: "#5A6F62",
      accent: "#7A9E7E",
      danger: "#A85A4A",
      success: "#4A7A55",
      border: "#C5D4C9",
    },
  },
  oceano: {
    id: "oceano",
    nameEs: "Océano",
    nameEn: "Ocean",
    descriptionEs: "Turquesa y pizarra calmados — profundidad sin frialdad.",
    colors: {
      primary: "#3D6B7A",
      secondary: "#6A9AAB",
      background: "#F0F5F7",
      surface: "#DEE8EC",
      text: "#1E3038",
      textMuted: "#5A717A",
      accent: "#4A8A9A",
      danger: "#B04A4A",
      success: "#3D8A6A",
      border: "#B8CCD4",
    },
  },
  noche: {
    id: "noche",
    nameEs: "Noche",
    nameEn: "Night",
    descriptionEs: "Carbón cálido profundo — descanso nocturno sin frío clínico.",
    colors: {
      primary: "#E0A060",
      secondary: "#C48A5A",
      background: "#1A1614",
      surface: "#2A2420",
      text: "#F2E8DE",
      textMuted: "#A89888",
      accent: "#D49A5A",
      danger: "#E07060",
      success: "#7ABA7A",
      border: "#3E3630",
    },
  },
  altoContraste: {
    id: "altoContraste",
    nameEs: "Alto contraste",
    nameEn: "High contrast",
    descriptionEs: "Máxima legibilidad — contraste fuerte para accesibilidad.",
    colors: {
      primary: "#000000",
      secondary: "#1A1A1A",
      background: "#FFFFFF",
      surface: "#F5F5F5",
      text: "#000000",
      textMuted: "#333333",
      accent: "#000000",
      danger: "#990000",
      success: "#006600",
      border: "#000000",
    },
  },
};

export const DEFAULT_THEME_ID: ThemeId = "amanecer";

export function getTheme(id: ThemeId): Theme {
  return THEMES[id];
}

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];
