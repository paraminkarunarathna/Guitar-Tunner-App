import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedTunerPage, {
  localizedMetadata,
} from "@/components/LocalizedTunerPage";
import LocalizedToolPage, { localizedToolMetadata } from "@/components/LocalizedToolPage";
import { HANDWRITTEN_PAGES, TRANSLATED_PAGES, TRANSLATED_TOOLS } from "@/lib/i18n/pages";

/** Spanish tuner pages other than the hand-written ones in sibling folders,
 *  which Next resolves first. */
export const dynamicParams = false;

const PAGES = TRANSLATED_PAGES.filter(
  (page) => page.en !== "/" && !HANDWRITTEN_PAGES.has(page.es),
);

const TOOLS = TRANSLATED_TOOLS;

export function generateStaticParams() {
  return [...PAGES, ...TOOLS].map((page) => ({ slug: page.es.split("/")[2] }));
}

type Props = { params: Promise<{ slug: string }> };

const resolve = (slug: string) =>
  PAGES.find((page) => page.es === `/es/${slug}`);
const resolveTool = (slug: string) =>
  TOOLS.find((page) => page.es === `/es/${slug}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const tool = resolveTool(slug);
  if (tool) return localizedToolMetadata("es", tool.en);
  const page = resolve(slug);
  return page ? localizedMetadata("es", page.en) : {};
}

export default async function SpanishTuner({ params }: Props) {
  const slug = (await params).slug;
  const tool = resolveTool(slug);
  if (tool) return <LocalizedToolPage locale="es" enPath={tool.en} />;
  const page = resolve(slug);
  if (!page) notFound();
  return <LocalizedTunerPage locale="es" enPath={page.en} />;
}
