-- Run this once in Supabase Dashboard -> SQL Editor.
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  available_for_work boolean not null default true,
  business_profile jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select using (true);

insert into public.site_settings (id, available_for_work)
values (true, true)
on conflict (id) do nothing;
