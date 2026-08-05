# Mega Prompt — Neuropi Launch (EDD) · Web + Stores + OTA

> **Fecha:** 2026-08-05  
> **Producto:** Neuropi (`ecq-psyco-pain`) — producto separado del core EcoquerAI Biobío  
> **Modo:** Event-Driven Development · desplegar la versión actual para luego solo OTA  
> **Workspace:** `C:\ecoquerai\ecq-psyco-pain`

---

## Rol

Eres el ciclo EDD completo de Neuropi (Producto → Arquitecto → Implementador → QA → UX/UI → Cloud/Cost → Release).  
Objetivo: **poner en producción la versión actual** (web mobile-first + API + DB + apps nativas en tiendas) para que los siguientes cambios sean **EAS Update (OTA)**, no rebuilds nativos.

No inventes compliance clínico. Neuropi **orienta y educa; no diagnostica**.

---

## Evento de negocio raíz

**`NeuropiNoEstaEnManosDeUsuarios`**

- Métrica: URL web pública + API healthy + binarios iOS/Android enviados a revisión (o al menos internal/test track) + canal OTA `production` listo.
- Outcome: una persona en Chile puede abrir Neuropi en el teléfono (web o store) y completar auth/demo → onboarding → check-in → resultado sin que el equipo reconstruya nativo.

Eventos hijos (orden de ejecución):

| P | Evento | Outcome medible |
|---|--------|-----------------|
| P0 | `MarcaSinIdentidadNativa` | Icono, splash, adaptive icons, favicon, feature graphic Neuropi |
| P0 | `AppSinPermisosNativosDeclarados` | `app.json` / Info.plist / AndroidManifest con solo lo necesario |
| P0 | `DatosDeSaludSinBackendProd` | Proyecto Supabase Neuropi + migraciones + RLS + buckets |
| P0 | `ApiClinicaNoTieneUrlPublica` | Railway `/health` HTTPS + CORS a web/app |
| P0 | `WebNoEsUsableEnCelular` | Vercel mobile-first + privacidad/términos públicos |
| P0 | `TiendasSinFichaNiBinario` | Fichas ASO + EAS build + submit / internal testing |
| P1 | `CorreoAuthNoLlega` | Resend (SMTP Supabase) desde dominio EcoquerAI |
| P1 | `ImagenesMarketingSinCDN` | Cloudinary folder `neuropi/` |
| P1 | `SiguienteCambioRequiereRebuild` | `runtimeVersion` + EAS Update channel `production` |
| P2 | `UsuarioNoEncuentraSoporteLegal` | URLs de privacidad, soporte y disclaimer en stores |

---

## Principios EDD (no negociables)

1. **Evento primero** — cada paso ataca un evento de la tabla.
2. **Cambio mínimo** — no migrar a Nest en este launch (`apps/api-nest` queda local). Prod = Fastify `apps/api`.
3. **Path crítico, no vanity** — auth/demo → onboarding → assessment → result → check-in → lesson.
4. **Salud ≠ spots** — proyecto Supabase **nuevo** (no reutilizar `yxpojtfiymehkdrbqhvf` / auth spots).
5. **Secretos fuera de git** — `.env` local + dashboards; nunca commitear service role / SMTP / tokens.
6. **OTA después del binario** — permisos, splash, iconos, `expo-notifications` nativo = rebuild. Copy/UI/scoring = OTA.
7. **Always-deploy** del workspace: commit + push cuando el repo exista; no force-push; no secretos.

---

## Identidad de producto (SoT)

| Campo | Valor |
|-------|--------|
| Nombre público | **Neuropi** |
| Tagline | Nuevo enfoque para el dolor |
| Nombre técnico / repo | `ecq-psyco-pain` |
| Bundle iOS | `cl.ecoquerai.neuropi` |
| Package Android | `cl.ecoquerai.neuropi` |
| Scheme | `neuropi` |
| Expo slug | `neuropi` |
| Expo owner (ecoquerai) | `ecoquerais-team` |
| Apple Team (ecoquerai) | `R76PGCU7G6` |
| Contacto | `ecoquerai@gmail.com` |
| Legal entity | EcoquerAI · Chile · Matías Troncoso |
| Postura clínica | Tamizaje + psicoeducación. No diagnóstico. No prescripción. |

---

## Arquitectura de launch (mínima)

```
[ iOS / Android / Web mobile-first ]
        │  EXPO_PUBLIC_API_URL
        │  EXPO_PUBLIC_SUPABASE_*
        ▼
   Vercel (Expo static/web)     EAS Update (OTA)
        │
        ▼
   Railway  apps/api (Fastify)  ── JWT / service role ──► Supabase (Auth+Postgres+Storage+RLS)
        │
        ├── Resend (SMTP auth + transaccional)
        └── Cloudinary (assets marketing / fichas; no PHI)
```

**No desplegar `apps/api-nest`.** Es scaffold local sin paridad de persistencia.

---

## Ciclo de agentes por evento

```
Evento
  → Producto: acceptance + métrica + copy clínico seguro
  → Arquitecto: cambio mínimo + env surface + tests path crítico
  → Implementador: código / infra
  → QA: /health + smoke auth→onboarding→assessment→check-in
  → UX/UI: solo si cambió superficie (marca, splash, web mobile)
  → Cloud/Cost: un servicio Railway, un proyecto Supabase, Vercel static, OTA vs rebuild
  → Commit + deploy
```

---

## Inventario de accesos (qué necesita el agente)

### Ya reutilizables desde el ecosistema (no copiar valores a git)

| Recurso | Dónde está | Uso Neuropi |
|---------|------------|-------------|
| Railway CLI sesión | `mat.informatica.ubb@gmail.com` | Crear servicio API |
| Resend API + from `hola@ecoquerai.cl` | `ecq-spots-service/.env` | SMTP auth Supabase |
| Cloudinary `dckwzwc1b` | `ecq-spots-service/.env` | Folder `neuropi/` |
| Supabase personal access token | `ecq-spots-service/.env` `SUPABASE_ACCESS_TOKEN` | Crear proyecto **nuevo** |
| Apple Team | `R76PGCU7G6` (app EcoquerAI) | Misma org ASC si aplica |
| Expo org | `ecoquerais-team` | `eas init` + owner |

### Bloqueos humanos (login / 2FA / cuentas)

El agente **debe pedir** o esperar navegador Cursor:

1. **App Store Connect / Play Console** — login humano (2FA / iframe). EAS CLI ya está en `ecoquerai`; proyecto `@ecoquerais-team/neuropi`.
2. **Vercel** — `npx vercel login` o `VERCEL_TOKEN` (CLI no instalado / sin sesión).
3. **GitHub** — `gh` no está; remoto esperado `github.com/Saitamx/ecq-psyco-pain` (mismo patrón que landing). Token o login git.
4. **App Store Connect** — Apple ID + 2FA (sesión ASC caduca en iframe). Crear app Neuropi si no existe.
5. **Google Play Console** — cuenta + app `cl.ecoquerai.neuropi` + (ideal) service account JSON para `eas submit`.
6. **Dominio (opcional P1)** — ¿`neuropi.ecoquerai.cl` / `app.neuropi.cl` o solo `*.vercel.app`?
7. **FCM / google-services.json** — push Android real (si no, notificaciones locales / Expo Go only).
8. **Revisión clínica humana** — checklist launch (no bloquea internal testing; sí store “Health”).

### Datos de ficha que el agente puede redactar solo

- Nombre, subtítulo, descripción, keywords, what’s new, Data Safety / Nutrition Labels (salud + cuenta + notificaciones).
- Edad: **12+** (PHQ-9 ítem 9 / temas de crisis; no contenido sexual).
- Categoría: **Health & Fitness** (no Medical Device).
- Privacy nutrition: Health data collected, linked to user, not used for tracking ads.

---

## Pasos de ejecución (este orden)

### E0 — Prompt + inventario
Publicar este mega prompt + status EDD del repo.

### E1 — `MarcaSinIdentidadNativa`
Logo SVG canónico + PNG: icon 1024, splash, adaptive fg/bg/mono, favicon, Play feature graphic.

### E2 — `AppSinPermisosNativosDeclarados`
Actualizar `apps/mobile/app.json` + `eas.json`:

- iOS: notificaciones, `ITSAppUsesNonExemptEncryption=false`, bundle `cl.ecoquerai.neuropi`
- Android: `POST_NOTIFICATIONS`, package idéntico
- Plugins: `expo-notifications`, splash, secure-store, localization, updates
- `owner`: `ecoquerais-team`
- `runtimeVersion.policy`: `appVersion` (OTA compatible)
- **No** pedir cámara, micrófono, ubicación ni galería completa si el código actual no los usa.

### E3 — `DatosDeSaludSinBackendProd`
Crear proyecto Supabase `neuropi` (región `sa-east-1` si el plan lo permite).  
`supabase db push` + seed contenido. Buckets `audio`, `reports`.  
Auth: email/password (+ magic link opcional). SMTP Resend.

### E4 — `ApiClinicaNoTieneUrlPublica`
Dockerfile / `railway.toml` monorepo:

```bash
npm ci
npm run shared:build
npm run api:build
npm run start --workspace=@neuropi/api
```

Healthcheck `GET /health`. Env: `SUPABASE_*`, `CORS_ORIGIN`, `NODE_ENV=production`.  
Demo: en prod preferir `DEMO_MODE` off; si el launch es “versión actual usable”, se puede dejar demo **explícito** en web/internal y off en store review notes.

### E5 — `WebNoEsUsableEnCelular`
Expo export web → Vercel. Viewport mobile-first (permitir zoom a11y). Rutas `/privacidad` y `/terminos`.  
Env públicas: API Railway + Supabase anon.

### E6 — Fichas + legal
Completar `docs/store/*` y pegar en ASC + Play. Screenshots desde web/emulador (tono cálido + disclaimer visible).

### E7 — `TiendasSinFichaNiBinario`
```bash
cd apps/mobile
eas init
eas build --platform all --profile production
eas submit --platform all --profile production
eas update --branch production --message "baseline launch"
```

iOS: App Store o TestFlight si metadata/2FA bloquea release.  
Android: internal testing track primero, luego producción.

### E8 — Handoff OTA
Documentar: qué cambia con OTA vs qué fuerza rebuild. Canal `production` = SoT post-launch.

---

## Criterios de éxito

- [ ] Mega prompt publicado
- [ ] Icono/splash/permisos en binario
- [ ] `GET https://<railway>/health` → ok
- [ ] Web Vercel abre en viewport móvil y muestra Neuropi
- [ ] Privacidad + términos con URL https pública
- [ ] Supabase Neuropi con migraciones (no proyecto spots)
- [ ] EAS projectId real (no `YOUR_EAS_PROJECT_ID`)
- [ ] Build iOS + Android subidos (review o internal)
- [ ] `eas update` production funciona
- [ ] README del repo con URLs prod

---

## Prompt operativo (copiar para agentes)

```
Eres el agente de launch EDD de Neuropi (ecq-psyco-pain).
Evento raíz: NeuropiNoEstaEnManosDeUsuarios.
Lee docs/EDD_MEGA_PROMPT_NEUROPI_LAUNCH.md y ejecuta el siguiente evento de la tabla (uno por vez).
Prod API = apps/api Fastify en Railway. Web = Expo export en Vercel mobile-first.
Mobile = Expo 57, nombre Neuropi, bundle cl.ecoquerai.neuropi, OTA EAS Update.
No uses el Supabase de spots. No commitees secretos. No migres a Nest ahora.
Si falta login (Expo, Vercel, Apple, Play, GitHub), detente y pide al humano abrir el navegador Cursor o pasar el token.
Tras cada evento: commit + push si hay remoto, y actualiza README_EDD_STATUS.md.
```
