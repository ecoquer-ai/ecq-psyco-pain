# Neuropi — brand assets

**Public name:** Neuropi  
**Tagline:** nuevo enfoque para el dolor  
**Internal repo:** `ecq-psyco-pain`

## Visual direction

Warm, hopeful, contemporary. The brand should feel like morning light on skin — not a clinic corridor, not purple tech gradients, not cream+terracotta broadsheet nostalgia, and not childish illustration.

| Do | Don’t |
|----|--------|
| Soft amber / peach / sage / slate | Purple-on-white, neon glow |
| Organic curves, gentle motion | Sharp clinical chrome, hospital blue |
| Calm hierarchy, breathing room | Dense newspaper columns, sticker clutter |
| Real body-friendly warmth | Cold grayscale “medical app” default |

## Logo

| File | Use |
|------|-----|
| `logo.svg` | Full mark: soft circle + wave/spark path |
| `logo-mark.svg` | Icon-only (app icon seeds, favicons, compact nav) |

**Concept:** A soft circular vessel holds an organic wave that reads as both a **path through pain** and a **warm spark** of agency. Gradient from `#E8A87C` → `#C45C26` (accessible amber on light and dark surfaces when sized appropriately).

**Clear space:** Keep at least ⅛ of the mark’s width free around the SVG.  
**Minimum size:** Mark ≥ 24px; full logo ≥ 32px height.  
**Do not:** Recolor outside theme tokens, add drop shadows, place on busy photos without a calm scrim, or stretch the aspect ratio.

## Themes (`@neuropi/shared`)

| Id | Name | Character |
|----|------|-----------|
| `amanecer` | Amanecer / Dawn | Default — warm amber & peach |
| `bosque` | Bosque / Forest | Soft sage, restful |
| `oceano` | Océano / Ocean | Calm turquoise & slate (not clinical blue) |
| `noche` | Noche / Night | Warm charcoal evening |
| `altoContraste` | Alto contraste | Maximum legibility |

Wire themes through `@neuropi/ui` `ThemeProvider` — never hard-code palette hex in feature screens when a token exists.

## Typography

| Role | Primary | Alternate | Fallback |
|------|---------|-----------|----------|
| Display | Fraunces | Literata | Georgia, Times New Roman, serif |
| Body | Source Sans 3 | DM Sans | system-ui / Segoe UI / Roboto |

Load fonts in the mobile app (`expo-font`); `@neuropi/ui` tokens use the registered family names.

## Neuroinclusive mode

`ThemeProvider` accepts `initialNeuroinclusive` (and OS `systemReduceMotion` / `systemFontScale`).

When **neuroinclusive** is on:

- **Font scale** increases (~15%) for easier reading under cognitive load or fatigue.
- **Spacing** opens slightly so controls and copy aren’t cramped.
- **Reduce motion** defaults on — skeletons stay static; avoid decorative animation.
- Touch targets remain at least **44×44**.

Pair with theme `altoContraste` when the user needs maximum contrast. Neuroinclusive mode is about sensory and cognitive ease, not a separate “kids” visual language.

## Clinical posture

Neuropi screens, orients, and educates about persistent pain. It does **not** diagnose or replace a clinician. Use `DisclaimerBanner` from `@neuropi/ui` (copy from `@neuropi/shared`) on onboarding and clinical-adjacent surfaces.

## File map

```
assets/brand/
  logo.svg
  logo-mark.svg
  README.md          ← this file
packages/ui/         ← @neuropi/ui components + ThemeProvider
packages/shared/     ← themes, brand strings, clinical domain
packages/config/     ← tsconfig.base.json + eslint baseline
```
