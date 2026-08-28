-- Run this once in Supabase Dashboard -> SQL Editor.
create table if not exists public.about_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in (
    'Development', 'UI & Design', 'Video & Content', 'Digital Support',
    'Workflow & Productivity', 'Currently Learning'
  )),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, category)
);

alter table public.about_skills enable row level security;
drop policy if exists "Public can read about skills" on public.about_skills;
create policy "Public can read about skills" on public.about_skills for select using (true);

insert into public.about_skills (name, category, sort_order) values
  ('Next.js', 'Development', 10), ('React', 'Development', 20), ('TypeScript', 'Development', 30), ('JavaScript', 'Development', 40), ('HTML', 'Development', 50), ('CSS', 'Development', 60), ('Tailwind CSS', 'Development', 70), ('Node.js', 'Development', 80), ('REST APIs', 'Development', 90), ('Git', 'Development', 100), ('GitHub', 'Development', 110),
  ('UI Design', 'UI & Design', 10), ('UX Fundamentals', 'UI & Design', 20), ('Responsive Design', 'UI & Design', 30), ('Design Systems', 'UI & Design', 40), ('Typography', 'UI & Design', 50), ('Layout', 'UI & Design', 60), ('Visual Hierarchy', 'UI & Design', 70), ('Wireframing', 'UI & Design', 80), ('Landing Pages', 'UI & Design', 90), ('Portfolio Design', 'UI & Design', 100),
  ('Video Editing', 'Video & Content', 10), ('YouTube', 'Video & Content', 20), ('YouTube Shorts', 'Video & Content', 30), ('TikTok', 'Video & Content', 40), ('Instagram Reels', 'Video & Content', 50), ('Talking Head', 'Video & Content', 60), ('B-Roll', 'Video & Content', 70), ('Captions', 'Video & Content', 80), ('Subtitles', 'Video & Content', 90), ('Sound Design', 'Video & Content', 100), ('Transitions', 'Video & Content', 110), ('Basic Color Correction', 'Video & Content', 120),
  ('Virtual Assistance', 'Digital Support', 10), ('Web Research', 'Digital Support', 20), ('Data Entry', 'Digital Support', 30), ('Data Organization', 'Digital Support', 40), ('File Management', 'Digital Support', 50), ('Microsoft Excel', 'Digital Support', 55), ('Spreadsheet Management', 'Digital Support', 60), ('Content Uploading', 'Digital Support', 70), ('Website Management', 'Digital Support', 80), ('Email Assistance', 'Digital Support', 90), ('Administrative Support', 'Digital Support', 100),
  ('Project Organization', 'Workflow & Productivity', 10), ('Task Management', 'Workflow & Productivity', 20), ('File Organization', 'Workflow & Productivity', 30), ('Content Management', 'Workflow & Productivity', 40), ('Documentation', 'Workflow & Productivity', 50), ('Version Control', 'Workflow & Productivity', 60), ('Research', 'Workflow & Productivity', 70), ('Planning', 'Workflow & Productivity', 80), ('Digital Organization', 'Workflow & Productivity', 90),
  ('Advanced React', 'Currently Learning', 10), ('Next.js', 'Currently Learning', 20), ('TypeScript', 'Currently Learning', 30), ('Web Performance', 'Currently Learning', 40), ('Accessibility', 'Currently Learning', 50), ('SEO', 'Currently Learning', 60), ('UI/UX', 'Currently Learning', 70), ('Motion Design', 'Currently Learning', 80), ('Creative Development', 'Currently Learning', 90)
on conflict (name, category) do nothing;
