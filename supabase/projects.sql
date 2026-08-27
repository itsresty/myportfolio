-- Run this once in Supabase Dashboard -> SQL Editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  long_description text,
  image text,
  video text,
  category text not null,
  year text not null,
  technologies text[] not null default '{}',
  live_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects for select using (true);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read portfolio files" on storage.objects;
create policy "Public can read portfolio files"
  on storage.objects for select using (bucket_id = 'portfolio');
