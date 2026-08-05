# Notificaciones

## Stack

- Cliente: `expo-notifications`
- Envío: Expo Push API y/o FCM/APNs vía backend en Railway
- Preferencias en `notification_preferences` (Supabase) + store local

## Tipos (compasivos, dosificables)

| Clave | Uso |
|-------|-----|
| `checkin` | Recordatorio de diario breve |
| `practice` | Práctica de respiración / grounding |
| `milestone` | Continuidad del programa |
| `weekly_summary` | Resumen semanal amable |
| `flareup` | Apoyo en flare-up (solo si el usuario lo activó) |

Todo debe poder silenciarse fácilmente. Sin spam.

## Flujo técnico

1. Mobile pide permisos.
2. Registra token: `POST /notifications/register-token`.
3. Backend guarda en `push_tokens`.
4. Jobs/cron (futuro) leen preferencias + quiet hours y envían.

## Copy

- Tono: regulación, no alarma.
- Evitar “no has cumplido tu meta”.
- Preferir “cuando quieras, un check-in de un minuto puede ayudar a ver patrones”.

## Prueba local

```bash
curl -X POST http://localhost:3333/notifications/test \
  -H "Authorization: Bearer demo" \
  -H "Content-Type: application/json" \
  -d '{"title":"Neuropi","body":"Prueba de acompañamiento suave"}'
```
