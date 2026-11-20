import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { StringTracker } from "@/components/StringTracker/StringTracker";
import { otherToolLinks } from "@/lib/toolPages";
import { STRING_KINDS, describeLife, lifeDays } from "@/lib/stringLife";

export const metadata: Metadata = {
  title: "How Often to Change Guitar Strings?",
  description:
    "How often should you change guitar strings? Estimate string life from how much you play, track every guitar, and get a calendar reminder when they're due.",
  alternates: { canonical: "/string-change-tracker" },
  openGraph: {
    title: "How Often Should You Change Guitar Strings? Free String Tracker",
    description:
      "An estimate based on string type, coating and playing time — plus a tracker and calendar reminder for every guitar you own.",
  },
};

const HOURS = [1, 3, 5, 10];

export default function StringChangeTrackerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "String Change Tracker - GuitarTunePro",
    url: "https://www.guitartunepro.com/string-change-tracker",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Estimates when guitar strings need changing from string type, coating, sweat and hours played, and tracks every guitar with calendar reminders.",
    featureList: [
      "String life estimate for electric, acoustic, classical and bass strings",
      "Coated and uncoated strings",
      "Tracks several guitars",
      "Calendar reminder file for any calendar app",
      "History of how long each set lasted",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="String Change Tracker"
        description="How often should you change your strings? It depends on what they are and how much you play. Add your guitar to get an estimate, and a reminder when they're due."
        canonicalPath="/string-change-tracker"
        tool={<StringTracker />}
        otherTools={otherToolLinks("/string-change-tracker")}
        faqs={[
          {
            question: "How often should you change guitar strings?",
            answer:
              "For someone playing a few hours a week, every 6 to 12 weeks is typical for uncoated electric or acoustic strings. Daily players often change every few weeks; casual players can go 3 to 6 months. Coated strings last two to three times longer. The table on this page shows estimates for each string type and amount of playing.",
          },
          {
            question: "How do I know my strings are dead?",
            answer:
              "They sound dull, with less sustain and fewer high overtones. They feel rough or gritty, look dark or discoloured, or have dents where they meet the frets. They also stop staying in tune and stop playing in tune up the neck, because a worn string no longer vibrates evenly.",
          },
          {
            question: "Do strings go bad if I don't play?",
            answer:
              "Yes, slowly. Moisture in the air corrodes uncoated strings even on a guitar in its case, so an unplayed set still ages. That is why this tracker caps the estimate at about six months for uncoated strings and a year for coated ones, however little you play.",
          },
          {
            question: "Why do new strings keep going out of tune?",
            answer:
              "New strings stretch and settle around the tuning posts for the first day or two. Tune up, gently pull each string away from the fretboard along its length, and tune again. Repeat a few times and they will hold.",
          },
          {
            question: "How accurate is the estimate?",
            answer:
              "It is a planning guide, not a measurement. It is based on typical ranges published by string makers and adjusted for coating, sweat and playing time. How the strings sound and feel to you always wins — change them sooner if they are dull, later if they still sound good.",
          },
        ]}
        relatedArticles={[
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Which strings hold their pitch best, and why.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description: "Old strings are one of the most common causes.",
          },
        ]}
      >
        <h2>How Long Do Guitar Strings Last?</h2>
        <p>
          Estimated life of a set by string type and hours played per week, for a player with normal hands. These are the
          same numbers the tracker uses. Sweaty or acidic hands shorten them by about 40%; dry hands lengthen them a little.
        </p>
        <table>
          <thead>
            <tr>
              <th>Strings</th>
              {HOURS.map((h) => (
                <th key={h}>{h} h/week</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STRING_KINDS.flatMap((kind) =>
              [false, true].map((coated) => (
                <tr key={`${kind.value}-${coated}`}>
                  <td>
                    {kind.label}, {coated ? "coated" : "uncoated"}
                  </td>
                  {HOURS.map((h) => (
                    <td key={h}>{describeLife(lifeDays({ kind: kind.value, coated, sweat: "normal", hoursPerWeek: h }))}</td>
                  ))}
                </tr>
              )),
            )}
          </tbody>
        </table>

        <h2>Signs Your Strings Need Changing</h2>
        <ul>
          <li>
            <strong>Dull tone.</strong> The bright, ringing quality fades and notes die away sooner.
          </li>
          <li>
            <strong>Won&apos;t stay in tune.</strong> You retune every few minutes, or open strings are in tune but chords up the neck
            are not. Check with the <Link href="/">tuner</Link> and the <Link href="/intonation-checker">intonation checker</Link>.
          </li>
          <li>
            <strong>Rough or discoloured.</strong> Run a finger along the underside of the wound strings: grit, rust or dark
            patches mean corrosion.
          </li>
          <li>
            <strong>Fret dents.</strong> Flat spots where the string meets the frets you play most.
          </li>
        </ul>

        <h2>What Changes How Long Strings Last</h2>
        <p>
          <strong>Playing time</strong> matters most: sweat, skin oils and fret wear build up with every hour.{" "}
          <strong>Coating</strong> keeps grime out of the windings and is the biggest single extension.{" "}
          <strong>Material</strong> matters too: bronze acoustic strings oxidise faster than nickel electric strings, while
          nylon trebles and bass strings keep usable tone longer. Washing your hands before playing and wiping the strings
          afterwards adds weeks to any set.
        </p>
        <p>
          Changing gauge at the same time? The <Link href="/string-tension-calculator">string tension calculator</Link> shows
          how the new set will feel in your tuning, and the <Link href="/practice-routine">practice routine</Link> logs the
          playing time that wears them out.
        </p>
      </ToolPageLayout>
    </>
  );
}
