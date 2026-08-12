import type { InvitationVariant } from "@/config/invitation-variants";
import { WelcomeSection } from "./opening-section";
import { VerseSection } from "./verse-section";
import { CoupleSection } from "./couple-section";
import { EventSection } from "./event-section";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { GiftSection } from "./gift-section";
import { GallerySection } from "./gallery-section";
import { ClosingSection } from "./closing-section";

export function InvitationContent({ variant, guestName, maxGuests }: { variant: InvitationVariant; guestName: string; maxGuests: number }) {
  return (
    <div data-invitation-content>
      <WelcomeSection />
      <VerseSection />
      <CoupleSection />
      <EventSection variant={variant} />
      <GiftSection />
      <RsvpForm variant={variant} guestName={guestName} maxGuests={maxGuests} />
      <GallerySection />
      <ClosingSection />
    </div>
  );
}
