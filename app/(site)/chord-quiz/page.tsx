import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ChordQuiz } from "@/components/ChordQuiz/ChordQuiz";
import { otherToolLinks } from "@/lib/toolPages";
import { QUIZ_LEVELS } from "@/lib/chords/quiz";

export const metadata: Metadata = {
  title: "Guitar Chord Quiz — Name the Chord Shape",
  description:
    "Free guitar chord quiz. A chord diagram appears; name it. Start with open chords, then sevenths and barre shapes. Track streaks and your weak chords.",
  alternates: { canonical: "/chord-quiz", languages: languageAlternates("/chord-quiz") },
  openGraph: {
    title: "Guitar Chord Quiz — Can You Name the Shape?",
    description:
      "Learn chord shapes by sight with a quiz that brings back the chords you miss. Open chords to barre shapes, with audio.",
  },
};

export default function ChordQuizPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Guitar Chord Quiz - GuitarTunePro",
    url: "https://www.guitartunepro.com/chord-quiz",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "A quiz that shows a guitar chord diagram and asks you to name the chord, with three difficulty levels.",
    featureList: [
      "Chord diagrams for major, minor, seventh, sus, diminished and augmented chords",
      "Three levels from open chords to barre shapes",
      "Hear each chord after you answer",
      "Chords you miss come back more often",
      "Streaks and accuracy saved on your device",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Guitar Chord Quiz"
        description="Look at the diagram, name the chord. Wrong answers are chords that look alike, because that is the skill that matters."
        canonicalPath="/chord-quiz"
        tool={<ChordQuiz />}
        otherTools={otherToolLinks("/chord-quiz")}
        faqs={[
          {
            question: "How do I read a chord diagram?",
            answer:
              "The vertical lines are the strings, thickest on the left, and the horizontal lines are the frets. A dot shows where to put a finger, an O above a string means play it open, and an X means do not play it. If the chart starts higher than the first fret, a number beside it says which fret.",
          },
          {
            question: "Why learn chords by sight?",
            answer:
              "Recognising a shape instantly means you can read a chord chart, spot a chord in someone else's hands, and find the next shape without stopping. It also makes the fretboard make sense: you start to see that a minor chord is a major with one finger moved.",
          },
          {
            question: "What do the levels mean?",
            answer: QUIZ_LEVELS.map((l) => `${l.label}: ${l.blurb}.`).join(" "),
          },
          {
            question: "What are the chords to revisit?",
            answer:
              "Once you have answered a chord at least three times with under 70% right, it appears under the quiz and is shown more often. Your results stay on this device unless you move them with the progress transfer link.",
          },
          {
            question: "Why can two chords sound the same?",
            answer:
              "Some chords contain exactly the same notes under different names — C6 and Am7, for example. The quiz never offers both in one question, so there is always one correct answer.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Once you know the shapes, put them in order.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Diagrams, tabs and notation, side by side.",
          },
        ]}
      >
        <h2>How the Chord Quiz Works</h2>
        <ol>
          <li>Choose a level. Open major and minor chords are the place to start.</li>
          <li>Study the diagram, then pick the right name from four choices, or press 1 to 4.</li>
          <li>
            After you answer you hear the chord and see its notes. Press Next, or N, for another.
          </li>
          <li>Chords you miss come back more often until they stick.</li>
        </ol>

        <h2>Tips for Learning Chord Shapes</h2>
        <ul>
          <li>
            <strong>Learn them in families.</strong> The open E shape and the open A shape underlie every barre chord. The{" "}
            <Link href="/chords">chord library</Link> shows each one in every key.
          </li>
          <li>
            <strong>Say the notes.</strong> Each answer lists the chord&apos;s notes. A chord is a recipe, and knowing it makes
            the name memorable.
          </li>
          <li>
            <strong>Play the shape too.</strong> Hold the diagram on your guitar after each question. The{" "}
            <Link href="/chord-finder">chord finder</Link> works the other way round: tap a shape, get the name.
          </li>
          <li>
            <strong>Keep it short.</strong> Ten questions a day beat an hour once a week. It counts towards your{" "}
            <Link href="/practice-routine">practice streak</Link>.
          </li>
        </ul>
      </ToolPageLayout>
    </>
  );
}
