"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Ear, Music, Trophy, Waves } from "lucide-react";
import type { Locale } from "@/lib/i18n/tuner";
import { TESTS_UI } from "@/lib/i18n/tools/testsUi";
import { fmt } from "@/lib/i18n/tools/ui";
import { MUSIC_TEST_IDS, TEST_PATHS, loadResults, testName, verdictFor, type MusicTestId, type TestResults } from "@/lib/musicTests";

const ICONS: Record<MusicTestId, typeof Ear> = {
  "perfect-pitch": Music,
  "tone-deaf": Waves,
  "hearing-age": Ear,
};

/** The three tests as cards, each with the visitor's best score once they
 *  have one — a reason to come back and beat it. */
export function TestHub({ locale = "en" }: { locale?: Locale }) {
  const ui = TESTS_UI[locale];
  const [results, setResults] = useState<TestResults>({});
  useEffect(() => setResults(loadResults()), []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 grid gap-4 md:grid-cols-3">
      {MUSIC_TEST_IDS.map((id) => {
        const Icon = ICONS[id];
        const best = results[id];
        return (
          <Link
            key={id}
            href={TEST_PATHS[id][locale]}
            className="group flex flex-col rounded-3xl border border-line bg-surface-sunken/30 p-6 hover:border-brass/40 hover:bg-brass/5 transition-colors"
          >
            <Icon className="h-8 w-8 text-brass mb-4" />
            <h2 className="text-xl font-bold text-ink group-hover:text-brass-hover transition-colors">{testName(id, locale)}</h2>
            <p className="mt-1 text-sm font-semibold text-ink-muted">{ui.questions[id]}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{ui.hubBlurbs[id]}</p>
            <p className="mt-4 min-h-[1.25rem] text-sm text-ink-muted">
              {best ? (
                <span className="inline-flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-brass" />
                  {fmt(ui.yourBest, { score: verdictFor(id, best.best, locale).score })}
                </span>
              ) : (
                ui.hubMinutes
              )}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brass group-hover:translate-x-1 transition-transform">
              {best ? ui.hubBeat : ui.hubTake} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
