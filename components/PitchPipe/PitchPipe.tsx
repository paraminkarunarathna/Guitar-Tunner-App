"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { PIPE_SETS } from "@/lib/music/pitchSets";
import { midiToFrequency, startPipeNote } from "@/lib/synth";
import { REFERENCE_PITCH_PRESETS } from "@/lib/tuningPresets";
import { Segmented, SelectField } from "@/components/Segmented";
import { logPractice } from "@/lib/practiceLog";

export function PitchPipe() {
  const [setId, setSetId] = useState("guitar");
  const [a4, setA4] = useState(440);
  const [volume, setVolume] = useState(0.6);
  const [active, setActive] = useState<number | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const set = PIPE_SETS.find((s) => s.id === setId)!;

  // One note at a time; any change to what is sounding restarts it.
  useEffect(() => {
    if (active === null) return;
    stopRef.current = startPipeNote((midiToFrequency(active) * a4) / 440, volume);
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [active, a4, volume]);

  // Leaving the instrument or the page must not leave a note droning.
  useEffect(() => setActive(null), [setId]);

  const toggle = (midi: number) => {
    setActive((current) => {
      if (current !== midi) logPractice("pitch-pipe");
      return current === midi ? null : midi;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Instrument</span>
            <Segmented label="Instrument" value={setId} onChange={setSetId} items={PIPE_SETS.map((s) => ({ value: s.id, label: s.label }))} />
          </div>
          <SelectField label="A4" value={String(a4)} onChange={(v) => setA4(Number(v))}>
            {REFERENCE_PITCH_PRESETS.map((hz) => (
              <option key={hz} value={hz}>
                {hz} Hz
              </option>
            ))}
          </SelectField>
          <label className="flex flex-col gap-1">
            <span className="eyebrow">Volume</span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-32 accent-brass h-9"
              aria-label="Volume"
            />
          </label>
        </div>

        <div
          role="group"
          aria-label={`${set.label} notes`}
          className={cn("grid gap-3", set.notes.length > 6 ? "grid-cols-4 sm:grid-cols-6" : set.notes.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-6")}
        >
          {set.notes.map((note, index) => {
            const on = active === note.midi;
            return (
              <button
                key={`${note.midi}-${index}`}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(note.midi)}
                className={cn(
                  "rounded-2xl border-2 py-5 text-xl font-bold transition-colors flex flex-col items-center gap-1",
                  on
                    ? "border-brass bg-brass text-brass-contrast"
                    : "border-line bg-surface/40 text-ink hover:border-brass/60 hover:bg-surface-raised/60",
                )}
              >
                {note.label}
                <span className={cn("text-2xs font-medium tabular-nums", on ? "text-brass-contrast/80" : "text-ink-muted")}>
                  {((midiToFrequency(note.midi) * a4) / 440).toFixed(1)} Hz
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-ink-muted" role="status" aria-live="polite">
          <span className="inline-flex items-center gap-2">
            {active === null ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-brass" />}
            {active === null ? "Tap a note to sound it. Tap again to stop." : "Sounding — tune your string until the beating slows and stops."}
          </span>
          {active !== null && (
            <button type="button" onClick={() => setActive(null)} className="rounded-full border border-line px-4 py-1.5 font-semibold hover:text-ink hover:bg-surface-raised/60">
              Stop
            </button>
          )}
        </div>
        <p className="text-sm text-ink-muted">{set.tip}</p>
      </div>
    </div>
  );
}
