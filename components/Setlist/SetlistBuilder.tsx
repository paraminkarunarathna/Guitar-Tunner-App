"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Check, Link2, Plus, Printer, Shuffle, Trash2 } from "lucide-react";
import {
  SETLIST_TUNINGS,
  decodeSetlist,
  encodeSetlist,
  formatDuration,
  groupByTuning,
  newSong,
  sanitize,
  totalMinutes,
  tuningChanges,
  tuningHref,
  tuningLabel,
  type SetlistSong,
} from "@/lib/setlist";
import { logPractice } from "@/lib/practiceLog";
import { SETLIST_UI } from "@/lib/i18n/tools/setlistUi";
import { fmt } from "@/lib/i18n/tools/ui";
import { TRANSLATED_PAGES, type TranslatedLocale } from "@/lib/i18n/pages";
import type { Locale } from "@/lib/i18n/tuner";

const STORAGE_KEY = "gtp-setlist";

const field =
  "w-full rounded-lg border border-line bg-surface/60 px-2.5 py-1.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brass/50";

export function SetlistBuilder({ locale = "en" }: { locale?: Locale }) {
  const u = SETLIST_UI[locale];
  // Tuner pages in the page's own language, where they exist.
  const localisedHref: Record<string, string> = {};
  if (locale !== "en") {
    for (const t of SETLIST_TUNINGS) {
      localisedHref[t.id] =
        t.href === "/" ? `/${locale}` : (TRANSLATED_PAGES.find((p) => p.en === t.href)?.[locale as TranslatedLocale] ?? t.href);
    }
  }
  const tLabel = (id: string) => u.tunings[id] ?? tuningLabel(id);
  const tHref = (id: string) => tuningHref(id, localisedHref);
  const [name, setName] = useState(u.defaultName);
  const [songs, setSongs] = useState<SetlistSong[]>([]);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [incoming, setIncoming] = useState<{ name: string; songs: SetlistSong[] } | null>(null);

  useEffect(() => {
    try {
      const saved = sanitize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
      setName(saved.name === "My setlist" ? u.defaultName : saved.name);
      setSongs(saved.songs);
    } catch {
      // Storage blocked or empty: start with a blank list.
    }
    const code = new URLSearchParams(window.location.hash.slice(1)).get("set");
    if (code) setIncoming(decodeSetlist(code));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, songs }));
    } catch {
      // Not saved; the list still works for this visit.
    }
  }, [name, songs, ready]);

  const update = (id: string, patch: Partial<SetlistSong>) =>
    setSongs((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const move = (index: number, by: -1 | 1) =>
    setSongs((list) => {
      const to = index + by;
      if (to < 0 || to >= list.length) return list;
      const copy = [...list];
      [copy[index], copy[to]] = [copy[to], copy[index]];
      return copy;
    });
  const add = () => {
    setSongs((list) => [...list, { ...newSong(), tuning: list[list.length - 1]?.tuning ?? "standard" }]);
    logPractice("setlist-builder");
  };

  const changes = tuningChanges(songs);
  const grouped = groupByTuning(songs);
  const savings = changes.length - tuningChanges(grouped).length;

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#set=${encodeSetlist({ name, songs })}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const acceptIncoming = () => {
    if (!incoming) return;
    setName(incoming.name);
    setSongs(incoming.songs);
    setIncoming(null);
    history.replaceState(null, "", window.location.pathname);
  };

  const tuningsUsed = [...new Set(songs.map((s) => s.tuning))];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-5 print:border-0 print:bg-transparent print:p-0 print:shadow-none">
        {incoming && (
          <div className="rounded-2xl border border-brass/50 bg-brass/10 p-4 flex flex-wrap items-center justify-between gap-3 print:hidden" role="alert">
            <p className="text-sm text-ink">
              {fmt(u.incoming, { name: incoming.name, n: incoming.songs.length })}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={acceptIncoming} className="rounded-full bg-brass px-4 py-1.5 text-sm font-bold text-brass-contrast">{u.open}</button>
              <button type="button" onClick={() => setIncoming(null)} className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-ink-muted">{u.ignore}</button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex-1 min-w-48">
            <span className="sr-only">{u.nameLabel}</span>
            <input
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 rounded-lg"
            />
          </label>
          <p className="text-sm text-ink-muted tabular-nums" role="status">
            {songs.length} {u.songs[songs.length === 1 ? 0 : 1]}
            {totalMinutes(songs) > 0 && <> · {formatDuration(totalMinutes(songs), u.hourMin)}</>}
            {" · "}
            {changes.length} {u.retunes[changes.length === 1 ? 0 : 1]}
          </p>
        </div>

        {songs.length === 0 && ready && (
          <p className="rounded-2xl border border-dashed border-line p-6 text-center text-ink-muted">
            {u.empty}
          </p>
        )}

        <ol className="flex flex-col gap-3">
          {songs.map((song, index) => (
            <li key={song.id}>
              {changes.includes(index) && (
                <p className="mb-2 rounded-lg border border-off/40 bg-off/10 px-3 py-1.5 text-sm text-ink">
                  {fmt(u.retune, { from: tLabel(songs[index - 1].tuning), to: "" })}<strong>{tLabel(song.tuning)}</strong>{" "}
                  <Link href={tHref(song.tuning)} className="text-brass font-semibold hover:text-brass-hover print:hidden">
                    {u.openTuner}
                  </Link>
                </p>
              )}
              <div className="rounded-2xl border border-line bg-surface/40 p-3 sm:p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-brass tabular-nums w-7 text-center">{index + 1}</span>
                  <input
                    aria-label={fmt(u.songTitle, { n: index + 1 })}
                    placeholder={u.titlePh}
                    value={song.title}
                    maxLength={80}
                    onChange={(e) => update(song.id, { title: e.target.value })}
                    className={`${field} text-base font-semibold`}
                  />
                  <div className="flex gap-1 print:hidden">
                    <button type="button" aria-label={u.moveUp} disabled={index === 0} onClick={() => move(index, -1)} className="rounded-lg p-2 text-ink-muted hover:text-ink hover:bg-surface-raised/60 disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                    <button type="button" aria-label={u.moveDown} disabled={index === songs.length - 1} onClick={() => move(index, 1)} className="rounded-lg p-2 text-ink-muted hover:text-ink hover:bg-surface-raised/60 disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                    <button type="button" aria-label={u.del} onClick={() => setSongs((l) => l.filter((s) => s.id !== song.id))} className="rounded-lg p-2 text-ink-muted hover:text-off hover:bg-surface-raised/60"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  <label className="flex flex-col gap-1 sm:col-span-2">
                    <span className="eyebrow">{u.tuning}</span>
                    <select value={song.tuning} onChange={(e) => update(song.id, { tuning: e.target.value })} className={field}>
                      {SETLIST_TUNINGS.map((t) => <option key={t.id} value={t.id}>{tLabel(t.id)}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="eyebrow">{u.key}</span>
                    <input value={song.key} maxLength={12} placeholder="Am" onChange={(e) => update(song.id, { key: e.target.value })} className={field} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="eyebrow">{u.bpm}</span>
                    <input type="number" inputMode="numeric" min={30} max={300} value={song.bpm ?? ""} placeholder="120" onChange={(e) => update(song.id, { bpm: e.target.value === "" ? null : Number(e.target.value) })} className={field} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="eyebrow">{u.capo}</span>
                    <input type="number" inputMode="numeric" min={0} max={12} value={song.capo} onChange={(e) => update(song.id, { capo: Math.min(12, Math.max(0, Number(e.target.value) || 0)) })} className={field} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="eyebrow">{u.minutes}</span>
                    <input type="number" inputMode="decimal" min={0} max={60} step={0.5} value={song.minutes ?? ""} placeholder="3.5" onChange={(e) => update(song.id, { minutes: e.target.value === "" ? null : Number(e.target.value) })} className={field} />
                  </label>
                </div>
                <input aria-label={u.notesPh} placeholder={u.notesPh} value={song.notes} maxLength={200} onChange={(e) => update(song.id, { notes: e.target.value })} className={field} />
                {song.bpm && song.bpm >= 30 && song.bpm <= 300 && (
                  <p className="text-xs text-ink-muted print:hidden">
                    <Link href={`/metronome?bpm=${Math.round(song.bpm)}`} className="text-brass font-semibold hover:text-brass-hover">{fmt(u.practise, { bpm: Math.round(song.bpm) })}</Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button type="button" onClick={add} className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover">
            <Plus className="h-4 w-4" /> {u.add}
          </button>
          {savings > 0 && (
            <button type="button" onClick={() => setSongs(grouped)} className="inline-flex items-center gap-2 rounded-full border border-brass/50 px-4 py-2.5 text-sm font-semibold text-brass hover:bg-brass/10">
              <Shuffle className="h-4 w-4" /> {fmt(u.group, { n: `${savings} ${u.retunes[savings === 1 ? 0 : 1]}` })}
            </button>
          )}
          <button type="button" onClick={share} disabled={songs.length === 0} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60 disabled:opacity-40">
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? u.copied : u.share}
          </button>
          <button type="button" onClick={() => window.print()} disabled={songs.length === 0} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-raised/60 disabled:opacity-40">
            <Printer className="h-4 w-4" /> {u.print}
          </button>
        </div>

        {tuningsUsed.length > 0 && (
          <p className="text-sm text-ink-muted print:hidden">
            {u.tuneUp}{" "}
            {tuningsUsed.map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 && " · "}
                <Link href={tHref(t)} className="text-brass font-semibold hover:text-brass-hover">{tLabel(t).replace(/ \(.*\)/, "")}</Link>
              </React.Fragment>
            ))}
          </p>
        )}
        <p className="text-xs text-ink-muted print:hidden">{u.storage}</p>
      </div>
    </div>
  );
}
