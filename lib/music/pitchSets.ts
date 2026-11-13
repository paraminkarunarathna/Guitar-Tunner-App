/** Notes for the pitch pipe and tuning fork. Frequencies are computed from
 *  MIDI numbers at a chosen A4, never typed in, so they cannot drift from
 *  the tuner's own targets. */

export interface PipeNote {
  /** Display, e.g. "E2". */
  label: string;
  midi: number;
}

const NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
export const midiLabel = (midi: number) => `${NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

const notes = (...midis: number[]): PipeNote[] => midis.map((midi) => ({ label: midiLabel(midi), midi }));

export interface PipeSet {
  id: string;
  label: string;
  /** Strings from lowest to highest (or the 12 notes of an octave). */
  notes: PipeNote[];
  /** One line of advice that appears under the buttons. */
  tip: string;
}

export const PIPE_SETS: PipeSet[] = [
  {
    id: "guitar",
    label: "Guitar",
    notes: notes(40, 45, 50, 55, 59, 64),
    tip: "Standard tuning, low to high: E A D G B E. Match each string to its note. Laptop and phone speakers reproduce the low E (82 Hz) poorly; if you cannot hear it, use headphones or tune the string to the same E an octave higher.",
  },
  {
    id: "drop-d",
    label: "Drop D",
    notes: notes(38, 45, 50, 55, 59, 64),
    tip: "Drop D: lower the low E string a full tone to D. The other five strings stay as they are.",
  },
  {
    id: "bass",
    label: "Bass",
    notes: notes(28, 33, 38, 43),
    tip: "Bass, low to high: E A D G. Phone speakers barely reproduce notes this low, so use headphones or tune to the octave above.",
  },
  {
    id: "ukulele",
    label: "Ukulele",
    notes: notes(67, 60, 64, 69),
    tip: "Standard ukulele, in string order: G C E A. The G string is higher than the C — the reentrant tuning that gives the ukulele its sound.",
  },
  {
    id: "violin",
    label: "Violin",
    notes: notes(55, 62, 69, 76),
    tip: "Violin, low to high: G D A E. Tune the A first, then the rest in perfect fifths.",
  },
  {
    id: "chromatic",
    label: "Chromatic",
    notes: notes(60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71),
    tip: "All twelve notes from middle C. Use it for any instrument, or to find your starting note for a song.",
  },
];

export interface ForkSet {
  id: string;
  label: string;
  /** Frequency in Hz at A4 = 440 (a fork has one fixed pitch). */
  hz: number;
  use: string;
}

/** Forks sold and used in practice. Frequencies are exact for equal
 *  temperament at A4 = 440, except the two that are defined differently. */
export const FORKS: ForkSet[] = [
  { id: "a440", label: "A 440 Hz", hz: 440, use: "The international concert pitch. Orchestras tune to it, and so do guitar tuners: the open A string is 110 Hz, two octaves down." },
  { id: "a442", label: "A 442 Hz", hz: 442, use: "Slightly sharper, used by many European orchestras and for a brighter string sound." },
  { id: "a432", label: "A 432 Hz", hz: 432, use: "Verdi's A, preferred by some players for its warmer feel. See the 432 Hz tuner." },
  { id: "e329", label: "E 329.63 Hz", hz: 329.6276, use: "The high E string of a guitar (E4). Tune the thin string to it, then the rest from that." },
  { id: "c523", label: "C 523.25 Hz", hz: 523.2511, use: "Middle C's octave (C5). Common for medical and educational forks, and a handy ear reference." },
  { id: "c256", label: "C 256 Hz", hz: 256, use: "Scientific or 'philosophical' pitch — every C is a power of two. A teaching and acoustics standard." },
];
