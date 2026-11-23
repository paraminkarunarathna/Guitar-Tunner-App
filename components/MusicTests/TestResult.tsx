"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Download, RotateCcw, Share2, Swords, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MUSIC_TESTS,
  MUSIC_TEST_IDS,
  SITE_URL,
  brag,
  challengePath,
  compareScores,
  parseScore,
  shareQuery,
  sharePath,
  verdictFor,
  type MusicTestId,
} from "@/lib/musicTests";

/** The score a friend's challenge link carries (`?vs=`), read after mount so
 *  the page can stay static. */
export function useChallengeScore(id: MusicTestId): number | null {
  const [vs, setVs] = useState<number | null>(null);
  useEffect(() => {
    setVs(parseScore(id, new URLSearchParams(window.location.search).get("vs")));
  }, [id]);
  return vs;
}

export function ChallengeBanner({ id, vs }: { id: MusicTestId; vs: number | null }) {
  if (vs === null) return null;
  const v = verdictFor(id, vs);
  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink">
      <Swords className="h-5 w-5 shrink-0 text-brass" />
      <p>
        <span className="font-bold">You&apos;ve been challenged.</span> A friend scored{" "}
        <span className="font-bold tabular-nums">{v.score}</span> ({v.tier.toLowerCase()}). Can you beat it?
      </p>
    </div>
  );
}

const BTN_PRIMARY =
  "inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors";
const BTN_SECONDARY =
  "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 py-3 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass transition-colors";

interface TestResultProps {
  id: MusicTestId;
  score: number;
  best: number | null;
  newBest: boolean;
  vs: number | null;
  onRetry: () => void;
  /** Extra line under the verdict, e.g. a reliability warning. */
  note?: React.ReactNode;
  /** Hide the share buttons, e.g. when the result is not trustworthy. */
  shareable?: boolean;
}

export function TestResult({ id, score, best, newBest, vs, onRetry, note, shareable = true }: TestResultProps) {
  const v = verdictFor(id, score);
  const [status, setStatus] = useState<"shared" | "copied" | "challenge" | "failed" | null>(null);
  const shareUrl = `${SITE_URL}${sharePath(id, score)}`;
  const challengeUrl = `${SITE_URL}${challengePath(id, score)}`;
  const outcome = vs === null ? null : compareScores(id, score, vs);

  const flash = (s: typeof status) => {
    setStatus(s);
    window.setTimeout(() => setStatus(null), 2500);
  };

  const share = async () => {
    const text = `${brag(id, score)} 🎧 Can you beat me?`;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: MUSIC_TESTS[id].name, text, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      flash("copied");
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError") flash("failed");
    }
  };

  const copyChallenge = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      flash("challenge");
    } catch {
      flash("failed");
    }
  };

  return (
    <div className="text-center" role="status" aria-live="polite">
      <p className="eyebrow mb-2">Your result</p>
      <p className="text-5xl sm:text-6xl font-bold text-ink tabular-nums">{v.score}</p>
      <p className="mt-2 text-xl font-bold text-brass">{v.tier}</p>
      <div className="mx-auto mt-4 h-2.5 max-w-sm overflow-hidden rounded-full bg-surface-raised" aria-hidden>
        <div className="h-full rounded-full bg-brass transition-all duration-700" style={{ width: `${Math.max(4, v.level * 100)}%` }} />
      </div>
      <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-ink-muted">{v.detail}</p>
      {note && <div className="mx-auto mt-3 max-w-xl text-sm text-off">{note}</div>}

      {(newBest || best !== null) && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-muted">
          <Trophy className="h-4 w-4 text-brass" />
          {newBest ? "New personal best!" : `Your best: ${verdictFor(id, best!).score}`}
        </p>
      )}

      {outcome !== null && vs !== null && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-md rounded-xl border px-4 py-2 text-sm font-semibold",
            outcome === 1 ? "border-in-tune/50 bg-in-tune/10 text-in-tune" : outcome === 0 ? "border-line-strong text-ink" : "border-off/50 bg-off/10 text-off",
          )}
        >
          {outcome === 1
            ? `You beat your friend (${verdictFor(id, vs).score})! Send it back to them.`
            : outcome === 0
              ? `A tie with your friend at ${verdictFor(id, vs).score}.`
              : `Your friend wins this one with ${verdictFor(id, vs).score}. Rematch?`}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {shareable && (
          <>
            <button type="button" onClick={share} className={BTN_PRIMARY}>
              {status === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {status === "copied" ? "Copied — paste it anywhere" : status === "failed" ? "Couldn't copy" : "Share your result"}
            </button>
            <button type="button" onClick={copyChallenge} className={BTN_SECONDARY}>
              {status === "challenge" ? <Check className="h-4 w-4" /> : <Swords className="h-4 w-4" />}
              {status === "challenge" ? "Challenge link copied" : "Challenge a friend"}
            </button>
            <a href={`/share/test/image?${shareQuery(id, score)}`} download={`${id}-test-result.png`} className={BTN_SECONDARY}>
              <Download className="h-4 w-4" />
              Save image
            </a>
          </>
        )}
        <button type="button" onClick={onRetry} className={BTN_SECONDARY}>
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="eyebrow mb-3">Test your ears some more</p>
        <div className="flex flex-wrap justify-center gap-2">
          {MUSIC_TEST_IDS.filter((other) => other !== id).map((other) => (
            <Link
              key={other}
              href={MUSIC_TESTS[other].href}
              className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
            >
              {MUSIC_TESTS[other].name}
            </Link>
          ))}
          <Link href="/daily-challenge" className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors">
            Daily Challenge
          </Link>
          <Link href="/music-tests" className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors">
            All music tests
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Card frame shared by the three tests, with the same skeleton while the
 *  client mounts so the layout does not jump. */
export function TestShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <div className="min-h-[24rem] rounded-3xl border border-line bg-surface-sunken/30 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export { BTN_PRIMARY, BTN_SECONDARY };
