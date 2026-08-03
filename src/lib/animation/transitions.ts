import { animate } from "motion";
import { ENTRANCE_EASE } from "./invitation-animations";
import { prefersReducedMotion } from "./motion-preferences";

/**
 * Gentle entrance for interactive state changes (success card, account card).
 * Opacity, max 12px rise and subtle scale. Movement is skipped entirely when
 * the user prefers reduced motion — the content simply appears.
 */
export function playSoftTransition(element: HTMLElement | null) {
  if (!element || prefersReducedMotion()) return;
  animate(
    element,
    { opacity: [0, 1], transform: ["translateY(10px) scale(0.98)", "translateY(0px) scale(1)"] },
    { duration: 0.45, ease: ENTRANCE_EASE },
  );
}
