-- Public read of ideas so /ideas works signed-out.
-- Writes stay members-only (insert/update/delete policies unchanged).
-- Run in Supabase Studio → SQL Editor. Not applied in production yet.

grant select on public.ideas to anon, authenticated;

drop policy if exists ideas_select_members on public.ideas;
drop policy if exists ideas_select_public on public.ideas;

create policy ideas_select_public
  on public.ideas for select
  to anon, authenticated
  using (true);
