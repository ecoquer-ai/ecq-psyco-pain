# Evaluación Neuropi — Etapa 1 (juzgar, no corregir)

**Fecha:** 2026-07-28  
**Entorno:** API `http://localhost:3333` (memory) · Expo web `http://localhost:8082` · Demo mode  
**Viewports:** mobile 390×844 · desktop 1280×800  
**Evidencia:** `docs/qa-evaluation/screenshots/{mobile,desktop}/`  
**Prompt usado:** `00-PROMPT-MAESTRO-EVALUACION.md`

---

## Veredicto ejecutivo

Neuropi ya tiene **alma de producto clínico serio**: tono empático, anti-iatrogenia explícita, red flags, consentimiento, disclaimers de instrumentos, y un recorrido coherente (validación del dolor → neuroplasticidad → meta → seguridad → consentimiento → creencias TCC → home). Eso es raro y valioso en health apps.

En craft visual y polish web/RN aún se siente **MVP funcional**, no “extremadamente bella”: marca `ArchedText` poco legible en welcome, CTAs con texto desalineado en desktop, títulos duplicados (“Tamizaje”×3), tabs que dejan pantallas previas en el árbol de accesibilidad, y biblioteca con demos Big Buck Bunny que debilitan confianza. La base clínica y de IA es buena; la etapa 2 debe **elevar belleza + intuitividad + a11y + consistencia de marca** sin diluir la postura científica.

**Listo para Etapa 2:** SÍ — con backlog P0/P1 abajo.

---

## Scores (1–5)

| Dimensión | Score | Firma |
|-----------|------:|-------|
| Belleza & craft visual | 2.5 | UX/RN |
| Intuitividad & carga cognitiva | 3.5 | UX/PE |
| Velocidad percibida & estabilidad | 3.5 | FS/QA |
| Seguridad clínica & ética | 4.5 | PSY/REG |
| Rigor científico / claims | 4.0 | RES |
| Confianza & conversión | 3.0 | MKT/SALES |
| Accesibilidad & neuroinclusión | 2.5 | A11Y |
| SEO/ASO readiness | 1.5 | SEO |
| Listo para app nativa premium | 3.0 | RN/FS |

**Promedio orientativo: ~3.1 / 5**

---

## Top 10 hallazgos (prioridad)

| # | Sev | Perfil | Pantalla | Hallazgo | Evidencia | Recomendación etapa 2 |
|---|-----|--------|----------|----------|-----------|------------------------|
| 1 | S1 | UX/RN | welcome / onboarding 1 | Marca **Neuropi** vía `ArchedText` no se lee como hero; tagline ocupa el protagonismo visual | `mobile-01-welcome`, `mobile-02-onboarding-1` | Reemplazar o rediseñar arco; brand tipográfico hero + logo; test legibilidad mobile |
| 2 | S1 | UX | login / register / CTAs anchos | Texto de botón primario **alineado a la derecha** en viewports anchos; se ve roto | `desktop-04-login`, `desktop-02-psicoterapia` | Centrar label en `Button`; max-width formulario ~420px centrado |
| 3 | S1 | A11Y | tabs (web) | Pantallas previas permanecen en el a11y tree (botones/headings de Inicio+Check-in+… visibles en Biblioteca) | snapshot library/more | `detachInactiveScreens` / ocultar `aria-hidden` en tabs inactivos |
| 4 | S1 | UX/QA | assessment | Título **“Tamizaje” repetido 3 veces** (header stack + screen) | `mobile-15-assessment` | Un solo H1; breadcrumb o back label distinto |
| 5 | S2 | UX | psicoterapia (desktop) | Callout “Útil y necesaria” **trunca texto** a la derecha | `desktop-02-psicoterapia` | Wrap / maxWidth / padding; fullPage check |
| 6 | S2 | A11Y | tabs mobile | Iconos de tab se exponen como caracteres basura (``) en nombre accesible | snapshot tabs | `accessibilityLabel` limpio sin glyph duplicado |
| 7 | S2 | MKT/PE | biblioteca | Videos demo dominio público (Big Buck Bunny) + “demo” en títulos erosiónan confianza clínica | `mobile-13-library` | Placeholders brand Neuropi o thumbnails propios; badge “contenido en producción” más suave |
| 8 | S2 | MKT | global | Inconsistencia **Neuropi / NeuroPi / Neuropi.cl** | headings + email demo | Unificar marca pública (README: Neuropi) en UI, email, i18n |
| 9 | S2 | SEO | web | `document.title` vacío; sin meta description; app shell RN-web | CDP title `""` | `+html` / Head: title, description, OG; landing SEO si aplica |
| 10 | S2 | UX | preferences | Switches aparecen `readonly` en a11y; modo neuroinclusivo poco descubrible | snapshot preferences | Labels asociados, roles correctos, preview visual del modo |

### Hallazgos clínicos positivos (preservar)

| Sev | Perfil | Qué funciona |
|-----|--------|--------------|
| — | PSY | “Tu dolor es real” + texto sobre exámenes que salen bien — anti-invalidación excelente |
| — | PSY | Safety gate con red flags + ideación suicida + “ninguna…” / “necesito orientación” |
| — | RES | Disclaimers explícitos: no PCS Chile, no diagnóstico, inspirado CBT-CP |
| — | PSY | Consentimiento: tamizaje/educación, no reemplaza profesional |
| — | SALES | Meta “Buscar apoyo psicológico para el dolor” alinea conversión con promesa |

---

## Matriz por perfil

### QA
Flujo demo usable; onboarding 1→9 navegable; tabs y assessment cargan. Fallos de layout desktop y a11y tree son los más graves no-clínicos. Inventario parcial: ver sección inventario (faltan screenshots de beliefs-limiting completo, lessons therapy, theme settings detail — cubrir en Etapa 3).

### UX/UI
Paleta Amanecer calmada y tipografía serif+sans dan identidad terapéutica (no “AI purple”). Falta atmósfera (hero visual, motion, ritmo), brand hero-level, y composición desktop (todo se estira o se ve “columna estrecha en vacío”). Cards en biblioteca/meta son funcionales; en hero sobran menos elementos.

### Full-stack
Monorepo sólido; demo sin Supabase funciona; scoring/shared bien pensado. Mejoras: a11y tabs web, Button layout, Head SEO, performance lista biblioteca (muchos botones montados).

### Psicólogo senior
Contenido alineado a biopsicosocial y dignidad. Riesgo: onboarding largo (9 pasos + Likert) puede fatigar a quien duele; valorar acortar o “continuar más tarde”. Crisis: revisar que tras ítem PHQ-9/9 y opción suicidio en safety haya ruta clara a recursos Chile (SAMU/Salud Responde) visible y accionable.

### Investigador
Buena honestidad metodológica. Vigilar que “método de neuroplasticidad integral” en consentimiento no se lea como marca registrada de tratamiento validado. Mantener separación instrumento vs pilar psicoeducativo.

### Marketing / Ventas
Promesa clara (“dolor se escucha”). Conversión debilitada por welcome sin brand legible, demos video, y falta de prueba social / “para quién es”. B2B clínicas: “Resumen para consulta” es gran gancho — potenciar en home.

### Accesibilidad
Neuroinclusivo existe (bien). Contraste body muted vs cream revisar. Targets NRS 0–10 OK. Labels de inputs incompletos en register (textbox sin name).

### SEO/ASO
Casi nulo en web preview. Preparar store listing ES-CL en Etapa 4–7.

### React Native / Expo Senior
Base Expo Router + temas + i18n lista para premium. Etapa 4 debe definir motion (Reanimated), haptics, FlashList biblioteca, gestos body map, y pulir design tokens.

---

## Inventario QA pantallas

| Pantalla | Mobile SS | Desktop SS | Estado |
|----------|-----------|------------|--------|
| welcome | ✅ 01 | — | Brand S1 |
| onboarding 1 | ✅ 02 | — | ok / brand |
| pain-is-real | ✅ 03 | — | ok clínico |
| what-neuropi-does | ✅ 04 | — | ok; scroll largo |
| goal | ✅ 05 | — | ok |
| preferences | ✅ 06 | — | a11y switches |
| safety | ✅ 07 | — | ok; lista larga |
| consent | ✅ 08 | — | ok |
| beliefs-automatic | ✅ 09 | — | ok disclaimer |
| beliefs-limiting | 🚫 | — | no capturado (flujo interrumpido) |
| home | ✅ 10 | ✅ desktop-01 | empty state ok |
| checkin | ✅ 11 | — | ok tono |
| psicoterapia | ✅ 12 | ✅ desktop-02 | truncate S2 |
| library | ✅ 13 | — | demos S2 |
| more | ✅ 14 | — | ok |
| assessment | ✅ 15 | — | título×3 S1 |
| login | — | ✅ desktop-04 | CTA align S1 |
| register | — | ✅ 03 (naming) | labels a11y |
| therapy lesson / module | 🚫 | — | pendiente |
| report / theme / a11y settings | 🚫 | — | pendiente (links en Más) |
| psych/pain-psychologist | 🚫 | — | route redirigió / poca UI |

---

## Riesgos clínicos / legales

1. Sobreclaim de “método” en consentimiento — suavizar a “enfoque / programa educativo”.  
2. PHQ-9 ítem 9 + safety: asegurar CTA a emergencia Chile siempre visible.  
3. Resultados de scoring: nunca “tienes depresión/ansiedad”; solo señales orientadoras (ya hay intención; auditar copy results en Etapa 2).  
4. Videos placeholder no deben parecer psicoeducación clínica final.

---

## Backlog priorizado Etapa 2

### P0
- Brand welcome/onboarding legible (Neuropi hero)
- Button label centrado + formularios max-width
- A11y: tabs inactivos ocultos; tab labels limpios
- Quitar triple “Tamizaje”

### P1
- Fix truncate callouts desktop
- Unificar Neuropi casing
- SEO Head básico web
- Inputs con labels accesibles
- Biblioteca: reemplazar/encuadrar demos
- Acortar o “saltar” onboarding Likert si fatiga

### P2
- Motion 2–3 intencionales
- Empty states ilustrados (no solo texto)
- Preview temas en preferences
- ASO copy draft

---

## Preguntas abiertas al producto

1. ¿Marca canónica es **Neuropi** o **NeuroPi**?  
2. ¿Onboarding de 9 pasos es innegociable o podemos condensar a 5 + “profundizar después”?  
3. ¿Expo web es solo preview, o habrá landing SEO separada?  
4. ¿Prioridad B2C paciente vs B2B clínica para el “resumen para consulta”?

---

## Listo para etapa 2

**SÍ.** Entrada: este informe + prompts en `docs/qa-evaluation/` + screenshots.

Siguiente paso usa: `02-PROMPT-MEJORA-VISUAL-UX-SEO-CIENCIA.md`
