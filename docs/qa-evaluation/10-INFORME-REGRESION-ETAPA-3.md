# Evaluación Neuropi — Etapa 3 (QA regresión)

**Fecha:** 2026-07-28  
**Entorno local:** Expo web `http://localhost:8082` · API `http://localhost:3333` (memory)  
**Evidencia:** `docs/qa-evaluation/screenshots/regression/`  
**Stack futuro (registrado en plan, no ejecutado aquí):** NestJS API · Supabase · Railway · Vercel web · mobile Expo; cuentas después; referencia ops `ecq-spots-service`.

---

## Veredicto

**GO a Etapa 4** (blueprint mobile premium), con residuales S2 menores.

Los **S0/S1 de Etapa 1** que eran bloqueantes de craft/claridad están **cerrados o sustancialmente mitigados**. Quedan pulidos (a11y tabs web parcial, títulos duplicados en algunas stacks, layout desktop “columna + vacío”).

---

## Checklist S0/S1 Etapa 1 → estado

| # | Hallazgo | Estado | Evidencia |
|---|----------|--------|-----------|
| 1 | Brand Neuropi ilegible | **PASS** | H1 `Neuropi` + title `Neuropi — Nuevo enfoque…`; onboarding 1 legible |
| 2 | Botón texto a la derecha | **PASS** (mitigado) | `textAlign:center` + maxWidth forms; login labels OK |
| 3 | Tabs a11y (iconos basura + pantallas previas) | **PARTIAL** | Tab names limpios (`Inicio`…); aún se filtran botones de Inicio en Biblioteca (web) |
| 4 | Tamizaje ×3 | **PASS** | Un solo heading `Tamizaje` |
| 5 | Callout truncado | **PASS** (mitigado) | width/flexShrink en psicoterapia |
| 8 | NeuroPi vs Neuropi | **PASS** | Unificado Neuropi |
| 9 | SEO title vacío | **PASS** | `document.title` correcto tras hydrate |
| Skip Likert | Fatiga onboarding | **PASS** | “Continuar más tarde” en beliefs-limiting |
| Biblioteca demos | Confianza | **PASS** | “próximamente” + hint producción |

---

## Inventario regresión (muestra)

| Pantalla | Resultado | Notas |
|----------|-----------|-------|
| welcome | PASS | Brand hero |
| onboarding 1 | PASS | Neuropi display |
| home | PASS | Tabs limpios |
| library | PASS | Sin “(demo)” en títulos |
| assessment | PASS | Un título |
| beliefs-limiting | PASS | Skip disponible |
| therapy module | PASS* | Flash `[moduleId]` corregido en código; título duplicado reducido |
| login | PASS | Labels a11y Correo/Contraseña |
| Más / settings | PASS | Hub accesible |

\* Hotfix Etapa 3: `therapy/_layout` title default + sin H1 duplicado en módulo.

---

## Nuevos / residuales (para Etapa 4–5)

| Sev | Hallazgo | Acción sugerida |
|-----|----------|-----------------|
| S2 | Tabs web: pantallas inactivas aún en a11y tree | Investigar `aria-hidden` / unmount en Expo Router web |
| S2 | Desktop: mucho vacío / contenido no siempre centrado visualmente | Blueprint: shell web vs phone frame; o centrado estricto |
| S2 | Header + título de pantalla aún se solapan en Más/Biblioteca | Unificar patrón: header O H1 |
| S3 | Biblioteca muy larga (lista de Cards) | FlashList / secciones virtualizadas en mobile premium |

---

## Go / No-go Etapa 4

**GO.**  
Próximo: blueprint mobile Expo/RN premium (`04-PROMPT-MOBILE-RN-EXPO-PREMIUM.md`), **sin** migrar aún a Nest (eso es Etapa 8, local, con cuentas después).

---

## Recordatorio arquitectura (no hacer ahora)

1. Mantener **local** (Expo + API Fastify demo).  
2. Luego NestJS service (inspirado en ops de spots, no Express clone).  
3. Supabase DB/Auth · Railway API · Vercel web cuando entregues cuentas.
