export type AttendanceStatus = "attending" | "not_attending";
export type GuestType = "family" | "friend";
export type InvitationPath = "/family" | "/sesi2";

export interface Rsvp {
  id: string;
  guest_name: string;
  attendance_status: AttendanceStatus;
  attendee_count: number | null;
  message: string | null;
  guest_type: GuestType;
  invitation_path: InvitationPath;
  event_time: string;
  created_at: string;
}
