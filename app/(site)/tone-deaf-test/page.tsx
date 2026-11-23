import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ToneDeafTest } from "@/components/MusicTests/ToneDeafTest";
import { otherToolLinks } from "@/lib/toolPages";
import { toneDeafVerdict } from "@/lib/musicTests";

export const metadata: Metadata = {
  title: "Tone Deaf Test — Am I Tone Deaf? Find Out",
  description:
    "Free tone deaf test: is the second tone higher or lower? It adapts to find the smallest pitch change you can hear, in cents, in about two minutes.",
  alternates: { canonical: "/tone-deaf-test", languages: languageAlternates("/tone-deaf-test") },
  openGraph: {
    title: "Tone Deaf Test — Are You Really Tone Deaf?",
    description: "Higher or lower? A two-minute pitch hearing test that finds your limit in cents. Share your score and challenge a friend.",
  },
};

/** Upper edge of each band, graded by the same function as the test. */
const BANDS = [
  [1, 5],
  [6, 12],
  [13, 25],
  [26, 60],
  [61, 110],
  [111, 300],
] as const;

export default function ToneDeafTestPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tone Deaf Test - GuitarTunePro",
    url: "https://www.guitartunepro.com/tone-deaf-test",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "An adaptive pitch discrimination test: two tones, higher or lower, with the gap shrinking until it finds the smallest pitch change you hear reliably.",
    featureList: [
      "Adaptive 2-down/1-up staircase",
      "Result in cents, down to 1 cent",
      "Random starting pitch for every pair",
      "Keyboard controls: arrow keys",
      "Shareable result card and friend challenge link",
      "Personal best saved in your browser",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Tone Deaf Test"
        description="Two tones play. Was the second one higher or lower? The gap shrinks each time you're right, until the test finds the smallest pitch change you can hear."
        canonicalPath="/tone-deaf-test"
        tool={<ToneDeafTest />}
        otherTools={otherToolLinks("/tone-deaf-test")}
        faqs={[
          {
            question: "How do I know if I am tone deaf?",
            answer:
              "True tone deafness — congenital amusia — means having real trouble hearing pitch changes, typically anything smaller than about a semitone. If you can tell which of two tones is higher when they are less than half a semitone (50 cents) apart, you are not tone deaf, even if you do not like your singing.",
          },
          {
            question: "How common is tone deafness?",
            answer:
              "Estimates for congenital amusia range from about 1.5% to 4% of people. Far more people believe they are tone deaf than actually are: most people who say so can hear pitch perfectly well and simply have not trained their voice to match it.",
          },
          {
            question: "What is a cent?",
            answer:
              "A cent is one hundredth of a semitone. A semitone is the gap between two neighbouring frets on a guitar, so 100 cents. Guitar tuners show cents because a string even 5 to 10 cents out can sound sour in a chord.",
          },
          {
            question: "I can't sing in tune. Does that mean I am tone deaf?",
            answer:
              "Usually not. Singing in tune needs pitch hearing and vocal control, and most out-of-tune singers have the first but not yet the second. If this test gives you a good score, the vocal pitch detector shows you in real time whether you are sharp or flat, which is how voice control is trained.",
          },
          {
            question: "Why does the test keep changing difficulty?",
            answer:
              "It uses an adaptive staircase, a standard method in hearing research. Two right answers in a row make the next pair closer; one wrong answer makes it wider. It settles where you are right about 71% of the time, and your result is the average of the turning points.",
          },
          {
            question: "Can I improve my score?",
            answer:
              "Yes, pitch discrimination improves with practice. Tuning by ear, playing against a drone and interval training all help. Scores also drop when you are tired or somewhere noisy, so a retake in better conditions is often several cents finer.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The practical use of fine pitch hearing.",
          },
          {
            title: "How to Find Your Vocal Range",
            slug: "how-to-find-your-vocal-range",
            description: "Hearing pitch is half of singing it.",
          },
        ]}
      >
        <h2>How the Tone Deaf Test Works</h2>
        <p>
          Each trial plays two short tones around a random centre pitch between E4 and E5. You say whether the second was
          higher or lower. The first pairs are a semitone apart — 100 cents, the gap between two frets — which almost everyone
          hears easily.
        </p>
        <p>
          After two right answers in a row the gap shrinks by 30%; after a wrong answer it widens by 40%. The test ends after
          eight turning points (where the difficulty changes direction) and reports the geometric mean of the last six. That
          figure is your <strong>pitch discrimination threshold</strong>: the smallest change you hear reliably.
        </p>

        <h2>What Your Score Means</h2>
        <table>
          <thead>
            <tr>
              <th>Threshold</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {BANDS.map(([from, to]) => (
              <tr key={from}>
                <td>
                  {from}–{to} cents
                </td>
                <td>{toneDeafVerdict(to).tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Lower is better. For comparison, a guitar tuner usually calls a string in tune within ±5 cents. Hearing differences
          of 10 cents or less means you can tune well by ear.
        </p>

        <h2>Tone Deafness, Explained</h2>
        <p>
          Congenital amusia is a lifelong difficulty perceiving pitch that is not caused by hearing loss or a lack of musical
          exposure. People with it often cannot tell a wrong note in a familiar tune, and pitch discrimination tests like this
          one are one of the ways researchers screen for it. A browser test cannot diagnose anything, though — speakers, noise
          and attention all affect the result.
        </p>
        <p>
          Most people who call themselves tone deaf have ordinary pitch hearing and an untrained voice. If that sounds like
          you, sing into the <Link href="/vocal-pitch-detector">vocal pitch detector</Link> and watch the needle: seeing
          whether you are sharp or flat is how the ear and voice learn to agree.
        </p>

        <h2>Get a Better Score</h2>
        <ul>
          <li>Wear headphones and find a quiet room. Fan noise and traffic mask small changes.</li>
          <li>Listen to the whole of both tones before you answer. Replay with R if you missed one.</li>
          <li>Don&apos;t overthink close calls — a guess is fine, and the staircase is built to absorb it.</li>
          <li>
            Train between attempts: tune a string against the <Link href="/drone-generator">drone generator</Link> or a{" "}
            <Link href="/tuning-fork">tuning fork</Link> and listen for the slow wobble (beating) that disappears when the
            two pitches match.
          </li>
        </ul>
        <p>
          Then compare notes with a friend: the challenge link opens this test with your score to beat. Next, try the{" "}
          <Link href="/perfect-pitch-test">perfect pitch test</Link> or the <Link href="/hearing-age-test">hearing age test</Link>,
          or see all the <Link href="/music-tests">music tests</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
