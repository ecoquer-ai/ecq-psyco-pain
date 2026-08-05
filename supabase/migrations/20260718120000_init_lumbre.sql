-- Lumbre init schema
-- Health-sensitive personal data; RLS on all user-data tables.
-- Service role bypasses RLS by default.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  country text not null default 'CL',
  timezone text default 'America/Santiago',
  locale text not null default 'es-CL',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- user_settings
-- ---------------------------------------------------------------------------

create table public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  theme text not null default 'system'
    check (theme in ('system', 'light', 'dark')),
  neuroinclusive_mode boolean not null default false,
  font_scale numeric not null default 1.0
    check (font_scale >= 0.8 and font_scale <= 1.6),
  reduce_motion boolean not null default false,
  notifications_enabled boolean not null default true,
  language text not null default 'es',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger user_settings_set_updated_at
  before update on public.user_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- consents
-- ---------------------------------------------------------------------------

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  consent_type text not null,
  version text not null,
  accepted_at timestamptz not null default timezone('utc', now()),
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index consents_user_id_idx on public.consents (user_id);
create index consents_user_type_idx on public.consents (user_id, consent_type);

-- ---------------------------------------------------------------------------
-- onboarding_progress
-- ---------------------------------------------------------------------------

create table public.onboarding_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  step text not null default 'welcome',
  completed_steps jsonb not null default '[]'::jsonb,
  primary_goal text,
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger onboarding_progress_set_updated_at
  before update on public.onboarding_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- assessments
-- ---------------------------------------------------------------------------

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'draft'
    check (status in ('draft', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  module_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index assessments_user_id_idx on public.assessments (user_id);
create index assessments_user_status_idx on public.assessments (user_id, status);

create trigger assessments_set_updated_at
  before update on public.assessments
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- assessment_answers
-- ---------------------------------------------------------------------------

create table public.assessment_answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  instrument_id text not null,
  question_id text not null,
  value jsonb not null,
  answered_at timestamptz not null default timezone('utc', now()),
  unique (assessment_id, instrument_id, question_id)
);

create index assessment_answers_assessment_id_idx
  on public.assessment_answers (assessment_id);

-- ---------------------------------------------------------------------------
-- assessment_scores
-- ---------------------------------------------------------------------------

create table public.assessment_scores (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  instrument_id text not null,
  raw_score numeric,
  band text,
  interpretation jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (assessment_id, instrument_id)
);

create index assessment_scores_assessment_id_idx
  on public.assessment_scores (assessment_id);

-- ---------------------------------------------------------------------------
-- pain_logs
-- ---------------------------------------------------------------------------

create table public.pain_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  logged_at timestamptz not null default timezone('utc', now()),
  intensity_nrs int check (intensity_nrs is null or (intensity_nrs >= 0 and intensity_nrs <= 10)),
  intensity_vas numeric check (intensity_vas is null or (intensity_vas >= 0 and intensity_vas <= 100)),
  interference int check (interference is null or (interference >= 0 and interference <= 10)),
  sleep_quality int check (sleep_quality is null or (sleep_quality >= 0 and sleep_quality <= 10)),
  energy int check (energy is null or (energy >= 0 and energy <= 10)),
  mood int check (mood is null or (mood >= 0 and mood <= 10)),
  stress int check (stress is null or (stress >= 0 and stress <= 10)),
  activity_level int check (activity_level is null or (activity_level >= 0 and activity_level <= 10)),
  is_flareup boolean not null default false,
  medications jsonb not null default '[]'::jsonb,
  triggers jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index pain_logs_user_id_idx on public.pain_logs (user_id);
create index pain_logs_logged_at_idx on public.pain_logs (logged_at desc);
create index pain_logs_user_logged_at_idx on public.pain_logs (user_id, logged_at desc);

create trigger pain_logs_set_updated_at
  before update on public.pain_logs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- body_map_points
-- ---------------------------------------------------------------------------

create table public.body_map_points (
  id uuid primary key default gen_random_uuid(),
  pain_log_id uuid references public.pain_logs (id) on delete cascade,
  assessment_id uuid references public.assessments (id) on delete cascade,
  region text not null,
  x numeric not null,
  y numeric not null,
  intensity int check (intensity is null or (intensity >= 0 and intensity <= 10)),
  created_at timestamptz not null default timezone('utc', now()),
  check (pain_log_id is not null or assessment_id is not null)
);

create index body_map_points_pain_log_id_idx on public.body_map_points (pain_log_id);
create index body_map_points_assessment_id_idx on public.body_map_points (assessment_id);

-- ---------------------------------------------------------------------------
-- medications
-- ---------------------------------------------------------------------------

create table public.medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  dose text,
  frequency text,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index medications_user_id_idx on public.medications (user_id);

create trigger medications_set_updated_at
  before update on public.medications
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- diagnoses
-- ---------------------------------------------------------------------------

create table public.diagnoses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  diagnosed_at date,
  is_formal boolean not null default false,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index diagnoses_user_id_idx on public.diagnoses (user_id);

create trigger diagnoses_set_updated_at
  before update on public.diagnoses
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- clinicians
-- ---------------------------------------------------------------------------

create table public.clinicians (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  specialty text,
  is_specialist boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index clinicians_user_id_idx on public.clinicians (user_id);

create trigger clinicians_set_updated_at
  before update on public.clinicians
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- treatments
-- ---------------------------------------------------------------------------

create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  label text not null,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index treatments_user_id_idx on public.treatments (user_id);

create trigger treatments_set_updated_at
  before update on public.treatments
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- risk_protection_profiles
-- ---------------------------------------------------------------------------

create table public.risk_protection_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  assessment_id uuid references public.assessments (id) on delete set null,
  profiles jsonb not null default '{}'::jsonb,
  risk_factors jsonb not null default '[]'::jsonb,
  protective_factors jsonb not null default '[]'::jsonb,
  generated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index risk_protection_profiles_user_id_idx
  on public.risk_protection_profiles (user_id);
create index risk_protection_profiles_assessment_id_idx
  on public.risk_protection_profiles (assessment_id);

-- ---------------------------------------------------------------------------
-- care_recommendations
-- ---------------------------------------------------------------------------

create table public.care_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  assessment_id uuid references public.assessments (id) on delete set null,
  recommendations jsonb not null default '[]'::jsonb,
  questions_for_clinician jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index care_recommendations_user_id_idx on public.care_recommendations (user_id);
create index care_recommendations_assessment_id_idx
  on public.care_recommendations (assessment_id);

create trigger care_recommendations_set_updated_at
  before update on public.care_recommendations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- therapy_modules (catalog — public read for authenticated)
-- ---------------------------------------------------------------------------

create table public.therapy_modules (
  id text primary key,
  title_es text not null,
  title_en text not null,
  order_index int not null,
  description_es text,
  created_at timestamptz not null default timezone('utc', now())
);

create index therapy_modules_order_idx on public.therapy_modules (order_index);

-- ---------------------------------------------------------------------------
-- therapy_lessons
-- ---------------------------------------------------------------------------

create table public.therapy_lessons (
  id text primary key,
  module_id text not null references public.therapy_modules (id) on delete cascade,
  title_es text not null,
  type text not null default 'reading'
    check (type in ('reading', 'practice', 'audio', 'reflection')),
  duration_min int,
  content_es text,
  audio_url text,
  order_index int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index therapy_lessons_module_id_idx on public.therapy_lessons (module_id);
create index therapy_lessons_module_order_idx
  on public.therapy_lessons (module_id, order_index);

-- ---------------------------------------------------------------------------
-- lesson_progress
-- ---------------------------------------------------------------------------

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null references public.therapy_lessons (id) on delete cascade,
  completed_at timestamptz,
  reflection text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, lesson_id)
);

create index lesson_progress_user_id_idx on public.lesson_progress (user_id);
create index lesson_progress_lesson_id_idx on public.lesson_progress (lesson_id);

create trigger lesson_progress_set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- audio_assets (catalog)
-- ---------------------------------------------------------------------------

create table public.audio_assets (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title_es text not null,
  title_en text not null,
  description_es text,
  duration_sec int,
  storage_path text,
  transcript_es text,
  created_at timestamptz not null default timezone('utc', now())
);

create index audio_assets_category_idx on public.audio_assets (category);

-- ---------------------------------------------------------------------------
-- bookmarks / favorites
-- ---------------------------------------------------------------------------

create table public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  asset_id uuid not null references public.audio_assets (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, asset_id)
);

create index bookmarks_user_id_idx on public.bookmarks (user_id);
create index bookmarks_asset_id_idx on public.bookmarks (asset_id);

create table public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  asset_id uuid not null references public.audio_assets (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, asset_id)
);

create index favorites_user_id_idx on public.favorites (user_id);
create index favorites_asset_id_idx on public.favorites (asset_id);

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  template_key text not null,
  title text not null,
  body text not null,
  scheduled_for timestamptz,
  sent_at timestamptz,
  read_at timestamptz,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index notifications_user_id_idx on public.notifications (user_id);
create index notifications_user_scheduled_idx
  on public.notifications (user_id, scheduled_for);

-- ---------------------------------------------------------------------------
-- notification_preferences
-- ---------------------------------------------------------------------------

create table public.notification_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  checkin boolean not null default true,
  practice boolean not null default true,
  milestone boolean not null default true,
  weekly_summary boolean not null default true,
  flareup boolean not null default true,
  quiet_hours jsonb not null default '{"start":"22:00","end":"08:00"}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger notification_preferences_set_updated_at
  before update on public.notification_preferences
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- push_tokens
-- ---------------------------------------------------------------------------

create table public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  token text not null,
  platform text not null check (platform in ('ios', 'android', 'web')),
  updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, token)
);

create index push_tokens_user_id_idx on public.push_tokens (user_id);

create trigger push_tokens_set_updated_at
  before update on public.push_tokens
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- reports
-- ---------------------------------------------------------------------------

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  assessment_id uuid references public.assessments (id) on delete set null,
  storage_path text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index reports_user_id_idx on public.reports (user_id);
create index reports_assessment_id_idx on public.reports (assessment_id);

-- ---------------------------------------------------------------------------
-- audit_events
-- ---------------------------------------------------------------------------

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index audit_events_user_id_idx on public.audit_events (user_id);
create index audit_events_created_at_idx on public.audit_events (created_at desc);
create index audit_events_event_type_idx on public.audit_events (event_type);

-- ---------------------------------------------------------------------------
-- content_translations (catalog)
-- ---------------------------------------------------------------------------

create table public.content_translations (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  locale text not null,
  field text not null,
  value text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (entity_type, entity_id, locale, field)
);

create index content_translations_entity_idx
  on public.content_translations (entity_type, entity_id);
create index content_translations_locale_idx
  on public.content_translations (locale);

-- ---------------------------------------------------------------------------
-- Auth trigger: profile + settings on signup
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.notification_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.consents enable row level security;
alter table public.onboarding_progress enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_answers enable row level security;
alter table public.assessment_scores enable row level security;
alter table public.pain_logs enable row level security;
alter table public.body_map_points enable row level security;
alter table public.medications enable row level security;
alter table public.diagnoses enable row level security;
alter table public.clinicians enable row level security;
alter table public.treatments enable row level security;
alter table public.risk_protection_profiles enable row level security;
alter table public.care_recommendations enable row level security;
alter table public.therapy_modules enable row level security;
alter table public.therapy_lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.audio_assets enable row level security;
alter table public.bookmarks enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.push_tokens enable row level security;
alter table public.reports enable row level security;
alter table public.audit_events enable row level security;
alter table public.content_translations enable row level security;

-- profiles: id = auth.uid()
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles
  for delete to authenticated using (auth.uid() = id);

-- user_settings
create policy "user_settings_select_own" on public.user_settings
  for select to authenticated using (auth.uid() = user_id);
create policy "user_settings_insert_own" on public.user_settings
  for insert to authenticated with check (auth.uid() = user_id);
create policy "user_settings_update_own" on public.user_settings
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_settings_delete_own" on public.user_settings
  for delete to authenticated using (auth.uid() = user_id);

-- consents
create policy "consents_select_own" on public.consents
  for select to authenticated using (auth.uid() = user_id);
create policy "consents_insert_own" on public.consents
  for insert to authenticated with check (auth.uid() = user_id);
create policy "consents_update_own" on public.consents
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "consents_delete_own" on public.consents
  for delete to authenticated using (auth.uid() = user_id);

-- onboarding_progress
create policy "onboarding_progress_select_own" on public.onboarding_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "onboarding_progress_insert_own" on public.onboarding_progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy "onboarding_progress_update_own" on public.onboarding_progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "onboarding_progress_delete_own" on public.onboarding_progress
  for delete to authenticated using (auth.uid() = user_id);

-- assessments
create policy "assessments_select_own" on public.assessments
  for select to authenticated using (auth.uid() = user_id);
create policy "assessments_insert_own" on public.assessments
  for insert to authenticated with check (auth.uid() = user_id);
create policy "assessments_update_own" on public.assessments
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "assessments_delete_own" on public.assessments
  for delete to authenticated using (auth.uid() = user_id);

-- assessment_answers (via parent assessment ownership)
create policy "assessment_answers_select_own" on public.assessment_answers
  for select to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_answers_insert_own" on public.assessment_answers
  for insert to authenticated with check (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_answers_update_own" on public.assessment_answers
  for update to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_answers_delete_own" on public.assessment_answers
  for delete to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );

-- assessment_scores
create policy "assessment_scores_select_own" on public.assessment_scores
  for select to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_scores_insert_own" on public.assessment_scores
  for insert to authenticated with check (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_scores_update_own" on public.assessment_scores
  for update to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );
create policy "assessment_scores_delete_own" on public.assessment_scores
  for delete to authenticated using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and a.user_id = auth.uid()
    )
  );

-- pain_logs
create policy "pain_logs_select_own" on public.pain_logs
  for select to authenticated using (auth.uid() = user_id);
create policy "pain_logs_insert_own" on public.pain_logs
  for insert to authenticated with check (auth.uid() = user_id);
create policy "pain_logs_update_own" on public.pain_logs
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "pain_logs_delete_own" on public.pain_logs
  for delete to authenticated using (auth.uid() = user_id);

-- body_map_points (via pain_log or assessment ownership)
create policy "body_map_points_select_own" on public.body_map_points
  for select to authenticated using (
    (pain_log_id is not null and exists (
      select 1 from public.pain_logs p where p.id = pain_log_id and p.user_id = auth.uid()
    ))
    or
    (assessment_id is not null and exists (
      select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()
    ))
  );
create policy "body_map_points_insert_own" on public.body_map_points
  for insert to authenticated with check (
    (pain_log_id is not null and exists (
      select 1 from public.pain_logs p where p.id = pain_log_id and p.user_id = auth.uid()
    ))
    or
    (assessment_id is not null and exists (
      select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()
    ))
  );
create policy "body_map_points_update_own" on public.body_map_points
  for update to authenticated using (
    (pain_log_id is not null and exists (
      select 1 from public.pain_logs p where p.id = pain_log_id and p.user_id = auth.uid()
    ))
    or
    (assessment_id is not null and exists (
      select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()
    ))
  ) with check (
    (pain_log_id is not null and exists (
      select 1 from public.pain_logs p where p.id = pain_log_id and p.user_id = auth.uid()
    ))
    or
    (assessment_id is not null and exists (
      select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()
    ))
  );
create policy "body_map_points_delete_own" on public.body_map_points
  for delete to authenticated using (
    (pain_log_id is not null and exists (
      select 1 from public.pain_logs p where p.id = pain_log_id and p.user_id = auth.uid()
    ))
    or
    (assessment_id is not null and exists (
      select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()
    ))
  );

-- medications
create policy "medications_select_own" on public.medications
  for select to authenticated using (auth.uid() = user_id);
create policy "medications_insert_own" on public.medications
  for insert to authenticated with check (auth.uid() = user_id);
create policy "medications_update_own" on public.medications
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "medications_delete_own" on public.medications
  for delete to authenticated using (auth.uid() = user_id);

-- diagnoses
create policy "diagnoses_select_own" on public.diagnoses
  for select to authenticated using (auth.uid() = user_id);
create policy "diagnoses_insert_own" on public.diagnoses
  for insert to authenticated with check (auth.uid() = user_id);
create policy "diagnoses_update_own" on public.diagnoses
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "diagnoses_delete_own" on public.diagnoses
  for delete to authenticated using (auth.uid() = user_id);

-- clinicians
create policy "clinicians_select_own" on public.clinicians
  for select to authenticated using (auth.uid() = user_id);
create policy "clinicians_insert_own" on public.clinicians
  for insert to authenticated with check (auth.uid() = user_id);
create policy "clinicians_update_own" on public.clinicians
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "clinicians_delete_own" on public.clinicians
  for delete to authenticated using (auth.uid() = user_id);

-- treatments
create policy "treatments_select_own" on public.treatments
  for select to authenticated using (auth.uid() = user_id);
create policy "treatments_insert_own" on public.treatments
  for insert to authenticated with check (auth.uid() = user_id);
create policy "treatments_update_own" on public.treatments
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "treatments_delete_own" on public.treatments
  for delete to authenticated using (auth.uid() = user_id);

-- risk_protection_profiles
create policy "risk_protection_profiles_select_own" on public.risk_protection_profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "risk_protection_profiles_insert_own" on public.risk_protection_profiles
  for insert to authenticated with check (auth.uid() = user_id);
create policy "risk_protection_profiles_update_own" on public.risk_protection_profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "risk_protection_profiles_delete_own" on public.risk_protection_profiles
  for delete to authenticated using (auth.uid() = user_id);

-- care_recommendations
create policy "care_recommendations_select_own" on public.care_recommendations
  for select to authenticated using (auth.uid() = user_id);
create policy "care_recommendations_insert_own" on public.care_recommendations
  for insert to authenticated with check (auth.uid() = user_id);
create policy "care_recommendations_update_own" on public.care_recommendations
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "care_recommendations_delete_own" on public.care_recommendations
  for delete to authenticated using (auth.uid() = user_id);

-- Catalog: authenticated read-only
create policy "therapy_modules_select_authenticated" on public.therapy_modules
  for select to authenticated using (true);

create policy "therapy_lessons_select_authenticated" on public.therapy_lessons
  for select to authenticated using (true);

create policy "audio_assets_select_authenticated" on public.audio_assets
  for select to authenticated using (true);

create policy "content_translations_select_authenticated" on public.content_translations
  for select to authenticated using (true);

-- lesson_progress
create policy "lesson_progress_select_own" on public.lesson_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "lesson_progress_insert_own" on public.lesson_progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy "lesson_progress_update_own" on public.lesson_progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "lesson_progress_delete_own" on public.lesson_progress
  for delete to authenticated using (auth.uid() = user_id);

-- bookmarks
create policy "bookmarks_select_own" on public.bookmarks
  for select to authenticated using (auth.uid() = user_id);
create policy "bookmarks_insert_own" on public.bookmarks
  for insert to authenticated with check (auth.uid() = user_id);
create policy "bookmarks_update_own" on public.bookmarks
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bookmarks_delete_own" on public.bookmarks
  for delete to authenticated using (auth.uid() = user_id);

-- favorites
create policy "favorites_select_own" on public.favorites
  for select to authenticated using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites
  for insert to authenticated with check (auth.uid() = user_id);
create policy "favorites_update_own" on public.favorites
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites
  for delete to authenticated using (auth.uid() = user_id);

-- notifications
create policy "notifications_select_own" on public.notifications
  for select to authenticated using (auth.uid() = user_id);
create policy "notifications_insert_own" on public.notifications
  for insert to authenticated with check (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications_delete_own" on public.notifications
  for delete to authenticated using (auth.uid() = user_id);

-- notification_preferences
create policy "notification_preferences_select_own" on public.notification_preferences
  for select to authenticated using (auth.uid() = user_id);
create policy "notification_preferences_insert_own" on public.notification_preferences
  for insert to authenticated with check (auth.uid() = user_id);
create policy "notification_preferences_update_own" on public.notification_preferences
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notification_preferences_delete_own" on public.notification_preferences
  for delete to authenticated using (auth.uid() = user_id);

-- push_tokens
create policy "push_tokens_select_own" on public.push_tokens
  for select to authenticated using (auth.uid() = user_id);
create policy "push_tokens_insert_own" on public.push_tokens
  for insert to authenticated with check (auth.uid() = user_id);
create policy "push_tokens_update_own" on public.push_tokens
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "push_tokens_delete_own" on public.push_tokens
  for delete to authenticated using (auth.uid() = user_id);

-- reports
create policy "reports_select_own" on public.reports
  for select to authenticated using (auth.uid() = user_id);
create policy "reports_insert_own" on public.reports
  for insert to authenticated with check (auth.uid() = user_id);
create policy "reports_update_own" on public.reports
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reports_delete_own" on public.reports
  for delete to authenticated using (auth.uid() = user_id);

-- audit_events: insert own, select own (no update/delete for users)
create policy "audit_events_select_own" on public.audit_events
  for select to authenticated using (auth.uid() = user_id);
create policy "audit_events_insert_own" on public.audit_events
  for insert to authenticated with check (auth.uid() = user_id);

-- Grants: authenticated can use tables; service_role has full access by default
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
-- Catalog writes remain blocked by RLS (no insert policies for catalog tables)
revoke insert, update, delete on public.therapy_modules from authenticated;
revoke insert, update, delete on public.therapy_lessons from authenticated;
revoke insert, update, delete on public.audio_assets from authenticated;
revoke insert, update, delete on public.content_translations from authenticated;
grant select on public.therapy_modules to authenticated;
grant select on public.therapy_lessons to authenticated;
grant select on public.audio_assets to authenticated;
grant select on public.content_translations to authenticated;
-- audit: no update/delete for authenticated
revoke update, delete on public.audit_events from authenticated;
