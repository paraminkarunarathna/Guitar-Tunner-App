/** Share cards for the music tests: one per test page, one for the hub, and
 *  one drawn from a shared result's numbers. */

import { NoteChips, OG_COLORS as C, renderOgCard } from "@/lib/og/card";
import { MUSIC_TESTS, brag, verdictFor, type MusicTestId } from "@/lib/musicTests";

/** A big score over a short label and a level bar. */
function ScoreVisual({ score, label, level }: { score: string; label: string; level: number }) {
  const size = score.length > 7 ? 92 : score.length > 5 ? 112 : 140;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 360 }}>
      <div style={{ display: "flex", fontSize: size, fontWeight: 700, color: C.ink, lineHeight: 1 }}>{score}</div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          fontWeight: 700,
          color: C.brass,
          marginTop: 14,
          textTransform: "uppercase",
          letterSpacing: 3,
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", width: 300, height: 16, borderRadius: 8, background: C.raised, marginTop: 22 }}>
        <div style={{ display: "flex", width: Math.max(12, 300 * level), height: 16, borderRadius: 8, background: C.brass }} />
      </div>
    </div>
  );
}

const PAGE_CARDS: Record<MusicTestId, { title: string; subtitle: string; visual: { score: string; label: string; level: number } }> = {
  "perfect-pitch": {
    title: "Do you have perfect pitch?",
    subtitle: "Twelve notes, no reference. Name each one and find out in two minutes.",
    visual: { score: "?/12", label: "Your score", level: 0.5 },
  },
  "tone-deaf": {
    title: "Are you tone deaf?",
    subtitle: "Higher or lower? A two-minute test that finds the smallest pitch change you can hear.",
    visual: { score: "?¢", label: "Your threshold", level: 0.5 },
  },
  "hearing-age": {
    title: "How old are your ears?",
    subtitle: "Tones from 8 to 20 kHz. Find the highest you can hear and your hearing age.",
    visual: { score: "? kHz", label: "Your limit", level: 0.5 },
  },
};

export function musicTestOgImage(id: MusicTestId) {
  const card = PAGE_CARDS[id];
  return renderOgCard({
    eyebrow: "Free music test",
    title: card.title,
    subtitle: card.subtitle,
    visual: <ScoreVisual {...card.visual} />,
    footnote: "Share your score · Challenge a friend",
  });
}

export const musicTestOgAlt = (id: MusicTestId) => `${MUSIC_TESTS[id].name} — ${MUSIC_TESTS[id].question} — GuitarTunePro`;

export function musicTestsHubOgImage() {
  return renderOgCard({
    eyebrow: "Music tests",
    title: "How good are your ears?",
    subtitle: "Free online tests for perfect pitch, tone deafness and hearing age — then challenge your friends.",
    detail: <NoteChips notes={["Perfect pitch", "Tone deaf", "Hearing age"]} />,
  });
}

/** Card for a shared result: /share/test/image?t=tone-deaf&s=8 */
export function testResultOgImage(id: MusicTestId, score: number) {
  const v = verdictFor(id, score);
  // The hearing brag already names the age, which the visual repeats.
  const title =
    id === "hearing-age"
      ? score >= 8000 ? `I can hear up to ${v.score}. Can you?` : "How high can you hear?"
      : id === "tone-deaf"
        ? `${brag(id, score)}. Can you?`
        : `${brag(id, score)}. Can you beat it?`;
  return renderOgCard({
    eyebrow: MUSIC_TESTS[id].name,
    title,
    subtitle: id === "hearing-age" ? "Free two-minute test, 8 to 20 kHz" : v.tier,
    visual: <ScoreVisual score={v.score} label={v.tier.replace(/^Hearing age: /, "Ears ")} level={v.level} />,
    footnote: "Take the free test · No sign-up",
  });
}
