# Supabase

## Qué usamos

- **Auth** — email/password, magic link (opcional)
- **Postgres** — perfil clínico, evaluaciones, diario, programa, biblioteca
- **Storage** — audios y PDFs de reportes
- **RLS** — cada usuario solo ve sus datos sensibles
- **Realtime** (opcional) — progreso de lecciones

## Configurar

1. Crear proyecto en [supabase.com](https://supabase.com).
2. Copiar URL + anon key + service role al `.env` del API y anon al mobile.
3. Aplicar migraciones:

```bash
cd ecq-psyco-pain
npx supabase link --project-ref <REF>
npx supabase db push
```

O en SQL Editor, ejecutar en orden:

1. `supabase/migrations/20260718120000_init_lumbre.sql`
2. `supabase/migrations/20260718120100_seed_content.sql`

## Tablas clave

`profiles`, `user_settings`, `consents`, `assessments`, `assessment_answers`, `assessment_scores`, `pain_logs`, `body_map_points`, `risk_protection_profiles`, `therapy_modules`, `therapy_lessons`, `lesson_progress`, `audio_assets`, `reports`, `audit_events`, …

Ver migración init para políticas RLS exactas.

## Consentimiento y auditoría

- Registrar consentimientos en `consents` antes de guardar datos de salud.
- Eventos sensibles → `audit_events` (insert/select propio; sin update/delete de cliente).

## Storage buckets sugeridos

| Bucket | Uso | Acceso |
|--------|-----|--------|
| `audio` | Lecciones / meditaciones | read autenticado |
| `reports` | PDF clínicos | solo dueño vía path `user_id/...` |

Crear buckets en el dashboard y políticas de storage alineadas a `auth.uid()`.
