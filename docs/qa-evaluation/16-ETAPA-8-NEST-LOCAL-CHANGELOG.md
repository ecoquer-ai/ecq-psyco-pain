# Etapa 8 — Nest + Supabase local (changelog)

**Fecha:** 2026-07-28  
**Estado:** Paridad local funcional en memoria (incluye reports + notifications)

## Iteración actual

### Módulos con paridad Fastify
- `GET /v1/health`
- `GET /v1/me/dashboard`
- Assessments start/answer/complete/result
- `GET /v1/library` + `GET /v1/library/:id`
- `GET /v1/therapy/program` + `POST /v1/therapy/lesson/:id/complete`
- `POST /v1/pain-logs` + `GET /v1/pain-logs/summary`
- `POST /v1/reports/generate` (json + pdfBase64)
- `POST /v1/notifications/register-token` + `POST /v1/notifications/test`

### Infra local
- `CommonModule` global: `MemoryStore`, `SupabaseService`, `DemoAuthGuard`
- Auth demo alineado (`Bearer demo`, `demo@neuropi.cl`)
- `@Inject()` explícito (compatible con `tsx` / sin emitDecoratorMetadata)
- Throttling + CORS + prefijo `/v1`

### Verificación
- [x] `npm run typecheck --workspace=@neuropi/api-nest`
- [x] Smoke: health, me/dashboard, library, therapy/program OK en `localhost:3334`

### Pendiente
- Repositorios Supabase (persistencia real)
- Soporte respuesta binaria PDF en `/reports/generate?binary=1`
- Plan de cutover mobile → Nest `/v1`

## Run

```bash
cp apps/api-nest/.env.example apps/api-nest/.env
npm run api:nest
```

Base: `http://localhost:3334/v1`
