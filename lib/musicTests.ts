/** Three short listening tests built to be shared: perfect pitch, pitch
 *  discrimination ("am I tone deaf?") and high-frequency hearing.
 *
 *  This file is the part both sides need — the client components that run
 *  the tests, and the server routes that draw share cards and landing pages
 *  for a result. A result travels as one number in a URL (`?t=&s=`), so
 *  everything here treats it as a claim: parsed, clamped, never trusted. */

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
  /** The big line: "9 out of 12", "8 cents", "17 kHz". */
  score: string;
  /** Short label for the result tier. */
  tier: string;
  /** One or two sentences on what the score means. */
  detail: string;
  /** Rough standing, 0–1, for a meter. Not a population percentile. */
  level: number;
}

const khz = (hz: number) => `${Number((hz / 1000).toFixed(1))} kHz`;

export function perfectPitchVerdict(score: number): Verdict {
  const s = clamp(score, 0, PERFECT_PITCH_ROUNDS);
  const base = { score: `${s}/${PERFECT_PITCH_ROUNDS}`, level: s / PERFECT_PITCH_ROUNDS };
  if (s >= 11)
    return { ...base, tier: 'Perfect pitch', detail: 'You named almost every note with no reference — the signature of absolute pitch, which is often estimated at around 1 in 10,000 people.' };
  if (s >= 8)
    return { ...base, tier: 'Strong pitch memory', detail: 'Well above chance. You hold a stable memory of what notes sound like — many people with absolute pitch score here on unfamiliar timbres.' };
  if (s >= 5)
    return { ...base, tier: 'Good pitch memory', detail: 'Clearly better than guessing (chance is 1 in 12). Some notes are anchored in your memory, likely from songs or an instrument you know well.' };
  if (s >= 3)
    return { ...base, tier: 'Above chance', detail: 'A little better than guessing. Most musicians land here: they hear relationships between notes, not each note on its own.' };
  return { ...base, tier: 'Relative pitch listener', detail: 'Like the vast majority of musicians, you hear notes in relation to each other. That is the skill that matters most — and it can be trained.' };
}

export function toneDeafVerdict(cents: number): Verdict {
  const c = clamp(cents, 1, 300);
  const score = `${c} cent${c === 1 ? '' : 's'}`;
  // log scale: 1 ¢ → 1, 300 ¢ → 0
  const level = 1 - Math.log(c) / Math.log(300);
  if (c <= 5)
    return { score, level, tier: 'Exceptional pitch hearing', detail: `You heard a change of ${c}¢ — a twentieth of a semitone. That is the range of trained musicians and piano tuners.` };
  if (c <= 12)
    return { score, level, tier: 'Excellent pitch hearing', detail: 'Finer than most listeners. Small tuning errors on a guitar string will bother you, which is a good thing.' };
  if (c <= 25)
    return { score, level, tier: 'Good — not tone deaf', detail: 'A normal, healthy ability to hear pitch. You can tell when a string is noticeably out of tune by ear.' };
  if (c <= 60)
    return { score, level, tier: 'Fair — not tone deaf', detail: 'You hear pitch changes well under a semitone, which is all music needs. Training sharpens this quickly.' };
  if (c <= 110)
    return { score, level, tier: 'Below average', detail: 'You can hear about a semitone, the smallest step in Western music. Retake it with headphones in a quiet room — tiredness and noise cost a lot.' };
  return { score, level, tier: 'Possible pitch difficulty', detail: 'Changes smaller than a semitone were hard to hear. That can point to congenital amusia (true tone deafness, in roughly 1.5–4% of people) — but this is a browser test, not a diagnosis.' };
}

/** Rule-of-thumb ages for the highest frequency heard. High-frequency hearing
 *  falls steadily with age (presbycusis), but noise exposure and the device
 *  matter as much — the copy says so wherever this is shown. */
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

export function hearingAge(hz: number): string | null {
  return HEARING_AGE.find((row) => hz >= row.hz)?.age ?? null;
}

export function hearingVerdict(hz: number): Verdict {
  const h = clamp(hz, 0, 20000);
  const age = hearingAge(h);
  const level = h < 8000 ? 0 : (h - 8000) / 12000;
  if (!age)
    return { score: 'Below 8 kHz', level: 0, tier: 'Check your sound', detail: 'Almost everyone can hear 8 kHz, so this usually means the volume was too low or the speaker cannot play it. Try headphones.' };
  return {
    score: khz(h),
    level,
    tier: `Hearing age: ${age}`,
    detail: `The highest tone you heard was ${khz(h)}, typical of people ${age === '70 or over' ? 'aged 70 or over' : age}. Noise exposure and your speakers affect this as much as age does.`,
  };
}

export function verdictFor(id: MusicTestId, score: number): Verdict {
  if (id === 'perfect-pitch') return perfectPitchVerdict(score);
  if (id === 'tone-deaf') return toneDeafVerdict(score);
  return hearingVerdict(score);
}

/** First-person headline for a share: "I scored 9/12 on the perfect pitch test". */
export function brag(id: MusicTestId, score: number): string {
  const v = verdictFor(id, score);
  if (id === 'perfect-pitch') return `I scored ${v.score} on the perfect pitch test`;
  if (id === 'tone-deaf') return `I can hear a pitch change of ${v.score}`;
  return score >= 8000 ? `I can hear up to ${v.score} — ${v.tier.toLowerCase()}` : 'I took the hearing age test';
}

/** Third-person version for the landing page a share opens on. */
export function friendLine(id: MusicTestId, score: number): string {
  const v = verdictFor(id, score);
  if (id === 'perfect-pitch') return `Your friend scored ${v.score} on the perfect pitch test`;
  if (id === 'tone-deaf') return `Your friend can hear a pitch change of ${v.score}`;
  return score >= 8000 ? `Your friend can hear up to ${v.score}` : 'Your friend took the hearing age test';
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

export function parseShareParams(get: (key: string) => string | string[] | null | undefined) {
  const raw = get('t');
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!isMusicTestId(id)) return null;
  const score = parseScore(id, get('s'));
  return score === null ? null : { id, score };
}

export const shareQuery = (id: MusicTestId, score: number) => `t=${id}&s=${score}`;
export const sharePath = (id: MusicTestId, score: number) => `/share/test?${shareQuery(id, score)}`;
export const challengePath = (id: MusicTestId, score: number) => `${MUSIC_TESTS[id].href}?vs=${score}`;

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

export const NOTE_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
/** Both spellings on the black keys, for answer buttons. */
export const NOTE_BUTTON_LABELS = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'];

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
