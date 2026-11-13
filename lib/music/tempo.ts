/** Tempo maths for the tap-tempo tool and its reference table. */

export interface TempoMarking {
  name: string;
  /** Inclusive lower bound, BPM. */
  from: number;
  /** Inclusive upper bound, BPM. */
  to: number;
  feel: string;
}

/** The common Italian markings with the BPM ranges most metronome makers
 *  print on their dials. Ranges abut: each starts one past the last. */
export const TEMPO_MARKINGS: TempoMarking[] = [
  { name: "Grave", from: 20, to: 40, feel: "Very slow and solemn" },
  { name: "Largo", from: 41, to: 60, feel: "Slow and broad" },
  { name: "Adagio", from: 61, to: 76, feel: "Slow and at ease" },
  { name: "Andante", from: 77, to: 108, feel: "A walking pace" },
  { name: "Moderato", from: 109, to: 120, feel: "Moderate" },
  { name: "Allegro", from: 121, to: 156, feel: "Fast and lively" },
  { name: "Vivace", from: 157, to: 176, feel: "Lively and quick" },
  { name: "Presto", from: 177, to: 200, feel: "Very fast" },
];

/** The marking a tempo falls under, or undefined outside 20–200 BPM. */
export function tempoMarking(bpm: number): TempoMarking | undefined {
  const rounded = Math.round(bpm);
  return TEMPO_MARKINGS.find((m) => rounded >= m.from && rounded <= m.to);
}

/** A gap longer than this between taps starts a new measurement — you have
 *  stopped, or are about to tap a different song. */
export const TAP_RESET_MS = 2500;

/** Most recent taps that count towards the average. Older ones are dropped
 *  so the reading follows a tempo that drifts. */
export const TAP_WINDOW = 10;

/** BPM from tap timestamps in milliseconds: the average gap over the taps
 *  kept, so one early or late tap moves the answer by a fraction of its error.
 *  Needs at least two taps; returns null otherwise. */
export function bpmFromTaps(times: number[]): number | null {
  if (times.length < 2) return null;
  const kept = times.slice(-TAP_WINDOW);
  const span = kept[kept.length - 1] - kept[0];
  if (span <= 0) return null;
  return (60000 * (kept.length - 1)) / span;
}

/** Add a tap to a running list, starting over after a long pause. */
export function addTap(times: number[], now: number): number[] {
  const last = times[times.length - 1];
  const base = last !== undefined && now - last > TAP_RESET_MS ? [] : times;
  return [...base, now].slice(-TAP_WINDOW);
}

/** Milliseconds per beat. */
export const msPerBeat = (bpm: number) => 60000 / bpm;
