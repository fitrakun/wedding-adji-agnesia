# Supabase Setup

1. Create a project at https://supabase.com/dashboard and wait for provisioning.
2. Open **Project Settings → API** (or the current **Connect** panel). Copy the Project URL and anonymous/publishable key.
3. Copy `.env.example` to `.env.local` and set:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```
4. Open **SQL Editor**, paste `supabase/migrations/001_create_rsvps.sql`, and run it once.
5. Verify security in **Database → Tables → rsvps**: RLS must be enabled. Under policies, only anonymous INSERT should exist. There must be no anonymous SELECT, UPDATE, or DELETE policy.
6. Run `pnpm dev`, open `/family`, submit a test RSVP, and verify the success state.
7. Inspect submissions safely in the authenticated Supabase dashboard Table Editor. Dashboard access uses your signed-in administrator session and does not grant public read access.
8. Never expose the service-role/secret key, never prefix it with `NEXT_PUBLIC_`, and never place real credentials in source control or screenshots.
9. Local development requires Node 20+ and pnpm. Run `pnpm install`, create `.env.local`, then `pnpm dev`.
10. Playwright does not write to real Supabase: tests intercept `**/rest/v1/rsvps*` and provide deterministic responses.

The browser uses only the publishable key (which has the same low-privilege public role as the legacy `anon` key) and a narrowly scoped RLS INSERT policy. RSVP data is limited to name, attendance, count, wishes, route type/time, and timestamp; no tracking identifiers are collected.
