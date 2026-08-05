# Prompt — Etapa 8: Servicio Nest + Supabase (local)

> Activar solo cuando el usuario diga continuar **después** de Etapas 4–7 (o explícitamente «saltar a 8»).
> Referencia de ops EcoquerAI: `C:\ecoquerai\ecq-spots-service` (hoy es **Express + Supabase + Railway scripts** — patrón de env, migrations y deploy; el API Neuropi se implementa en **NestJS**, no copiar Express tal cual).

## Rol
Backend senior NestJS + TypeScript + Supabase.

## Objetivo
Reemplazar o complementar `apps/api` (Fastify MVP) con un servicio **NestJS** profesional:

1. Estructura módulos (auth, assessments, therapy, library, reports, notifications, health).
2. Validación (Zod o class-validator), DTOs, config tipada.
3. Cliente Supabase (service role server-side; RLS respetado vía user JWT cuando aplique).
4. Reusar dominio `@neuropi/shared` (scoring, instrumentos, schemas).
5. CORS, rate limit, logging, health check.
6. **Correr 100% en local** con `.env.example`; no pedir secretos de prod aún.
7. Documentar cómo luego ir a Railway.

## Restricciones
- No romper la app mobile (contratos estables o versionados `/v1`).
- No inventar claims clínicos en responses.
- No commit de secrets.
- Hasta nuevas instrucciones: **no** deploy Railway/Vercel.

## Salida
Scaffold Nest + README local + checklist de paridad con Fastify actual + «Dime continuar…» (Etapa 9 deploy).
