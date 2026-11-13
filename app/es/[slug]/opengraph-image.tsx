import { OG_CONTENT_TYPE, OG_SIZE, localizedToolOgImage, tunerOgImage } from "@/lib/og/images";
import { HANDWRITTEN_PAGES, TRANSLATED_PAGES, TRANSLATED_TOOLS } from "@/lib/i18n/pages";

/** Rendered at build time for every page app/es/[slug] prerenders. */
export function generateStaticParams() {
  return [
    ...TRANSLATED_PAGES.filter((page) => page.en !== "/" && !HANDWRITTEN_PAGES.has(page.es)),
    ...TRANSLATED_TOOLS,
  ].map((page) => ({ slug: page.es.split("/")[2] }));
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro — afinador online";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TRANSLATED_TOOLS.find((p) => p.es === `/es/${slug}`);
  if (tool) return localizedToolOgImage(tool.en, "es");
  const page = TRANSLATED_PAGES.find((p) => p.es === `/es/${slug}`);
  return tunerOgImage(page?.en ?? "/", "es");
}
