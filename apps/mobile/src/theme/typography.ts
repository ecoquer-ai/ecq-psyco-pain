/**
 * Soft readability tweaks used by screens (letterSpacing / lineHeight).
 * Complements @neuropi/ui Text variants without forking the design system.
 */
export const softType = {
  body: {
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: 0.25,
  },
  title: {
    letterSpacing: 0.2,
  },
  caption: {
    lineHeight: 22,
    letterSpacing: 0.15,
  },
} as const;
