"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Ear, Music, Trophy, Waves } from "lucide-react";
import { MUSIC_TESTS, MUSIC_TEST_IDS, loadResults, verdictFor, type MusicTestId, type TestResults } from "@/lib/musicTests";

const ICONS: Record<MusicTestId, typeof Ear> = {
  "perfect-pitch": Music,
  "tone-deaf": Waves,
  "hearing-age": Ear,
};

const BLURBS: Record<MusicTestId, string> = {
  "perfect-pitch": "Twelve notes with no reference. Name each one — chance is 1 in 12, perfect pitch is 12 for 12.",
  "tone-deaf": "Higher or lower? It narrows the gap until it finds the smallest pitch change you can hear, in cents.",
  "hearing-age": "Tones from 8 to 20 kHz. The highest one you hear shows how old your ears sound.",
};

/** The three tests as cards, each with the visitor's best score once they
 *  have one — a reason to come back and beat it. */
export function TestHub() {
  const [results, setResults] = useState<TestResults>({});
  useEffect(() => setResults(loadResults()), []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 grid gap-4 md:grid-cols-3">
      {MUSIC_TEST_IDS.map((id) => {
        const test = MUSIC_TESTS[id];
        const Icon = ICONS[id];
        const best = results[id];
        return (
          <Link
            key={id}
            href={test.href}
            className="group flex flex-col rounded-3xl border border-line bg-surface-sunken/30 p-6 hover:border-brass/40 hover:bg-brass/5 transition-colors"
          >
            <Icon className="h-8 w-8 text-brass mb-4" />
            <h2 className="text-xl font-bold text-ink group-hover:text-brass-hover transition-colors">{test.name}</h2>
            <p className="mt-1 text-sm font-semibold text-ink-muted">{test.question}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{BLURBS[id]}</p>
            <p className="mt-4 min-h-[1.25rem] text-sm text-ink-muted">
              {best ? (
                <span className="inline-flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-brass" /> Your best: <strong className="text-ink tabular-nums">{verdictFor(id, best.best).score}</strong>
                </span>
              ) : (
                "About 2 minutes"
              )}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brass group-hover:translate-x-1 transition-transform">
              {best ? "Beat your score" : "Take the test"} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
