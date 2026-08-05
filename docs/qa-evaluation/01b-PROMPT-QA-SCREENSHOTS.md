# Prompt satélite — QA captura total de pantallas

Actúa como **QA Lead senior** de Neuropi (Expo Router).

## Misión
1. Arranca API + Expo web (o Expo Go).
2. Viewport **mobile 390×844** y **desktop 1280×800**.
3. Navega **todas** las rutas del inventario (ver prompt maestro).
4. Guarda screenshot por pantalla: `docs/qa-evaluation/screenshots/{viewport}/{ruta-slug}.png`
5. Registra bugs en tabla: ruta | sev | repro | esperado | actual | screenshot.

## Reglas
- Usa modo **demo** si existe.
- Si un flujo está bloqueado, documenta el bloqueo (no inventes pantallas).
- Prioriza S0/S1 antes de opinión estética.
- Al terminar: inventario completo + Top bugs + «Dime continuar…».

## Inventario mínimo (marcar ✅/❌/🚫)

### Auth
- [ ] welcome
- [ ] login
- [ ] register

### Onboarding
- [ ] index / intro
- [ ] consent
- [ ] safety
- [ ] what-neuropi-does
- [ ] pain-is-real
- [ ] goal
- [ ] preferences
- [ ] beliefs-automatic
- [ ] beliefs-limiting

### Tabs
- [ ] home
- [ ] checkin
- [ ] psicoterapia
- [ ] library
- [ ] more
- [ ] program / journal (si visibles)

### Profundos
- [ ] assessment index + ≥1 módulo + results
- [ ] therapy module + lesson
- [ ] library detail
- [ ] report
- [ ] psych/pain-psychologist
- [ ] settings theme / accessibility / notifications
- [ ] not-found
