# Etapa 5 — Changelog mobile premium (P0/P1)

**Fecha:** 2026-07-28  
**Prompt:** `12-PROMPT-ETAPA-5-IMPLEMENTAR-MOBILE.md`  
**Blueprint:** `11-BLUEPRINT-MOBILE-PREMIUM.md`

## Hecho

| Ticket | Cambio |
|--------|--------|
| Fonts | Fraunces + Source Sans 3 vía `@expo-google-fonts/*` + `useNeuropiFonts`; splash espera fonts |
| Text/UI | `Text` y `Button` usan caras con peso embebido (RN-friendly) |
| Welcome | `AtmosphereWash` + `fadeRise` respeta `reduceMotion` |
| Tabs | `headerShown: false` (un solo H1 en contenido); labels tipográficos |
| Check-in | `expo-haptics` al guardar / NRS; `OfflineBanner` |
| Home | `OfflineBanner` |
| Biblioteca | `@shopify/flash-list` lista unificada filtros + headers |
| Crisis | `CrisisModal` (SAMU / Salud Responde) en safety + auto-open en self-harm |
| Offline | `expo-network` banner suave |

## Dependencias nuevas (`@neuropi/mobile`)

- `@expo-google-fonts/fraunces`
- `@expo-google-fonts/source-sans-3`
- `expo-haptics`
- `expo-image` (instalada; covers en P2)
- `@shopify/flash-list`
- `expo-network`

## Verificación

- [x] `npm run typecheck --workspace=@neuropi/mobile`
- [x] `npm run typecheck --workspace=@neuropi/ui`
- [ ] Checklist Expo Go 15 pantallas (manual — siguiente sesión / Etapa 6)
- [ ] Capturas ASO (P2)

## Pendiente P2 (no bloquea)

- Covers `expo-image` en detalle biblioteca  
- Preview swatches temas animados  
- Notificaciones locales suaves  
- OpenAPI draft para Nest (Etapa 8)  
- A11y tabs web residual (detach parcial)

## Local

Seguir con `npm run api` + `npm run web` / Expo Go.  
Nest/Supabase/Railway/Vercel: **aún no** (Etapas 8–9).
