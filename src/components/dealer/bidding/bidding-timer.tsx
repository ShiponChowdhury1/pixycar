"use client";

import { useEffect, useState } from "react";

type BiddingTimerProps = {
  phase: "active" | "timeOver";
  /** Total seconds for active countdown */
  initialSeconds?: number;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatCountdown(total: number) {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

export function BiddingTimer({ phase, initialSeconds = 55 * 60 + 1 }: BiddingTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (phase !== "active") return;
    const id = window.setInterval(() => {
      setSecondsLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  if (phase === "timeOver") {
    return (
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="font-hero-heading text-4xl font-bold text-[#FFA51F] sm:text-5xl">13h ago</p>
          <span className="rounded-full bg-red-100 px-3 py-1 font-navbar text-xs font-semibold text-red-600 sm:text-sm">
            Time Over
          </span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full w-full rounded-full bg-[#FFA51F]" />
        </div>
        <div className="mt-2 flex justify-between font-navbar text-xs text-[#5E5E5E] sm:text-sm">
          <span>Blind 1h50sec</span>
          <span>Open Last 10min</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-hero-heading text-4xl font-bold tracking-tight text-[#FFA51F] sm:text-5xl">
          {formatCountdown(secondsLeft)}
        </p>
        <span className="rounded-full bg-emerald-500 px-3 py-1 font-navbar text-xs font-semibold text-white sm:text-sm">
          Live
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full w-[42%] rounded-full bg-[#FFA51F]" />
      </div>
      <div className="mt-2 flex justify-between font-navbar text-xs text-[#5E5E5E] sm:text-sm">
        <span>Blind 1h50sec</span>
        <span>Open Last 10min</span>
      </div>
    </div>
  );
}
