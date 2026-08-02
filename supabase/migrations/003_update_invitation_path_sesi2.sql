-- Update allowed invitation_path values: '/friend' is renamed to '/sesi2'.
-- Existing rows keep their stored value; the CHECK constraint only applies to new writes.

alter table public.rsvps drop constraint if exists rsvps_invitation_path_check;
alter table public.rsvps
  add constraint rsvps_invitation_path_check
  check (invitation_path in ('/family', '/sesi2'));

drop policy if exists "Allow anonymous RSVP insertion" on public.rsvps;
create policy "Allow anonymous RSVP insertion"
on public.rsvps
for insert
to anon
with check (
  char_length(trim(guest_name)) between 2 and 100
  and attendance_status in ('attending', 'not_attending')
  and guest_type in ('family', 'friend')
  and invitation_path in ('/family', '/sesi2')
);
