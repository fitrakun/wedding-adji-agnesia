import { Invitation } from "@/components/invitation/invitation";
import { getInvitationVariant } from "@/config/invitation-variants";
import { DEFAULT_SONG, getSong, type SongId } from "@/config/songs";

const SONG_PREFIX = "song2";

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ to?: string | string[]; invitation?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const [firstSegment, ...rest] = slug ?? [];
  const songId: SongId = firstSegment === SONG_PREFIX ? "stephen-sanchez-love-love-love" : DEFAULT_SONG;
  const variantSlug = firstSegment === SONG_PREFIX ? rest : slug;
  const rawGuestName = Array.isArray(query.to) ? query.to[0] : query.to;
  const guestName = rawGuestName?.trim().slice(0, 80) || "Fitra";
  const rawInvitation = Array.isArray(query.invitation) ? query.invitation[0] : query.invitation;
  const maxGuests = rawInvitation === "1" ? 1 : 2;

  return <Invitation variant={getInvitationVariant(variantSlug)} guestName={guestName} maxGuests={maxGuests} song={getSong(songId)} />;
}
