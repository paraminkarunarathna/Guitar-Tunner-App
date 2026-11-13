import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { SetlistBuilder } from "@/components/Setlist/SetlistBuilder";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Setlist Builder — Plan Songs, Keys and Tunings",
  description:
    "Free setlist builder for guitarists. Order songs with key, BPM, capo and tuning, see where you must retune, then print the list or share a link.",
  alternates: { canonical: "/setlist-builder", languages: languageAlternates("/setlist-builder") },
  openGraph: {
    title: "Guitar Setlist Builder — Spot Retunes Before the Gig",
    description:
      "Plan a gig or rehearsal: key, tempo, capo and tuning per song, retune warnings, one-click grouping, print and share.",
  },
};

export default function SetlistBuilderPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Setlist Builder - GuitarTunePro",
    url: "https://www.guitartunepro.com/setlist-builder",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A setlist builder that tracks key, BPM, capo and tuning for each song, flags tuning changes and groups songs to avoid them.",
    featureList: [
      "Key, BPM, capo, tuning, length and notes per song",
      "Retune warnings between songs in different tunings",
      "One-click grouping by tuning",
      "Total running time",
      "Print-friendly layout",
      "Share the list with a link; no account needed",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Setlist Builder"
        description="Add your songs, set the key, tempo, capo and tuning for each, and the list shows where you will have to retune on stage."
        canonicalPath="/setlist-builder"
        tool={<SetlistBuilder />}
        otherTools={otherToolLinks("/setlist-builder")}
        faqs={[
          {
            question: "How does the retune warning work?",
            answer:
              "Whenever a song needs a different tuning from the one before it, the list marks the change between them. Fewer retunes mean fewer awkward pauses and fewer slipped strings after a quick tune. The group by tuning button moves songs of the same tuning together, keeping their relative order, and tells you how many retunes that saves.",
          },
          {
            question: "Is my setlist saved?",
            answer:
              "Yes, on this device, in your browser's storage. Nothing is uploaded. To open the same list on another device or send it to a bandmate, use Copy share link; the list travels inside the link itself, in the part after the #, which browsers never send to a server.",
          },
          {
            question: "Can I print the setlist for the stage?",
            answer:
              "Press Print. The page hides everything but the list, in black on white, with the retune markers included. Use a large font in your browser's print settings if you play in low light.",
          },
          {
            question: "Which tunings can I choose?",
            answer:
              "Standard, half step down, full step down, drop D, drop C, DADGAD and the open tunings G, D, E, A and C. Each links to the matching tuner so you can tune up before the set.",
          },
          {
            question: "Does it work for capo songs?",
            answer:
              "Yes. Enter the capo fret per song. A capo does not change the tuning, so it is not counted as a retune, but it is a prop to move, so it is worth seeing in the list. The capo calculator can help you choose the fret.",
          },
        ]}
        relatedArticles={[
          {
            title: "Alternate Guitar Tunings",
            slug: "alternate-guitar-tunings",
            description: "Which tunings suit which kinds of songs.",
          },
          {
            title: "How Often Should You Tune Your Guitar?",
            slug: "how-often-should-you-tune-your-guitar",
            description: "Before the show, between songs, and after a retune.",
          },
        ]}
      >
        <h2>How to Build a Setlist That Plays Well</h2>
        <ol>
          <li>Add each song with its key, tempo, tuning and length. Anything you do not know can be left blank.</li>
          <li>Order the songs with the arrows. Watch the retune markers appear between songs in different tunings.</li>
          <li>Try Group by tuning to see how many retunes you can remove, and decide whether the flow still works.</li>
          <li>Print it or copy the link for the band.</li>
        </ol>

        <h2>Pacing a Set</h2>
        <ul>
          <li>
            <strong>Open strong, not fast.</strong> A familiar song at a comfortable tempo settles nerves and the room.
          </li>
          <li>
            <strong>Vary tempo and key.</strong> Three songs at the same speed in the same key blur together. The BPM and key
            fields make that visible at a glance.
          </li>
          <li>
            <strong>Put retunes where there is talk.</strong> A change of tuning is easiest when the band is introducing a song
            or thanking the crowd. The <Link href="/pitch-pipe">pitch pipe</Link> and{" "}
            <Link href="/">tuner</Link> are quick for that.
          </li>
          <li>
            <strong>Know your tempo.</strong> If you do not have the BPM of a song, <Link href="/tap-tempo">tap it out</Link>{" "}
            and enter the result.
          </li>
        </ul>
        <p>
          Not sure which key suits your voice? The <Link href="/key-finder">key finder</Link> and{" "}
          <Link href="/chord-transposer">chord transposer</Link> help you move a song.
        </p>
      </ToolPageLayout>
    </>
  );
}
