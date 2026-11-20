import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { SpeedTrainer } from "@/components/SpeedTrainer/SpeedTrainer";
import { otherToolLinks } from "@/lib/toolPages";
import { formatDuration, planSteps, sanitizePlan, secondsToTarget } from "@/lib/music/speedTrainer";

export const metadata: Metadata = {
  title: "Speed Trainer — Metronome That Speeds Up",
  description:
    "Free speed trainer metronome: set a start and target BPM and it raises the tempo every few bars. Gap-click drills and saved best tempos per exercise.",
  alternates: { canonical: "/speed-trainer" },
  openGraph: {
    title: "Guitar Speed Trainer — a Metronome That Speeds Up for You",
    description:
      "Start slow, let the click climb a few BPM every few bars, and save your best tempo for every lick and exercise.",
  },
};

/** Example ramps for the reference table, computed with the trainer's own maths. */
const EXAMPLES = [
  { name: "Gentle", plan: sanitizePlan({ start: 60, target: 90, step: 2, barsPerStep: 4 }) },
  { name: "Steady", plan: sanitizePlan({ start: 80, target: 120, step: 4, barsPerStep: 4 }) },
  { name: "Push", plan: sanitizePlan({ start: 100, target: 160, step: 5, barsPerStep: 2 }) },
];

export default function SpeedTrainerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Guitar Speed Trainer - GuitarTunePro",
    url: "https://www.guitartunepro.com/speed-trainer",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A metronome that raises the tempo automatically from a start BPM to a target BPM, with gap-click bars and saved best tempos.",
    featureList: [
      "Automatic tempo increase every N bars",
      "Start and target tempo from 30 to 300 BPM",
      "Hold the current tempo or step back one notch mid-run",
      "Gap-click drill with silent bars",
      "Loop the ramp or stay at the target",
      "Best tempo saved per exercise",
      "Shareable links with the ramp settings",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Guitar Speed Trainer"
        description="A metronome that speeds up for you. Pick a tempo you can play cleanly, a tempo you want to reach, and let the click climb a few BPM every few bars."
        canonicalPath="/speed-trainer"
        tool={<SpeedTrainer />}
        otherTools={otherToolLinks("/speed-trainer")}
        faqs={[
          {
            question: "What is a speed trainer?",
            answer:
              "A metronome that changes its own tempo. You choose a starting BPM, a target BPM, how much to add each time and how many bars to play at each tempo. It starts slow and steps up on the bar line, so you never have to stop playing to turn a dial.",
          },
          {
            question: "How fast should I increase the tempo?",
            answer:
              "Small steps work best — 2 to 5 BPM. Start at a tempo where you can play the passage cleanly three times in a row. If a step makes you tense or sloppy, press Too fast to drop back one notch, or Hold to stay put until it is clean again.",
          },
          {
            question: "What are silent bars for?",
            answer:
              "They test your internal clock. The click plays for a few bars and then drops out while you keep going; when it comes back you hear straight away whether you rushed or dragged. Drummers call it a gap click. The tempo ramp keeps running during the silent bars.",
          },
          {
            question: "How is my best tempo worked out?",
            answer:
              "It is the fastest tempo you stayed with for one complete bar. Stopping halfway through a bar at a new tempo does not count. Bests are kept per exercise name, so a scale run and a solo section each have their own record.",
          },
          {
            question: "Is my progress saved?",
            answer:
              "Yes, in this browser — no account. Each session also counts as a practice day for your streak, and you can move everything to another device from the progress page.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "The method behind slow-to-fast practice.",
          },
        ]}
      >
        <h2>How to Build Speed on Guitar</h2>
        <ol>
          <li>Find the fastest tempo at which you can play the passage cleanly three times in a row. Make that the start.</li>
          <li>Set a target 20 to 40 BPM above it — a goal for this week, not for today.</li>
          <li>Use a small step (2–5 BPM) and give each tempo enough bars to play the passage at least twice.</li>
          <li>When a tempo feels tense, press <strong>Too fast</strong>. Accuracy at a lower tempo builds speed; mistakes at a higher one build mistakes.</li>
          <li>Name the exercise so your best tempo is saved, and come back tomorrow to beat it.</li>
        </ol>

        <h2>Example Ramps</h2>
        <p>
          How long each preset takes to reach its target in 4/4, worked out with the same maths the trainer uses. Longer
          ramps are not worse: more bars at each tempo means more clean repetitions.
        </p>
        <table>
          <thead>
            <tr>
              <th>Preset</th>
              <th>Ramp</th>
              <th>Tempos</th>
              <th>Time to target</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map(({ name, plan }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  {plan.start} → {plan.target} BPM, +{plan.step} every {plan.barsPerStep} bars
                </td>
                <td>{planSteps(plan).length}</td>
                <td>{formatDuration(secondsToTarget(plan))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Why Slow-to-Fast Practice Works</h2>
        <p>
          Fast playing is mostly relaxed, accurate movement repeated until it is automatic. Practising above the speed you
          can control repeats the tension and the misses instead. Stepping up a few BPM at a time keeps every repetition
          clean while still asking for a little more than last time, which is why teachers recommend it for scales,
          picking exercises, legato runs and difficult song sections alike.
        </p>
        <p>
          Not sure what tempo a song is at? Find it with <Link href="/tap-tempo">tap tempo</Link>. To check you are on the
          beat and not just near it, the <Link href="/rhythm-trainer">rhythm trainer</Link> measures every note in
          milliseconds, and the plain <Link href="/metronome">metronome</Link> is there when you just need a steady click.
        </p>
      </ToolPageLayout>
    </>
  );
}
