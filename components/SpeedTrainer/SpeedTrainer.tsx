"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, Square, Pause, ChevronsDown, Minus, Plus, Trophy, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Segmented } from "@/components/Segmented";
import { useSpeedTrainer } from "@/hooks/useSpeedTrainer";
import { logPractice, dateKey } from "@/lib/practiceLog";
import {
  DEFAULT_PLAN,
  formatDuration,
  loadSpeed,
  planSteps,
  recordSession,
  sanitizePlan,
  saveSpeed,
  secondsToTarget,
  SPEED_MAX_BPM,
  SPEED_MIN_BPM,
  type SpeedPlan,
  type SpeedSaved,
} from "@/lib/music/speedTrainer";

const PRESETS: { label: string; plan: Partial<SpeedPlan> }[] = [
  { label: "Gentle", plan: { start: 60, target: 90, step: 2, barsPerStep: 4, muteBars: 0 } },
  { label: "Steady", plan: { start: 80, target: 120, step: 4, barsPerStep: 4, muteBars: 0 } },
  { label: "Push", plan: { start: 100, target: 160, step: 5, barsPerStep: 2, muteBars: 0 } },
  { label: "Gap click", plan: { start: 70, target: 100, step: 3, barsPerStep: 4, playBars: 3, muteBars: 1 } },
];

/** URL keys, short so a shared link stays readable. */
const URL_KEYS: Record<string, keyof SpeedPlan> = {
  start: "start",
  target: "target",
  step: "step",
  every: "barsPerStep",
  beats: "beats",
  end: "atTarget",
  play: "playBars",
  mute: "muteBars",
};

function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  const id = `st-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-line-strong bg-surface overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="px-2.5 py-2 text-ink-muted hover:text-brass"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n))));
          }}
          className="w-full min-w-0 bg-transparent text-center font-mono text-sm tabular-nums text-ink [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="pr-1 text-2xs text-ink-subtle">{suffix}</span>}
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="px-2.5 py-2 text-ink-muted hover:text-brass"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SpeedTrainer() {
  const [plan, setPlanState] = useState<SpeedPlan>(DEFAULT_PLAN);
  const [exercise, setExercise] = useState("My exercise");
  const [saved, setSaved] = useState<SpeedSaved>({ exercises: {} });
  const [result, setResult] = useState<{ reached: number; personalBest: boolean; previous?: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const ready = useRef(false);

  const trainer = useSpeedTrainer(plan);
  const { isPlaying, beat, bar, bpm, silent, reached, held, start, stop, toggleHold, stepBack } = trainer;

  // Restore the last plan, then let a shared link override it.
  useEffect(() => {
    const stored = loadSpeed();
    setSaved(stored);
    if (stored.current) setExercise(stored.current);
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Partial<Record<keyof SpeedPlan, unknown>> = {};
    for (const [key, field] of Object.entries(URL_KEYS)) {
      const value = params.get(key);
      if (value !== null) fromUrl[field] = value;
    }
    const name = params.get("name");
    if (name) setExercise(name.slice(0, 60));
    if (Object.keys(fromUrl).length) setPlanState(sanitizePlan({ ...(stored.plan ?? DEFAULT_PLAN), ...fromUrl }));
    else if (stored.plan) setPlanState(sanitizePlan(stored.plan));
    ready.current = true;
  }, []);

  const setPlan = useCallback((patch: Partial<SpeedPlan>) => {
    setPlanState((current) => {
      const next = sanitizePlan({ ...current, ...patch });
      if (ready.current) saveSpeed({ ...loadSpeed(), plan: next });
      return next;
    });
  }, []);

  const finish = useCallback(() => {
    const top = stop();
    if (top <= 0) return;
    const before = loadSpeed();
    const previous = before.exercises[exercise.trim() || "My exercise"]?.best;
    const { saved: next, personalBest } = recordSession({ ...before, plan }, exercise, top, dateKey(new Date()));
    saveSpeed(next);
    setSaved(next);
    setResult({ reached: top, personalBest, previous });
    logPractice("speed-trainer");
  }, [stop, exercise, plan]);

  const toggle = useCallback(() => {
    if (isPlaying) finish();
    else {
      setResult(null);
      start();
    }
  }, [isPlaying, finish, start]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.code === "Space") {
        event.preventDefault();
        toggle();
      } else if (event.code === "KeyH" && isPlaying) toggleHold();
      else if (event.code === "KeyB" && isPlaying) stepBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, toggleHold, stepBack, isPlaying]);

  const steps = useMemo(() => planSteps(plan), [plan]);
  const toTarget = secondsToTarget(plan);
  const progress = plan.target === plan.start ? 1 : Math.min(1, Math.abs(bpm - plan.start) / Math.abs(plan.target - plan.start));

  const shareLink = async () => {
    const params = new URLSearchParams();
    for (const [key, field] of Object.entries(URL_KEYS)) params.set(key, String(plan[field]));
    if (exercise.trim() && exercise !== "My exercise") params.set("name", exercise.trim());
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.history.replaceState(null, "", url);
    }
  };

  const bests = Object.entries(saved.exercises).sort((a, b) => b[1].on.localeCompare(a[1].on)).slice(0, 6);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
      {/* Live display */}
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex justify-center gap-3 mb-6" aria-hidden="true">
          {Array.from({ length: plan.beats }, (_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full transition-all duration-75",
                i === 0 ? "h-5 w-5" : "h-4 w-4",
                isPlaying && beat === i
                  ? silent
                    ? "bg-transparent ring-2 ring-brass/60 scale-125"
                    : "bg-brass-hover scale-135"
                  : "bg-surface-raised",
              )}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-7xl sm:text-8xl font-bold tracking-tighter tabular-nums text-ink leading-none">{bpm}</p>
          <p className="eyebrow mt-2">
            BPM · target {plan.target}
            {isPlaying && ` · bar ${bar + 1}`}
          </p>
          <p className="mt-2 min-h-5 text-sm text-ink-muted" role="status" aria-live="polite">
            {isPlaying
              ? silent
                ? "Silent bar — keep the time yourself"
                : held
                  ? `Holding at ${bpm} BPM`
                  : bpm === plan.target
                    ? plan.atTarget === "loop"
                      ? "At target — dropping back to the start next"
                      : "At target — stay here as long as it stays clean"
                    : `Next: ${plan.target > plan.start ? Math.min(plan.target, bpm + plan.step) : Math.max(plan.target, bpm - plan.step)} BPM`
              : `${steps.length} tempos · ${formatDuration(toTarget)} to reach ${plan.target} BPM`}
          </p>
        </div>

        <div className="mt-5 h-2 rounded-full bg-surface-raised overflow-hidden" aria-hidden="true">
          <div className="h-full bg-brass transition-[width] duration-300" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 text-base font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
          >
            {isPlaying ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isPlaying ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            onClick={toggleHold}
            disabled={!isPlaying}
            aria-pressed={held}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-40",
              held ? "border-brass bg-brass/15 text-brass" : "border-line-strong text-ink hover:text-brass",
            )}
          >
            <Pause className="h-4 w-4" /> {held ? "Release" : "Hold tempo"}
          </button>
          <button
            type="button"
            onClick={stepBack}
            disabled={!isPlaying}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink hover:text-brass transition-colors disabled:opacity-40"
          >
            <ChevronsDown className="h-4 w-4" /> Too fast
          </button>
        </div>
        <p className="mt-3 text-center text-2xs text-ink-subtle">Space start/stop · H hold · B too fast</p>

        {result && (
          <div className="mt-5 rounded-2xl border border-brass/40 bg-brass/10 p-4 text-center" role="status">
            <p className="font-bold text-ink inline-flex items-center gap-1.5">
              {result.personalBest && <Trophy className="h-4 w-4 text-brass" />}
              {result.personalBest
                ? result.previous
                  ? `New best for “${exercise}”: ${result.reached} BPM (was ${result.previous})`
                  : `First record for “${exercise}”: ${result.reached} BPM`
                : `Reached ${result.reached} BPM — your best is ${saved.exercises[exercise.trim() || "My exercise"]?.best} BPM`}
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Counted as a practice day.{" "}
              <Link href="/my-progress" className="text-brass font-semibold">See your progress →</Link>
            </p>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="rounded-3xl border border-line bg-surface/40 p-5 sm:p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="st-exercise" className="eyebrow">Exercise or song section</label>
          <input
            id="st-exercise"
            value={exercise}
            maxLength={60}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="e.g. Chromatic 1-2-3-4, solo bar 9–12"
            className="rounded-xl border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
          />
          <p className="text-2xs text-ink-subtle">Your best tempo is saved per name, so you can track each lick separately.</p>
        </div>

        <div>
          <p className="eyebrow mb-1.5">Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                disabled={isPlaying}
                onClick={() => setPlan(preset.plan)}
                className="rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink-muted hover:border-brass/50 hover:text-brass disabled:opacity-40"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <fieldset disabled={isPlaying} className="grid grid-cols-2 sm:grid-cols-4 gap-3 disabled:opacity-60">
          <legend className="sr-only">Tempo ramp</legend>
          <Stepper label="Start BPM" value={plan.start} min={SPEED_MIN_BPM} max={SPEED_MAX_BPM} onChange={(v) => setPlan({ start: v })} />
          <Stepper label="Target BPM" value={plan.target} min={SPEED_MIN_BPM} max={SPEED_MAX_BPM} onChange={(v) => setPlan({ target: v })} />
          <Stepper label="Step" value={plan.step} min={1} max={40} suffix="BPM" onChange={(v) => setPlan({ step: v })} />
          <Stepper label="Every" value={plan.barsPerStep} min={1} max={32} suffix="bars" onChange={(v) => setPlan({ barsPerStep: v })} />
        </fieldset>

        <fieldset disabled={isPlaying} className="flex flex-col gap-3 disabled:opacity-60">
          <legend className="sr-only">Bar and ending</legend>
          <div className="flex flex-wrap items-center gap-3">
            <Segmented
              label="Beats per bar"
              value={plan.beats}
              onChange={(v) => setPlan({ beats: v })}
              items={[2, 3, 4, 5, 6, 7].map((n) => ({ value: n, label: `${n}/4` }))}
            />
            <Segmented
              label="At the target tempo"
              value={plan.atTarget}
              onChange={(v) => setPlan({ atTarget: v })}
              items={[
                { value: "hold", label: "Stay at target" },
                { value: "loop", label: "Loop the ramp" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <Stepper label="Gap: play bars" value={plan.playBars} min={1} max={16} onChange={(v) => setPlan({ playBars: v })} />
            <Stepper label="Gap: silent bars" value={plan.muteBars} min={0} max={8} onChange={(v) => setPlan({ muteBars: v })} />
          </div>
          <p className="text-2xs text-ink-subtle">
            Silent bars mute the click so you can check your own time — the tempo still ramps underneath. Set silent bars to 0 to
            turn the gap off.
          </p>
        </fieldset>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={shareLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-ink hover:text-brass"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            {copied ? "Link copied" : "Copy link to this ramp"}
          </button>
          <span className="text-2xs text-ink-subtle">Send it to a student or bandmate — it opens with these settings.</span>
        </div>
      </div>

      {bests.length > 0 && (
        <div className="rounded-3xl border border-line bg-surface/40 p-5 sm:p-6">
          <p className="eyebrow mb-2 inline-flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" /> Your best tempos
          </p>
          <ul className="divide-y divide-line text-sm">
            {bests.map(([name, record]) => (
              <li key={name} className="flex items-center justify-between gap-3 py-2">
                <button
                  type="button"
                  onClick={() => setExercise(name)}
                  className="min-w-0 truncate text-left text-ink hover:text-brass"
                  title="Practise this exercise"
                >
                  {name}
                </button>
                <span className="shrink-0 font-mono text-xs tabular-nums text-ink-muted">
                  {record.best} BPM · {record.sessions} session{record.sessions === 1 ? "" : "s"} · {record.on}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
