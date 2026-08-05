import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME_ID,
  getTheme,
  type ThemeColors,
  type ThemeId,
} from "@neuropi/shared";
import {
  MIN_TOUCH_TARGET,
  neuroinclusiveDefaults,
  radii,
  spacing,
  typography,
  type RadiiToken,
  type SpacingToken,
} from "./tokens";

export interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  neuroinclusive: boolean;
  setNeuroinclusive: (enabled: boolean) => void;
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  /** Effective font scale (1 = default; neuroinclusive bumps this). */
  fontScale: number;
  /** Prefer static layouts when true (OS + neuroinclusive). */
  reduceMotion: boolean;
  minTouchTarget: number;
  /** Scale a spacing token by neuroinclusive spacing factor. */
  space: (token: SpacingToken) => number;
  /** Scale a radius token (unchanged by neuroinclusive). */
  radius: (token: RadiiToken) => number;
  /** Scale a raw font size by fontScale. */
  fontSize: (size: number) => number;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme; defaults to Amanecer. */
  initialThemeId?: ThemeId;
  /** Soften sensory load: larger type, more space, reduce motion. */
  initialNeuroinclusive?: boolean;
  /**
   * OS-level reduce-motion preference. When true (or neuroinclusive is on),
   * context.reduceMotion is true.
   */
  systemReduceMotion?: boolean;
  /** Extra multiplier on top of neuroinclusive font scale (e.g. OS text size). */
  systemFontScale?: number;
}

function scaleRecord<T extends Record<string, number>>(
  source: T,
  factor: number,
): T {
  const next = { ...source };
  for (const key of Object.keys(source) as (keyof T)[]) {
    const value = source[key];
    if (value !== undefined) {
      next[key] = Math.round(value * factor) as T[keyof T];
    }
  }
  return next;
}

export function ThemeProvider({
  children,
  initialThemeId = DEFAULT_THEME_ID,
  initialNeuroinclusive = false,
  systemReduceMotion = false,
  systemFontScale = 1,
}: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId);
  const [neuroinclusive, setNeuroinclusive] = useState(initialNeuroinclusive);

  const handleSetThemeId = useCallback((id: ThemeId) => {
    setThemeId(id);
  }, []);

  const handleSetNeuroinclusive = useCallback((enabled: boolean) => {
    setNeuroinclusive(enabled);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const theme = getTheme(themeId);
    const spacingFactor = neuroinclusive
      ? neuroinclusiveDefaults.spacingScale
      : 1;
    const fontScale =
      systemFontScale *
      (neuroinclusive ? neuroinclusiveDefaults.fontScale : 1);
    const reduceMotion =
      systemReduceMotion ||
      (neuroinclusive ? neuroinclusiveDefaults.reduceMotion : false);
    const scaledSpacing = scaleRecord(spacing, spacingFactor);

    return {
      themeId,
      setThemeId: handleSetThemeId,
      neuroinclusive,
      setNeuroinclusive: handleSetNeuroinclusive,
      colors: theme.colors,
      spacing: scaledSpacing,
      radii,
      typography,
      fontScale,
      reduceMotion,
      minTouchTarget: MIN_TOUCH_TARGET,
      space: (token) => scaledSpacing[token],
      radius: (token) => radii[token],
      fontSize: (size) => Math.round(size * fontScale),
    };
  }, [
    themeId,
    neuroinclusive,
    systemReduceMotion,
    systemFontScale,
    handleSetThemeId,
    handleSetNeuroinclusive,
  ]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a Neuropi ThemeProvider");
  }
  return ctx;
}
