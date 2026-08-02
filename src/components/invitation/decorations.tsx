"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

const petals: Array<{
  position: CSSProperties;
  rotation: number;
  drift: number;
  duration: number;
  delay: number;
}> = [
  { position: { top: "1%", left: "37.5%" }, rotation: 18, drift: 22, duration: 15, delay: 0 },
  { position: { top: "2.5%", left: "58%" }, rotation: -24, drift: -18, duration: 17, delay: 2.4 },
  { position: { top: "23.75%", left: "2%" }, rotation: 42, drift: 28, duration: 16, delay: 1.2 },
  { position: { top: "50%", left: "2%" }, rotation: -35, drift: 20, duration: 18, delay: 4.6 },
  { position: { top: "64%", left: "0%" }, rotation: 12, drift: 32, duration: 19, delay: 3.1 },
  { position: { bottom: "3.5%", left: "37.5%" }, rotation: -18, drift: -22, duration: 16, delay: 5.2 },
  { position: { bottom: "8.3%", left: "45.8%" }, rotation: 30, drift: 18, duration: 18, delay: 1.8 },
  { position: { right: "2%", bottom: "59.2%" }, rotation: -42, drift: -28, duration: 17, delay: 3.8 },
  { position: { right: "6.2%", top: "52.8%" }, rotation: 22, drift: -20, duration: 19, delay: .8 },
  { position: { right: "2%", top: "40%" }, rotation: 48, drift: -30, duration: 16, delay: 4.1 },
  { position: { right: "6.2%", top: "2.6%" }, rotation: -12, drift: -24, duration: 18, delay: 2.9 },
];

export function PetalField() {
  const reduceMotion = useReducedMotion();

  return <div className="petal-field" aria-hidden="true">
    {petals.map(({ position, rotation, drift, duration, delay }, index) => (
      <m.span
        key={index}
        style={position}
        initial={{ x: 0, y: 0, rotate: rotation }}
        animate={reduceMotion ? undefined : {
          x: [0, drift, -drift * .55, drift * .35, 0],
          y: [0, 210, 430, 680, 920],
          rotate: [rotation, rotation + 110, rotation + 235, rotation + 355, rotation + 480],
        }}
        transition={reduceMotion ? undefined : {
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
          times: [0, .24, .5, .76, 1],
        }}
      />
    ))}
  </div>;
}

export function CornerBouquets({ compact = false }: { compact?: boolean }) {
  return <div aria-hidden="true" data-flower-layer="far">
    {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => (
      <Image
        key={corner}
        src={`/assets/shared/navy-pink-floral-bouquet-${corner}.png`}
        alt=""
        width={174}
        height={200}
        loading="eager"
        className={`corner-bouquet ${corner} ${compact ? "compact" : ""}`}
      />
    ))}
  </div>;
}

export function CanvaButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`canva-button ${className}`} {...props}>{children}</button>;
}
