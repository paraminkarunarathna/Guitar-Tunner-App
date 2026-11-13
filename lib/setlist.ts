/** Setlist model: songs with the facts a performer needs at the mic — key,
 *  tempo, tuning and capo — and what that adds up to. Pure functions; the
 *  component owns storage and UI. */

export interface TuningChoice {
  id: string;
  label: string;
  /** The tuner page for this tuning. */
  href: string;
}

export const SETLIST_TUNINGS: TuningChoice[] = [
  { id: "standard", label: "Standard (E A D G B E)", href: "/" },
  { id: "half-step-down", label: "Half step down (E♭)", href: "/half-step-down-tuner" },
  { id: "full-step-down", label: "Full step down (D)", href: "/full-step-down-tuner" },
  { id: "drop-d", label: "Drop D", href: "/drop-d-tuner" },
  { id: "drop-c", label: "Drop C", href: "/drop-c-tuner" },
  { id: "dadgad", label: "DADGAD", href: "/dadgad-tuner" },
  { id: "open-g", label: "Open G", href: "/open-g-tuner" },
  { id: "open-d", label: "Open D", href: "/open-d-tuner" },
  { id: "open-e", label: "Open E", href: "/open-e-tuner" },
  { id: "open-a", label: "Open A", href: "/open-a-tuner" },
  { id: "open-c", label: "Open C", href: "/open-c-tuner" },
];

export interface SetlistSong {
  id: string;
  title: string;
  key: string;
  bpm: number | null;
  tuning: string;
  capo: number;
  /** Length in minutes, may be fractional. */
  minutes: number | null;
  notes: string;
}

export const newSong = (): SetlistSong => ({
  id: Math.random().toString(36).slice(2, 10),
  title: "",
  key: "",
  bpm: null,
  tuning: "standard",
  capo: 0,
  minutes: null,
  notes: "",
});

export const tuningLabel = (id: string) => SETLIST_TUNINGS.find((t) => t.id === id)?.label ?? "Standard (E A D G B E)";
export const tuningHref = (id: string) => SETLIST_TUNINGS.find((t) => t.id === id)?.href ?? "/";

/** Positions where the next song needs a different tuning from the one
 *  before it — each is a retune on stage. Returns indexes of the song that
 *  follows the change. */
export function tuningChanges(songs: SetlistSong[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < songs.length; i++) if (songs[i].tuning !== songs[i - 1].tuning) out.push(i);
  return out;
}

/** The same songs with each tuning's songs together, tuning order following
 *  where it first appears, and every song keeping its relative order inside
 *  its group. Does the least reshuffling that removes all avoidable retunes. */
export function groupByTuning(songs: SetlistSong[]): SetlistSong[] {
  const order: string[] = [];
  for (const s of songs) if (!order.includes(s.tuning)) order.push(s.tuning);
  return order.flatMap((t) => songs.filter((s) => s.tuning === t));
}

export function totalMinutes(songs: SetlistSong[]): number {
  return songs.reduce((sum, s) => sum + (s.minutes ?? 0), 0);
}

/** "1 h 05 min" / "42 min" */
export function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`;
}

const isString = (v: unknown): v is string => typeof v === "string";

/** Parse a stored or shared setlist, keeping only well-formed songs and
 *  clamping every number, because shared links are untrusted input. */
export function sanitize(raw: unknown): { name: string; songs: SetlistSong[] } {
  const obj = (raw && typeof raw === "object" ? raw : {}) as { name?: unknown; songs?: unknown };
  const songs = (Array.isArray(obj.songs) ? obj.songs : []).slice(0, 60).flatMap((item): SetlistSong[] => {
    if (!item || typeof item !== "object") return [];
    const s = item as Record<string, unknown>;
    const num = (v: unknown, lo: number, hi: number) =>
      typeof v === "number" && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null;
    return [
      {
        id: isString(s.id) ? s.id.slice(0, 16) : Math.random().toString(36).slice(2, 10),
        title: isString(s.title) ? s.title.slice(0, 80) : "",
        key: isString(s.key) ? s.key.slice(0, 12) : "",
        bpm: num(s.bpm, 30, 300),
        tuning: isString(s.tuning) && SETLIST_TUNINGS.some((t) => t.id === s.tuning) ? s.tuning : "standard",
        capo: Math.round(num(s.capo, 0, 12) ?? 0),
        minutes: num(s.minutes, 0, 60),
        notes: isString(s.notes) ? s.notes.slice(0, 200) : "",
      },
    ];
  });
  return { name: isString(obj.name) ? obj.name.slice(0, 60) : "My setlist", songs };
}

export function encodeSetlist(data: { name: string; songs: SetlistSong[] }): string {
  const json = JSON.stringify(data);
  return btoa(String.fromCharCode(...new TextEncoder().encode(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeSetlist(code: string): { name: string; songs: SetlistSong[] } | null {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const parsed = sanitize(JSON.parse(new TextDecoder().decode(bytes)));
    return parsed.songs.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}
