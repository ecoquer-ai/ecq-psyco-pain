/**
 * Design tokens for Neuropi UI.
 * Themes are owned by @neuropi/shared; this package adds layout + type scales.
 */

export {
  THEMES,
  DEFAULT_THEME_ID,
  THEME_IDS,
  getTheme,
  type Theme,
  type ThemeColors,
  type ThemeId,
} from "@neuropi/shared";

/**
 * Font families (load via expo-font / @expo-google-fonts in the app).
 *
 * Display (headlines, brand moments):
 *   Primary: "Fraunces"
 *   Alt:     "Literata"
 *   Fallback stack: Georgia, "Times New Roman", serif
 *
 * Body (UI copy, forms, captions):
 *   Primary: "Source Sans 3"
 *   Alt:     "DM Sans"
 *   Fallback stack: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
 *
 * Register the primary names with expo-font; tokens below are the registered
 * family names. Components fall back to platform defaults when fonts are unloaded.
 */
export const typography = {
  /** Soft optical serif — warm, contemporary, not clinical. */
  displayFont: "Fraunces" as const,
  /** Clean humanist sans — high legibility at body sizes. */
  bodyFont: "Source Sans 3" as const,
  /** Documented alternates if primary fonts are unavailable. */
  displayFontAlt: "Literata" as const,
  bodyFontAlt: "DM Sans" as const,
  displayFallback: 'Georgia, "Times New Roman", serif' as const,
  bodyFallback: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' as const,
  scale: {
    xs: 13,
    sm: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 32,
    display: 38,
  },
  lineHeight: {
    tight: 1.22,
    snug: 1.38,
    normal: 1.55,
    relaxed: 1.72,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

/** Base spacing unit: 4. Values are multiples for consistent rhythm. */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  screen: 20,
} as const;

export type SpacingToken = keyof typeof spacing;

/**
 * Soft radii — avoid sharp clinical corners and oversized pill shapes.
 * Prefer gentle rounds on interactive surfaces only.
 */
export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export type RadiiToken = keyof typeof radii;

/** Minimum touch target (WCAG / Apple HIG). */
export const MIN_TOUCH_TARGET = 44;

/**
 * Neuroinclusive adjustments applied on top of the active theme.
 * Larger type, more breathing room, motion off by default.
 */
export const neuroinclusiveDefaults = {
  fontScale: 1.15,
  spacingScale: 1.12,
  reduceMotion: true,
} as const;
