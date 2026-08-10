import { EventSectionAltA } from "@/components/invitation/event-section-alt-a";
import { getInvitationVariant } from "@/config/invitation-variants";

export default function SaveDateAPage() {
  return (
    <main className="invitation-shell">
      <EventSectionAltA variant={getInvitationVariant()} />
    </main>
  );
}
