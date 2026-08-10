import { EventSectionAltB } from "@/components/invitation/event-section-alt-b";
import { getInvitationVariant } from "@/config/invitation-variants";

export default function SaveDateBPage() {
  return (
    <main className="invitation-shell">
      <EventSectionAltB variant={getInvitationVariant()} />
    </main>
  );
}
