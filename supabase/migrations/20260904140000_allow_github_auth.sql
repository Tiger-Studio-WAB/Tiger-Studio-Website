-- Allow GitHub OAuth for Join. Azure is no longer required.
-- Run this in Supabase Studio → SQL Editor (the whole file).

alter table public.profiles
  drop constraint if exists profiles_school_email_chk;

create or replace function public.hook_restrict_signup_to_school(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  provider text;
begin
  provider := coalesce(event -> 'user' -> 'app_metadata' ->> 'provider', '');

  if provider not in ('github', 'azure') then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'This site only accepts GitHub sign-in.'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(new.email, ''),
      nullif(new.raw_user_meta_data ->> 'email', ''),
      coalesce(new.raw_user_meta_data ->> 'user_name', new.id::text) || '@users.noreply.github.com'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'user_name',
      split_part(coalesce(new.email, 'member'), '@', 1)
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  );
  return new;
end;
$$;

create or replace function private.is_school_member()
returns boolean
language sql
stable
as $$
  select
    auth.uid() is not null
    and coalesce(auth.jwt() -> 'app_metadata' ->> 'provider', '') in ('github', 'azure');
$$;
