import { animate, inView, stagger } from "motion";

/**
 * Shared easing for all entrance animations.
 * Gentle ease-out, no bounce or spring overshoot.
 */
export const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

/** Prepare an element for a fade-up entrance. */
export function setFadeUpHidden(element: HTMLElement, offset = 24) {
  element.style.opacity = "0";
  element.style.transform = `translateY(${offset}px)`;
}

/** Prepare an element for a soft-scale entrance (no vertical movement — safe for transformed decor). */
export function setSoftScaleHidden(element: HTMLElement, scale = 0.96) {
  element.style.opacity = "0";
  element.style.transform = `scale(${scale})`;
}

/**
 * Animate a prepared element into view. Only transform and opacity are animated.
 * Explicit end keyframes are used (never "none") so WAAPI interpolation keeps
 * the element at its natural identity transform instead of a zero matrix.
 */
export function showElement(element: HTMLElement, delay = 0, duration = 0.75) {
  return animate(
    element,
    { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
    { delay, duration, ease: ENTRANCE_EASE },
  );
}

/**
 * Cinematic opening: staggered text lines with opacity, max 20px rise and
 * subtle blur removal, plus a soft-scale reveal on decorative framing.
 * Total sequence stays under ~1.6s.
 */
export function playOpeningSequence(root: ParentNode) {
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-opening-item]"));
  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(16px)";
    item.style.filter = "blur(6px)";
  });

  if (items.length > 0) {
    animate(
      items,
      {
        opacity: [0, 1],
        transform: ["translateY(16px)", "translateY(0px)"],
        filter: ["blur(6px)", "blur(0px)"],
      },
      { delay: stagger(0.09, { startDelay: 0.05 }), duration: 0.7, ease: ENTRANCE_EASE },
    );
  }

  const decor = Array.from(
    root.querySelectorAll<HTMLElement>("[data-animation='opening'] .corner-bouquet, [data-opening-portrait]"),
  );
  decor.forEach((element) => setSoftScaleHidden(element, 0.97));
  if (decor.length > 0) {
    animate(
      decor,
      { opacity: [0, 1], transform: ["scale(0.97)", "scale(1)"] },
      { delay: stagger(0.05, { startDelay: 0.08 }), duration: 0.85, ease: ENTRANCE_EASE },
    );
  }
}

/**
 * Scroll entrances via Intersection Observer (motion's inView).
 * Each entrance triggers exactly once; sections are prepared hidden before
 * observation so content never flashes.
 */
export function initScrollAnimations(root: ParentNode): () => void {
  const stops: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-reveal='section']").forEach((section) => {
    if (section.hasAttribute("data-gallery")) {
      initGallery(section, stops);
      return;
    }

    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    section.querySelectorAll<HTMLElement>("[data-reveal='fade']").forEach((item) => items.push(item));
    if (items.length === 0) return;
    items.forEach((item) => {
      if (item.dataset.reveal === "fade") {
        item.style.opacity = "0";
      } else {
        setFadeUpHidden(item);
      }
    });

    stops.push(
      inView(
        section,
        () => {
          animate(
            items,
            { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
            { delay: stagger(0.09), duration: 0.75, ease: ENTRANCE_EASE },
          );
        },
        { amount: 0.15 },
      ),
    );
  });

  return () => stops.forEach((stop) => stop());
}

/**
 * Gallery reveal: animate the figure containers (never the Next.js image
 * sizing element) with opacity, subtle scale and a light clip mask.
 */
function initGallery(section: HTMLElement, stops: Array<() => void>) {
  const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-gallery-item]"));
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.97)";
    card.style.clipPath = "inset(6% round 12px)";
  });

  stops.push(
    inView(
      section,
      () => {
        animate(
          cards,
          {
            opacity: [0, 1],
            transform: ["scale(0.97)", "scale(1)"],
            clipPath: ["inset(6% round 12px)", "inset(0% round 12px)"],
          },
          { delay: stagger(0.12), duration: 0.8, ease: ENTRANCE_EASE },
        );
      },
      { amount: 0.1 },
    ),
  );
}
