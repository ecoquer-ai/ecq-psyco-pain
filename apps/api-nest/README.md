# Neuropi API Nest (local scaffold)

NestJS + TypeScript scaffold to migrate from `@neuropi/api` (Fastify MVP) without breaking mobile contracts.

## Run local

```bash
cp .env.example .env
npm install
npm run api:nest
```

Base URL: `http://localhost:3334/v1`

Auth (modo memoria / sin Supabase):

```text
Authorization: Bearer demo
```

## Endpoints listos (paridad Fastify)

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/v1/health` | no |
| GET | `/v1/me/dashboard` | sí |
| POST | `/v1/assessments/start` | sí |
| POST | `/v1/assessments/:id/answer` | sí |
| POST | `/v1/assessments/:id/complete` | sí |
| GET | `/v1/assessments/:id/result` | sí |
| GET | `/v1/library` | sí |
| GET | `/v1/library/:id` | sí |
| GET | `/v1/therapy/program` | sí |
| POST | `/v1/therapy/lesson/:id/complete` | sí |
| POST | `/v1/pain-logs` | sí |
| GET | `/v1/pain-logs/summary` | sí |
| POST | `/v1/reports/generate` | sí |
| POST | `/v1/notifications/register-token` | sí |
| POST | `/v1/notifications/test` | sí |

## Pendiente

- Persistencia Supabase por repositorio
- Switch controlado de mobile a `/v1`

## Notes

- Neuropi orienta y educa; no diagnostica.
- Fastify (`apps/api` puerto 3333) sigue activo en paralelo.
- Con `tsx`, usar `@Inject()` explícito (no emite decorator metadata).
