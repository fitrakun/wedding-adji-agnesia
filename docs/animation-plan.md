# Animation Plan

Motion v12 (`motion/react`) is the sole animation dependency. Client animation code uses `LazyMotion` with `domAnimation`; only opacity and transform are animated.

| Section | Trigger | Duration / easing | Mobile considerations | Reduced motion |
|---|---|---|---|---|
| Cover | Initial load | 650 ms, ease-out | One opacity transition; critical background is prioritized | Renders immediately |
| Invitation opening | “Buka undangan” click | 650 ms, ease-out | No unskippable delay; content becomes available immediately | Instant switch |
| Event card | 18% enters viewport | 750 ms, cubic-bezier(0.22,1,0.36,1) | Once-only opacity + 28 px Y transform | Static, visible |
| RSVP heading | Enters viewport | Spring-like scale/opacity reveal | Tiny isolated layer | Static, visible |
| RSVP success | Successful Supabase insert | 300–500 ms scale/opacity | Replaces form without repeated rendering | Instant state change |
| Button feedback | Hover/tap | 100–200 ms scale | Tap scale limited to 0.98; no layout shift | Disabled |
| Gallery tiles | Each tile enters viewport | 750 ms with 0–160 ms stagger | Once-only, transform/opacity only; images are lazy-loaded | Static, visible |
| Gift account | Button activation | State reveal | No expensive layout animation | Instant |

`prefers-reduced-motion: reduce` is handled both through Motion's `useReducedMotion` and a CSS media query that removes nonessential animation and smooth scrolling.
