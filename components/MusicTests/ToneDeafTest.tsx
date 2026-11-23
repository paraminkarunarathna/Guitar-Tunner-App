"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, toneAt } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import {
  MUSIC_TESTS,
  STAIRCASE_REVERSALS,
  loadResults,
  newStaircase,
  saveResult,
  staircaseDone,
  staircaseThreshold,
  stepStaircase,
  type Staircase,
} from "@/lib/musicTests";
import type { Locale } from "@/lib/i18n/tuner";
import { TESTS_UI } from "@/lib/i18n/tools/testsUi";
import { fmt } from "@/lib/i18n/tools/ui";
import { BTN_PRIMARY, ChallengeBanner, TestResult, TestShell, rich, today, useChallengeScore } from "./TestResult";

const ID = "tone-deaf" as const;
const TONE = 0.45;
const GAP = 0.3;

interface Trial {
  base: number;
  /** +1: second tone higher. */
  direction: 1 | -1;
  cents: number;
}

/** A new pair around a random centre between E4 and E5, so there is no
 *  fixed reference to latch onto between trials. */
function makeTrial(cents: number): Trial {
  return { base: 330 * Math.pow(2, Math.random()), direction: Math.random() < 0.5 ? 1 : -1, cents };
}

function playTrial(trial: Trial) {
  const ctx = getAudioContext();
  const start = ctx.currentTime + 0.08;
  // Split the difference around the centre, so neither tone is the anchor.
  const half = (trial.direction * trial.cents) / 2;
  const first = trial.base * Math.pow(2, -half / 1200);
  const second = trial.base * Math.pow(2, half / 1200);
  toneAt(ctx, first, start, TONE);
  toneAt(ctx, second, start + TONE + GAP, TONE);
  return (start - ctx.currentTime + 2 * TONE + GAP) * 1000;
}

export function ToneDeafTest({ locale = "en" }: { locale?: Locale }) {
  const ui = TESTS_UI[locale];
  const [mounted, setMounted] = useState(false);
  const vs = useChallengeScore(ID);
  const [phase, setPhase] = useState<"intro" | "listening" | "answer" | "done">("intro");
  const [stairs, setStairs] = useState<Staircase>(newStaircase);
  const [trial, setTrial] = useState<Trial | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<{ best: number | null; newBest: boolean }>({ best: null, newBest: false });
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setResult({ best: loadResults()[ID]?.best ?? null, newBest: false });
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const present = useCallback((t: Trial) => {
    setTrial(t);
    setFeedback(null);
    setPhase("listening");
    const ms = playTrial(t);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPhase("answer"), ms);
  }, []);

  const begin = () => {
    const s = newStaircase();
    setStairs(s);
    present(makeTrial(s.cents));
  };

  const answer = useCallback(
    (direction: 1 | -1) => {
      if (phase !== "answer" || !trial || feedback !== null) return;
      const correct = direction === trial.direction;
      const nextStairs = stepStaircase(stairs, correct);
      setStairs(nextStairs);
      setFeedback(correct);
      timer.current = window.setTimeout(() => {
        if (staircaseDone(nextStairs)) {
          const threshold = staircaseThreshold(nextStairs);
          const saved = saveResult(ID, threshold, today());
          logPractice(MUSIC_TESTS[ID].activity);
          setScore(threshold);
          setResult({ best: saved.record.best, newBest: saved.newBest });
          setPhase("done");
        } else {
          present(makeTrial(nextStairs.cents));
        }
      }, 650);
    },
    [feedback, phase, present, stairs, trial],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowUp" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        answer(1);
      } else if (e.key === "ArrowDown" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        answer(-1);
      } else if ((e.key === "r" || e.key === "R") && phase === "answer" && trial && feedback === null) {
        playTrial(trial);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!mounted) return <TestShell />;

  const progress = Math.min(1, Math.max(stairs.reversals.length / STAIRCASE_REVERSALS, stairs.trials / 45));

  return (
    <TestShell>
      {phase === "done" ? (
        <TestResult id={ID} score={score} best={result.best} newBest={result.newBest} vs={vs} onRetry={begin} locale={locale} />
      ) : phase === "intro" ? (
        <div className="text-center py-2">
          <ChallengeBanner id={ID} vs={vs} locale={locale} />
          <p className="text-lg text-ink-muted mb-2">{rich(ui.tdIntro)}</p>
          <p className="text-sm text-ink-subtle mb-6">{ui.tdIntroNote}</p>
          <button type="button" onClick={begin} className={BTN_PRIMARY}>
            <Play className="h-4 w-4" />
            {ui.start}
          </button>
          {result.best !== null && (
            <p className="mt-4 text-sm text-ink-muted">
              {ui.bestSoFar} <span className="font-bold text-ink tabular-nums">{result.best === 1 ? ui.cent1 : fmt(ui.cents, { n: result.best })}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
              {fmt(ui.tdTrial, { n: stairs.trials + (feedback === null ? 1 : 0) })}
            </p>
            <p className="text-xs text-ink-muted tabular-nums">
              {ui.tdDiff} <span className="font-bold text-ink">{Math.max(1, Math.round(trial?.cents ?? 100))}¢</span>
            </p>
          </div>
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-surface-raised" aria-hidden>
            <div className="h-full rounded-full bg-brass transition-all duration-500" style={{ width: `${progress * 100}%` }} />
          </div>

          <p className="mb-6 text-xl font-semibold text-ink">
            {phase === "listening" ? ui.listen : ui.tdQuestion}
          </p>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
            {([
              [1, ui.higher, ArrowUp, "↑"],
              [-1, ui.lower, ArrowDown, "↓"],
            ] as const).map(([dir, label, Icon, key]) => (
              <button
                key={label}
                type="button"
                onClick={() => answer(dir)}
                disabled={phase !== "answer" || feedback !== null}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border px-4 py-6 text-lg font-bold transition-colors disabled:cursor-default",
                  feedback !== null && trial?.direction === dir
                    ? feedback
                      ? "border-in-tune bg-in-tune/15 text-in-tune"
                      : "border-off bg-off/15 text-off"
                    : "border-line-strong bg-surface/60 text-ink enabled:hover:border-brass/50 enabled:hover:text-brass",
                  phase !== "answer" && feedback === null && "opacity-60",
                )}
              >
                <Icon className="h-7 w-7" />
                {label}
                <span className="hidden sm:block text-2xs font-mono text-ink-subtle">{key}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[2.5rem]" role="status" aria-live="polite">
            {feedback !== null ? (
              <p className={cn("text-base font-bold", feedback ? "text-in-tune" : "text-off")}>
                {feedback ? ui.tdRight : ui.tdWrong}
              </p>
            ) : (
              phase === "answer" &&
              trial && (
                <button
                  type="button"
                  onClick={() => playTrial(trial)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brass transition-colors"
                >
                  <Volume2 className="h-4 w-4" /> {ui.playAgain}<span className="hidden sm:inline"> (R)</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </TestShell>
  );
}
