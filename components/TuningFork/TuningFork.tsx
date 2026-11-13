"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FORKS } from "@/lib/music/pitchSets";
import { strikeFork } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";

/** How long the fork is drawn vibrating — about as long as it rings. */
const RING_MS = 10000;

export function TuningFork() {
  const [forkId, setForkId] = useState("a440");
  const [ringing, setRinging] = useState(false);
  const damp = useRef<(() => void) | null>(null);
  const timer = useRef<number | null>(null);

  const fork = FORKS.find((f) => f.id === forkId)!;

  const silence = () => {
    damp.current?.();
    damp.current = null;
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setRinging(false);
  };

  const strike = () => {
    damp.current?.();
    if (timer.current !== null) window.clearTimeout(timer.current);
    damp.current = strikeFork(fork.hz);
    setRinging(true);
    logPractice("tuning-fork");
    timer.current = window.setTimeout(silence, RING_MS);
  };

  // Switching forks, or leaving the page, damps the one that is ringing.
  useEffect(() => silence, []);
  useEffect(() => {
    silence();
  }, [forkId]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col items-center gap-5">
        <div role="group" aria-label="Choose a fork" className="flex flex-wrap justify-center gap-2">
          {FORKS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={forkId === f.id}
              onClick={() => setForkId(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                forkId === f.id
                  ? "border-brass bg-brass text-brass-contrast"
                  : "border-line text-ink-muted hover:text-ink hover:bg-surface-raised/60",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={strike}
          aria-label={`Strike the ${fork.label} tuning fork`}
          className="group rounded-3xl p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        >
          <svg viewBox="0 0 120 220" className="h-56 w-auto" role="img" aria-hidden="true">
            <style>{`
              @keyframes fork-left { 0%,100% { transform: translateX(0) } 50% { transform: translateX(-2.5px) } }
              @keyframes fork-right { 0%,100% { transform: translateX(0) } 50% { transform: translateX(2.5px) } }
              .tine-l.ringing { animation: fork-left 0.06s linear infinite }
              .tine-r.ringing { animation: fork-right 0.06s linear infinite }
              @media (prefers-reduced-motion: reduce) { .tine-l.ringing, .tine-r.ringing { animation: none } }
            `}</style>
            <g className="text-brass" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round">
              <line x1="60" y1="150" x2="60" y2="205" />
              <path d="M60 150 C 60 128, 38 128, 38 100 L 38 20" className={cn("tine-l", ringing && "ringing")} />
              <path d="M60 150 C 60 128, 82 128, 82 100 L 82 20" className={cn("tine-r", ringing && "ringing")} />
            </g>
            {ringing && (
              <g className="text-brass" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5">
                <path d="M22 30 q-8 20 0 40" />
                <path d="M12 24 q-12 26 0 52" />
                <path d="M98 30 q8 20 0 40" />
                <path d="M108 24 q12 26 0 52" />
              </g>
            )}
          </svg>
        </button>

        <div className="text-center" role="status" aria-live="polite">
          <p className="text-3xl font-bold text-ink tabular-nums">{fork.label}</p>
          <p className="mt-1 text-sm text-ink-muted">{ringing ? "Ringing — hold it near your ear" : "Tap the fork to strike it"}</p>
        </div>
        <p className="max-w-xl text-center text-sm text-ink-muted">{fork.use}</p>
        {ringing && (
          <button type="button" onClick={silence} className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60">
            Damp the fork
          </button>
        )}
      </div>
    </div>
  );
}
