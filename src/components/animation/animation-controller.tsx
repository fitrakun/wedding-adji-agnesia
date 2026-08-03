"use client";

import { useEffect, useRef } from "react";
import { initScrollAnimations, playOpeningSequence } from "@/lib/animation/invitation-animations";
import { prefersReducedMotion } from "@/lib/animation/motion-preferences";

/**
 * Single client-side animation controller. Discovers server-rendered elements
 * through semantic data attributes and drives every entrance imperatively.
 * All nonessential motion is skipped when the user prefers reduced motion.
 */
export function AnimationController({ opened, children }: { opened: boolean; children: React.ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || prefersReducedMotion()) return;

    let cleanup: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
      if (!opened) {
        playOpeningSequence(shell);
        return;
      }
      cleanup = initScrollAnimations(shell);
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [opened]);

  return (
    <div ref={shellRef} data-animation-root data-opened={opened ? "true" : "false"}>
      {children}
    </div>
  );
}
