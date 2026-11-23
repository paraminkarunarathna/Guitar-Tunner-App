import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { TestHub } from "@/components/MusicTests/TestHub";
import { MUSIC_TESTS, MUSIC_TEST_IDS } from "@/lib/musicTests";

export const metadata: Metadata = {
  title: "Online Music Tests — Test Your Musical Ear",
  description:
    "Free online music tests: find out if you have perfect pitch, check whether you are tone deaf, and test your hearing age. Then challenge your friends.",
  alternates: { canonical: "/music-tests" },
  openGraph: {
    title: "Music Tests — How Good Are Your Ears?",
    description: "Perfect pitch, tone deafness and hearing age — three free two-minute tests with a score to share.",
  },
};

const SITE_URL = "https://www.guitartunepro.com";

/** Longer practice tools that also measure the ear, for the second list. */
const MORE = [
  { href: "/daily-challenge", label: "Daily Challenge", text: "Five ear and fretboard questions, the same for everyone each day." },
  { href: "/ear-training", label: "Ear Training", text: "Name intervals and chord types, with a streak to beat." },
  { href: "/rhythm-trainer", label: "Rhythm Trainer", text: "Tap along and see your timing to the millisecond." },
  { href: "/vocal-pitch-detector", label: "Vocal Range Finder", text: "Sing your lowest and highest notes and see your voice type." },
  { href: "/chord-quiz", label: "Chord Quiz", text: "Name the chord from its diagram." },
  { href: "/fretboard-trainer", label: "Fretboard Trainer", text: "How fast can you find a note on the neck?" },
];

export default function MusicTestsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Online music tests",
    itemListElement: [...MUSIC_TEST_IDS.map((id) => ({ href: MUSIC_TESTS[id].href, name: MUSIC_TESTS[id].name })), ...MORE.map((m) => ({ href: m.href, name: m.label }))].map(
      (item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: `${SITE_URL}${item.href}` }),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ToolPageLayout
        title="Music Tests"
        description="Three quick tests of your ears — perfect pitch, tone deafness and hearing age. Each takes about two minutes, runs in your browser, and gives you a score to share."
        canonicalPath="/music-tests"
        tool={<TestHub />}
        faqs={[
          {
            question: "Are these music tests free?",
            answer:
              "Yes. Every test runs in your browser with no sign-up, and your scores are saved on your own device. Nothing is uploaded.",
          },
          {
            question: "Do I need headphones?",
            answer:
              "They help with all three, and they matter most for the hearing age test, because many phone and laptop speakers cannot play very high frequencies. The perfect pitch test works fine on speakers.",
          },
          {
            question: "How do I challenge a friend?",
            answer:
              "Finish a test and press “Challenge a friend”. The link opens the same test with your score shown as the one to beat, and tells them at the end whether they won. “Share your result” sends a link with a picture of your score.",
          },
          {
            question: "Which test says the most about musical ability?",
            answer:
              "The tone deaf test. Hearing small pitch differences is what lets you tune by ear and sing or play in tune. Perfect pitch is a rare memory for notes that most fine musicians do not have, and high-frequency hearing is about your ears' age, not musicianship.",
          },
        ]}
      >
        <h2>Three Tests, Three Different Skills</h2>
        <p>
          <Link href="/perfect-pitch-test">The perfect pitch test</Link> asks whether you can name a note with nothing to
          compare it to — a rare ability, often estimated at around one person in ten thousand.{" "}
          <Link href="/tone-deaf-test">The tone deaf test</Link> measures how small a change in pitch you can hear, which is the
          skill behind tuning and singing in tune. <Link href="/hearing-age-test">The hearing age test</Link> finds the top of
          your hearing range, which falls steadily with age and noise.
        </p>
        <p>
          None of them is a medical test. They are quick, honest checks with the method explained on each page, so you know
          what the number means before you share it.
        </p>

        <h2>More Ways to Test Your Ear</h2>
        <ul>
          {MORE.map((m) => (
            <li key={m.href}>
              <Link href={m.href}>{m.label}</Link> — {m.text}
            </li>
          ))}
        </ul>
        <p>
          Every test and trainer counts toward your practice streak, and your best scores are on{" "}
          <Link href="/my-progress">your progress page</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
