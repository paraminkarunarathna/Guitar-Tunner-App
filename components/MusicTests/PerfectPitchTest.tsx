"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAudioContext, midiToFrequency, pluckFrequency, toneAt } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import type { Locale } from "@/lib/i18n/tuner";
import { TESTS_UI, testNoteNames } from "@/lib/i18n/tools/testsUi";
import { fmt } from "@/lib/i18n/tools/ui";
import {
  MUSIC_TESTS,
  PERFECT_PITCH_ROUNDS,
  loadResults,
  perfectPitchSequence,
  pitchClassDistance,
  saveResult,
} from "@/lib/musicTests";
import { BTN_PRIMARY, ChallengeBanner, TestResult, TestShell, today, useChallengeScore } from "./TestResult";

const ID = "perfect-pitch" as const;
const SCRAMBLE_SECONDS = 0.9;

/** A burst of random, off-grid pitches before each note. It overwrites the
 *  last note in short-term memory, so the answer cannot be worked out from
 *  the interval to the previous one — the thing that separates a perfect
 *  pitch test from an interval quiz. */
function scramble(ctx: AudioContext, at: number) {
  const count = 9;
  for (let i = 0; i < count; i++) {
    const freq = 150 * Math.pow(8, Math.random());
    toneAt(ctx, freq, at + (i * SCRAMBLE_SECONDS) / count, SCRAMBLE_SECONDS / count, { peak: 0.06, pure: true });
  }
  return at + SCRAMBLE_SECONDS + 0.35;
}

/** Alternate timbres so the test is about the pitch, not one instrument. */
function playNote(ctx: AudioContext, midi: number, at: number, round: number) {
  const freq = midiToFrequency(midi);
  if (round % 2 === 0) pluckFrequency(ctx, freq, at, 0.3, 2);
  else toneAt(ctx, freq, at, 1.2, { peak: 0.18 });
}

export function PerfectPitchTest({ locale = "en" }: { locale?: Locale }) {
  const ui = TESTS_UI[locale];
  const notesText = testNoteNames(locale);
  const [mounted, setMounted] = useState(false);
  const vs = useChallengeScore(ID);
  const [notes, setNotes] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [phase, setPhase] = useState<"intro" | "scramble" | "answer" | "done">("intro");
  const [result, setResult] = useState<{ best: number | null; newBest: boolean }>({ best: null, newBest: false });
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setResult({ best: loadResults()[ID]?.best ?? null, newBest: false });
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const present = useCallback((sequence: number[], index: number) => {
    const ctx = getAudioContext();
    const start = ctx.currentTime + 0.05;
    const noteAt = index === 0 ? start : scramble(ctx, start);
    setPhase("scramble");
    playNote(ctx, sequence[index], noteAt, index);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPhase("answer"), (noteAt - ctx.currentTime) * 1000 + 150);
  }, []);

  const begin = () => {
    const sequence = perfectPitchSequence();
    setNotes(sequence);
    setRound(0);
    setAnswers([]);
    setChosen(null);
    present(sequence, 0);
  };

  const replay = () => {
    const ctx = getAudioContext();
    playNote(ctx, notes[round], ctx.currentTime + 0.05, round);
  };

  const answer = (pitchClass: number) => {
    if (chosen !== null || phase !== "answer") return;
    setChosen(pitchClass);
    setAnswers((prev) => [...prev, pitchClass]);
  };

  const next = useCallback(() => {
    if (chosen === null) return;
    if (round + 1 >= PERFECT_PITCH_ROUNDS) {
      const score = answers.filter((a, i) => a === notes[i] % 12).length;
      const saved = saveResult(ID, score, today());
      logPractice(MUSIC_TESTS[ID].activity);
      setResult({ best: saved.record.best, newBest: saved.newBest });
      setPhase("done");
      return;
    }
    setChosen(null);
    setRound(round + 1);
    present(notes, round + 1);
  }, [answers, chosen, notes, present, round]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select")) return;
      if (e.key === "Enter" && chosen !== null) {
        e.preventDefault();
        next();
      } else if ((e.key === "r" || e.key === "R") && phase === "answer") {
        replay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!mounted) return <TestShell />;

  const score = answers.filter((a, i) => a === notes[i] % 12).length;
  const target = notes[round];

  return (
    <TestShell>
      {phase === "done" ? (
        <TestResult id={ID} score={score} best={result.best} newBest={result.newBest} vs={vs} onRetry={begin} locale={locale} />
      ) : phase === "intro" ? (
        <div className="text-center py-2">
          <ChallengeBanner id={ID} vs={vs} locale={locale} />
          <p className="text-lg text-ink-muted mb-2">{ui.ppIntro}</p>
          <p className="text-sm text-ink-subtle mb-6">{ui.ppIntroNote}</p>
          <button type="button" onClick={begin} className={BTN_PRIMARY}>
            <Play className="h-4 w-4" />
            {ui.start}
          </button>
          {result.best !== null && (
            <p className="mt-4 text-sm text-ink-muted">
              {ui.bestSoFar} <span className="font-bold text-ink tabular-nums">{result.best}/{PERFECT_PITCH_ROUNDS}</span>
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-subtle">
              {fmt(ui.ppNoteOf, { n: round + 1, total: PERFECT_PITCH_ROUNDS })}
            </p>
            <ol className="flex gap-1" aria-label={ui.progress}>
              {Array.from({ length: PERFECT_PITCH_ROUNDS }, (_, i) => (
                <li
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5 rounded-sm border",
                    i < answers.length
                      ? answers[i] === notes[i] % 12
                        ? "border-in-tune bg-in-tune"
                        : "border-off bg-off"
                      : i === round
                        ? "border-brass bg-brass/20"
                        : "border-line-strong bg-surface/60",
                  )}
                />
              ))}
            </ol>
          </div>

          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={replay}
              disabled={phase !== "answer"}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 py-2.5 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors disabled:opacity-50"
            >
              <Volume2 className="h-4 w-4" />
              {phase === "scramble" ? ui.listen : <>{ui.playAgain}<span className="hidden sm:inline"> (R)</span></>}
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="group" aria-label={ui.ppWhich}>
            {notesText.buttons.map((label, pc) => {
              const isAnswer = target !== undefined && pc === target % 12;
              const isChosen = pc === chosen;
              const black = label.includes("/");
              return (
                <button
                  key={label}
                  type="button"
                  disabled={chosen !== null || phase !== "answer"}
                  onClick={() => answer(pc)}
                  className={cn(
                    "rounded-xl border px-2 py-3.5 text-sm sm:text-base font-semibold transition-colors disabled:cursor-default",
                    chosen === null
                      ? cn(
                          black ? "bg-surface-raised/70" : "bg-surface/60",
                          "border-line-strong text-ink enabled:hover:border-brass/50 enabled:hover:text-brass",
                          phase !== "answer" && "opacity-60",
                        )
                      : isAnswer
                        ? "border-in-tune bg-in-tune/15 text-in-tune"
                        : isChosen
                          ? "border-off bg-off/15 text-off"
                          : "border-line text-ink-subtle opacity-60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-[5rem] text-center" role="status" aria-live="polite">
            {chosen !== null && target !== undefined && (
              <div className="flex flex-col items-center gap-3">
                <p className={cn("text-lg font-bold", chosen === target % 12 ? "text-in-tune" : "text-off")}>
                  {chosen === target % 12
                    ? fmt(ui.ppCorrect, { note: notesText.names[target % 12] })
                    : `${fmt(ui.ppWas, { note: notesText.names[target % 12] })}${pitchClassDistance(chosen, target % 12) === 1 ? ui.ppSemitone : ""}`}
                </p>
                <button type="button" onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-brass px-5 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors">
                  {round + 1 >= PERFECT_PITCH_ROUNDS ? ui.seeScore : ui.ppNext}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </TestShell>
  );
}
