"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Ear, EarOff, Play, Square, TriangleAlert, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, startSine } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import { HEARING_STEPS, MUSIC_TESTS, loadResults, saveResult } from "@/lib/musicTests";
import { BTN_PRIMARY, BTN_SECONDARY, ChallengeBanner, TestResult, TestShell, today, useChallengeScore } from "./TestResult";

const ID = "hearing-age" as const;
const TONE_SECONDS = 2.5;
const VOLUME = 0.12;

/** A step is a real frequency, or `null` for the one silent catch trial. */
type Step = number | null;

/** The steps in order, with one silent trial hidden among the middle ones.
 *  Someone who answers "I hear it" to silence is guessing, and their result
 *  is not shared as if it were real. */
function buildSteps(): Step[] {
  const steps: Step[] = [...HEARING_STEPS];
  const at = 3 + Math.floor(Math.random() * 5);
  steps.splice(at, 0, null);
  return steps;
}

const khz = (hz: number) => `${Number((hz / 1000).toFixed(1))} kHz`;

export function HearingAgeTest() {
  const [mounted, setMounted] = useState(false);
  const vs = useChallengeScore(ID);
  const [phase, setPhase] = useState<"intro" | "test" | "done">("intro");
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);
  const [highest, setHighest] = useState(0);
  const [caught, setCaught] = useState(false);
  const [playing, setPlaying] = useState<"calibrate" | "step" | null>(null);
  const [result, setResult] = useState<{ best: number | null; newBest: boolean }>({ best: null, newBest: false });
  const stopRef = useRef<(() => void) | null>(null);
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    if (timer.current) window.clearTimeout(timer.current);
    setPlaying(null);
  }, []);

  useEffect(() => {
    setMounted(true);
    setResult({ best: loadResults()[ID]?.best ?? null, newBest: false });
    return () => stopRef.current?.();
  }, []);

  /** Play a frequency (or silence) for a few seconds. */
  const sound = useCallback(
    (freq: number | null, kind: "calibrate" | "step") => {
      stop();
      if (freq !== null) {
        const ctx = getAudioContext();
        // A tone above the device's Nyquist limit would alias to a lower,
        // audible one — so it is not played at all.
        if (freq < ctx.sampleRate / 2) stopRef.current = startSine(freq, VOLUME);
      } else {
        getAudioContext();
      }
      setPlaying(kind);
      timer.current = window.setTimeout(() => {
        stopRef.current?.();
        stopRef.current = null;
        setPlaying(null);
      }, TONE_SECONDS * 1000);
    },
    [stop],
  );

  const begin = () => {
    const s = buildSteps();
    setSteps(s);
    setIndex(0);
    setHighest(0);
    setCaught(false);
    setPhase("test");
    sound(s[0], "step");
  };

  const finish = (best: number, wasCaught: boolean) => {
    stop();
    setHighest(best);
    setCaught(wasCaught);
    if (!wasCaught) {
      const saved = saveResult(ID, best, today());
      setResult({ best: saved.record.best, newBest: saved.newBest });
    }
    logPractice(MUSIC_TESTS[ID].activity);
    setPhase("done");
  };

  const respond = (heard: boolean) => {
    const step = steps[index];
    let best = highest;
    let wasCaught = caught;
    if (step === null) {
      if (heard) wasCaught = true;
    } else if (heard) {
      best = step;
    } else {
      finish(best, wasCaught);
      return;
    }
    setHighest(best);
    setCaught(wasCaught);
    if (index + 1 >= steps.length) {
      finish(best, wasCaught);
      return;
    }
    setIndex(index + 1);
    sound(steps[index + 1], "step");
  };

  if (!mounted) return <TestShell />;

  const realDone = steps.slice(0, index).filter((s) => s !== null).length;

  return (
    <TestShell>
      {phase === "done" ? (
        <TestResult
          id={ID}
          score={highest}
          best={caught ? null : result.best}
          newBest={!caught && result.newBest}
          vs={vs}
          onRetry={begin}
          shareable={!caught && highest >= 8000}
          note={
            caught
              ? "One of the tones was silent, and you said you heard it — so this result may be too high. Try again with headphones and answer only when you are sure."
              : undefined
          }
        />
      ) : phase === "intro" ? (
        <div className="text-center py-2">
          <ChallengeBanner id={ID} vs={vs} />
          <div className="mx-auto mb-6 flex max-w-xl items-start gap-3 rounded-2xl border border-off/40 bg-off/10 p-4 text-left text-sm text-ink">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-off" />
            <p>
              <strong>Protect your ears.</strong> Set the volume with the check tone below, then leave it alone. Never turn it up
              to hear a high tone — loud high frequencies can damage hearing.
            </p>
          </div>
          <p className="text-lg text-ink-muted mb-2">Step 1: play the check tone and set it to a comfortable, quiet level.</p>
          <button
            type="button"
            onClick={() => (playing === "calibrate" ? stop() : sound(1000, "calibrate"))}
            className={cn(BTN_SECONDARY, "mb-6")}
          >
            {playing === "calibrate" ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {playing === "calibrate" ? "Stop" : "Play check tone (1 kHz)"}
          </button>
          <p className="text-lg text-ink-muted mb-2">
            Step 2: tones climb from 8 kHz to 20 kHz. Say whether you hear each one.
          </p>
          <p className="text-sm text-ink-subtle mb-6">Headphones give a truer result — many phone and laptop speakers cannot play above 15 kHz.</p>
          <button type="button" onClick={begin} className={BTN_PRIMARY}>
            <Play className="h-4 w-4" />
            Start the test
          </button>
          {result.best !== null && result.best > 0 && (
            <p className="mt-4 text-sm text-ink-muted">
              Your best so far: <span className="font-bold text-ink tabular-nums">{khz(result.best)}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
              Tone {index + 1} of {steps.length}
            </p>
            <p className="text-xs text-ink-muted tabular-nums">
              Heard so far: <span className="font-bold text-ink">{highest ? khz(highest) : "—"}</span>
            </p>
          </div>
          <div className="mb-8 flex gap-1" aria-hidden>
            {steps.map((_, i) => (
              <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < index ? "bg-brass" : i === index ? "bg-brass/40" : "bg-surface-raised")} />
            ))}
          </div>

          {/* The frequency is not shown, so the silent trial looks like any other. */}
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-brass/40 bg-brass/10">
            <Volume2 className={cn("h-12 w-12 text-brass", playing === "step" && "animate-pulse")} />
          </div>
          <p className="mb-2 text-xl font-semibold text-ink">{playing === "step" ? "Listen closely…" : "Did you hear a tone?"}</p>
          <p className="mb-6 text-sm text-ink-subtle">{realDone} of {HEARING_STEPS.length} frequencies checked</p>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => respond(true)}
              className="flex flex-col items-center gap-1 rounded-2xl border border-line-strong bg-surface/60 px-4 py-5 text-base font-bold text-ink hover:border-in-tune/60 hover:text-in-tune transition-colors"
            >
              <Ear className="h-6 w-6" /> I hear it
            </button>
            <button
              type="button"
              onClick={() => respond(false)}
              className="flex flex-col items-center gap-1 rounded-2xl border border-line-strong bg-surface/60 px-4 py-5 text-base font-bold text-ink hover:border-off/60 hover:text-off transition-colors"
            >
              <EarOff className="h-6 w-6" /> I can&apos;t hear it
            </button>
          </div>
          <button
            type="button"
            onClick={() => sound(steps[index], "step")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brass transition-colors"
          >
            <Volume2 className="h-4 w-4" /> Play it again
          </button>
        </div>
      )}
    </TestShell>
  );
}
