-- Allow public visitors to read guest well-wishes (name + message) shown on the invitation.
-- The guest-messages section only selects id, guest_name, message, created_at
-- for rows where message is not null.
drop policy if exists "Allow anonymous read of guest messages" on public.rsvps;
create policy "Allow anonymous read of guest messages"
on public.rsvps
for select
to anon
using (message is not null);
