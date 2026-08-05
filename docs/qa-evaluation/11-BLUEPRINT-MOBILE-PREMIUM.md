# Blueprint — Neuropi Mobile Premium (Etapa 4)

**Producto:** Neuropi · `ecq-psyco-pain`  
**Stack app:** Expo 57 · React Native · TypeScript · Expo Router · `@neuropi/ui` · `@neuropi/shared`  
**Backend actual (local):** Fastify demo/memory  
**Backend objetivo (Etapa 8+, no ahora):** NestJS + Supabase · Railway · Vercel web  
**Gate:** Usuario dice **continuar** → Etapa 5 (implementar este blueprint)

---

## 1. Principios de producto (no negociables)

1. **Dolor es real** — nunca invalidar; psicoterapia = útil y a menudo necesaria.
2. **No diagnostica** — scores = señales orientadoras; disclaimers visibles.
3. **Crisis primero** — PHQ-9 ítem 9 + safety + recursos Chile (SAMU 131, Salud Responde).
4. **Una composición por pantalla** — brand Neuropi hero en welcome; sin dashboard clutter.
5. **Cards solo si son táctiles** — resto es tipografía + ritmo + atmósfera.
6. **Temas vivos** — Amanecer / Bosque / Océano / Noche / Alto contraste + modo neuroinclusivo.
7. **Mobile-first nativo** — Expo Go / dispositivo; web solo preview de desarrollo.

---

## 2. Information architecture

```
neuropi://
├── (auth)
│   ├── welcome          # Brand hero + CTAs
│   ├── login
│   └── register
├── (onboarding)         # Stack 1→9, skip Likert permitido
│   ├── index            # Brand + promesa
│   ├── pain-is-real
│   ├── what-neuropi-does
│   ├── goal
│   ├── preferences
│   ├── safety           # Red flags + crisis
│   ├── consent
│   ├── beliefs-automatic  # skip → limiting
│   └── beliefs-limiting   # skip → home/assessment
├── (tabs)
│   ├── index            # Inicio — greeting + next action + progress
│   ├── checkin          # Check-in ÚNICO (NRS + zonas + nota)
│   ├── psicoterapia     # Hub terapia + CTAs tamizaje/programa/consulta
│   ├── library          # FlashList · filtros · audio/video
│   ├── more             # Tema, notif, a11y, resumen, logout
│   ├── program          # href:null — deep link
│   └── journal          # href:null — futuro clínico
├── assessment/          # Stack
│   ├── index
│   ├── [moduleId]
│   └── results
├── therapy/
│   ├── [moduleId]
│   └── lesson/[lessonId]
├── library/[id]
├── report/
├── psych/pain-psychologist
└── settings/{theme,notifications,accessibility}
```

### Deep links (scheme `neuropi`)

| Path | Uso |
|------|-----|
| `/checkin` | Notificación suave “momento intencional” |
| `/assessment` | Continuar tamizaje |
| `/therapy/{id}` | Retomar programa |
| `/library/{id}` | Contenido compartido |
| `/report` | Resumen para consulta |

### Tabs (orden fijo)

`Inicio · Check-in · Psicoterapia · Biblioteca · Más`

---

## 3. Design system — tokens

### 3.1 Color (por tema — ya en `@neuropi/shared`)

Mantener 5 temas. Ampliar tokens de **atmósfera** (no flat):

| Token | Uso |
|-------|-----|
| `background` | Base |
| `backgroundSubtle` | Gradiente sutil / wash (nuevo) |
| `surface` | Controles interactivos |
| `primary` / `primaryMuted` | CTA / chips |
| `text` / `textMuted` | Jerarquía |
| `border` | Hairline |
| `danger` / `success` / `warning` | Semántica clínica (poco uso) |
| `crisis` | Superficie de emergencia (alto contraste, no “rojo grito”) |

**Atmósfera:** wash vertical suave (2 stops del tema) detrás del hero; sin glow purple; sin cream genérico AI si el tema no lo define.

### 3.2 Tipografía (cargar en Etapa 5)

| Rol | Familia | Carga |
|-----|---------|-------|
| Display / brand | **Fraunces** | `@expo-google-fonts/fraunces` |
| Body / UI | **Source Sans 3** | `@expo-google-fonts/source-sans-3` |

Escala actual en `packages/ui/src/tokens.ts` — preservar.  
Neuroinclusivo: `fontScale 1.15`, `spacingScale 1.12`, `reduceMotion true`.

### 3.3 Space / radius / touch

- Spacing base 4 (tokens existentes).
- Radii soft `sm–xl` (no pills decorativos).
- `MIN_TOUCH_TARGET = 44`.

### 3.4 Elevation (nuevo, sutil)

| Nivel | Uso |
|-------|-----|
| `0` | Flat (default) |
| `1` | Sheet / bottom CTA sticky |
| `2` | Modal crisis |

Sombras cálidas muy bajas opacity — no multi-layer “AI”.

### 3.5 Motion

| Nombre | Cuándo | Spec |
|--------|--------|------|
| `fadeRise` | Welcome / onboarding enter | opacity 0→1, y +12→0, 480ms, easing soft |
| `tabCrossfade` | Cambio de tab | 180ms opacity (si !reduceMotion) |
| `checkinPulse` | Guardar NRS | scale 1→1.03→1 + haptic Light |
| `progressFill` | Barras | width animated 400ms |
| `crisisIn` | Overlay crisis | fade + slide desde bottom 280ms |

Respetar `AccessibilityInfo` / modo neuroinclusivo → saltar animaciones no esenciales.

---

## 4. Librerías (decidir por necesidad real)

### Ya en repo — potenciar

| Lib | Rol premium |
|-----|-------------|
| `expo-router` | IA + deep links |
| `react-native-reanimated` | Motion anterior |
| `react-native-svg` | Logo / body map |
| `zustand` + persist | Auth, settings, assessment |
| `@tanstack/react-query` | API cuando Nest/Supabase |
| `expo-notifications` | Recordatorios suaves |
| `expo-secure-store` | Tokens (no AsyncStorage para secretos) |
| `expo-audio` | Biblioteca audio |
| `lottie-react-native` | 1–2 momentos (éxito check-in / onboarding done) — no spam |
| `i18next` | es-CL / en |
| `zod` + RHF | Forms auth |

### Añadir en Etapa 5

| Lib | Por qué |
|-----|---------|
| `@shopify/flash-list` | Biblioteca / assessment lists — perf |
| `expo-image` | Covers biblioteca, splash branding |
| `expo-haptics` | Feedback check-in / CTA primario |
| `react-native-gesture-handler` | Body map / sliders (si no está transitivo) |
| `@expo-google-fonts/fraunces` + `source-sans-3` | Tipografía real |
| `expo-network` (o NetInfo) | Empty offline state |

### No ahora (evitar peso)

- Skia — solo si body map necesita canvas avanzado (fase 5b).
- Detox CI completo — Maestro/checklist manual primero.

---

## 5. Flujos críticos (wireframes textuales)

### A. Auth + demo
1. Welcome: Logo → **Neuropi** display → tagline → lede → [Crear] [Entrar] [Demo].  
2. Demo → onboarding (no tabs).  
3. Login/Register: form max 420, labels a11y, CTA centrado.

### B. Onboarding (confianza)
1–3 validación + neuroplasticidad → 4 meta → 5 prefs → **6 safety (gate)** → 7 consent → 8–9 Likert **con “Continuar más tarde”**.  
Progress `n/9` siempre. Copy anti-iatrogenia intacto.

### C. Check-in único
Empty: “Sin check-in aún” + invitación a Psicoterapia.  
Flujo: NRS 0–10 → zonas (multi) → nota opcional → Guardar → haptic + toast suave → CTA Psicoterapia.  
**No** gamificar racha diaria.

### D. Assessment
Lista módulos clínicos (orden shared) → QuestionCard → results “orientación, no diagnóstico” → puente a psicoterapia.

### E. Psicoterapia hub
Validación + “útil y necesaria” → progreso tamizaje + programa → CTAs → DisclaimerBanner.

### F. Biblioteca
Filtros Todo/Videos/Audios → FlashList → detalle audio (read mode) / video (próximamente o player).  
Badge “próximamente” honesto; sin Big Buck Bunny en copy.

### G. Crisis
Trigger: safety red-flag suicidio **o** PHQ-9 ítem 9 positivo.  
Pantalla/modal full: copy calmado + **llamar / Salud Responde / SAMU** + “Neuropi puede esperar”.  
No cerrar con un solo tap accidental.

---

## 6. Estados de sistema

| Estado | UI |
|--------|----|
| Loading | Skeleton (`@neuropi/ui`) — no spinner solo en hero |
| Empty | Copy + un CTA (ya estilo check-in) |
| Offline | Banner “Sin conexión — puedes seguir en demo local” |
| Error API | Inline + reintentar; nunca stack trace |
| Crisis | Modal bloqueante recursos Chile |
| Demo | Chip “Modo demo” en Más |

---

## 7. Calidad (Etapa 5)

1. `npm run typecheck` + `lint` en workspaces.  
2. Tests unitarios scoring `@neuropi/shared` (expandir).  
3. Checklist manual Maestro-like (15 pantallas) en Expo Go Android/iOS.  
4. A11y: VoiceOver/TalkBack en welcome, check-in, crisis.  
5. Regresión visual: recaptura Etapa 3 rutas.

---

## 8. ASO (prep ES-CL)

| Campo | Propuesta |
|-------|-----------|
| Nombre | Neuropi |
| Subtítulo | Nuevo enfoque para el dolor |
| Keywords | dolor crónico, psicoterapia del dolor, neuropi, biopsicosocial, check-in dolor, Chile |
| Categoría | Salud y forma física / Medicina |
| Capturas a producir (Etapa 5+) | 1 Welcome · 2 Onboarding “tu dolor es real” · 3 Home · 4 Check-in · 5 Psicoterapia · 6 Biblioteca |

Disclaimer store: no diagnostica; no reemplaza atención profesional.

---

## 9. Tickets Etapa 5 (orden de implementación)

### P0 — Belleza base nativa
1. Cargar Fraunces + Source Sans 3; splash alineado tema Amanecer.  
2. Welcome premium: atmósfera wash + `fadeRise` + brand display (ya base).  
3. Unificar headers: **un** título (stack XOR H1) en tabs/stacks.  
4. Fix residual a11y tabs: ocultar/desmontar escenas inactivas en web+native.

### P1 — Flujos que se sienten “app”
5. Check-in: haptics + Lottie/microfeedback + empty ilustrado (SVG simple, no stock).  
6. Biblioteca: FlashList + `expo-image` covers + secciones sticky filtros.  
7. Assessment QuestionCard: motion progress + targets táctiles revisados.  
8. Crisis modal unificado (safety + PHQ-9).  
9. Offline banner + SecureStore para token cuando deje de ser demo.

### P2 — Premium polish
10. Transiciones onboarding (shared element logo opcional).  
11. Temas: preview swatch animado en preferences/Más.  
12. Notificaciones locales suaves (copy no culpabilizante).  
13. Capturas ASO + checklist Maestro 15 pantallas.  
14. Documentar contratos API para Etapa 8 Nest (OpenAPI draft).

### Fuera de Etapa 5
- NestJS + Supabase + Railway + Vercel (Etapas 8–9).  
- Diario clínico completo.  
- Skia body map avanzado.

---

## 10. Criterio “listo” Etapa 5

- [ ] Tipografía real cargada en iOS/Android.  
- [ ] Welcome / Home / Check-in / Psicoterapia / Biblioteca / Crisis sin S0/S1.  
- [ ] FlashList biblioteca sin jank en 50+ ítems.  
- [ ] Reduce motion / neuroinclusivo verificados.  
- [ ] Typecheck verde.  
- [ ] Checklist 15 pantallas PASS en Expo Go.  

---

## Relación con backend futuro

La app sigue contra Fastify **local/demo** hasta Etapa 8.  
El blueprint API (Nest modules) se escribe en ticket 14; implementación Nest **después** de mobile premium y **con cuentas** que entregues.
