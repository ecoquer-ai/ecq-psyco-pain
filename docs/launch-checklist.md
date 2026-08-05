# Checklist de lanzamiento

## Clínico y legal

- [ ] Disclaimer visible en onboarding, resultados y reportes PDF
- [ ] Pantalla de seguridad / banderas rojas con números de urgencia Chile
- [ ] Copy revisado: cero promesas de cura; cero “usted tiene X”
- [ ] Instrumentos etiquetados como tamizaje orientador
- [ ] ITQ solo condicionado, nunca onboarding obligatorio
- [ ] Consentimiento de datos de salud versionado
- [ ] Revisión por profesional clínico (psicología del dolor / médico)

## Producto

- [ ] Onboarding ≤ pasos cortos, un objetivo por pantalla
- [ ] Check-in de dolor &lt; 60 segundos
- [ ] Resultados con “qué significa / qué no significa”
- [ ] 8 milestones con al menos 1 lección usable cada uno
- [ ] Biblioteca con categorías y modo lectura
- [ ] PDF exportable legible para consulta
- [ ] Temas + modo neuroinclusivo verificados
- [ ] i18n es-CL + en estructura lista

## Seguridad

- [ ] RLS verificado en tablas sensibles
- [ ] Service role solo en API
- [ ] HTTPS en API y Supabase
- [ ] Analytics no invasivos (o desactivados)
- [ ] Auditoría de eventos sensibles

## Técnico

- [ ] Builds EAS iOS + Android
- [ ] EAS Update channel production
- [ ] Push credentials FCM/APNs
- [ ] Healthcheck Railway
- [ ] Migraciones aplicadas en prod
- [ ] Seeds de contenido en prod
- [ ] Smoke test: auth → onboarding → assessment → results → check-in → lesson

## Marketing

- [ ] Posicionamiento: claridad y ruta de ayuda, no “diagnóstico”
- [ ] Marca Neuropi en stores (no ecq-psyco-pain)
- [ ] Screenshots con tono cálido y disclaimer
