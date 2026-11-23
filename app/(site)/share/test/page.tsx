import { Metadata } from "next";
import Link from "next/link";
import { Swords } from "lucide-react";
import {
  MUSIC_TESTS,
  MUSIC_TEST_IDS,
  brag,
  challengePath,
  friendLine,
  parseShareParams,
  shareQuery,
  verdictFor,
} from "@/lib/musicTests";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Landing page for a shared test result. The score is in the URL, so the
 *  page is noindex — each score would otherwise be its own thin page — and
 *  it exists to turn the click into a new player via "beat this score". */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  const result = parseShareParams((key) => query[key]);
  const title = result ? `${brag(result.id, result.score)} — can you beat it?` : "Music tests: how good are your ears?";
  const description = result
    ? `${MUSIC_TESTS[result.id].question} Take the free ${MUSIC_TESTS[result.id].name.toLowerCase()} in your browser and see if you can beat this score.`
    : "Free online tests for perfect pitch, tone deafness and hearing age. Take one, then challenge a friend to beat your score.";
  const image = result ? `/share/test/image?${shareQuery(result.id, result.score)}` : "/share/test/image";
  return {
    title,
    description,
    alternates: { canonical: "/share/test" },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function SharedTestPage({ searchParams }: Props) {
  const query = await searchParams;
  const result = parseShareParams((key) => query[key]);

  if (!result) {
    return (
      <main className="min-h-screen bg-canvas text-ink pb-20">
        <div className="max-w-3xl mx-auto px-5 pt-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">How good are your ears?</h1>
          <p className="text-ink-muted mb-8">This share link is incomplete, but the tests are all here.</p>
          <Link href="/music-tests" className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors">
            See the music tests
          </Link>
        </div>
      </main>
    );
  }

  const { id, score } = result;
  const test = MUSIC_TESTS[id];
  const v = verdictFor(id, score);

  return (
    <main className="min-h-screen bg-canvas text-ink pb-20">
      <div className="max-w-3xl mx-auto px-5 pt-10 sm:pt-14 text-center">
        <p className="eyebrow inline-flex items-center gap-1.5 mb-4">
          <Swords className="h-3.5 w-3.5 text-brass" />
          You&apos;ve been challenged
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">{friendLine(id, score)}</h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          That&apos;s <strong className="text-ink">{v.tier.toLowerCase()}</strong>. {test.question} The test is free, takes
          about two minutes and runs in your browser.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, already the right size */}
        <img
          src={`/share/test/image?${shareQuery(id, score)}`}
          alt={`${brag(id, score)} — ${test.name} result card`}
          width={1200}
          height={630}
          className="mt-8 w-full h-auto rounded-2xl border border-line shadow-2xl"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={challengePath(id, score)}
            className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
          >
            Take the {test.name.toLowerCase()}
          </Link>
          {MUSIC_TEST_IDS.filter((other) => other !== id).map((other) => (
            <Link
              key={other}
              href={MUSIC_TESTS[other].href}
              className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              {MUSIC_TESTS[other].name}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-2xs text-ink-subtle">
          Scores are kept in each player&apos;s own browser and shared by link. GuitarTunePro has no accounts and stores nothing
          about you.
        </p>
      </div>
    </main>
  );
}
