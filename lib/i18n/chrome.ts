/** Navbar and footer text for translated pages, and the menus built so each
 *  entry that has a translated page links to it, in that language.
 *
 *  Destinations that exist only in English (About, Contact, most tools) keep
 *  their English label and carry `lang="en"`, so a link never promises a
 *  language the page does not deliver. Runs on the server: the full page
 *  copy is imported here, and only plain props go to the client Navbar. */

import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { TOOL_PAGES } from "@/lib/toolPages";
import { CONTENT } from "@/lib/i18n/content";
import { TOOL_COPY } from "@/lib/i18n/tools";
import { TRANSLATED_PAGES, TRANSLATED_TOOLS, type TranslatedLocale } from "@/lib/i18n/pages";
import { localNote, type Locale } from "@/lib/i18n/tuner";

export interface MenuEntry {
  href: string;
  label: string;
  notes?: string;
  /** Set when the destination is in a different language from the page. */
  lang?: string;
}

export interface MenuDef {
  name: string;
  entries: MenuEntry[];
  align: "center" | "end";
  width: string;
  plainNotes?: boolean;
  twoColumn?: boolean;
}

export interface ChromeText {
  tools: string;
  tunings: string;
  instruments: string;
  more: string;
  language: string;
  toggleMenu: string;
  privacy: string;
  /** Footer */
  footerBlurb: string;
  footerTools: string;
  footerTunings: string;
  footerSite: string;
  builtBy: string;
  team: string;
  audioNote: string;
  languages: string;
}

export const CHROME_TEXT: Record<TranslatedLocale, ChromeText> = {
  es: {
    tools: "Herramientas",
    tunings: "Afinaciones",
    instruments: "Instrumentos",
    more: "Más",
    language: "Idioma",
    toggleMenu: "Abrir o cerrar el menú",
    privacy: "Privacidad",
    footerBlurb: "Afinador de guitarra gratuito en el navegador, con detección de tono por micrófono, además de biblioteca de acordes y guías de afinación.",
    footerTools: "Herramientas",
    footerTunings: "Afinaciones",
    footerSite: "El sitio",
    builtBy: "Creado por",
    team: "el equipo de GuitarTunePro",
    audioNote: "Todo el audio se procesa en tu dispositivo y nunca se sube.",
    languages: "Idiomas",
  },
  pt: {
    tools: "Ferramentas",
    tunings: "Afinações",
    instruments: "Instrumentos",
    more: "Mais",
    language: "Idioma",
    toggleMenu: "Abrir ou fechar o menu",
    privacy: "Privacidade",
    footerBlurb: "Afinador de violão gratuito no navegador, com detecção de altura pelo microfone, além de biblioteca de acordes e guias de afinação.",
    footerTools: "Ferramentas",
    footerTunings: "Afinações",
    footerSite: "O site",
    builtBy: "Criado por",
    team: "a equipe GuitarTunePro",
    audioNote: "Todo o áudio é processado no seu dispositivo e nunca é enviado.",
    languages: "Idiomas",
  },
  fr: {
    tools: "Outils",
    tunings: "Accordages",
    instruments: "Instruments",
    more: "Plus",
    language: "Langue",
    toggleMenu: "Ouvrir ou fermer le menu",
    privacy: "Confidentialité",
    footerBlurb: "Un accordeur de guitare gratuit dans le navigateur, avec détection de la hauteur par le micro, plus une bibliothèque d’accords et des guides d’accordage.",
    footerTools: "Outils",
    footerTunings: "Accordages",
    footerSite: "Le site",
    builtBy: "Créé par",
    team: "l’équipe GuitarTunePro",
    audioNote: "Tout l’audio est traité sur votre appareil et n’est jamais envoyé.",
    languages: "Langues",
  },
  de: {
    tools: "Tools",
    tunings: "Stimmungen",
    instruments: "Instrumente",
    more: "Mehr",
    language: "Sprache",
    toggleMenu: "Menü öffnen oder schließen",
    privacy: "Datenschutz",
    footerBlurb: "Ein kostenloses Gitarrenstimmgerät im Browser mit Tonhöhenerkennung per Mikrofon, dazu Akkordbibliothek und Stimmungsanleitungen.",
    footerTools: "Tools",
    footerTunings: "Stimmungen",
    footerSite: "Die Seite",
    builtBy: "Erstellt von",
    team: "dem GuitarTunePro-Team",
    audioNote: "Alle Audiodaten werden auf deinem Gerät verarbeitet und nie hochgeladen.",
    languages: "Sprachen",
  },
};

/** "D A D F♯ A D" in the page's note names; doubled courses ("EE") and the
 *  banjo's lowercase drone string ("g") keep their shape. */
function localNotes(notes: string, locale: Locale) {
  return notes
    .split(" ")
    .map((token) => {
      const doubled = /^([A-G][♯♭]?)\1$/.exec(token);
      if (doubled) return localNote(doubled[1], locale).repeat(2);
      if (/^[a-g]$/.test(token)) return localNote(token.toUpperCase(), locale).toLowerCase();
      return localNote(token, locale);
    })
    .join(" ");
}

const pageFor = (enPath: string, locale: TranslatedLocale) =>
  TRANSLATED_PAGES.find((p) => p.en === enPath)?.[locale];

/** A tuner or instrument entry, pointing at its translated page when one
 *  exists and otherwise at the English page, labelled as English. */
function tunerEntry(
  entry: { href: string; label: string; notes?: string },
  locale: TranslatedLocale,
): MenuEntry {
  const href = pageFor(entry.href, locale);
  if (!href) return { href: entry.href, label: entry.label, notes: entry.notes, lang: "en" };
  return {
    href,
    label: CONTENT[locale].labels[entry.href] ?? entry.label,
    notes: entry.notes ? localNotes(entry.notes, locale) : undefined,
  };
}

/** The five translated tools first, then the English-only ones. */
function toolEntries(locale: TranslatedLocale): MenuEntry[] {
  const translated = TRANSLATED_TOOLS.map((t) => ({
    href: t[locale],
    label: TOOL_COPY[locale][t.en].label,
  }));
  const rest = TOOL_PAGES.filter((tool) => !TRANSLATED_TOOLS.some((t) => t.en === tool.href)).map(
    (tool) => ({ href: tool.href, label: tool.label, notes: tool.tagline, lang: "en" }),
  );
  return [...translated, ...rest];
}

export function localizedMenus(locale: TranslatedLocale): MenuDef[] {
  const t = CHROME_TEXT[locale];
  return [
    { name: t.tools, entries: toolEntries(locale), align: "center", width: "w-[40rem]", plainNotes: true, twoColumn: true },
    { name: t.tunings, entries: TUNER_PAGES.map((e) => tunerEntry(e, locale)), align: "center", width: "w-[34rem]", twoColumn: true },
    { name: t.instruments, entries: INSTRUMENT_PAGES.map((e) => tunerEntry(e, locale)), align: "center", width: "w-[34rem]", twoColumn: true },
    {
      name: t.more,
      align: "end",
      width: "w-56",
      entries: [
        { href: "/articles", label: "Articles", lang: "en" },
        { href: "/my-progress", label: "Your Progress", lang: "en" },
        { href: "/about", label: "About", lang: "en" },
        { href: "/contact", label: "Contact", lang: "en" },
      ],
    },
  ];
}

export interface FooterColumn {
  heading: string;
  links: MenuEntry[];
}

const FOOTER_TUNERS = ["/drop-d-tuner", "/half-step-down-tuner", "/open-g-tuner", "/bass-tuner", "/ukulele-tuner"];

export function localizedFooterColumns(locale: TranslatedLocale): FooterColumn[] {
  const t = CHROME_TEXT[locale];
  const all = [...TUNER_PAGES, ...INSTRUMENT_PAGES];
  return [
    {
      heading: t.footerTools,
      links: [
        { href: `/${locale}`, label: CONTENT[locale].labels["/"] ?? "Tuner" },
        ...TRANSLATED_TOOLS.map((tool) => ({ href: tool[locale], label: TOOL_COPY[locale][tool.en].label })),
      ],
    },
    {
      heading: t.footerTunings,
      links: FOOTER_TUNERS.flatMap((href) => {
        const entry = all.find((p) => p.href === href);
        return entry ? [tunerEntry(entry, locale)] : [];
      }),
    },
    {
      heading: t.footerSite,
      links: [
        { href: "/about", label: "About", lang: "en" },
        { href: "/contact", label: "Contact", lang: "en" },
        { href: "/privacy-policy", label: "Privacy Policy", lang: "en" },
        { href: "/terms-of-service", label: "Terms of Service", lang: "en" },
      ],
    },
  ];
}
