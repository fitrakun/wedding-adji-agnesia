"use client";

import { useState } from "react";
import type { InvitationVariant } from "@/config/invitation-variants";
import type { SongConfig } from "@/config/songs";
import { AnimationController } from "@/components/animation/animation-controller";
import { OpeningSection } from "./opening-section";
import { InvitationContent } from "./invitation-content";
import { BackgroundMusic } from "./background-music";

export function Invitation({ variant, guestName, maxGuests, song }: { variant: InvitationVariant; guestName: string; maxGuests: number; song: SongConfig }) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="invitation-shell">
      <AnimationController opened={opened}>
        <BackgroundMusic song={song} opened={opened} />
        {opened
          ? <InvitationContent variant={variant} guestName={guestName} maxGuests={maxGuests} />
          : <OpeningSection guestName={guestName} onOpen={() => setOpened(true)} />}
      </AnimationController>
    </main>
  );
}
