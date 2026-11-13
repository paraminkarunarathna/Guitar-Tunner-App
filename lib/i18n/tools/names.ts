import { localDecimal, localNote, type Locale } from "@/lib/i18n/tuner";

/** A note or chord name in the language's convention. Romance languages use
 *  solfège (Do, Ré, Mi…) for notes. German writes B♭ as "B" and B natural as
 *  "H", so a German player reading "B" for B natural would play the wrong
 *  note. `localNote` alone would turn B♭ into "H♭". */
export function localName(name: string, locale: Locale): string {
  if (locale === "de") return germanB(name);
  return localNote(name, locale);
}

/** Letter names with only the German B/H rule applied — for chord symbols,
 *  which stay in letters in every language. */
export function chordLetters(name: string, locale: Locale): string {
  return locale === "de" ? germanB(name) : name;
}

function germanB(name: string): string {
  if (!name.startsWith("B")) return name;
  // B♭ → B, and B♭3 → B3: the flat sign is dropped. A B-family chord
  // suffix after a flat (B♭m7 → Bm7) is untouched.
  if (name.charAt(1) === "♭") return `B${name.slice(2)}`;
  return `H${name.slice(1)}`;
}

/** "A 440 Hz" → "La 440 Hz" in solfège languages, decimal comma where used. */
export function forkLabel(label: string, hz: number, locale: Locale) {
  const [letter] = label.split(" ");
  return `${localName(letter, locale)} ${localDecimal(hz, hz % 1 === 0 ? 0 : 2, locale)} Hz`;
}
