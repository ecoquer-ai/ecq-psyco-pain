# Neuropi (ecq-psyco-pain)

| | |
|--|--|
| **Estado vs EcoquerAI** | **PRODUCTO SEPARADO** — no es el core Biobío |
| **Documento maestro EcoquerAI** | [`../README.md`](../README.md) |

**Marca pública:** Neuropi  
**Tagline:** nuevo enfoque para el dolor  
**Nombre técnico:** `ecq-psyco-pain`

App de **tamizaje, educación y acompañamiento** para personas con dolor crónico, basada en el modelo biopsicosocial y la psicoterapia del dolor.  
**No diagnostica.** No sustituye evaluación médica ni psicológica profesional.

---

## Qué es (y qué no es)

| Sí | No |
|----|----|
| Tamizaje y orientación | Diagnóstico definitivo |
| Evaluación longitudinal | Promesa de “cura” |
| Psicoeducación y plan inicial | Sustituto de terapia presencial |
| Derivación y preparación para consulta | Lenguaje que invalide el dolor |

Postura alineada con criterios contemporáneos de dolor crónico (>3 meses), valoración centrada en la persona, y transparencia clínica (tipo Painometer: no reemplaza la relación clínico–paciente).

---

## Monorepo

```
ecq-psyco-pain/
├── apps/mobile          # Expo + React Native + TypeScript (Neuropi)
├── apps/api             # Fastify + Zod (Railway)
├── packages/shared      # Dominio clínico, scoring, catálogo, schemas
├── packages/ui          # Design system + ThemeProvider
├── packages/config      # tsconfig / eslint base
├── supabase/            # Migrations + RLS + seeds
├── assets/brand         # Logo SVG
└── docs/                # Guías de despliegue
```

## Stack

- **Mobile:** Expo, Expo Router, Zustand, React Query, RHF + Zod, i18next
- **API:** Fastify + TypeScript + Zod
- **Auth/DB/Storage:** Supabase (Auth, Postgres, Storage, RLS)
- **OTA:** EAS Update
- **Notificaciones:** expo-notifications
- **UI:** `@neuropi/ui` (StyleSheet) + temas Amanecer / Bosque / Océano / Noche / Alto contraste + Modo neuroinclusivo

## Arranque local

```bash
cd ecq-psyco-pain
npm install
npm run shared:build

# API (modo memoria si no hay Supabase — Authorization: Bearer demo)
cp apps/api/.env.example apps/api/.env
npm run api

# Mobile (otra terminal)
cp apps/mobile/.env.example apps/mobile/.env
npm run mobile
```

## Variables de entorno

Ver:
- [`apps/api/.env.example`](./apps/api/.env.example)
- [`apps/mobile/.env.example`](./apps/mobile/.env.example)
- [`docs/environment.md`](./docs/environment.md)

## Documentación

| Guía | Archivo |
|------|---------|
| Mega prompt launch EDD | [docs/EDD_MEGA_PROMPT_NEUROPI_LAUNCH.md](./docs/EDD_MEGA_PROMPT_NEUROPI_LAUNCH.md) |
| Status EDD | [README_EDD_STATUS.md](./README_EDD_STATUS.md) |
| Entorno | [docs/environment.md](./docs/environment.md) |
| Local | [docs/local-development.md](./docs/local-development.md) |
| Supabase | [docs/supabase.md](./docs/supabase.md) |
| Railway | [docs/railway.md](./docs/railway.md) |
| EAS Update | [docs/eas-update.md](./docs/eas-update.md) |
| Notificaciones | [docs/notifications.md](./docs/notifications.md) |
| Checklist lanzamiento | [docs/launch-checklist.md](./docs/launch-checklist.md) |
| Ficha App Store | [docs/store/APP_STORE.md](./docs/store/APP_STORE.md) |
| Ficha Play Store | [docs/store/PLAY_STORE.md](./docs/store/PLAY_STORE.md) |
| Decisiones de producto | [docs/product-decisions.md](./docs/product-decisions.md) |

## URLs de producción (se completan al desplegar)

| Superficie | URL |
|------------|-----|
| Repo | https://github.com/ecoquer-ai/ecq-psyco-pain |
| Web (Vercel) | https://ecq-psyco-pain.vercel.app |
| API (Railway) | https://api-production-85ef.up.railway.app/health |
| Privacidad | https://ecq-psyco-pain.vercel.app/privacidad |
| Términos | https://ecq-psyco-pain.vercel.app/terminos |
| Supabase | proyecto `neuropi` (`hcbqrdxonbezscgzeyyo`, sa-east-1) |

## Instrumentos (tamizaje orientador)

- Pantalla de dolor inspirada en encuesta chilena de dolor crónico no oncológico (criterio >3 meses)
- NRS / EVA + mapa corporal
- PHQ-9 y PSS-10
- ITQ condicionado (solo si el flujo lo sugiere)
- Interferencia funcional, sueño, miedo al movimiento, apoyo social

Los puntajes se comunican como **señales orientadoras**, nunca como diagnóstico.

## Disclaimer clínico

Esta aplicación no proporciona diagnóstico médico ni psicológico. Si presentas dolor intenso nuevo, debilidad súbita, pérdida de control de esfínteres, fiebre con dolor de espalda, ideación suicida u otros síntomas de urgencia, busca atención profesional inmediata (en Chile: SAMU 131, Salud Responde 600 360 7777, o el servicio de urgencia más cercano).
