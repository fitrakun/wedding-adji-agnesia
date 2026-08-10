import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { INVITATION_VARIANTS } from "@/config/invitation-variants";
import { rsvpSchema } from "@/lib/validation/rsvp";

const requestSchema = rsvpSchema.extend({
  guestType: z.enum(["family", "friend"]),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid RSVP data." }, { status: 400 });
  }

  const variant = INVITATION_VARIANTS[parsed.data.guestType];
  if (Date.now() >= new Date(variant.rsvpClosesAt).getTime()) {
    return Response.json({ error: "RSVP submissions are closed." }, { status: 410 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return Response.json({ error: "RSVP service is unavailable." }, { status: 503 });
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error } = await supabase.from("rsvps").insert({
    guest_name: parsed.data.guestName,
    attendance_status: parsed.data.attendanceStatus,
    attendee_count: parsed.data.attendeeCount,
    message: parsed.data.message || null,
    guest_type: variant.guestType,
    invitation_path: variant.invitationPath,
    event_time: variant.eventTime,
  });

  if (error) {
    console.error("RSVP insertion failed", error.code);
    return Response.json({ error: "RSVP could not be submitted." }, { status: 503 });
  }

  return Response.json({ success: true }, { status: 201 });
}
