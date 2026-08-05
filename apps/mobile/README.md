# Neuropi Mobile (`@neuropi/mobile`)

App Expo (React Native) para **Neuropi** — nuevo enfoque para el dolor

Tamizaje, educación y acompañamiento para dolor persistente. **No diagnostica.**

## Requisitos

- Node 20+
- Monorepo `ecq-psyco-pain` con workspaces (`@neuropi/shared`, `@neuropi/ui`, `@neuropi/api`)
- Desde la raíz del monorepo: `npm install`

## Variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `EXPO_PUBLIC_API_URL` | API local (default `http://localhost:3333`) |
| `EXPO_PUBLIC_SUPABASE_URL` | Opcional |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Opcional |
| `EXPO_PUBLIC_DEMO_MODE` | `true` → Bearer `demo` en requests |

## Modo demo

Con `EXPO_PUBLIC_DEMO_MODE=true` (default):

- Puedes entrar sin cuenta real (“Entrar en modo demo”)
- Las llamadas API envían `Authorization: Bearer demo`
- Auth/onboarding/estado se persisten en AsyncStorage

## Scripts

Desde la raíz del monorepo:

```bash
npm run mobile
npm run mobile:android
npm run mobile:ios
```

O desde este paquete:

```bash
npm run start
npm run android
npm run ios
npm run web
npm run typecheck
```

Levanta también la API si quieres datos remotos:

```bash
npm run api
```

## Estructura

- `app/` — Expo Router (auth, onboarding, tabs, assessment, therapy, library, settings)
- `src/lib` — API, Supabase, i18n
- `src/store` — Zustand (settings, auth, assessment, journal)
- `src/components` — BodyMap, NrsSlider, QuestionCard, etc.

## Temas

Amanecer (default), Bosque, Océano, Noche, Alto contraste + modo neuroinclusivo.

## Tipografía

Los tokens de `@neuropi/ui` nombran **Fraunces** (display) y **Source Sans 3** (body). Hasta registrar archivos con `expo-font`, React Native usa fuentes del sistema.

## Nota clínica

Neuropi es herramienta de **tamizaje y educación**. No reemplaza evaluación profesional. Ante señales de urgencia, prioriza atención en persona (en Chile: SAMU 131 / urgencia).
