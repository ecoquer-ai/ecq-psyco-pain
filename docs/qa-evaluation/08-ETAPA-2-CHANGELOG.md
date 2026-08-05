# Etapa 2 — Mejoras aplicadas (2026-07-28)

Entrada: `07-INFORME-EVALUACION-ETAPA-1.md`  
Prompt: `02-PROMPT-MEJORA-VISUAL-UX-SEO-CIENCIA.md`

## Before → After (P0/P1)

| Hallazgo | Cambio |
|----------|--------|
| Brand ilegible (`ArchedText`) | Welcome + onboarding 1: **Neuropi** tipográfico `display` + fade-in Reanimated |
| Botón texto a la derecha | `Button`: `textAlign: center` + `width: 100%` |
| Layout desktop estirado | `Screen` content `maxWidth: 560`; auth forms `maxWidth: 420` |
| Tamizaje ×3 | Root stack sin header; un solo header nested; sin H1 duplicado en página |
| A11y tabs | `detachInactiveScreens`, `freezeOnBlur`, `tabBarAccessibilityLabel`, iconos `importantForAccessibility="no"` |
| Marca NeuroPi vs Neuropi | Unificado a **Neuropi** (brand, i18n, app.json, emails demo) |
| SEO web vacío | `+html.tsx`: title, description, OG, `lang=es`, theme-color |
| Callout truncado | Psicoterapia: `width:100%`, `flexShrink` en textos |
| Inputs sin nombre a11y | login/register: `accessibilityLabel` + `accessibilityLabelledBy` |
| Biblioteca demos agresivos | Títulos sin “(demo)”; hint “próximamente”; copy sin Big Buck Bunny |
| Onboarding Likert fatiga | “Continuar más tarde” en beliefs automatic + limiting |
| Claim “método” | Disclaimer: enfoque biopsicosocial / neuroplasticidad (no “método” registrado) |
| Switches a11y | `accessibilityRole` + `accessibilityState` en preferences |

## Archivos tocados (principales)

- `packages/ui` — Button, Screen  
- `packages/shared` — brand, library catalog  
- `apps/mobile` — welcome, onboarding, tabs, assessment, auth, psicoterapia, +html, i18n, app.json, beliefs  

## Verificación

- `npm run shared:build` OK  
- `npm run typecheck --workspace=@neuropi/mobile` OK  
- Browser: welcome muestra **Neuropi** como H1 legible  

## Nota deploy

`ecq-psyco-pain` no tiene `.git` propio en este workspace; no se pudo commit/push automático. Si el repo vive en otro path, hay que versionar ahí.

## Siguiente

**Etapa 3** — QA regresión (`03-PROMPT-QA-REGRESION.md`): recapturar pantallas y cerrar gaps (therapy lessons, settings, beliefs-limiting completo).
