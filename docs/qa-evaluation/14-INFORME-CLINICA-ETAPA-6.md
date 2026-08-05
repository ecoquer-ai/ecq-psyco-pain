# Etapa 6 — Informe validación clínica / científica

**Fecha:** 2026-07-28  
**Alcance:** copy, instrumentos, crisis/safety, claims de validación  
**Veredicto:** **GO con residuales P2** (claims duros y crisis S0 corregidos en código)

---

## Resumen

Neuropi mantiene postura anti-diagnóstico fuerte. El riesgo principal era **operativo de crisis (S0)** y **claims de validación / lenguaje “indicada-necesaria” (S1)**. Se corrigieron en esta etapa: flujo PHQ-9 ítem 9 → CrisisModal + `crisis_pap` inmediato; resultados con modal y CTAs; gate de safety; reencuadre del tamizaje chileno como **inspirado (no validado Neuropi)**; suavizado de copy en i18n, scoring, perfiles, hitos y biblioteca.

---

## Tabla hallazgo → riesgo → fix

| ID | Hallazgo | Riesgo | Fix |
|----|----------|--------|-----|
| S0-1 | PHQ-9 ítem 9 > 0 no abría CrisisModal ni bloqueaba avance | Alto (seguridad) | `[moduleId].tsx`: modal + `crisisAck` antes de siguiente |
| S0-2 | `crisis_pap` se encolaba tarde (después de PSS/CBT) | Alto | `assessmentFlow.ts`: insertar justo después de `phq9` |
| S0-3 | Resultados solo texto rojo en crisis | Alto | `results.tsx`: auto-open CrisisModal + botón “Ver rutas” |
| S0-4 | Safety permitía “continuar” con flags sin ver ayuda | Alto | `safety.tsx`: requiere ack de rutas antes de “continuar de todos modos” |
| S1-1 | Tamizaje chileno presentado como psicométrico Chile-validado | Medio (claims) | `instrumentPolicy` + `instruments` (`isPsychometricScreen: false`) + `CLINICAL_DISCLAIMER` |
| S1-2 | Copy “útil y necesaria / indicada” en resultados y marketing in-app | Medio (overclaim) | i18n, `profiles`, `scoring`, `questions`, `milestones`, `catalog` |
| S1-3 | Labels de riesgo crudos (`depressive_symptoms`) | Bajo | Labels orientadores en `results.tsx` |
| OK | PHQ-9 / PSS-10 como únicos psicométricos Chile-documentados en disclaimer | — | Conservado en `brand.ts` |
| OK | Módulos CBT / IASP / pilares como psicoeducación | — | Disclaimers ya claros |

---

## Instrumentos (estado post-fix)

| Instrumento | Rol en Neuropi | Claim permitido |
|-------------|----------------|-----------------|
| PHQ-9 | Tamizaje ánimo | Uso/validación o adaptación documentada en Chile |
| PSS-10 | Tamizaje estrés | Idem |
| Tamizaje dolor chileno | Cribado **inspirado** en dominios de encuesta publicada | **No** “escala Neuropi validada” |
| NRS / VAS / body map | Intensidad / mapa | Orientación, no causa |
| IASP / CBT / creencias / pilares | Psicoeducación | No escalas formales Chile bajo estos nombres |
| GAD-7 / PCS / kinesiofobia | **Fuera** como psicométricos | Política `instrumentPolicy` |

---

## Crisis / safety — comportamiento esperado

1. Onboarding safety + flag → ver rutas (modal) → solo entonces “continuar de todos modos”.  
2. PHQ-9 ítem 9 > 0 → modal + ack → luego `crisis_pap` en cola inmediata.  
3. Resultados con `crisisSignal` o `redFlagTriggered` → modal al entrar + CTA permanente.

Números Chile en modal: SAMU **131**, Salud Responde **600 360 7777**.

---

## Residuales P2 (no bloquean Etapa 7/8)

- Revisar con clínico externo el wording exacto de PHQ-9 ítem 9 y umbrales de banda.  
- Sustituir video demo Big Buck Bunny en biblioteca por contenido Neuropi.  
- Checklist manual Expo Go del flujo crisis (ítem 9 → pap → results).  
- Alinear `node_modules/@neuropi/*` solo vía workspace build (ya: `shared:build` OK).

---

## Verificación técnica

- [x] `npm run shared:build`
- [x] `npm run typecheck --workspace=@neuropi/mobile`
- [ ] Smoke manual crisis (recomendado antes de store)

---

## Gate

**Etapa 6 cerrada.** Siguiente con «continuar»:

- **Etapa 7** — Marketing / ASO / prep landing Vercel  
- **Etapa 8** — Nest + Supabase **local** (si priorizas backend)

Dime **continuar** (o **saltar a 7** / **saltar a 8**).
