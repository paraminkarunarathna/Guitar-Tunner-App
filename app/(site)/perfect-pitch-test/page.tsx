import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PerfectPitchTest } from "@/components/MusicTests/PerfectPitchTest";
import { otherToolLinks } from "@/lib/toolPages";
import { PERFECT_PITCH_ROUNDS, perfectPitchVerdict } from "@/lib/musicTests";

export const metadata: Metadata = {
  title: "Perfect Pitch Test — Can You Name the Note?",
  description:
    "Free perfect pitch test: hear 12 notes with no reference and name each one. Find out if you have absolute pitch in two minutes, then challenge a friend.",
  alternates: { canonical: "/perfect-pitch-test", languages: languageAlternates("/perfect-pitch-test") },
  openGraph: {
    title: "Perfect Pitch Test — Do You Have Perfect Pitch?",
    description: "Twelve notes, no reference tone. Name each one, get your score, and dare your friends to beat it.",
  },
};

/** Score bands for the table, drawn from the same function that grades the
 *  test, so the page and the result can never disagree. */
const BANDS = [
  [11, 12],
  [8, 10],
  [5, 7],
  [3, 4],
  [0, 2],
] as const;

export default function PerfectPitchTestPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Perfect Pitch Test - GuitarTunePro",
    url: "https://www.guitartunepro.com/perfect-pitch-test",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "An online absolute pitch test: twelve notes across three octaves with no reference tone, masked between notes so they cannot be worked out by interval.",
    featureList: [
      "Twelve notes from C3 to B5, no reference tone",
      "Random tone burst between notes to defeat relative pitch",
      "Two alternating timbres",
      "Score out of 12 with what it means",
      "Shareable result card and friend challenge link",
      "Personal best saved in your browser",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Perfect Pitch Test"
        description="Twelve notes, one at a time, with no reference note to compare against. Name each one and find out whether you have perfect (absolute) pitch."
        canonicalPath="/perfect-pitch-test"
        tool={<PerfectPitchTest />}
        otherTools={otherToolLinks("/perfect-pitch-test")}
        faqs={[
          {
            question: "How do I know if I have perfect pitch?",
            answer:
              "People with perfect pitch name a note instantly and without effort, the way most people name a colour — no reference note, no humming up from a song they know. If you can score 11 or 12 out of 12 on a test like this one, quickly and on different instruments, you very likely have it. Scores in the middle usually mean a good pitch memory rather than true absolute pitch.",
          },
          {
            question: "How rare is perfect pitch?",
            answer:
              "It is often estimated at around 1 in 10,000 people in the general population. It is much more common among musicians who began training in early childhood, and studies have found higher rates among speakers of tonal languages such as Mandarin and Vietnamese who started music young.",
          },
          {
            question: "What is the difference between perfect pitch and relative pitch?",
            answer:
              "Perfect (absolute) pitch is naming a note with no reference. Relative pitch is hearing the distance between notes — knowing the second note is a fifth above the first, for example. Relative pitch is what lets you play by ear, transpose and tune a guitar to itself, and unlike perfect pitch, almost anyone can train it.",
          },
          {
            question: "Can you learn perfect pitch as an adult?",
            answer:
              "Adults can get noticeably better at naming notes with steady practice, and a few training studies report large gains. Whether that is the same as the effortless perfect pitch of people who had it from childhood is still debated. For a guitarist, time spent on relative pitch in the ear trainer pays off far more reliably.",
          },
          {
            question: "Why does the test play random beeps between notes?",
            answer:
              "Without them, anyone with good relative pitch could hear the interval from the last note and work out the answer. The burst of random, off-key tones wipes that short-term memory, so the test measures pitch memory, not interval hearing.",
          },
          {
            question: "Is the score affected by my speakers?",
            answer:
              "Not much. Unlike a hearing test, naming notes depends on pitch, which any speaker reproduces faithfully. Very small phone speakers can make the lowest notes thin, so headphones are a little easier.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "Put relative pitch to work on six strings.",
          },
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description: "Why a note's name depends on a reference pitch.",
          },
        ]}
      >
        <h2>How the Perfect Pitch Test Works</h2>
        <p>
          The test plays {PERFECT_PITCH_ROUNDS} notes picked at random from three octaves, C3 to B5 — the range of a guitar
          from its middle strings up to the twelfth fret of the high E. You name each one by its pitch class: C, C♯/D♭, D and
          so on. Octaves do not matter, only the note name.
        </p>
        <p>
          Two things stop the test turning into an interval quiz. Before every note after the first, a short burst of random
          tones plays to clear your memory of the previous note, and consecutive notes never share a name or sit within a few
          semitones of each other. The notes also alternate between a plucked-string sound and a steadier tone, because people
          with perfect pitch recognise notes regardless of instrument.
        </p>
        <p>
          Guessing gets you one note in twelve on average. Anything well above that means some notes are fixed in your memory.
        </p>

        <h2>What Your Score Means</h2>
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {BANDS.map(([from, to]) => (
              <tr key={from}>
                <td>
                  {from}–{to} of {PERFECT_PITCH_ROUNDS}
                </td>
                <td>{perfectPitchVerdict(from).tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          A note one semitone off is the most common near-miss, and the test tells you when that happens. People with pitch
          memory from a single instrument often find the notes they play most — E and A for guitarists — come easiest.
        </p>

        <h2>Perfect Pitch vs Relative Pitch</h2>
        <p>
          Perfect pitch is rare, and it is not required to be a fine musician — most great players do not have it. What they
          do have is excellent <strong>relative pitch</strong>: hearing that a melody steps up a major third, that a chord is
          minor, or that a string is a few cents flat of the one beside it.
        </p>
        <p>
          Relative pitch is trainable at any age. The <Link href="/ear-training">ear trainer</Link> drills intervals and chord
          types, the <Link href="/daily-challenge">daily challenge</Link> gives you five new questions every day, and the{" "}
          <Link href="/tone-deaf-test">tone deaf test</Link> measures how finely you hear pitch differences — the skill behind
          tuning by ear.
        </p>

        <h2>Tips for a Fair Score</h2>
        <ul>
          <li>Take it somewhere quiet. Background music is a reference note, and it will skew the answer.</li>
          <li>Answer on your first instinct. Perfect pitch is instant; working a note out from a song in your head is a different skill.</li>
          <li>Do not hum or play anything between notes — that is exactly what the random tones are there to prevent.</li>
          <li>
            Try again on another day. A single round of {PERFECT_PITCH_ROUNDS} notes has some luck in it, and your best score is
            saved.
          </li>
        </ul>
        <p>
          When you have a score, share it or send a friend a challenge link: they get the same test with your score to beat.
          See all the <Link href="/music-tests">music tests</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
