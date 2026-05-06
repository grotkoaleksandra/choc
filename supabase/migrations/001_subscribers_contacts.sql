-- Schema for newsletter subscribers and contact form messages.
-- Run this once in your Supabase SQL editor (Database → SQL Editor → New query).

-- ────────────────────────────────────────────────────────────────────
-- subscribers: people who joined the newsletter
-- ────────────────────────────────────────────────────────────────────
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  first_name  text,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────
-- contacts: messages from the colophon contact form
-- ────────────────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────
-- Row-Level Security: anyone (anonymous) can INSERT, but no one
-- (anonymous) can SELECT/UPDATE/DELETE. Reads happen from the
-- Supabase dashboard (you, as authenticated owner) only.
-- ────────────────────────────────────────────────────────────────────
alter table public.subscribers enable row level security;
alter table public.contacts    enable row level security;

drop policy if exists "anon can subscribe"      on public.subscribers;
drop policy if exists "anon can submit contact" on public.contacts;

create policy "anon can subscribe"
  on public.subscribers for insert
  to anon
  with check (true);

create policy "anon can submit contact"
  on public.contacts for insert
  to anon
  with check (true);
