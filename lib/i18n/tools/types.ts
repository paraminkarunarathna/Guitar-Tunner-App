/** Shape of one translated tool page's prose. Text may use **bold**. */

/** `table` is a marker: the page renderer draws the tool's own data table
 *  (tempo markings, pipe frequencies or fork list) with these column heads. */
export type ToolBlock = string | { list: string[] } | { steps: string[] } | { table: string[] };

export interface ToolSection {
  heading: string;
  body: ToolBlock[];
}

export interface ToolPageCopy {
  /** ≤ 45 characters — the layout appends " | GuitarTunePro". */
  metaTitle: string;
  /** ≤ 155 characters. */
  metaDescription: string;
  /** H1. */
  title: string;
  /** Short line under the H1. */
  description: string;
  /** Label for cross-links to this page. */
  label: string;
  sections: ToolSection[];
  faqs: { question: string; answer: string }[];
}
