# Plan por etapas — Neuropi (evaluación → mejora → mobile → backend Nest)

## Arquitectura objetivo (acordada — no migrar aún en Etapa 3)

| Capa | Tecnología | Notas |
|------|------------|--------|
| **Mobile** | Expo + React Native + TypeScript | App premium; EAS |
| **Web** | Vercel | Landing / web marketing o shell web; deploy cuando haya cuentas |
| **API / servicios** | **NestJS + TypeScript** + tooling asociado | Referencia de patrón EcoquerAI: `C:\ecoquerai\ecq-spots-service` |
| **DB / Auth / Storage** | **Supabase** | Postgres, Auth, RLS, Storage |
| **Hosting API** | **Railway** | Servicio Nest en producción |
| **Ahora** | **Todo local** | Expo web + API actual en memoria/demo; cuentas Supabase/Railway/Vercel después |

**Estado actual del monorepo:** `apps/api` sigue en **Fastify** (MVP). La migración / nuevo servicio Nest + wiring Supabase es **Etapa 8+** (después del polish mobile), tomando como base el estilo de `ecq-spots-service`. No reescribir backend en Etapa 3–5.

---

## Etapa 0 — Setup
- Monorepo `ecq-psyco-pain` · demo mode · `docs/product-decisions.md`
- **Hecho**

## Etapa 1 — Juzgar y evaluar
- Prompts multi-perfil, screenshots, informe → **Hecho**

## Etapa 2 — Mejorar app (P0/P1)
- Brand, buttons, a11y tabs, SEO, biblioteca, skip Likert → **Hecho** (`08-ETAPA-2-CHANGELOG.md`)

## Etapa 3 — QA regresión post-mejora
- Informe `10-INFORME-REGRESION-ETAPA-3.md` → **Hecho · GO**

## Etapa 4 — Blueprint app mobile nativa premium (**HECHA**)
**Entregable:** `11-BLUEPRINT-MOBILE-PREMIUM.md`  
IA, tokens, motion, libs, flujos, estados, ASO, tickets P0–P2.  
**Gate:** «continuar» → Etapa 5.

## Etapa 5 — Implementación mobile premium + QA nativo
**Changelog:** `13-ETAPA-5-CHANGELOG.md` → **P0/P1 hechos** (fonts, atmósfera, FlashList, crisis, haptics, offline).  
**Gate:** «continuar» → Etapa 6 (clínica) u 8 (Nest local) según prioridad.

## Etapa 6 — Validación clínica / científica (**HECHA**)
**Informe:** `14-INFORME-CLINICA-ETAPA-6.md` → crisis S0 + claims S1 corregidos · **GO residual P2**.  
**Gate:** «continuar» → Etapa 7 (marketing/ASO) u 8 (Nest local).

## Etapa 7 — Marketing, ASO/SEO, landing Vercel (prep) (**HECHA**)
**Entregable:** `15-ETAPA-7-MARKETING-ASO.md` (posicionamiento, mensajes, ASO, estructura landing, backlog y KPIs).  
**Gate:** «continuar» → Etapa 8 (Nest local) o «saltar a 9» para despliegue cuando haya cuentas.

## Etapa 8 — Backend Nest + Supabase (local primero)
- Scaffold Nest alineado a `ecq-spots-service` (módulos, config, validación Zod/class-validator, logging).
- Conectar Supabase local/remoto (migrations RLS ya en `supabase/`).
- Contratos API compatibles con `@neuropi/shared` / mobile.
- Corrida **solo local** hasta que el usuario entregue credenciales.
  
**Avance actual:** paridad local en memoria completa (health, me, assessments, library, therapy, pain-logs, reports, notifications). Pendiente: persistencia Supabase + cutover mobile → Nest `/v1`. Changelog: `16-ETAPA-8-NEST-LOCAL-CHANGELOG.md`. Fastify (`apps/api`) sigue activo.

## Etapa 9 — Railway + Vercel + secretos
- Deploy API Nest → Railway  
- Web/landing → Vercel  
- Env Supabase production  
*(Solo cuando el usuario pase cuentas.)*

---

## Cómo usar en el chat

| Usuario | Agente |
|---------|--------|
| **continuar** | Siguiente etapa del plan |
| **saltar a N** | Ir a etapa N si el gate previo está cubierto |

Cada etapa termina con: **«Dime continuar y sigo con el siguiente paso»**.
