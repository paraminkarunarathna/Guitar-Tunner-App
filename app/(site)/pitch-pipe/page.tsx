import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PitchPipe } from "@/components/PitchPipe/PitchPipe";
import { otherToolLinks } from "@/lib/toolPages";
import { PIPE_SETS, midiLabel } from "@/lib/music/pitchSets";
import { midiToFrequency } from "@/lib/synth";

export const metadata: Metadata = {
  title: "Online Pitch Pipe — Guitar, Ukulele, Violin",
  description:
    "Free online pitch pipe. Sustained reference notes for guitar, bass, ukulele and violin strings or all 12 chromatic notes. Tune by ear, no mic needed.",
  alternates: { canonical: "/pitch-pipe" },
  openGraph: {
    title: "Online Pitch Pipe — Tune by Ear in Your Browser",
    description:
      "Tap a note and hear it held steady: every string of guitar, bass, ukulele and violin, plus the full chromatic octave.",
  },
};

export default function PitchPipePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pitch Pipe - GuitarTunePro",
    url: "https://www.guitartunepro.com/pitch-pipe",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "An online pitch pipe that holds a reference note for each string of guitar, bass, ukulele or violin, or any chromatic note.",
    featureList: [
      "Guitar, Drop D, bass, ukulele, violin and chromatic note sets",
      "Notes held until you stop them",
      "Concert pitch 432, 440, 442 or 443 Hz",
      "Frequency shown for every note",
      "Works without a microphone",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Online Pitch Pipe"
        description="Pick your instrument, tap a string's note and it holds steady while you tune to it. No microphone, no permissions."
        canonicalPath="/pitch-pipe"
        tool={<PitchPipe />}
        otherTools={otherToolLinks("/pitch-pipe")}
        faqs={[
          {
            question: "What is a pitch pipe?",
            answer:
              "A pitch pipe is a small handheld reed instrument that sounds one reference note at a time. Choir directors use it to give singers a starting note, and string players use it to tune by ear. This online version does the same job from your speaker, with a note for every string of the common instruments.",
          },
          {
            question: "How do I tune a guitar with a pitch pipe?",
            answer:
              "Sound the note for a string — say the A — and play that open string at the same time. When the two are not quite the same pitch you will hear a slow wobble, called beating. Turn the tuning peg until the wobble slows and disappears; the two sounds merge into one. Repeat for each string, starting with the low E.",
          },
          {
            question: "Why can I hardly hear the low notes?",
            answer:
              "Small speakers cannot move enough air to reproduce frequencies below about 100 Hz, which includes the low E of a guitar (82 Hz) and every bass string. Use headphones, or tune to the same note an octave higher — a string tuned to its E at 164 Hz is the same pitch class and the octave above is easy to hear.",
          },
          {
            question: "What is the difference between a pitch pipe and a tuner?",
            answer:
              "A tuner listens to your instrument and tells you how far off it is. A pitch pipe plays the target and lets your ear judge. The pipe works in a noisy room only if you can still hear it, but it needs no microphone and trains your ear — most players use both. The main tuner is at the top of the site.",
          },
          {
            question: "What does the A4 setting change?",
            answer:
              "It sets the concert pitch every note is measured from. 440 Hz is the standard. 442 and 443 are used by some orchestras and 432 by players who prefer a warmer sound. If you are playing along with a recording or another instrument, match their pitch; otherwise leave it at 440.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The full by-ear method, step by step.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "Why the strings are tuned the way they are.",
          },
        ]}
      >
        <h2>How to Use the Pitch Pipe</h2>
        <ol>
          <li>Choose your instrument from the row at the top.</li>
          <li>Tap the note for the string you want to tune. It sounds until you tap it again or tap another note.</li>
          <li>Pluck the open string and listen for the two sounds beating against each other.</li>
          <li>
            Turn the peg slowly until the beating slows to nothing. Always approach the note from below — tune up to it —
            so the string settles and stays.
          </li>
        </ol>

        <h2>Notes and Frequencies</h2>
        <p>
          Every note here is calculated from A4 = 440 Hz in equal temperament, the same targets the{" "}
          <Link href="/">guitar tuner</Link> listens for.
        </p>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Notes (low to high)</th>
              <th>Frequencies</th>
            </tr>
          </thead>
          <tbody>
            {PIPE_SETS.filter((s) => s.id !== "chromatic").map((set) => (
              <tr key={set.id}>
                <td>{set.label}</td>
                <td>{set.notes.map((n) => n.label).join(" ")}</td>
                <td>{set.notes.map((n) => `${midiToFrequency(n.midi).toFixed(1)}`).join(" · ")} Hz</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          The chromatic set runs {midiLabel(60)} to {midiLabel(71)}, every semitone of one octave, for any other instrument
          or for finding a starting note for a song.
        </p>

        <h2>Why Tuning by Ear Is Worth Learning</h2>
        <p>
          A tuner tells you where the string is; your ear tells you whether it sounds right with the others. Players who tune
          by ear notice when a chord is slightly off and can fix it in seconds, without a device. A reference note is the
          fastest way to build that skill, because the beating between two close pitches is obvious once you know to listen
          for it. The <Link href="/ear-training">ear training</Link> tools take it further, and the{" "}
          <Link href="/tuning-fork">tuning fork</Link> offers a purer, shorter reference.
        </p>
      </ToolPageLayout>
    </>
  );
}
