import { Invitation } from "@/components/invitation/invitation";
import { getInvitationVariant } from "@/config/invitation-variants";
import { getSong } from "@/config/songs";

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ to?: string | string[]; invitation?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const rawGuestName = Array.isArray(query.to) ? query.to[0] : query.to;
  const guestName = rawGuestName?.trim().slice(0, 80) || "Fitra";
  const rawInvitation = Array.isArray(query.invitation) ? query.invitation[0] : query.invitation;
  const maxGuests = rawInvitation === "1" ? 1 : 2;

  return <Invitation variant={getInvitationVariant(slug)} guestName={guestName} maxGuests={maxGuests} song={getSong()} />;
}
