# Variables de entorno

## API (`apps/api/.env`)

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto HTTP (default `3333`) |
| `HOST` | Host (default `0.0.0.0`) |
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | Clave anónima (cliente) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (solo servidor; nunca en mobile) |
| `CORS_ORIGIN` | Orígenes permitidos (`*` en dev) |
| `DEMO_MODE` | `true` → stores en memoria + `Bearer demo` |

Sin Supabase configurado, la API corre en **modo memoria**.

## Mobile (`apps/mobile/.env`)

| Variable | Descripción |
|----------|-------------|
| `EXPO_PUBLIC_API_URL` | URL del API (ej. `http://localhost:3333` o URL Railway) |
| `EXPO_PUBLIC_SUPABASE_URL` | URL Supabase |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Anon key |
| `EXPO_PUBLIC_DEMO_MODE` | `true` usa token `demo` hacia el API |

## EAS / Expo

Configurar en `eas.json` y secretos EAS:
- `EXPO_PUBLIC_API_URL` de producción
- Credenciales de notificaciones (FCM / APNs)

## Reglas de seguridad

- Nunca commitear `.env` con secretos reales.
- Nunca embebber `SERVICE_ROLE_KEY` en la app móvil.
- Separar proyectos Supabase de desarrollo y producción.
