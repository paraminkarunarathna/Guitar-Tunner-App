"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { addTap, bpmFromTaps, msPerBeat, tempoMarking } from "@/lib/music/tempo";
import { logPractice } from "@/lib/practiceLog";

export function TapTempo() {
  const [taps, setTaps] = useState<number[]>([]);
  const [pulse, setPulse] = useState(false);
  const [copied, setCopied] = useState(false);
  const [decimals, setDecimals] = useState(false);
  const logged = useRef(false);

  const tap = useCallback((at: number) => {
    setTaps((current) => addTap(current, at));
    setPulse(true);
    window.setTimeout(() => setPulse(false), 90);
    if (!logged.current) {
      logged.current = true;
      logPractice("tap-tempo");
    }
  }, []);

  const reset = useCallback(() => setTaps([]), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === "Escape") reset();
      // The pad is a button, so Space/Enter on it already clicks; handle the
      // key on the document only when something else has focus.
      if ((event.key === " " || event.key === "Enter") && target?.tagName !== "BUTTON" && !event.repeat) {
        event.preventDefault();
        tap(event.timeStamp);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tap, reset]);

  const bpm = bpmFromTaps(taps);
  const shown = bpm === null ? null : decimals ? bpm.toFixed(1) : String(Math.round(bpm));
  const marking = bpm === null ? undefined : tempoMarking(bpm);
  const rounded = bpm === null ? null : Math.round(bpm);

  const copy = async () => {
    if (shown === null) return;
    try {
      await navigator.clipboard.writeText(shown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; the number is on screen to read.
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
        <div className="text-center" role="status" aria-live="polite">
          <p className="text-7xl sm:text-8xl font-bold tabular-nums text-ink leading-none">
            {shown ?? "—"}
          </p>
          <p className="eyebrow mt-2">BPM</p>
          <p className="mt-2 min-h-6 text-ink-muted">
            {bpm === null
              ? taps.length === 1
                ? "One more tap…"
                : "Tap the pad to the beat"
              : `${marking ? `${marking.name} · ${marking.feel}` : bpm < 20 ? "Slower than any marking" : "Faster than any marking"} · ${taps.length} taps`}
          </p>
        </div>

        <button
          type="button"
          // pointerdown, not click: click fires on release, which adds
          // tens of milliseconds of lag to every tap.
          onPointerDown={(e) => tap(e.timeStamp)}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              tap(e.timeStamp);
            }
          }}
          aria-label="Tap to the beat"
          className={cn(
            "select-none touch-manipulation rounded-3xl border-2 py-14 sm:py-20 text-2xl font-bold transition-colors",
            pulse
              ? "border-brass bg-brass text-brass-contrast"
              : "border-brass/50 bg-brass/10 text-brass hover:bg-brass/20",
          )}
        >
          TAP
        </button>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              type="button"
              onClick={copy}
              disabled={shown === null}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60 disabled:opacity-40"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy BPM"}
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={decimals}
              onChange={(e) => setDecimals(e.target.checked)}
              className="accent-brass h-4 w-4"
            />
            Show decimals
          </label>
        </div>

        {rounded !== null && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              ["Half time", `${Math.round(rounded / 2)} BPM`],
              ["Double time", `${rounded * 2} BPM`],
              ["Per beat", `${Math.round(msPerBeat(rounded))} ms`],
              ["Per bar of 4", `${(msPerBeat(rounded) * 4 / 1000).toFixed(2)} s`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-line bg-surface/40 p-3">
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-1 text-lg font-bold text-ink tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {rounded !== null && rounded >= 30 && rounded <= 300 && (
          <p className="text-sm text-ink-muted">
            Practise at {rounded} BPM:{" "}
            <Link href={`/metronome?bpm=${rounded}`} className="text-brass font-semibold hover:text-brass-hover">
              open the metronome
            </Link>{" "}
            or{" "}
            <Link href={`/rhythm-trainer?bpm=${Math.min(200, Math.max(40, rounded))}`} className="text-brass font-semibold hover:text-brass-hover">
              test your timing at this tempo
            </Link>
            .
          </p>
        )}
        <p className="text-xs text-ink-muted">
          Keyboard: Space or Enter to tap, Esc to reset. Taps more than 2.5 seconds apart start a new count.
        </p>
      </div>
    </div>
  );
}
