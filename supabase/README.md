# Neuropi — Supabase

Postgres schema, RLS, and catalog seed for the Neuropi (ecq-psyco-pain) health app.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Docker (for local `supabase start`)
- A Supabase project (local or cloud)

## Link a remote project

```bash
cd ecq-psyco-pain
npx supabase login
npx supabase link --project-ref <YOUR_PROJECT_REF>
```

`project_ref` is in the Supabase dashboard URL: `https://supabase.com/dashboard/project/<project_ref>`.

## Local development

```bash
npx supabase start
npx supabase db reset   # applies migrations + seed/demo.sql
```

Useful URLs after `start` are printed in the CLI (API, Studio, DB).

## Push migrations to remote

```bash
npx supabase db push
```

Or reset remote carefully (destructive):

```bash
npx supabase db reset --linked
```

## Environment variables

Copy into the mobile app / API `.env` (names may vary by workspace package):

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Project URL (`https://<ref>.supabase.co` or local `http://127.0.0.1:54321`) |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Anon (public) key — safe for client with RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **server only**, never ship in the app |
| `SUPABASE_DB_URL` | Optional direct Postgres URL for migrations/tools |

Local keys: `npx supabase status -o env`.

## Layout

```
supabase/
  config.toml
  migrations/
    20260718120000_init_lumbre.sql   # schema + RLS
    20260718120100_seed_content.sql  # therapy modules, lessons, audio catalog
  seed/
    demo.sql                         # comments only (auth.users required for demo users)
```

## Security notes

- RLS is enabled on all user-data tables; users CRUD only their own rows.
- Catalog tables (`therapy_modules`, `therapy_lessons`, `audio_assets`, `content_translations`) are read-only for `authenticated`.
- `audit_events`: users may insert and select own rows; no update/delete.
- Service role bypasses RLS — use only on trusted backends.
- Seed content is educational and non-diagnostic; it does not replace clinical care.
