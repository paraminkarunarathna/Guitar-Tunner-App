/** Question generation for the chord quiz: show a chord shape, name it. */

import { CHORDS, fingeringPitchClasses, type Chord } from "@/lib/chords";

export type QuizLevel = "open" | "more" | "all";

export const QUIZ_LEVELS: { id: QuizLevel; label: string; blurb: string }[] = [
  { id: "open", label: "Open major & minor", blurb: "The first chords everyone learns" },
  { id: "more", label: "All open chords", blurb: "Adds sevenths, sus and more" },
  { id: "all", label: "Everything", blurb: "Barre shapes and every quality" },
];

const hasOpen = (chord: Chord) => chord.voicings[0]?.label === "Open position";

/** Chords a level may ask about. */
export function quizPool(level: QuizLevel): Chord[] {
  if (level === "all") return CHORDS;
  if (level === "more") return CHORDS.filter(hasOpen);
  return CHORDS.filter((c) => hasOpen(c) && (c.quality.slug === "major" || c.quality.slug === "minor"));
}

/** The pitch classes a chord's first shape sounds, as a comparable key. Two
 *  chords with the same key (C6 and Am7) sound the same notes, so a shape
 *  could honestly be named either way — they never appear in one question. */
const noteKey = (chord: Chord) =>
  [...new Set(fingeringPitchClasses(chord.voicings[0].frets))].sort((a, b) => a - b).join(",");

export interface QuizQuestion {
  chord: Chord;
  /** Four chord slugs, shuffled, one of them the answer. */
  options: string[];
}

const shuffle = <T,>(items: T[], random: () => number): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/** One question. Wrong answers favour chords that look alike — the same
 *  root or the same quality — because telling C from D is not the skill,
 *  telling C from Cm or C7 is. */
export function makeQuestion(
  level: QuizLevel,
  random: () => number = Math.random,
  avoidSlug?: string,
  weak: Set<string> = new Set(),
): QuizQuestion {
  const pool = quizPool(level);
  // Chords you get wrong are twice as likely to come back.
  const weighted = pool.filter((c) => c.slug !== avoidSlug).flatMap((c) => (weak.has(c.slug) ? [c, c] : [c]));
  const chord = weighted[Math.floor(random() * weighted.length)];
  const answerKey = noteKey(chord);

  const others = pool.filter((c) => c.slug !== chord.slug && noteKey(c) !== answerKey);
  const similar = others.filter((c) => c.root.slug === chord.root.slug || c.quality.slug === chord.quality.slug);
  const rest = others.filter((c) => !similar.includes(c));
  const wrong = [...shuffle(similar, random), ...shuffle(rest, random)].slice(0, 3);

  return { chord, options: shuffle([chord, ...wrong], random).map((c) => c.slug) };
}
