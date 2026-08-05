# Neuropi — README EDD Status

> **Actualizado:** 2026-08-05 (ASC App Information + screenshots + Android AAB en cola)  
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
| `WebNoEsUsableEnCelular` | hecho — https://ecq-psyco-pain.vercel.app |
| `TiendasSinFichaNiBinario` | Play + ASC apps vivas; ficha iOS 0.1.0 guardada; subtítulo/categoría Health & Fitness (+ Medical); age ratings en curso; screenshots en `docs/store/assets/screenshots`; Android AAB `7fd3e315…` IN_QUEUE; iOS EAS pide login Apple interactivo |
| `SiguienteCambioRequiereRebuild` | canal/branch `production` creado; `updates.url` apunta al projectId |

## H. Bloqueos humanos

App Store Connect (iframe Apple ID + 2FA) y Play Console. EAS CLI ya autenticado como `ecoquerai`. iOS credentials del bundle `cl.ecoquerai.neuropi` requieren sesión Apple interactiva o API key `.p8` local.

## I. URLs live

| | |
|--|--|
| Web | https://ecq-psyco-pain.vercel.app |
| API health | https://api-production-85ef.up.railway.app/health |
| Expo project | https://expo.dev/accounts/ecoquerais-team/projects/neuropi |
| Android build | https://expo.dev/accounts/ecoquerais-team/projects/neuropi/builds/7fd3e315-8837-4fe2-ba2d-500430cb98b1 |
| Review user | `review@ecoquerai.cl` (password en `.secrets.local`) |
