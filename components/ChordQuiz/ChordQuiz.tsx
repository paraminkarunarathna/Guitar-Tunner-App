"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Flame, Play, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import ChordDiagram from "@/components/Chords/ChordDiagram";
import { Segmented } from "@/components/Segmented";
import { getChord } from "@/lib/chords";
import { fingeringMidiNotes } from "@/lib/chords";
import { makeQuestion, QUIZ_LEVELS, type QuizLevel, type QuizQuestion } from "@/lib/chords/quiz";
import { strum } from "@/lib/synth";
import { logPractice } from "@/lib/practiceLog";
import { QUIZ_UI, fmt } from "@/lib/i18n/tools/ui";
import { chordLetters } from "@/lib/i18n/tools/names";
import type { Locale } from "@/lib/i18n/tuner";

const STORAGE_KEY = "gtp-chord-quiz";

interface Stats {
  bestStreak: number;
  /** chord slug → [correct, asked] */
  byAnswer: Record<string, [number, number]>;
}

const emptyStats = (): Stats => ({ bestStreak: 0, byAnswer: {} });

function loadStats(): Stats {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<Stats> | null;
    return {
      bestStreak: typeof parsed?.bestStreak === "number" ? parsed.bestStreak : 0,
      byAnswer: parsed?.byAnswer && typeof parsed.byAnswer === "object" ? parsed.byAnswer : {},
    };
  } catch {
    return emptyStats();
  }
}

function saveStats(stats: Stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Storage blocked: the quiz works, results just don't stick.
  }
}

export function ChordQuiz({ locale = "en" }: { locale?: Locale }) {
  const u = QUIZ_UI[locale];
  const chordName = (name: string) => chordLetters(name, locale);
  const [level, setLevel] = useState<QuizLevel>("open");
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState({ right: 0, asked: 0 });

  // Chords you are weakest on come back more often.
  const weak = useMemo(
    () =>
      new Set(
        Object.entries(stats.byAnswer)
          .filter(([, [right, asked]]) => asked >= 2 && right / asked < 0.7)
          .map(([slug]) => slug),
      ),
    [stats],
  );

  // Questions are random, so they are made after mount; the server and the
  // first client render both show the skeleton.
  const next = useCallback(
    (lvl: QuizLevel, previous?: string, currentWeak?: Set<string>) => {
      setQuestion(makeQuestion(lvl, Math.random, previous, currentWeak ?? weak));
      setPicked(null);
    },
    [weak],
  );

  useEffect(() => {
    const loaded = loadStats();
    setStats(loaded);
    const weakNow = new Set(
      Object.entries(loaded.byAnswer)
        .filter(([, [r, a]]) => a >= 2 && r / a < 0.7)
        .map(([slug]) => slug),
    );
    setQuestion(makeQuestion("open", Math.random, undefined, weakNow));
  }, []);

  const changeLevel = (lvl: QuizLevel) => {
    setLevel(lvl);
    setStreak(0);
    setScore({ right: 0, asked: 0 });
    next(lvl);
  };

  const answer = useCallback(
    (slug: string) => {
      if (!question || picked) return;
      const correct = slug === question.chord.slug;
      setPicked(slug);
      setScore((s) => ({ right: s.right + (correct ? 1 : 0), asked: s.asked + 1 }));
      const newStreak = correct ? streak + 1 : 0;
      setStreak(newStreak);
      const [r, a] = stats.byAnswer[question.chord.slug] ?? [0, 0];
      const updated: Stats = {
        bestStreak: Math.max(stats.bestStreak, newStreak),
        byAnswer: { ...stats.byAnswer, [question.chord.slug]: [r + (correct ? 1 : 0), a + 1] },
      };
      setStats(updated);
      saveStats(updated);
      logPractice("chord-quiz");
      // Hearing it after an answer ties the sound to the shape.
      strum(fingeringMidiNotes(question.chord.voicings[0].frets));
    },
    [question, picked, streak, stats],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!question) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[1-4]$/.test(event.key)) answer(question.options[Number(event.key) - 1]);
      else if (event.key === "n" || event.key === "N" || event.key === "Enter") {
        if (picked) next(level, question.chord.slug);
      } else if (event.key === "h" || event.key === "H") strum(fingeringMidiNotes(question.chord.voicings[0].frets));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, picked, answer, next, level]);

  const weakList = Object.entries(stats.byAnswer)
    .filter(([, [r, a]]) => a >= 3 && r / a < 0.7)
    .sort((x, y) => x[1][0] / x[1][1] - y[1][0] / y[1][1])
    .slice(0, 6);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented<QuizLevel> label={u.level} value={level} onChange={changeLevel} items={QUIZ_LEVELS.map((l, i) => ({ value: l.id, label: u.levels[i]?.label ?? l.label }))} />
          <div className="flex items-center gap-4 text-sm text-ink-muted tabular-nums">
            <span className="inline-flex items-center gap-1" title={u.streak}><Flame className="h-4 w-4 text-brass" />{streak}</span>
            <span className="inline-flex items-center gap-1" title={u.best}><Trophy className="h-4 w-4 text-brass" />{stats.bestStreak}</span>
            <span>{score.right}/{score.asked}</span>
          </div>
        </div>

        {!question ? (
          <div className="h-72 rounded-2xl bg-surface/30 animate-pulse" aria-hidden="true" />
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <p className="eyebrow">{u.question}</p>
              <ChordDiagram
                voicing={question.chord.voicings[0]}
                title={u.diagram}
                className="h-56 w-auto text-ink"
              />
              <button
                type="button"
                onClick={() => strum(fingeringMidiNotes(question.chord.voicings[0].frets))}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60"
              >
                <Play className="h-4 w-4" /> {u.hear}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {question.options.map((slug, index) => {
                const chord = getChord(slug)!;
                const isAnswer = slug === question.chord.slug;
                const state = picked === null ? "idle" : isAnswer ? "right" : slug === picked ? "wrong" : "dim";
                return (
                  <button
                    key={slug}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => answer(slug)}
                    className={cn(
                      "rounded-2xl border-2 px-4 py-4 text-xl font-bold transition-colors flex items-center justify-between",
                      state === "idle" && "border-line bg-surface/40 text-ink hover:border-brass/60 hover:bg-surface-raised/60",
                      state === "right" && "border-in-tune bg-in-tune/15 text-ink",
                      state === "wrong" && "border-off bg-off/15 text-ink",
                      state === "dim" && "border-line bg-surface/20 text-ink-muted opacity-60",
                    )}
                  >
                    {chordName(chord.name)}
                    <kbd className="text-2xs font-medium text-ink-muted">{index + 1}</kbd>
                  </button>
                );
              })}
            </div>

            <div role="status" aria-live="polite" className="min-h-14 flex flex-wrap items-center justify-between gap-3">
              {picked ? (
                <>
                  <p className="text-sm text-ink-muted">
                    {picked === question.chord.slug ? `${u.correct} ` : `${fmt(u.wrong, { chord: chordName(question.chord.name) })} `}
                    {u.notes} <span className="font-semibold text-ink">{question.chord.notes.map((n) => chordName(n.name)).join(" ")}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => next(level, question.chord.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover"
                    autoFocus
                  >
                    {u.next} <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <p className="text-sm text-ink-muted">{u.hint}</p>
              )}
            </div>
          </>
        )}

        {weakList.length > 0 && (
          <div className="rounded-2xl border border-line bg-surface/30 p-4">
            <p className="eyebrow">{u.revisit}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {weakList.map(([slug, [r, a]]) => (
                <li key={slug} className="rounded-full border border-line px-3 py-1 text-sm text-ink">
                  {chordName(getChord(slug)?.name ?? slug)} <span className="text-ink-muted tabular-nums">{Math.round((r / a) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
