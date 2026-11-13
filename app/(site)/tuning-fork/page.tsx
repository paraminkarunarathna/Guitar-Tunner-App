import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { TuningFork } from "@/components/TuningFork/TuningFork";
import { otherToolLinks } from "@/lib/toolPages";
import { FORKS } from "@/lib/music/pitchSets";

export const metadata: Metadata = {
  title: "Online Tuning Fork — A440, E, C and More",
  description:
    "Free virtual tuning fork. Strike an A 440 Hz, 442, 432, E 329 or C 523 fork and hear it ring, then tune your guitar, violin or voice to it.",
  alternates: { canonical: "/tuning-fork", languages: languageAlternates("/tuning-fork") },
  openGraph: {
    title: "Online Tuning Fork — Strike an A440 and Tune by Ear",
    description:
      "A virtual tuning fork that rings and fades like the real thing. A 440, 442, 432, high E, C 523 and C 256 Hz.",
  },
};

export default function TuningForkPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tuning Fork - GuitarTunePro",
    url: "https://www.guitartunepro.com/tuning-fork",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A virtual tuning fork with a near-pure tone that rings for about ten seconds, in six standard pitches.",
    featureList: FORKS.map((f) => `${f.label} fork`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Online Tuning Fork"
        description="Strike the fork and listen as it rings and fades. Use it as a pure pitch to tune a string or your voice against."
        canonicalPath="/tuning-fork"
        tool={<TuningFork />}
        otherTools={otherToolLinks("/tuning-fork")}
        faqs={[
          {
            question: "How does a tuning fork work?",
            answer:
              "A tuning fork is a U-shaped bar of steel. When struck, its two tines swing in and out at a fixed rate, set by their length and stiffness. That produces an almost pure sine wave with very little overtone content, which is why a fork is such a clean reference. A 440 Hz fork vibrates 440 times a second.",
          },
          {
            question: "How do I tune a guitar with an A440 fork?",
            answer:
              "Strike the fork and play the open A string, which sounds 110 Hz, two octaves below the fork. The two notes are the same pitch class, so adjust the peg until the beating between them stops. Then tune the other strings from the A using the fifth-fret method: the 5th fret of the low E string is an A, the 5th fret of the A string is a D, and so on.",
          },
          {
            question: "Why does the sound fade?",
            answer:
              "A real fork loses energy to the air and to your hand, so the note decays over several seconds. This one rings for about ten, the first brief clang dying almost immediately, as on a steel fork. Tap it again to restrike, or press Damp to stop it at once.",
          },
          {
            question: "Which fork should I use?",
            answer:
              "A 440 Hz for almost everything: it is the international standard. Use the E 329.63 Hz fork to tune the thin E string on a guitar. A 442 Hz suits orchestras that tune sharp, and 432 Hz is preferred by some players. C forks are used in teaching and acoustics.",
          },
          {
            question: "Is this as accurate as a real tuning fork?",
            answer:
              "The pitch is calculated, so it is exact to the accuracy of your device's audio clock — better than a cheap fork, which can be several cents off and changes slightly with temperature. The tone is a synthetic fork, so it will not match the exact timbre of a steel one, but the pitch is what you tune to.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "Using a single reference note to tune all six strings.",
          },
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description: "What the difference sounds like, and does it matter?",
          },
        ]}
      >
        <h2>The Forks and What They Are For</h2>
        <table>
          <thead>
            <tr>
              <th>Fork</th>
              <th>Frequency</th>
              <th>Typical use</th>
            </tr>
          </thead>
          <tbody>
            {FORKS.map((f) => (
              <tr key={f.id}>
                <td>{f.label.split(" ").slice(0, 2).join(" ")}</td>
                <td>{f.hz % 1 === 0 ? f.hz : f.hz.toFixed(2)} Hz</td>
                <td>{f.use}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>How to Tune with a Fork</h2>
        <ol>
          <li>Choose a fork and tap it to strike it. It rings for about ten seconds.</li>
          <li>Play the matching string — the A fork with the A string, the E fork with the thin E.</li>
          <li>
            Listen for beating: a slow pulsing of loudness that means the two pitches differ by a few hertz. The slower the
            pulse, the closer you are; when it stops, they match.
          </li>
          <li>
            Tune the remaining strings from that one using the fifth-fret method, or sound each in turn on the{" "}
            <Link href="/pitch-pipe">pitch pipe</Link>.
          </li>
        </ol>

        <h2>Fork or Tuner?</h2>
        <p>
          The <Link href="/">chromatic tuner</Link> shows how many cents sharp or flat a string is. A fork gives you nothing to
          read; it gives you a clean sound to match, which is slower to learn but builds your ear. Many teachers have students
          tune by ear to a fork and then check with a tuner. See also the{" "}
          <Link href="/tone-generator">tone generator</Link> for any frequency between 20 Hz and 20 kHz.
        </p>
      </ToolPageLayout>
    </>
  );
}
