/** String life estimates and the on-device string change log.
 *
 *  There is no exact rule for when strings die — sweat, playing style and
 *  climate matter as much as hours. The model below is deliberately simple
 *  and conservative, calibrated to the ranges string makers publish:
 *  roughly every 6–8 weeks for someone playing a few hours a week, 2–3
 *  months for regular players, 3–6 months for casual ones, with coated
 *  strings lasting several times longer. It is an estimate to plan around;
 *  how the strings sound and feel always wins. */

export type StringKind = 'electric' | 'acoustic' | 'classical' | 'bass';
export type Sweat = 'dry' | 'normal' | 'heavy';

export const STRING_KINDS: { value: StringKind; label: string; detail: string }[] = [
  { value: 'electric', label: 'Electric', detail: 'Nickel-wound steel' },
  { value: 'acoustic', label: 'Acoustic', detail: 'Bronze / phosphor bronze' },
  { value: 'classical', label: 'Classical', detail: 'Nylon' },
  { value: 'bass', label: 'Bass', detail: 'Roundwound bass' },
];

/** Hours of playing before an uncoated set typically sounds dull. Bronze
 *  oxidises faster than nickel; bass and nylon sets keep usable tone longer. */
const BASE_HOURS: Record<StringKind, number> = {
  electric: 35,
  acoustic: 30,
  classical: 45,
  bass: 70,
};

/** Coated strings: makers claim 3–5×; 2.5× keeps the estimate honest. */
const COATED_FACTOR = 2.5;
const SWEAT_FACTOR: Record<Sweat, number> = { dry: 1.25, normal: 1, heavy: 0.6 };

/** Strings corrode on the wall too, so even an unplayed set ages out. */
const MAX_DAYS = { uncoated: 180, coated: 365 };

export interface StringSetup {
  kind: StringKind;
  coated: boolean;
  sweat: Sweat;
  hoursPerWeek: number;
}

/** Estimated useful life of a set, in days. */
export function lifeDays(setup: StringSetup): number {
  const hours = BASE_HOURS[setup.kind] * (setup.coated ? COATED_FACTOR : 1) * SWEAT_FACTOR[setup.sweat];
  const perWeek = Math.max(0.25, setup.hoursPerWeek);
  const byPlay = (hours / perWeek) * 7;
  return Math.round(Math.min(byPlay, setup.coated ? MAX_DAYS.coated : MAX_DAYS.uncoated));
}

/** Rounded to whole weeks for display, with months once it is long. */
export function describeLife(days: number): string {
  const weeks = Math.round(days / 7);
  if (weeks < 9) return `${weeks} week${weeks === 1 ? '' : 's'}`;
  const months = Math.round(days / 30.4);
  return `${months} months`;
}

// ── Dates ──────────────────────────────────────────────────────────────────

/** YYYY-MM-DD in local time → Date at local midnight. */
export const parseDay = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const daysBetween = (from: Date, to: Date) => Math.round((to.getTime() - from.getTime()) / 86_400_000);

export function addDays(key: string, days: number): string {
  const date = parseDay(key);
  date.setDate(date.getDate() + days);
  return dayKey(date);
}

// ── Saved guitars ─────────────────────────────────────────────────────────

export interface TrackedGuitar extends StringSetup {
  id: string;
  name: string;
  /** Last string change, YYYY-MM-DD. */
  changedOn: string;
  /** Earlier changes, newest first. */
  history: string[];
}

export const STRINGS_STORAGE_KEY = 'gtp-strings';

export interface StringStatus {
  life: number;
  age: number;
  /** 0 = fresh, 1 = due, can exceed 1. */
  wear: number;
  dueOn: string;
  level: 'fresh' | 'good' | 'soon' | 'due';
}

export function stringStatus(guitar: TrackedGuitar, today = new Date()): StringStatus {
  const life = lifeDays(guitar);
  const age = Math.max(0, daysBetween(parseDay(guitar.changedOn), parseDay(dayKey(today))));
  const wear = age / life;
  return {
    life,
    age,
    wear,
    dueOn: addDays(guitar.changedOn, life),
    level: wear >= 1 ? 'due' : wear >= 0.8 ? 'soon' : wear >= 0.25 ? 'good' : 'fresh',
  };
}

const KINDS = new Set(STRING_KINDS.map((k) => k.value));
const isDay = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

/** Validate stored or imported guitars, dropping anything malformed. */
export function sanitizeGuitars(value: unknown): TrackedGuitar[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((g) => g && typeof g === 'object' && typeof g.id === 'string' && isDay(g.changedOn))
    .map((g) => ({
      id: String(g.id).slice(0, 40),
      name: String(g.name ?? 'Guitar').slice(0, 40) || 'Guitar',
      kind: KINDS.has(g.kind) ? g.kind : 'electric',
      coated: !!g.coated,
      sweat: g.sweat === 'dry' || g.sweat === 'heavy' ? g.sweat : 'normal',
      hoursPerWeek: Math.min(60, Math.max(0.25, Number(g.hoursPerWeek) || 3)),
      changedOn: g.changedOn,
      history: Array.isArray(g.history) ? g.history.filter(isDay).slice(0, 20) : [],
    }))
    .slice(0, 12);
}

export function loadGuitars(): TrackedGuitar[] {
  try {
    const raw = window.localStorage.getItem(STRINGS_STORAGE_KEY);
    return raw ? sanitizeGuitars(JSON.parse(raw)?.guitars) : [];
  } catch {
    return [];
  }
}

export function saveGuitars(guitars: TrackedGuitar[]) {
  try {
    window.localStorage.setItem(STRINGS_STORAGE_KEY, JSON.stringify({ guitars }));
  } catch {
    // Storage blocked: the page still works for this visit.
  }
}

/** Merge two devices' lists: same guitar keeps its latest change and every
 *  date either device saw. Used by the progress transfer. */
export function mergeGuitars(a: TrackedGuitar[], b: TrackedGuitar[]): TrackedGuitar[] {
  const out = new Map(a.map((g) => [g.id, g]));
  for (const g of b) {
    const mine = out.get(g.id);
    if (!mine) {
      out.set(g.id, g);
      continue;
    }
    const newer = g.changedOn > mine.changedOn ? g : mine;
    const dates = [...new Set([mine.changedOn, g.changedOn, ...mine.history, ...g.history])]
      .filter((d) => d !== newer.changedOn)
      .sort()
      .reverse()
      .slice(0, 20);
    out.set(g.id, { ...newer, history: dates });
  }
  return [...out.values()].slice(0, 12);
}

/** A calendar file with one all-day reminder, for any calendar app. */
export function reminderIcs(guitar: TrackedGuitar, dueOn: string, url: string): string {
  const day = dueOn.replace(/-/g, '');
  const next = addDays(dueOn, 1).replace(/-/g, '');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const escape = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GuitarTunePro//String Change Tracker//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:strings-${guitar.id}-${day}@guitartunepro.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${next}`,
    `SUMMARY:${escape(`Change strings: ${guitar.name}`)}`,
    `DESCRIPTION:${escape(`Estimated from your playing. Check how they sound and feel, then log the change at ${url}`)}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escape(`Time to check the strings on ${guitar.name}`)}`,
    'TRIGGER:PT9H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
