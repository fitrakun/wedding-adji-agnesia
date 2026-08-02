import { Invitation } from "@/components/invitation/invitation";
import { getInvitationVariant } from "@/config/invitation-variants";

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ to?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const rawGuestName = Array.isArray(query.to) ? query.to[0] : query.to;
  const guestName = rawGuestName?.trim().slice(0, 80) || "Fitra";

  return <Invitation variant={getInvitationVariant(slug)} guestName={guestName} />;
}
