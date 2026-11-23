/** Three short listening tests built to be shared: perfect pitch, pitch
 *  discrimination ("am I tone deaf?") and high-frequency hearing.
 *
 *  This file is the part both sides need — the client components that run
 *  the tests, and the server routes that draw share cards and landing pages
 *  for a result. A result travels as one number in a URL (`?t=&s=`), so
 *  everything here treats it as a claim: parsed, clamped, never trusted. */

import { LOCALES, type Locale } from './i18n/tuner';
import { TESTS_UI } from './i18n/tools/testsUi';
import { fmt } from './i18n/tools/ui';

export type MusicTestId = 'perfect-pitch' | 'tone-deaf' | 'hearing-age';

export interface MusicTestDef {
  id: MusicTestId;
  href: string;
  name: string;
  /** Short question for cards and the share landing page. */
  question: string;
  /** Unit phrase for the score in copy. */
  unit: string;
  /** Lowest and highest score a URL may carry. */
  min: number;
  max: number;
  /** Which way is better, for "beat your friend". */
  higherIsBetter: boolean;
  /** Practice-log activity id, so a test counts toward the day's streak. */
  activity: string;
}

export const PERFECT_PITCH_ROUNDS = 12;

/** Frequencies the hearing test steps through, low to high. 8 kHz is the
 *  floor: nearly everyone hears it, so failing it means the volume or the
 *  speaker, not the ears. */
export const HEARING_STEPS = [8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];

export const MUSIC_TESTS: Record<MusicTestId, MusicTestDef> = {
  'perfect-pitch': {
    id: 'perfect-pitch',
    href: '/perfect-pitch-test',
    name: 'Perfect Pitch Test',
    question: 'Can you name a note with no reference?',
    unit: `out of ${PERFECT_PITCH_ROUNDS}`,
    min: 0,
    max: PERFECT_PITCH_ROUNDS,
    higherIsBetter: true,
    activity: 'perfect-pitch-test',
  },
  'tone-deaf': {
    id: 'tone-deaf',
    href: '/tone-deaf-test',
    name: 'Tone Deaf Test',
    question: 'How small a pitch change can you hear?',
    unit: 'cents',
    min: 1,
    max: 300,
    higherIsBetter: false,
    activity: 'tone-deaf-test',
  },
  'hearing-age': {
    id: 'hearing-age',
    href: '/hearing-age-test',
    name: 'Hearing Age Test',
    question: 'How high can you hear?',
    unit: 'Hz',
    min: 0,
    max: 20000,
    higherIsBetter: true,
    activity: 'hearing-age-test',
  },
};

export const MUSIC_TEST_IDS = Object.keys(MUSIC_TESTS) as MusicTestId[];

export const isMusicTestId = (value: unknown): value is MusicTestId =>
  typeof value === 'string' && value in MUSIC_TESTS;

// ── Verdicts ────────────────────────────────────────────────────────────────

export interface Verdict {
  /** The big line: "9/12", "8 cents", "17 kHz". */
  score: string;
  /** Short label for the result tier. */
  tier: string;
  /** One or two sentences on what the score means. */
  detail: string;
  /** Rough standing, 0–1, for a meter. Not a population percentile. */
  level: number;
}

const khz = (hz: number) => `${Number((hz / 1000).toFixed(1))} kHz`;

/** A tier inside a sentence: lower-cased, except in German, where nouns
 *  keep their capital. */
export const tierInSentence = (tier: string, locale: Locale) => (locale === 'de' ? tier : tier.toLowerCase());

export function perfectPitchVerdict(score: number, locale: Locale = 'en'): Verdict {
  const s = clamp(score, 0, PERFECT_PITCH_ROUNDS);
  const band = s >= 11 ? 0 : s >= 8 ? 1 : s >= 5 ? 2 : s >= 3 ? 3 : 4;
  return { score: `${s}/${PERFECT_PITCH_ROUNDS}`, level: s / PERFECT_PITCH_ROUNDS, ...TESTS_UI[locale].pp[band] };
}

/** Upper edge of each tone-deaf band, in cents; anything above the last is
 *  the final band. */
export const TONE_DEAF_BANDS = [5, 12, 25, 60, 110];

export function toneDeafVerdict(cents: number, locale: Locale = 'en'): Verdict {
  const ui = TESTS_UI[locale];
  const c = clamp(cents, 1, 300);
  const band = TONE_DEAF_BANDS.findIndex((edge) => c <= edge);
  const text = ui.td[band < 0 ? TONE_DEAF_BANDS.length : band];
  return {
    score: c === 1 ? ui.cent1 : fmt(ui.cents, { n: c }),
    // log scale: 1 ¢ → 1, 300 ¢ → 0
    level: 1 - Math.log(c) / Math.log(300),
    tier: text.tier,
    detail: fmt(text.detail, { c }),
  };
}

/** Rule-of-thumb ages for the highest frequency heard. High-frequency hearing
 *  falls steadily with age (presbycusis), but noise exposure and the device
 *  matter as much — the copy says so wherever this is shown. Labels for
 *  other languages are aligned with this list in TESTS_UI. */
export const HEARING_AGE: { hz: number; age: string }[] = [
  { hz: 19000, age: 'under 20' },
  { hz: 18000, age: 'under 25' },
  { hz: 17000, age: 'under 30' },
  { hz: 16000, age: 'under 40' },
  { hz: 15000, age: 'under 45' },
  { hz: 14000, age: 'under 50' },
  { hz: 12000, age: 'under 60' },
  { hz: 10000, age: 'under 70' },
  { hz: 8000, age: '70 or over' },
];

const hearingRow = (hz: number) => HEARING_AGE.findIndex((row) => hz >= row.hz);

export function hearingAge(hz: number, locale: Locale = 'en'): string | null {
  const i = hearingRow(hz);
  return i < 0 ? null : TESTS_UI[locale].ha.ages[i];
}

export function hearingVerdict(hz: number, locale: Locale = 'en'): Verdict {
  const ha = TESTS_UI[locale].ha;
  const h = clamp(hz, 0, 20000);
  const i = hearingRow(h);
  if (i < 0) return { score: ha.belowScore, level: 0, ...ha.below };
  return {
    score: khz(h),
    level: (h - 8000) / 12000,
    tier: fmt(ha.tier, { age: ha.ages[i] }),
    detail: fmt(ha.detail, { khz: khz(h), people: ha.people[i] }),
  };
}

export function verdictFor(id: MusicTestId, score: number, locale: Locale = 'en'): Verdict {
  if (id === 'perfect-pitch') return perfectPitchVerdict(score, locale);
  if (id === 'tone-deaf') return toneDeafVerdict(score, locale);
  return hearingVerdict(score, locale);
}

/** The test's name in a language. */
export const testName = (id: MusicTestId, locale: Locale = 'en') => TESTS_UI[locale].names[id];

/** First-person headline for a share: "I scored 9/12 on the perfect pitch test". */
export function brag(id: MusicTestId, score: number, locale: Locale = 'en'): string {
  const ui = TESTS_UI[locale];
  const v = verdictFor(id, score, locale);
  if (id === 'hearing-age' && score < 8000) return ui.brag.hearingNone;
  return fmt(ui.brag[id], { score: v.score, tier: tierInSentence(v.tier, locale) });
}

/** Third-person version for the landing page a share opens on. */
export function friendLine(id: MusicTestId, score: number, locale: Locale = 'en'): string {
  const ui = TESTS_UI[locale];
  if (id === 'hearing-age' && score < 8000) return ui.friend.hearingNone;
  return fmt(ui.friend[id], { score: verdictFor(id, score, locale).score });
}

/** +1 when `mine` beats `theirs`, -1 when it loses, 0 for a tie. */
export function compareScores(id: MusicTestId, mine: number, theirs: number): -1 | 0 | 1 {
  if (mine === theirs) return 0;
  const better = MUSIC_TESTS[id].higherIsBetter ? mine > theirs : mine < theirs;
  return better ? 1 : -1;
}

export function isBetter(id: MusicTestId, a: number, b: number | null | undefined) {
  return b === null || b === undefined || compareScores(id, a, b) === 1;
}

// ── Share URLs ──────────────────────────────────────────────────────────────

export const SITE_URL = 'https://www.guitartunepro.com';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function parseScore(id: MusicTestId, raw: string | string[] | null | undefined): number | null {
  const n = Number.parseInt(Array.isArray(raw) ? raw[0] : raw ?? '', 10);
  if (!Number.isFinite(n)) return null;
  const { min, max } = MUSIC_TESTS[id];
  return clamp(n, min, max);
}

/** The language a share link was made in (`l=`), English when absent. */
export function parseLocale(raw: string | string[] | null | undefined): Locale {
  const l = Array.isArray(raw) ? raw[0] : raw;
  return (LOCALES as string[]).includes(l ?? '') ? (l as Locale) : 'en';
}

export function parseShareParams(get: (key: string) => string | string[] | null | undefined) {
  const raw = get('t');
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!isMusicTestId(id)) return null;
  const score = parseScore(id, get('s'));
  return score === null ? null : { id, score, locale: parseLocale(get('l')) };
}

/** Each test's page — and the hub's — in every language. The translated
 *  tools registry (lib/i18n/pages) reads these, so links from inside the
 *  tests and the routes themselves cannot disagree. */
export const TEST_PATHS: Record<MusicTestId | 'hub', Record<Locale, string>> = {
  'perfect-pitch': {
    en: '/perfect-pitch-test',
    es: '/es/test-de-oido-absoluto',
    pt: '/pt/teste-de-ouvido-absoluto',
    fr: '/fr/test-oreille-absolue',
    de: '/de/absolutes-gehoer-test',
  },
  'tone-deaf': {
    en: '/tone-deaf-test',
    es: '/es/test-de-oido-musical',
    pt: '/pt/teste-de-ouvido-musical',
    fr: '/fr/test-oreille-musicale',
    de: '/de/tontaub-test',
  },
  'hearing-age': {
    en: '/hearing-age-test',
    es: '/es/test-de-edad-auditiva',
    pt: '/pt/teste-de-idade-auditiva',
    fr: '/fr/test-age-auditif',
    de: '/de/hoeralter-test',
  },
  hub: {
    en: '/music-tests',
    es: '/es/tests-musicales',
    pt: '/pt/testes-musicais',
    fr: '/fr/tests-musicaux',
    de: '/de/musiktests',
  },
};

export const shareQuery = (id: MusicTestId, score: number, locale: Locale = 'en') =>
  `t=${id}&s=${score}${locale === 'en' ? '' : `&l=${locale}`}`;
export const sharePath = (id: MusicTestId, score: number, locale: Locale = 'en') =>
  `/share/test?${shareQuery(id, score, locale)}`;
export const challengePath = (id: MusicTestId, score: number, locale: Locale = 'en') =>
  `${TEST_PATHS[id][locale]}?vs=${score}`;

// ── Saved results ───────────────────────────────────────────────────────────

export const TESTS_STORAGE_KEY = 'gtp-music-tests';

export interface TestRecord {
  best: number;
  last: number;
  plays: number;
  /** YYYY-MM-DD of the best result. */
  on: string;
}

export type TestResults = Partial<Record<MusicTestId, TestRecord>>;

export function sanitizeResults(value: unknown): TestResults {
  const out: TestResults = {};
  if (!value || typeof value !== 'object') return out;
  for (const id of MUSIC_TEST_IDS) {
    const rec = (value as Record<string, Partial<TestRecord>>)[id];
    if (!rec || typeof rec.best !== 'number') continue;
    const { min, max } = MUSIC_TESTS[id];
    out[id] = {
      best: clamp(rec.best, min, max),
      last: clamp(typeof rec.last === 'number' ? rec.last : rec.best, min, max),
      plays: Math.max(1, Math.round(Number(rec.plays) || 1)),
      on: typeof rec.on === 'string' ? rec.on : '',
    };
  }
  return out;
}

/** Keep the better best on each side — used by the progress backup. */
export function mergeResults(a: TestResults, b: TestResults): TestResults {
  const out: TestResults = { ...a };
  for (const id of MUSIC_TEST_IDS) {
    const mine = a[id];
    const theirs = b[id];
    if (!theirs) continue;
    if (!mine) {
      out[id] = theirs;
      continue;
    }
    const theirsWins = compareScores(id, theirs.best, mine.best) === 1;
    out[id] = {
      best: theirsWins ? theirs.best : mine.best,
      on: theirsWins ? theirs.on : mine.on,
      last: mine.last,
      plays: Math.max(mine.plays, theirs.plays),
    };
  }
  return out;
}

export function loadResults(): TestResults {
  try {
    return sanitizeResults(JSON.parse(window.localStorage.getItem(TESTS_STORAGE_KEY) ?? 'null'));
  } catch {
    return {};
  }
}

/** Record a finished test; returns the updated record and whether it is a
 *  new personal best. */
export function saveResult(id: MusicTestId, score: number, today: string): { record: TestRecord; newBest: boolean } {
  const all = loadResults();
  const prev = all[id];
  const newBest = !prev || compareScores(id, score, prev.best) === 1;
  const record: TestRecord = {
    best: newBest ? score : prev!.best,
    on: newBest ? today : prev!.on,
    last: score,
    plays: (prev?.plays ?? 0) + 1,
  };
  all[id] = record;
  try {
    window.localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Storage blocked: the result still shows and shares.
  }
  return { record, newBest };
}

// ── Test logic (pure, so it can be checked outside a browser) ───────────────

/** Twelve notes between C3 and B5, never the same pitch class twice in a
 *  row and never in the same octave as the last one, so the previous note
 *  is a weaker clue. */
export function perfectPitchSequence(rounds = PERFECT_PITCH_ROUNDS, random = Math.random): number[] {
  const out: number[] = [];
  while (out.length < rounds) {
    const midi = 48 + Math.floor(random() * 36);
    const prev = out[out.length - 1];
    if (prev !== undefined && (midi % 12 === prev % 12 || Math.abs(midi - prev) < 3)) continue;
    out.push(midi);
  }
  return out;
}

/** Semitones between two pitch classes, the short way round (0–6). */
export function pitchClassDistance(a: number, b: number) {
  const d = Math.abs((((a - b) % 12) + 12) % 12);
  return Math.min(d, 12 - d);
}

/** Adaptive staircase for the pitch-discrimination test: 2-down/1-up,
 *  which converges on the difference heard correctly about 71% of the time
 *  (Levitt, 1971). Steps shrink by ×0.7 after two right answers and grow by
 *  ×1.4 after a wrong one. */
export interface Staircase {
  cents: number;
  correctRun: number;
  /** Direction of the last change: -1 harder, +1 easier. */
  lastMove: -1 | 0 | 1;
  reversals: number[];
  trials: number;
  /** Times a "harder" step was asked for at the 1-cent floor. */
  floorHits: number;
}

export const STAIRCASE_START = 100;
export const STAIRCASE_REVERSALS = 8;
export const STAIRCASE_MAX_TRIALS = 45;

export const newStaircase = (): Staircase => ({ cents: STAIRCASE_START, correctRun: 0, lastMove: 0, reversals: [], trials: 0, floorHits: 0 });

export function stepStaircase(s: Staircase, correct: boolean): Staircase {
  let { cents, correctRun, lastMove } = s;
  const reversals = [...s.reversals];
  let move: -1 | 0 | 1 = 0;
  let floorHits = s.floorHits;
  if (correct) {
    correctRun += 1;
    if (correctRun >= 2) {
      move = -1;
      correctRun = 0;
    }
  } else {
    move = 1;
    correctRun = 0;
  }
  if (move !== 0) {
    if (lastMove !== 0 && move !== lastMove) reversals.push(cents);
    if (move === -1 && cents <= 1) floorHits += 1;
    cents = move === -1 ? Math.max(1, cents * 0.7) : Math.min(300, cents * 1.4);
    lastMove = move;
  }
  return { cents, correctRun, lastMove, reversals, trials: s.trials + 1, floorHits };
}

/** Done after enough reversals, a trial cap, or a listener who keeps
 *  getting the smallest step right — there is nowhere further to go. */
export const staircaseDone = (s: Staircase) =>
  s.reversals.length >= STAIRCASE_REVERSALS || s.trials >= STAIRCASE_MAX_TRIALS || s.floorHits >= 2;

/** Threshold: geometric mean of the last six reversals (the first two are
 *  still homing in), or the current step if there were too few. */
export function staircaseThreshold(s: Staircase): number {
  if (s.floorHits >= 2) return 1;
  const tail = s.reversals.slice(-6);
  const value = tail.length >= 2 ? Math.exp(tail.reduce((sum, c) => sum + Math.log(c), 0) / tail.length) : s.cents;
  return Math.min(300, Math.max(1, Math.round(value)));
}
