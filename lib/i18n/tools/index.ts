import type { TranslatedLocale } from "@/lib/i18n/pages";
import type { ToolPageCopy } from "./types";
import { toolPagesEs } from "./pages-es";
import { toolPagesPt } from "./pages-pt";
import { toolPagesFr } from "./pages-fr";
import { toolPagesDe } from "./pages-de";

export const TOOL_COPY: Record<TranslatedLocale, Record<string, ToolPageCopy>> = {
  es: toolPagesEs,
  pt: toolPagesPt,
  fr: toolPagesFr,
  de: toolPagesDe,
};
