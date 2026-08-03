"use client";

import { useEffect, useState } from "react";

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
}

function getCountdown(target: string, now = Date.now()): CountdownValue {
  const remainingMinutes = Math.max(0, Math.ceil((new Date(target).getTime() - now) / 60_000));

  return {
    days: Math.floor(remainingMinutes / 1_440),
    hours: Math.floor((remainingMinutes % 1_440) / 60),
    minutes: remainingMinutes % 60,
  };
}

export function EventCountdown({ target }: { target: string }) {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => setCountdown(getCountdown(target));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, [target]);

  const values = countdown
    ? [[countdown.days, "hari"], [countdown.hours, "jam"], [countdown.minutes, "menit"]] as const
    : [[0, "hari"], [0, "jam"], [0, "menit"]] as const;

  return <div className="countdown" aria-label="Hitung mundur menuju acara" aria-live="polite" suppressHydrationWarning>
    {values.map(([value, label]) => <div className="countdown-card" key={label} data-reveal-item>
      <strong>{mounted ? String(value).padStart(2, "0") : "00"}</strong>
      <span>{label}</span>
    </div>)}
  </div>;
}
