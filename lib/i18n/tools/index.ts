import type { TranslatedLocale } from "@/lib/i18n/pages";
import type { ToolPageCopy } from "./types";
import { toolPagesEs } from "./pages-es";
import { toolPagesPt } from "./pages-pt";
import { toolPagesFr } from "./pages-fr";
import { toolPagesDe } from "./pages-de";
import { testPagesEs } from "./tests-es";
import { testPagesPt } from "./tests-pt";
import { testPagesFr } from "./tests-fr";
import { testPagesDe } from "./tests-de";

export const TOOL_COPY: Record<TranslatedLocale, Record<string, ToolPageCopy>> = {
  es: { ...toolPagesEs, ...testPagesEs },
  pt: { ...toolPagesPt, ...testPagesPt },
  fr: { ...toolPagesFr, ...testPagesFr },
  de: { ...toolPagesDe, ...testPagesDe },
};
