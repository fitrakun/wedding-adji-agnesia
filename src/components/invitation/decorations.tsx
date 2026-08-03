import Image from "next/image";
import type { CSSProperties } from "react";

const petals: Array<{
  position: CSSProperties;
  rotation: number;
  duration: number;
  delay: number;
}> = [
  { position: { top: "1%", left: "37.5%" }, rotation: 18, duration: 15, delay: 0 },
  { position: { top: "2.5%", left: "58%" }, rotation: -24, duration: 17, delay: -2.4 },
  { position: { top: "23.75%", left: "2%" }, rotation: 42, duration: 16, delay: -1.2 },
  { position: { top: "50%", left: "2%" }, rotation: -35, duration: 18, delay: -4.6 },
  { position: { top: "64%", left: "0%" }, rotation: 12, duration: 19, delay: -3.1 },
  { position: { bottom: "3.5%", left: "37.5%" }, rotation: -18, duration: 16, delay: -5.2 },
  { position: { bottom: "8.3%", left: "45.8%" }, rotation: 30, duration: 18, delay: -1.8 },
  { position: { right: "2%", bottom: "59.2%" }, rotation: -42, duration: 17, delay: -3.8 },
  { position: { right: "6.2%", top: "52.8%" }, rotation: 22, duration: 19, delay: -0.8 },
  { position: { right: "2%", top: "40%" }, rotation: 48, duration: 16, delay: -4.1 },
  { position: { right: "6.2%", top: "2.6%" }, rotation: -12, duration: 18, delay: -2.9 },
];

export function PetalField() {
  return <div className="petal-field" aria-hidden="true">
    {petals.map(({ position, rotation, duration, delay }, index) => (
      <span
        key={index}
        className="petal"
        style={{
          ...position,
          "--petal-rotate": `${rotation}deg`,
          "--petal-duration": `${duration}s`,
          "--petal-delay": `${delay}s`,
        } as CSSProperties}
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
