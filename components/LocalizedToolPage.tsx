import type { Metadata } from "next";
import { Fragment } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { TapTempo } from "@/components/TapTempo/TapTempo";
import { PitchPipe } from "@/components/PitchPipe/PitchPipe";
import { TuningFork } from "@/components/TuningFork/TuningFork";
import { ChordQuiz } from "@/components/ChordQuiz/ChordQuiz";
import { SetlistBuilder } from "@/components/Setlist/SetlistBuilder";
import { PerfectPitchTest } from "@/components/MusicTests/PerfectPitchTest";
import { ToneDeafTest } from "@/components/MusicTests/ToneDeafTest";
import { HearingAgeTest } from "@/components/MusicTests/HearingAgeTest";
import { TestHub } from "@/components/MusicTests/TestHub";
import { TESTS_UI } from "@/lib/i18n/tools/testsUi";
import { HEARING_AGE, PERFECT_PITCH_ROUNDS, TEST_PATHS, TONE_DEAF_BANDS, perfectPitchVerdict, toneDeafVerdict } from "@/lib/musicTests";
import {
  TRANSLATED_LOCALES,
  TRANSLATED_TOOLS,
  languageAlternates,
  type TranslatedLocale,
} from "@/lib/i18n/pages";
import { STEP_TEXT } from "@/lib/i18n/pageText";
import { TOOL_COPY } from "@/lib/i18n/tools";
import type { ToolBlock } from "@/lib/i18n/tools/types";
import { FORK_UI, PIPE_UI, TAP_UI } from "@/lib/i18n/tools/ui";
import { forkLabel, localName } from "@/lib/i18n/tools/names";
import { localDecimal } from "@/lib/i18n/tuner";
import { FORKS, PIPE_SETS } from "@/lib/music/pitchSets";
import { TEMPO_MARKINGS } from "@/lib/music/tempo";
import { midiToFrequency } from "@/lib/synth";

const SITE_URL = "https://www.guitartunepro.com";

const pathFor = (locale: TranslatedLocale, enPath: string) =>
  TRANSLATED_TOOLS.find((page) => page.en === enPath)![locale];

/** "**bold**" → <strong>. The only inline markup page copy uses. */
function rich(text: string) {
  return text
    .split("**")
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

export function localizedToolMetadata(locale: TranslatedLocale, enPath: string): Metadata {
  const copy = TOOL_COPY[locale][enPath];
  const path = pathFor(locale, enPath);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${SITE_URL}${path}`,
      locale: STEP_TEXT[locale].ogLocale,
      alternateLocale: ["en_US", ...TRANSLATED_LOCALES.filter((l) => l !== locale).map((l) => STEP_TEXT[l].ogLocale)],
    },
  };
}

const th = "text-left";

/** The data table behind a `{ table }` marker, drawn from the same data the
 *  tool uses so the numbers cannot drift from the English page. */
function ToolTable({ enPath, heads, locale }: { enPath: string; heads: string[]; locale: TranslatedLocale }) {
  const head = (
    <thead>
      <tr>
        {heads.map((h) => (
          <th key={h} className={th}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
  if (enPath === "/tap-tempo") {
    return (
      <table>
        {head}
        <tbody>
          {TEMPO_MARKINGS.map((m, i) => (
            <tr key={m.name}>
              <td>
                {m.name} — {TAP_UI[locale].feel[i]}
              </td>
              <td>
                {m.from}–{m.to}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (enPath === TEST_PATHS["perfect-pitch"].en) {
    const bands = [[11, 12], [8, 10], [5, 7], [3, 4], [0, 2]];
    return (
      <table>
        {head}
        <tbody>
          {bands.map(([from, to]) => (
            <tr key={from}>
              <td>
                {from}–{to} / {PERFECT_PITCH_ROUNDS}
              </td>
              <td>{perfectPitchVerdict(from, locale).tier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (enPath === TEST_PATHS["tone-deaf"].en) {
    const edges = [...TONE_DEAF_BANDS, 300];
    return (
      <table>
        {head}
        <tbody>
          {edges.map((to, i) => (
            <tr key={to}>
              <td>
                {i === 0 ? 1 : edges[i - 1] + 1}–{to} ¢
              </td>
              <td>{toneDeafVerdict(to, locale).tier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (enPath === TEST_PATHS["hearing-age"].en) {
    return (
      <table>
        {head}
        <tbody>
          {HEARING_AGE.map((row, i) => (
            <tr key={row.hz}>
              <td>{row.hz / 1000} kHz</td>
              <td>{TESTS_UI[locale].ha.ages[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (enPath === "/pitch-pipe") {
    return (
      <table>
        {head}
        <tbody>
          {PIPE_SETS.filter((s) => s.id !== "chromatic").map((set) => (
            <tr key={set.id}>
              <td>{PIPE_UI[locale].sets[set.id]?.label ?? set.label}</td>
              <td>{set.notes.map((n) => localName(n.label, locale)).join(" ")}</td>
              <td>{set.notes.map((n) => localDecimal(midiToFrequency(n.midi), 1, locale)).join(" · ")} Hz</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <table>
      {head}
      <tbody>
        {FORKS.map((f, i) => (
          <tr key={f.id}>
            <td>{forkLabel(f.label, f.hz, locale).split(" ").slice(0, 2).join(" ")}</td>
            <td>{localDecimal(f.hz, f.hz % 1 === 0 ? 0 : 2, locale)} Hz</td>
            <td>{FORK_UI[locale].uses[i]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderBlock(block: ToolBlock, key: number, enPath: string, locale: TranslatedLocale) {
  if (typeof block === "string") return <p key={key}>{rich(block)}</p>;
  if ("table" in block) return <ToolTable key={key} enPath={enPath} heads={block.table} locale={locale} />;
  if ("steps" in block)
    return (
      <ol key={key}>
        {block.steps.map((item, i) => (
          <li key={i}>{rich(item)}</li>
        ))}
      </ol>
    );
  return (
    <ul key={key}>
      {block.list.map((item, i) => (
        <li key={i}>{rich(item)}</li>
      ))}
    </ul>
  );
}

function toolFor(enPath: string, locale: TranslatedLocale) {
  switch (enPath) {
    case "/tap-tempo":
      return <TapTempo locale={locale} />;
    case "/pitch-pipe":
      return <PitchPipe locale={locale} />;
    case "/tuning-fork":
      return <TuningFork locale={locale} />;
    case "/chord-quiz":
      return <ChordQuiz locale={locale} />;
    case TEST_PATHS["perfect-pitch"].en:
      return <PerfectPitchTest locale={locale} />;
    case TEST_PATHS["tone-deaf"].en:
      return <ToneDeafTest locale={locale} />;
    case TEST_PATHS["hearing-age"].en:
      return <HearingAgeTest locale={locale} />;
    case TEST_PATHS.hub.en:
      return <TestHub locale={locale} />;
    default:
      return <SetlistBuilder locale={locale} />;
  }
}

const HOME_LABEL = { es: "Afinador de guitarra", pt: "Afinador de violão", fr: "Accordeur de guitare", de: "Gitarren-Stimmgerät" } as const;

/** One translated practice-tool page: the live tool in the page's language,
 *  its own prose and FAQ, and links to the other tools in that language. */
export default function LocalizedToolPage({ locale, enPath }: { locale: TranslatedLocale; enPath: string }) {
  const copy = TOOL_COPY[locale][enPath];
  const path = pathFor(locale, enPath);

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${copy.title} - GuitarTunePro`,
    url: `${SITE_URL}${path}`,
    inLanguage: locale,
    applicationCategory: Object.values(TEST_PATHS).some((p) => p.en === enPath) ? "EducationalApplication" : "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: copy.metaDescription,
  };

  const others = [
    { label: HOME_LABEL[locale], href: `/${locale}` },
    ...TRANSLATED_TOOLS.filter((t) => t.en !== enPath).map((t) => ({
      label: TOOL_COPY[locale][t.en].label,
      href: t[locale],
    })),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        locale={locale}
        title={copy.title}
        description={copy.description}
        canonicalPath={path}
        tool={toolFor(enPath, locale)}
        otherTools={others}
        faqs={copy.faqs}
      >
        {copy.sections.map((section, i) => (
          <Fragment key={i}>
            <h2>{section.heading}</h2>
            {section.body.map((block, j) => renderBlock(block, j, enPath, locale))}
          </Fragment>
        ))}
      </ToolPageLayout>
    </>
  );
}
