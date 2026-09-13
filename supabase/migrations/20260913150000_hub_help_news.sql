-- German content language, playtest shares, product feedback, and badges.
-- Run this whole file in Supabase Studio → SQL Editor after the earlier migrations.

alter type public.content_language add value if not exists 'de';

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_badges (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  awarded_at timestamptz not null default now(),
  primary key (profile_id, badge_id)
);

create table if not exists public.playtest_shares (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 3 and 160),
  what_to_try text not null check (char_length(what_to_try) between 10 and 4000),
  link text check (link is null or char_length(link) between 1 and 500),
  notes text check (notes is null or char_length(notes) <= 2000),
  is_anonymous boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.product_feedback (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  share_id uuid references public.playtest_shares (id) on delete set null,
  target text not null check (char_length(target) between 2 and 160),
  body text not null check (char_length(body) between 10 and 4000),
  is_anonymous boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists playtest_shares_created_at_idx on public.playtest_shares (created_at desc);
create index if not exists product_feedback_created_at_idx on public.product_feedback (created_at desc);
create index if not exists profile_badges_profile_id_idx on public.profile_badges (profile_id);

insert into public.badges (slug, name, description)
values
  ('first_feedback', 'First feedback', 'Posted the first piece of product feedback.'),
  ('first_playtest', 'First playtest', 'Shared a build for humans to try.'),
  ('helpful_reply', 'Helpful reply', 'Marked that you can help on an idea.'),
  ('studio_member', 'Studio member', 'Awarded by the club.')
on conflict (slug) do nothing;

grant select on public.badges to anon, authenticated;
grant select on public.profile_badges to anon, authenticated;
grant insert on public.profile_badges to authenticated;
grant select on public.playtest_shares to anon, authenticated;
grant insert, update, delete on public.playtest_shares to authenticated;
grant select on public.product_feedback to anon, authenticated;
grant insert, update, delete on public.product_feedback to authenticated;

alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;
alter table public.playtest_shares enable row level security;
alter table public.product_feedback enable row level security;

drop policy if exists badges_select_public on public.badges;
create policy badges_select_public
  on public.badges for select
  to anon, authenticated
  using (true);

drop policy if exists profile_badges_select_public on public.profile_badges;
create policy profile_badges_select_public
  on public.profile_badges for select
  to anon, authenticated
  using (true);

drop policy if exists profile_badges_insert_own on public.profile_badges;
create policy profile_badges_insert_own
  on public.profile_badges for insert
  to authenticated
  with check (
    profile_id = auth.uid()
    and private.is_school_member()
    and badge_id in (select id from public.badges where slug <> 'studio_member')
  );

drop policy if exists playtest_shares_select_public on public.playtest_shares;
create policy playtest_shares_select_public
  on public.playtest_shares for select
  to anon, authenticated
  using (true);

drop policy if exists playtest_shares_insert_own on public.playtest_shares;
create policy playtest_shares_insert_own
  on public.playtest_shares for insert
  to authenticated
  with check (author_id = auth.uid() and private.is_school_member());

drop policy if exists playtest_shares_update_own on public.playtest_shares;
create policy playtest_shares_update_own
  on public.playtest_shares for update
  to authenticated
  using (author_id = auth.uid() and private.is_school_member())
  with check (author_id = auth.uid() and private.is_school_member());

drop policy if exists playtest_shares_delete_own on public.playtest_shares;
create policy playtest_shares_delete_own
  on public.playtest_shares for delete
  to authenticated
  using (author_id = auth.uid() and private.is_school_member());

drop policy if exists product_feedback_select_public on public.product_feedback;
create policy product_feedback_select_public
  on public.product_feedback for select
  to anon, authenticated
  using (true);

drop policy if exists product_feedback_insert_own on public.product_feedback;
create policy product_feedback_insert_own
  on public.product_feedback for insert
  to authenticated
  with check (author_id = auth.uid() and private.is_school_member());

drop policy if exists product_feedback_update_own on public.product_feedback;
create policy product_feedback_update_own
  on public.product_feedback for update
  to authenticated
  using (author_id = auth.uid() and private.is_school_member())
  with check (author_id = auth.uid() and private.is_school_member());

drop policy if exists product_feedback_delete_own on public.product_feedback;
create policy product_feedback_delete_own
  on public.product_feedback for delete
  to authenticated
  using (author_id = auth.uid() and private.is_school_member());
