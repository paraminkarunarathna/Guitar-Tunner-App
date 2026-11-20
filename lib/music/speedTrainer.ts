/** Speed trainer maths: the tempo of every bar in a ramp, which bars are
 *  silent, and how long a plan takes. Pure functions, so the page's
 *  server-rendered plan table and the live trainer cannot disagree. */

export const SPEED_MIN_BPM = 30;
export const SPEED_MAX_BPM = 300;

export interface SpeedPlan {
  /** Tempo of the first bar. */
  start: number;
  /** Tempo the ramp stops at. */
  target: number;
  /** BPM added at each step. */
  step: number;
  /** Bars played at each tempo before stepping up. */
  barsPerStep: number;
  /** Beats in a bar. */
  beats: number;
  /** After reaching the target: hold there, or drop back to the start and climb again. */
  atTarget: 'hold' | 'loop';
  /** Gap-click practice: play this many bars with the click… */
  playBars: number;
  /** …then this many with it muted. 0 turns the gap off. */
  muteBars: number;
}

export const DEFAULT_PLAN: SpeedPlan = {
  start: 80,
  target: 120,
  step: 4,
  barsPerStep: 4,
  beats: 4,
  atTarget: 'hold',
  playBars: 3,
  muteBars: 0,
};

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

/** Coerce anything — a URL, old storage — into a plan the trainer can run. */
export function sanitizePlan(input: Partial<Record<keyof SpeedPlan, unknown>>): SpeedPlan {
  const num = (v: unknown, fallback: number, lo: number, hi: number) => {
    const n = Number(v);
    return Number.isFinite(n) ? clamp(Math.round(n), lo, hi) : fallback;
  };
  const start = num(input.start, DEFAULT_PLAN.start, SPEED_MIN_BPM, SPEED_MAX_BPM);
  return {
    start,
    target: num(input.target, Math.max(start, DEFAULT_PLAN.target), SPEED_MIN_BPM, SPEED_MAX_BPM),
    step: num(input.step, DEFAULT_PLAN.step, 1, 40),
    barsPerStep: num(input.barsPerStep, DEFAULT_PLAN.barsPerStep, 1, 32),
    beats: num(input.beats, DEFAULT_PLAN.beats, 2, 7),
    atTarget: input.atTarget === 'loop' ? 'loop' : 'hold',
    playBars: num(input.playBars, DEFAULT_PLAN.playBars, 1, 16),
    muteBars: num(input.muteBars, DEFAULT_PLAN.muteBars, 0, 8),
  };
}

/** How many tempo steps it takes to get from start to target (0 when they match). */
export function stepCount(plan: SpeedPlan): number {
  if (plan.target === plan.start) return 0;
  return Math.ceil(Math.abs(plan.target - plan.start) / plan.step);
}

/** Tempo of bar `bar` (0-based). The last step lands exactly on the target,
 *  never past it, and the ramp works downward too (start above target). */
export function tempoAtBar(plan: SpeedPlan, bar: number): number {
  const steps = stepCount(plan);
  const cycleBars = (steps + 1) * plan.barsPerStep;
  let index = Math.floor(bar / plan.barsPerStep);
  if (plan.atTarget === 'loop' && steps > 0) index = Math.floor((bar % cycleBars) / plan.barsPerStep);
  if (index >= steps) return plan.target;
  const direction = plan.target >= plan.start ? 1 : -1;
  return plan.start + direction * index * plan.step;
}

/** Whether the click is muted in bar `bar` — the gap-click drill. */
export function isSilentBar(plan: SpeedPlan, bar: number): boolean {
  if (plan.muteBars <= 0) return false;
  return bar % (plan.playBars + plan.muteBars) >= plan.playBars;
}

/** Every tempo the ramp visits, with how long it is played. */
export function planSteps(plan: SpeedPlan): { bpm: number; seconds: number }[] {
  const steps = stepCount(plan);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const bpm = tempoAtBar(plan, i * plan.barsPerStep);
    return { bpm, seconds: (plan.barsPerStep * plan.beats * 60) / bpm };
  });
}

/** Time from the first beat to the first bar at the target tempo. */
export function secondsToTarget(plan: SpeedPlan): number {
  return planSteps(plan)
    .slice(0, -1)
    .reduce((sum, step) => sum + step.seconds, 0);
}

export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  return m ? `${m} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`;
}

// ── Saved progress ─────────────────────────────────────────────────────────

export const SPEED_STORAGE_KEY = 'gtp-speed-trainer';

export interface SpeedRecord {
  /** Highest tempo held for at least one full bar. */
  best: number;
  /** When that best was set, YYYY-MM-DD. */
  on: string;
  /** Sessions run on this exercise. */
  sessions: number;
}

export interface SpeedSaved {
  /** Exercise name → record. */
  exercises: Record<string, SpeedRecord>;
  /** Last plan used, so the page reopens where you left it. */
  plan?: SpeedPlan;
  /** Last exercise name used. */
  current?: string;
}

export function loadSpeed(): SpeedSaved {
  try {
    const raw = window.localStorage.getItem(SPEED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && parsed.exercises && typeof parsed.exercises === 'object') {
      return parsed as SpeedSaved;
    }
  } catch {
    // Fall through to empty.
  }
  return { exercises: {} };
}

export function saveSpeed(saved: SpeedSaved) {
  try {
    window.localStorage.setItem(SPEED_STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // Storage blocked: the trainer still runs, the bests just won't stick.
  }
}

/** Fold a finished session into the saved records. Returns the new state and
 *  whether it beat the previous best. */
export function recordSession(
  saved: SpeedSaved,
  exercise: string,
  reached: number,
  today: string,
): { saved: SpeedSaved; personalBest: boolean } {
  const name = exercise.trim().slice(0, 60) || 'My exercise';
  const previous = saved.exercises[name];
  const personalBest = !previous || reached > previous.best;
  const record: SpeedRecord = {
    best: personalBest ? reached : previous.best,
    on: personalBest ? today : previous.on,
    sessions: (previous?.sessions ?? 0) + 1,
  };
  return { saved: { ...saved, exercises: { ...saved.exercises, [name]: record }, current: name }, personalBest };
}
