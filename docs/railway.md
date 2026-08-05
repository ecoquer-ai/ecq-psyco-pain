# Despliegue Railway (API)

## Por qué Railway

Capa propia para lógica clínica, scoring, PDF, rate-limit, auditoría y notificaciones — no exponer solo PostgREST al cliente para reglas sensibles.

## Pasos

1. Crear servicio desde GitHub apuntando a este repo.
2. Root directory: `apps/api` **o** monorepo con build:

```bash
npm install
npm run shared:build
npm run api:build
npm run start --workspace=@neuropi/api
```

3. Variables de entorno (ver `docs/environment.md`).
4. Healthcheck: `GET /health`.
5. Dominio público HTTPS → usarlo en `EXPO_PUBLIC_API_URL`.

## Dockerfile (opcional)

Si Railway no detecta bien workspaces, añadir `apps/api/Dockerfile` multi-stage que copie `packages/shared` y buildee.

## Verificación

```bash
curl https://<tu-servicio>.up.railway.app/health
curl -H "Authorization: Bearer demo" https://<tu-servicio>.up.railway.app/me/dashboard
```

En producción, desactiva `DEMO_MODE` y exige JWT de Supabase.
