"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/config/invitation-variants";
import { OpeningSection, WelcomeSection } from "./opening-section";
import { VerseSection } from "./verse-section";
import { CoupleSection } from "./couple-section";
import { EventSection } from "./event-section";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { GiftSection } from "./gift-section";
import { GallerySection } from "./gallery-section";
import { ClosingSection } from "./closing-section";

export function Invitation({ variant, guestName }: { variant: InvitationVariant; guestName: string }) {
  const [opened, setOpened] = useState(false);
  const reducedMotion = useReducedMotion();

  return <LazyMotion features={domAnimation} strict>
    <main className="invitation-shell">
      {!opened ? <OpeningSection guestName={guestName} onOpen={() => setOpened(true)} /> : <m.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55 }}>
        <WelcomeSection />
        <VerseSection />
        <CoupleSection />
        <EventSection variant={variant} />
        <RsvpForm variant={variant} guestName={guestName} />
        <GiftSection />
        <GallerySection />
        <ClosingSection />
      </m.div>}
    </main>
  </LazyMotion>;
}
