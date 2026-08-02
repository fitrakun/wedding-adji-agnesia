create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) between 2 and 100),
  attendance_status text not null check (attendance_status in ('attending', 'not_attending')),
  attendee_count integer check (attendee_count is null or attendee_count between 1 and 5),
  message text check (message is null or char_length(message) <= 1000),
  guest_type text not null check (guest_type in ('family', 'friend')),
  invitation_path text not null check (invitation_path in ('/family', '/friend')),
  event_time text not null check (event_time in ('10:30 - 12:00', '12:30 - 14:00')),
  created_at timestamptz not null default now(),
  constraint attendee_count_matches_status check (
    (attendance_status = 'attending' and attendee_count is not null)
    or (attendance_status = 'not_attending' and attendee_count is null)
  )
);

alter table public.rsvps enable row level security;

-- Public invitation visitors may submit one RSVP row. They cannot read, update, or delete RSVP data.
drop policy if exists "Allow anonymous RSVP insertion" on public.rsvps;
create policy "Allow anonymous RSVP insertion"
on public.rsvps
for insert
to anon
with check (
  char_length(trim(guest_name)) between 2 and 100
  and attendance_status in ('attending', 'not_attending')
  and guest_type in ('family', 'friend')
  and invitation_path in ('/family', '/friend')
);

-- No SELECT, UPDATE, or DELETE policy is created for anon, so RLS denies those operations.
comment on table public.rsvps is 'Minimal RSVP submissions for the Agnesia and Adji wedding invitation.';
