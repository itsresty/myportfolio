-- Run this once in Supabase Dashboard -> SQL Editor.
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  year integer not null check (year between 1900 and 2100),
  image text not null,
  pdf text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.certifications enable row level security;
drop policy if exists "Public can read certifications" on public.certifications;
create policy "Public can read certifications" on public.certifications for select using (true);
