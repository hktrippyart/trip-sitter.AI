-- Contact form submissions (public insert only; read via dashboard / service role)

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  title text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

create policy "Anyone can submit contact inquiries"
  on public.contact_inquiries for insert
  to anon, authenticated
  with check (true);
