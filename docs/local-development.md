# Desarrollo local

## Requisitos

- Node.js ≥ 20.19 (ideal ≥ 20.19.4)
- npm 10+
- Expo Go o emulador iOS/Android
- (Opcional) Supabase CLI para migraciones locales

## Pasos

```bash
cd ecq-psyco-pain
npm install
npm run shared:build

# Terminal 1 — API
cp apps/api/.env.example apps/api/.env
npm run api

# Terminal 2 — Mobile
cp apps/mobile/.env.example apps/mobile/.env
npm run mobile
```

En Android emulator, `localhost` del host suele ser `10.0.2.2`. Ajusta `EXPO_PUBLIC_API_URL` si hace falta.

## Modo demo

1. API sin Supabase → memoria.
2. Mobile con `EXPO_PUBLIC_DEMO_MODE=true`.
3. Auth: cualquier login demo o token `Bearer demo`.

## Scripts útiles

| Comando | Qué hace |
|---------|----------|
| `npm run api` | API en watch |
| `npm run mobile` | Expo start |
| `npm run shared:build` | Compila dominio clínico |
| `npm run test` | Tests en workspaces |
| `npm run seed` | Resumen de seeds de contenido |

## Estructura de trabajo recomendada

1. Cambios clínicos → `packages/shared` → rebuild → API/mobile consumen.
2. UI reusable → `packages/ui`.
3. Flujos de pantalla → `apps/mobile`.
4. Orquestación / PDF / notificaciones → `apps/api`.
