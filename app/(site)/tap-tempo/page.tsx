import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { TapTempo } from "@/components/TapTempo/TapTempo";
import { otherToolLinks } from "@/lib/toolPages";
import { TEMPO_MARKINGS } from "@/lib/music/tempo";

export const metadata: Metadata = {
  title: "Tap Tempo — Find the BPM of Any Song",
  description:
    "Free tap tempo BPM counter. Tap along to any song and see its tempo, Italian marking, half and double time — then practise it in the metronome.",
  alternates: { canonical: "/tap-tempo", languages: languageAlternates("/tap-tempo") },
  openGraph: {
    title: "Tap Tempo BPM Counter — Find the Tempo of Any Song",
    description:
      "Tap the beat and read the BPM instantly, with tempo markings and one-click practice at that speed.",
  },
};

export default function TapTempoPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tap Tempo - GuitarTunePro",
    url: "https://www.guitartunepro.com/tap-tempo",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A tap tempo BPM counter that averages your taps, names the tempo marking and shows half and double time.",
    featureList: [
      "Averages the last ten taps for a stable BPM",
      "Italian tempo marking from Grave to Presto",
      "Half-time and double-time BPM",
      "Milliseconds per beat and seconds per bar",
      "Keyboard tapping with Space or Enter",
      "Opens the metronome or rhythm trainer at your tempo",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Tap Tempo"
        description="Tap the pad in time with a song and read its tempo in beats per minute. Two taps give a first guess; ten give a steady answer."
        canonicalPath="/tap-tempo"
        tool={<TapTempo />}
        otherTools={otherToolLinks("/tap-tempo")}
        faqs={[
          {
            question: "How does tap tempo work?",
            answer:
              "Each time you tap, the page notes the exact time. The BPM is the number of gaps between taps divided by the total time they span, scaled to a minute. Averaging the last ten taps means one early or late tap changes the answer by only a fraction of its error, instead of throwing the whole reading off.",
          },
          {
            question: "How many taps do I need?",
            answer:
              "Two taps give a number, but it is only a first guess. Eight to ten taps give a steady reading for most songs. If the figure keeps moving by a few BPM, the song itself may drift, as live recordings do, and the average is the honest answer.",
          },
          {
            question: "Should I tap every beat or every other beat?",
            answer:
              "Tap the beat you would naturally nod or tap your foot to — the quarter-note pulse in most songs. If the result is exactly double or half what you expected, that is a feel question, not an error: the half-time and double-time figures under the reading give you both.",
          },
          {
            question: "Why does the BPM change from the number I see online?",
            answer:
              "Song databases often list a single rounded tempo for a track that speeds up slightly, or that is felt at half or double the listed speed. Tap along over a verse and a chorus and use the figure you can play comfortably against.",
          },
          {
            question: "How do I practise at the tempo I found?",
            answer:
              "Use the links under the reading. They open the metronome with the BPM already set, or the rhythm trainer, which scores how close your taps land to the beat at that speed.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "Build speed without losing the beat.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Put the tempo to work on real changes.",
          },
        ]}
      >
        <h2>How to Find the BPM of a Song</h2>
        <ol>
          <li>Start the song, or play it in your head if you know it well.</li>
          <li>
            Tap the pad — or press <strong>Space</strong> — on every beat. Pick the pulse you would tap your foot to.
          </li>
          <li>Keep going for eight to ten taps. The reading settles as it averages more of them.</li>
          <li>
            Check it against the half-time and double-time figures if the number feels too fast or too slow, then open the{" "}
            <Link href="/metronome">metronome</Link> to practise at that speed.
          </li>
        </ol>

        <h2>What BPM Means</h2>
        <p>
          BPM stands for beats per minute: how many steady pulses fit in sixty seconds. At 60 BPM there is one beat a
          second; at 120 there are two. Tempo is the single most useful number for practising a song, because it lets you
          slow a hard passage right down, play it cleanly, and bring it back up in small steps.
        </p>

        <h2>Tempo Markings and BPM Ranges</h2>
        <p>
          Before metronomes, composers described speed in Italian. The words still appear on sheet music, and each maps to a
          range of BPM. The tool above shows which one your tap falls under.
        </p>
        <table>
          <thead>
            <tr>
              <th>Marking</th>
              <th>BPM</th>
              <th>Feel</th>
            </tr>
          </thead>
          <tbody>
            {TEMPO_MARKINGS.map((m) => (
              <tr key={m.name}>
                <td>{m.name}</td>
                <td>
                  {m.from}–{m.to}
                </td>
                <td>{m.feel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Tips for Accurate Tapping</h2>
        <ul>
          <li>
            <strong>Tap on the beat, not after it.</strong> It is natural to react a hair late, but because every tap is late
            by about the same amount, the gaps — and so the BPM — stay right.
          </li>
          <li>
            <strong>Use a steady section.</strong> Intros, fills and breakdowns often change the feel. A verse or chorus gives
            the truest tempo.
          </li>
          <li>
            <strong>Start fresh for a new song.</strong> A pause of more than two and a half seconds resets the count
            automatically; Reset or Esc does it by hand.
          </li>
          <li>
            <strong>Listen for the click, not just the screen.</strong> Taps are timed on pointer-down, so there is no delay
            waiting for you to lift your finger.
          </li>
        </ul>
        <p>
          Once you know the tempo, the <Link href="/rhythm-trainer">rhythm trainer</Link> scores how closely you can hold it,
          and the <Link href="/strumming-patterns">strumming patterns</Link> give you something to play over it.
        </p>
      </ToolPageLayout>
    </>
  );
}
