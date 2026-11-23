import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { HearingAgeTest } from "@/components/MusicTests/HearingAgeTest";
import { otherToolLinks } from "@/lib/toolPages";
import { HEARING_AGE } from "@/lib/musicTests";

export const metadata: Metadata = {
  title: "Hearing Age Test — How High Can You Hear?",
  description:
    "Free online hearing age test: tones from 8 kHz to 20 kHz show the highest frequency you can hear and the age your ears sound. Share it and challenge a friend.",
  alternates: { canonical: "/hearing-age-test", languages: languageAlternates("/hearing-age-test") },
  openGraph: {
    title: "Hearing Age Test — How Old Are Your Ears?",
    description: "Find the highest frequency you can hear, from 8 to 20 kHz, and the age it is typical of. Two minutes, free, in your browser.",
  },
};

const khz = (hz: number) => `${Number((hz / 1000).toFixed(1))} kHz`;

export default function HearingAgeTestPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hearing Age Test - GuitarTunePro",
    url: "https://www.guitartunepro.com/hearing-age-test",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A high-frequency hearing check: pure tones from 8 to 20 kHz with a silent catch trial, reporting the highest frequency heard and the age it is typical of.",
    featureList: [
      "Ten tones from 8 kHz to 20 kHz",
      "Volume check tone at 1 kHz",
      "Silent catch trial to flag guessing",
      "Slow fades so clicks do not give a tone away",
      "Shareable result card and friend challenge link",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Hearing Age Test"
        description="High-pitched tones climb from 8 kHz to 20 kHz. Tell us which ones you can hear, and see the highest frequency your ears pick up — and the age it's typical of."
        canonicalPath="/hearing-age-test"
        tool={<HearingAgeTest />}
        otherTools={otherToolLinks("/hearing-age-test")}
        faqs={[
          {
            question: "What is a normal hearing range?",
            answer:
              "The textbook range of human hearing is 20 Hz to 20 kHz, but only young children reach the top of it. The upper limit falls steadily with age, so most adults in their thirties stop hearing somewhere around 16 to 17 kHz, and most people over 50 around 12 to 14 kHz.",
          },
          {
            question: "Is this a medical hearing test?",
            answer:
              "No. It checks only the very top of your range, through speakers that were never calibrated. Speech and music sit far below 8 kHz, so a low result here says little about everyday hearing. If you notice muffled speech, ringing or hearing loss, see a doctor or audiologist for a proper test.",
          },
          {
            question: "Why can't I hear the higher tones on my phone?",
            answer:
              "Many phone and laptop speakers roll off sharply above about 15 kHz, and some Bluetooth headphones and codecs cut high frequencies too. Wired headphones give the truest result. If you cannot hear 8 kHz at all, the volume or the speaker is almost certainly the cause.",
          },
          {
            question: "Why is there a silent tone?",
            answer:
              "One step plays nothing at all. If you say you heard it, the test knows you were guessing and will not share the result as if it were real. Clicking “I hear it” to every tone is the easiest way to get a flattering score, and the catch trial stops it.",
          },
          {
            question: "Does a high score mean I have good ears for music?",
            answer:
              "Not really. Musical pitch tops out around 4 kHz — the highest note on a piano — and what matters for playing is how finely you hear pitch differences. The tone deaf test measures that directly.",
          },
          {
            question: "Should I turn the volume up to hear the high tones?",
            answer:
              "No. Set a comfortable level with the 1 kHz check tone and leave it there. Turning high frequencies up loud can damage the very hearing you are testing.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Let your ears off the hook when tuning.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The frequencies that matter for music are far lower.",
          },
        ]}
      >
        <h2>Hearing Age Chart</h2>
        <p>
          The highest frequency you can hear falls as you get older — a change called presbycusis — so it makes a rough
          guess at the age of your ears. These are rule-of-thumb figures; noise exposure can age ears much faster than
          birthdays do.
        </p>
        <table>
          <thead>
            <tr>
              <th>Highest tone heard</th>
              <th>Typical of people</th>
            </tr>
          </thead>
          <tbody>
            {HEARING_AGE.map((row) => (
              <tr key={row.hz}>
                <td>{khz(row.hz)}</td>
                <td>{row.age === "70 or over" ? "aged 70 or over" : row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>How the Test Works</h2>
        <ol>
          <li>
            <strong>Set the volume.</strong> A 1 kHz tone plays; turn it to a quiet, comfortable level. Every tone after it
            plays at the same level.
          </li>
          <li>
            <strong>Climb.</strong> Pure tones play for two and a half seconds each, starting at 8 kHz and climbing to 20
            kHz. Each fades in and out slowly, because an abrupt start makes a click you could hear even when the tone itself
            is out of range.
          </li>
          <li>
            <strong>Stop at your limit.</strong> The first tone you cannot hear ends the test. Your result is the highest one
            you did hear.
          </li>
          <li>
            <strong>Catch trial.</strong> One step somewhere in the middle is silent. Answering that you heard it marks the
            result as unreliable.
          </li>
        </ol>
        <p>
          The frequency is not shown while you listen, so the silent step looks exactly like the others.
        </p>

        <h2>Why High-Frequency Hearing Fades</h2>
        <p>
          The inner ear sorts sound by pitch along the cochlea, and the hair cells that respond to the highest frequencies sit
          at its entrance, where every sound passes. They wear out first — from age, and from loud music, concerts and power
          tools. Lost hair cells do not grow back, which is why the top of the range shrinks over a lifetime and rarely
          returns.
        </p>
        <p>
          For musicians that is a good reason to wear earplugs at rehearsals and gigs. Musicians&apos; earplugs cut volume
          evenly across frequencies, so the band still sounds like the band — just quieter.
        </p>

        <h2>Test the Ears That Make Music</h2>
        <p>
          Hearing 18 kHz does not make anyone a better guitarist. Pitch hearing does: try the{" "}
          <Link href="/tone-deaf-test">tone deaf test</Link> to measure how small a pitch change you notice, the{" "}
          <Link href="/perfect-pitch-test">perfect pitch test</Link> to see if you can name notes cold, or the{" "}
          <Link href="/tone-generator">tone generator</Link> to sweep any frequency yourself. Everything is gathered on the{" "}
          <Link href="/music-tests">music tests</Link> page.
        </p>
      </ToolPageLayout>
    </>
  );
}
