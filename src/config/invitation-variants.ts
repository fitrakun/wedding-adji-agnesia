export type GuestType = "family" | "friend";

export interface InvitationVariant {
  guestType: GuestType;
  eventTime: string;
  eventTimeWithZone: string;
  invitationPath: string;
  eventStartsAt: string;
  rsvpClosesAt: string;
}

export const INVITATION_VARIANTS: Record<GuestType, InvitationVariant> = {
  family: {
    guestType: "family",
    eventTime: "10:30 - 12:00",
    eventTimeWithZone: "10:30 - 12:00 WIB",
    invitationPath: "/family",
    eventStartsAt: "2026-08-22T10:30:00+07:00",
    rsvpClosesAt: "2026-08-20T00:00:00+07:00",
  },
  friend: {
    guestType: "friend",
    eventTime: "12:30 - 14:00",
    eventTimeWithZone: "12:30 - 14:00 WIB",
    invitationPath: "/sesi2",
    eventStartsAt: "2026-08-22T12:30:00+07:00",
    rsvpClosesAt: "2026-08-20T00:00:00+07:00",
  },
};

export function getInvitationVariant(slug?: string[]): InvitationVariant {
  const route = slug?.[0];
  return route === "sesi2" ? INVITATION_VARIANTS.friend : INVITATION_VARIANTS.family;
}
