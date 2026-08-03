"use client";

import { useState } from "react";
import type { InvitationVariant } from "@/config/invitation-variants";
import { AnimationController } from "@/components/animation/animation-controller";
import { OpeningSection } from "./opening-section";
import { InvitationContent } from "./invitation-content";

export function Invitation({ variant, guestName }: { variant: InvitationVariant; guestName: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="invitation-shell">
      <AnimationController opened={opened}>
        {opened
          ? <InvitationContent variant={variant} guestName={guestName} />
          : <OpeningSection guestName={guestName} onOpen={() => setOpened(true)} />}
      </AnimationController>
    </main>
  );
}
