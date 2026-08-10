-- Allow authenticated users (CMS admins) to read all RSVP data for the dashboard.
drop policy if exists "Allow authenticated read of all rsvps" on public.rsvps;
create policy "Allow authenticated read of all rsvps"
on public.rsvps
for select
to authenticated
using (true);
