# Neuropi API

Fastify + TypeScript backend for Neuropi (ecq-psyco-pain).

## Run

```bash
cp .env.example .env
npm run dev --workspace=@neuropi/api
```

Default: `http://localhost:3333`  
Sin Supabase → **modo memoria** + `Authorization: Bearer demo`

## Endpoints

- `GET /health`
- `GET /me/dashboard`
- `POST /assessments/start|/:id/answer|/:id/complete`
- `GET /assessments/:id/result`
- `POST /pain-logs` · `GET /pain-logs/summary`
- `GET /therapy/program` · `POST /therapy/lesson/:id/complete`
- `GET /library` · `GET /library/:id`
- `POST /reports/generate`
- `POST /notifications/register-token` · `POST /notifications/test`

## Deploy

Ver [docs/railway.md](../../docs/railway.md).
