import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Swords } from "lucide-react";
import { TESTS_UI } from "@/lib/i18n/tools/testsUi";
import { fmt } from "@/lib/i18n/tools/ui";
import {
  MUSIC_TEST_IDS,
  TEST_PATHS,
  brag,
  challengePath,
  friendLine,
  parseLocale,
  parseShareParams,
  shareQuery,
  testName,
  tierInSentence,
  verdictFor,
} from "@/lib/musicTests";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const rich = (text: string) =>
  text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-ink">{part}</strong> : <Fragment key={i}>{part}</Fragment>));

/** Landing page for a shared test result. The score is in the URL, so the
 *  page is noindex — each score would otherwise be its own thin page — and
 *  it exists to turn the click into a new player via "beat this score".
 *  `l=` keeps it in the language the result was shared from. */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  const result = parseShareParams((key) => query[key]);
  const locale = result?.locale ?? parseLocale(query.l);
  const ui = TESTS_UI[locale];
  const title = result ? `${brag(result.id, result.score, locale)} — ${ui.canYouBeatIt}` : ui.shareBadTitle;
  const description = result
    ? fmt(ui.shareMetaDesc, { question: ui.questions[result.id], test: testName(result.id, locale) })
    : ui.shareBadBody;
  const image = result ? `/share/test/image?${shareQuery(result.id, result.score, locale)}` : "/share/test/image";
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
  const locale = result?.locale ?? parseLocale(query.l);
  const ui = TESTS_UI[locale];
  const lang = locale === "en" ? undefined : locale;

  if (!result) {
    return (
      <main className="min-h-screen bg-canvas text-ink pb-20" lang={lang}>
        <div className="max-w-3xl mx-auto px-5 pt-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{ui.shareBadTitle}</h1>
          <p className="text-ink-muted mb-8">{ui.shareBadBody}</p>
          <Link href={TEST_PATHS.hub[locale]} className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors">
            {ui.shareSeeTests}
          </Link>
        </div>
      </main>
    );
  }

  const { id, score } = result;
  const name = testName(id, locale);
  const v = verdictFor(id, score, locale);

  return (
    <main className="min-h-screen bg-canvas text-ink pb-20" lang={lang}>
      <div className="max-w-3xl mx-auto px-5 pt-10 sm:pt-14 text-center">
        <p className="eyebrow inline-flex items-center gap-1.5 mb-4">
          <Swords className="h-3.5 w-3.5 text-brass" />
          {ui.shareEyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">{friendLine(id, score, locale)}</h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {rich(fmt(ui.shareBody, { tier: tierInSentence(v.tier, locale), question: ui.questions[id] }))}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, already the right size */}
        <img
          src={`/share/test/image?${shareQuery(id, score, locale)}`}
          alt={`${brag(id, score, locale)} — ${fmt(ui.shareCardAlt, { test: name })}`}
          width={1200}
          height={630}
          className="mt-8 w-full h-auto rounded-2xl border border-line shadow-2xl"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={challengePath(id, score, locale)}
            className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
          >
            {fmt(ui.shareTake, { test: locale === "de" ? name : name.toLowerCase() })}
          </Link>
          {MUSIC_TEST_IDS.filter((other) => other !== id).map((other) => (
            <Link
              key={other}
              href={TEST_PATHS[other][locale]}
              className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors"
            >
              {testName(other, locale)}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-2xs text-ink-subtle">{ui.sharePrivacy}</p>
      </div>
    </main>
  );
}
