-- trip-sitter.AI Phase 1 schema
-- Run in Supabase SQL editor, then create a public storage bucket: integration-media

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_key text not null,
  active boolean not null default true,
  stripe_checkout_session_id text,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  unique (user_id, product_key)
);

create table if not exists public.training_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed_modules text[] not null default '{}',
  peer_basics_completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.integration_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('text', 'image', 'video')),
  title text not null,
  reflection text not null,
  body text,
  media_url text,
  tags text[] not null default '{}',
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.integration_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.integration_posts (id) on delete cascade,
  reporter_id uuid references auth.users (id) on delete set null,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists integration_posts_published_at_idx
  on public.integration_posts (published_at desc);

alter table public.profiles enable row level security;
alter table public.training_progress enable row level security;

create policy "Users read own training progress"
  on public.training_progress for select
  using (auth.uid() = user_id);

create policy "Users upsert own training progress"
  on public.training_progress for insert
  with check (auth.uid() = user_id);

create policy "Users update own training progress"
  on public.training_progress for update
  using (auth.uid() = user_id);

alter table public.entitlements enable row level security;
alter table public.integration_posts enable row level security;
alter table public.integration_reports enable row level security;

create policy "Public profiles are readable"
  on public.profiles for select
  using (true);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users read own entitlements"
  on public.entitlements for select
  using (auth.uid() = user_id);

create policy "Published posts are readable"
  on public.integration_posts for select
  using (published = true or auth.uid() = user_id);

create policy "Users insert own posts"
  on public.integration_posts for insert
  with check (auth.uid() = user_id);

create policy "Users update own posts"
  on public.integration_posts for update
  using (auth.uid() = user_id);

create policy "Users delete own posts"
  on public.integration_posts for delete
  using (auth.uid() = user_id);

create policy "Anyone can flag a post"
  on public.integration_reports for insert
  with check (true);

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
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
