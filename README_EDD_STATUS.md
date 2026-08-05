# Neuropi — README EDD Status

> **Actualizado:** 2026-08-05  
> **Fase:** Launch (post Fase 1 EcoquerAI)  
> **Mega prompt:** [`docs/EDD_MEGA_PROMPT_NEUROPI_LAUNCH.md`](./docs/EDD_MEGA_PROMPT_NEUROPI_LAUNCH.md)

## A. Identidad

| | |
|--|--|
| Propósito | Tamizaje, psicoeducación y acompañamiento para dolor persistente. No diagnostica. |
| Usuarios | Personas con dolor > semanas/meses en Chile (es-CL + en). |
| Stack | Expo 57 / RN 0.86 · Fastify API · Supabase · EAS Update |
| Hosting objetivo | Web Vercel · API Railway · DB Supabase · Stores Apple/Google |
| Relación EcoquerAI | Producto **separado**. Misma org legal / Apple Team / Expo org / Resend / Cloudinary. |

## B. Arquitectura

Monorepo: `apps/mobile`, `apps/api` (prod), `apps/api-nest` (scaffold local, **no prod**), `packages/shared|ui|config`, `supabase/`.

## C. Calidad

Tests API (vitest) parciales. Mobile sin suite E2E. Path crítico launch = smoke manual + `/health`.

## D–F. Cloud

Un servicio Railway, un proyecto Supabase nuevo, Vercel static, EAS OTA. Evitar always-on extra y LLM.

## G. Eventos launch

Ver mega prompt. Estado vivo:

| Evento | Estado |
|--------|--------|
| `NeuropiNoEstaEnManosDeUsuarios` | en curso |
| `MarcaSinIdentidadNativa` | hecho (SVG + PNG icon/splash/adaptive/favicon/feature) |
| `AppSinPermisosNativosDeclarados` | hecho (notificaciones; sin cámara/ubicación/mic) |
| `DatosDeSaludSinBackendProd` | hecho (Supabase `hcbqrdxonbezscgzeyyo` + migraciones + buckets + SMTP Resend) |
| `ApiClinicaNoTieneUrlPublica` | hecho — https://api-production-85ef.up.railway.app/health (`mode: supabase`) |
| `WebNoEsUsableEnCelular` | bloqueado: login Vercel |
| `TiendasSinFichaNiBinario` | fichas listas; bloqueado: Expo/EAS + ASC + Play |
| `SiguienteCambioRequiereRebuild` | pendiente EAS projectId real |

## H. Bloqueos humanos

Expo/EAS, Vercel, GitHub (`gh` ausente), App Store Connect 2FA, Play Console.
