"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Segmented } from "@/components/Segmented";
import { loadLog } from "@/lib/practiceLog";
import {
  STRING_KINDS,
  dayKey,
  describeLife,
  lifeDays,
  loadGuitars,
  parseDay,
  reminderIcs,
  saveGuitars,
  stringStatus,
  type StringKind,
  type Sweat,
  type TrackedGuitar,
} from "@/lib/stringLife";

const PAGE_URL = "https://www.guitartunepro.com/string-change-tracker";

const LEVEL_TEXT: Record<string, { label: string; className: string }> = {
  fresh: { label: "Fresh", className: "border-in-tune/40 bg-in-tune/10 text-in-tune" },
  good: { label: "Good", className: "border-line-strong bg-surface-raised/60 text-ink" },
  soon: { label: "Due soon", className: "border-brass/50 bg-brass/10 text-brass" },
  due: { label: "Time to change", className: "border-off/50 bg-off/10 text-off" },
};

const HOURS = [1, 3, 5, 8, 12, 20];

const prettyDate = (key: string) =>
  parseDay(key).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

type Draft = Omit<TrackedGuitar, "id" | "history">;

const emptyDraft = (): Draft => ({
  name: "",
  kind: "electric",
  coated: false,
  sweat: "normal",
  hoursPerWeek: 3,
  changedOn: dayKey(new Date()),
});

function GuitarForm({
  initial,
  onSave,
  onCancel,
  submitLabel,
}: {
  initial: Draft;
  onSave: (draft: Draft) => void;
  onCancel?: () => void;
  submitLabel: string;
}) {
  const [draft, setDraft] = useState<Draft>(initial);
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const estimate = lifeDays(draft);
  const today = dayKey(new Date());

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...draft, name: draft.name.trim() || STRING_KINDS.find((k) => k.value === draft.kind)!.label + " guitar" });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="sg-name" className="eyebrow">Name</label>
          <input
            id="sg-name"
            value={draft.name}
            maxLength={40}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="e.g. Strat, Martin D-28"
            className="rounded-xl border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="sg-date" className="eyebrow">Strings last changed</label>
          <input
            id="sg-date"
            type="date"
            value={draft.changedOn}
            max={today}
            onChange={(e) => e.target.value && set({ changedOn: e.target.value })}
            className="rounded-xl border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="eyebrow">Strings</span>
        <Segmented<StringKind>
          label="String type"
          value={draft.kind}
          onChange={(kind) => set({ kind })}
          items={STRING_KINDS.map((k) => ({ value: k.value, label: k.label }))}
        />
        <label className="mt-1 inline-flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={draft.coated} onChange={(e) => set({ coated: e.target.checked })} className="h-4 w-4 accent-brass" />
          Coated strings (Elixir, D&apos;Addario XT and similar)
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="eyebrow">Hours played per week</span>
        <Segmented<number>
          label="Hours played per week"
          value={draft.hoursPerWeek}
          onChange={(hoursPerWeek) => set({ hoursPerWeek })}
          items={HOURS.map((h) => ({ value: h, label: h === 20 ? "20+" : String(h) }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="eyebrow">Hands</span>
        <Segmented<Sweat>
          label="How much your hands sweat"
          value={draft.sweat}
          onChange={(sweat) => set({ sweat })}
          items={[
            { value: "dry", label: "Dry" },
            { value: "normal", label: "Normal" },
            { value: "heavy", label: "Sweaty / acidic" },
          ]}
        />
      </div>

      <p className="text-sm text-ink-muted">
        Estimated life: <strong className="text-ink">{describeLife(estimate)}</strong>
      </p>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:text-brass">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export function StringTracker() {
  const [guitars, setGuitars] = useState<TrackedGuitar[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [practiceDays, setPracticeDays] = useState<string[]>([]);
  const [justChanged, setJustChanged] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadGuitars();
    setGuitars(stored);
    setAdding(stored.length === 0);
    setPracticeDays(Object.keys(loadLog()));
  }, []);

  const update = (next: TrackedGuitar[]) => {
    setGuitars(next);
    saveGuitars(next);
  };

  const sorted = useMemo(
    () => (guitars ?? []).map((g) => ({ guitar: g, status: stringStatus(g) })).sort((a, b) => b.status.wear - a.status.wear),
    [guitars],
  );

  const add = (draft: Draft) => {
    const id = `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    update([...(guitars ?? []), { ...draft, id, history: [] }]);
    setAdding(false);
  };

  const changedToday = (guitar: TrackedGuitar) => {
    const today = dayKey(new Date());
    if (guitar.changedOn === today) return;
    update(
      (guitars ?? []).map((g) =>
        g.id === guitar.id ? { ...g, changedOn: today, history: [g.changedOn, ...g.history].slice(0, 20) } : g,
      ),
    );
    setJustChanged(guitar.id);
  };

  const remove = (guitar: TrackedGuitar) => {
    if (!window.confirm(`Remove ${guitar.name} and its string history?`)) return;
    update((guitars ?? []).filter((g) => g.id !== guitar.id));
  };

  const downloadReminder = (guitar: TrackedGuitar, dueOn: string) => {
    // A reminder in the past is useless: put an overdue one on tomorrow.
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const when = dueOn < dayKey(new Date()) ? dayKey(tomorrow) : dueOn;
    const blob = new Blob([reminderIcs(guitar, when, PAGE_URL)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `change-strings-${guitar.name.replace(/\W+/g, "-").toLowerCase()}.ics`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (guitars === null) {
    return <div className="w-full max-w-3xl mx-auto px-4 sm:px-6"><div className="h-72 rounded-3xl border border-line bg-surface/30" /></div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
      {sorted.map(({ guitar, status }) => {
        const level = LEVEL_TEXT[status.level];
        const played = practiceDays.filter((d) => d >= guitar.changedOn).length;
        const left = status.life - status.age;
        if (editing === guitar.id) {
          return (
            <div key={guitar.id} className="rounded-3xl border border-brass/40 bg-surface/40 p-5 sm:p-6">
              <GuitarForm
                initial={guitar}
                submitLabel="Save changes"
                onCancel={() => setEditing(null)}
                onSave={(draft) => {
                  update(guitars.map((g) => (g.id === guitar.id ? { ...g, ...draft } : g)));
                  setEditing(null);
                }}
              />
            </div>
          );
        }
        return (
          <article key={guitar.id} className="rounded-3xl border border-line bg-surface-sunken/30 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-ink">{guitar.name}</h3>
                <p className="text-xs text-ink-muted">
                  {STRING_KINDS.find((k) => k.value === guitar.kind)?.label}
                  {guitar.coated ? ", coated" : ""} · {guitar.hoursPerWeek} h/week · changed {prettyDate(guitar.changedOn)}
                </p>
              </div>
              <span className={cn("shrink-0 rounded-full border px-3 py-1 text-xs font-bold", level.className)}>{level.label}</span>
            </div>

            <div className="mt-4 h-2.5 rounded-full bg-surface-raised overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, Math.round(status.wear * 100))} aria-label={`String wear for ${guitar.name}`}>
              <div
                className={cn("h-full transition-[width]", status.level === "due" ? "bg-off" : status.level === "soon" ? "bg-brass" : "bg-in-tune")}
                style={{ width: `${Math.min(100, Math.round(status.wear * 100))}%` }}
              />
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div>
                <dt className="eyebrow">String age</dt>
                <dd className="mt-0.5 text-xl font-bold tabular-nums text-ink">{status.age} d</dd>
              </div>
              <div>
                <dt className="eyebrow">{left >= 0 ? "Left (est.)" : "Overdue"}</dt>
                <dd className={cn("mt-0.5 text-xl font-bold tabular-nums", left < 0 ? "text-off" : "text-ink")}>{Math.abs(left)} d</dd>
              </div>
              <div>
                <dt className="eyebrow">Practice days</dt>
                <dd className="mt-0.5 text-xl font-bold tabular-nums text-ink">{played}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-ink-muted">
              {left >= 0 ? <>Change around <strong className="text-ink">{prettyDate(status.dueOn)}</strong></> : <>Were due {prettyDate(status.dueOn)}</>}
              {" "}— or sooner if they sound dull, feel rough, or won&apos;t stay in tune.
            </p>

            {justChanged === guitar.id && (
              <p className="mt-3 rounded-xl border border-in-tune/40 bg-in-tune/10 px-3 py-2 text-sm text-ink" role="status">
                Logged. New strings stretch for a day or two — <Link href="/" className="font-semibold text-brass">tune up</Link> a few times, and check the{" "}
                <Link href="/intonation-checker" className="font-semibold text-brass">intonation</Link> if you changed gauge.
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => changedToday(guitar)}
                disabled={guitar.changedOn === dayKey(new Date())}
                className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 text-sm font-bold text-brass-contrast hover:bg-brass-hover disabled:opacity-50"
              >
                {guitar.changedOn === dayKey(new Date()) ? <Check className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
                {guitar.changedOn === dayKey(new Date()) ? "Changed today" : "I changed them today"}
              </button>
              <button
                type="button"
                onClick={() => downloadReminder(guitar, status.dueOn)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:text-brass"
              >
                <CalendarPlus className="h-4 w-4" /> Add reminder to calendar
              </button>
              <button type="button" onClick={() => setEditing(guitar.id)} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-ink-muted hover:text-ink" aria-label={`Edit ${guitar.name}`}>
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button type="button" onClick={() => remove(guitar)} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-ink-muted hover:text-off" aria-label={`Remove ${guitar.name}`}>
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            {guitar.history.length > 0 && (
              <details className="mt-3 text-xs text-ink-muted">
                <summary className="cursor-pointer font-semibold">Previous changes ({guitar.history.length})</summary>
                <ul className="mt-2 space-y-0.5">
                  {[guitar.changedOn, ...guitar.history].slice(0, -1).map((date, i) => {
                    const previous = guitar.history[i];
                    const days = Math.round((parseDay(date).getTime() - parseDay(previous).getTime()) / 86_400_000);
                    return (
                      <li key={previous} className="font-mono tabular-nums">
                        {prettyDate(previous)} — lasted {days} days
                      </li>
                    );
                  })}
                </ul>
              </details>
            )}
          </article>
        );
      })}

      {adding ? (
        <div className="rounded-3xl border border-line bg-surface/40 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-ink">{guitars.length ? "Add another guitar" : "Add your guitar"}</h3>
            {guitars.length > 0 && (
              <button type="button" onClick={() => setAdding(false)} className="text-ink-muted hover:text-ink" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <GuitarForm initial={emptyDraft()} onSave={add} submitLabel="Start tracking" />
        </div>
      ) : (
        guitars.length < 12 && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-brass/50 hover:text-brass"
          >
            <Plus className="h-4 w-4" /> Add another guitar
          </button>
        )
      )}

      <p className="text-2xs text-ink-subtle">
        Saved in this browser only — no account. Move it to another device from{" "}
        <Link href="/my-progress" className="text-brass font-semibold">your progress page</Link>.
      </p>
    </div>
  );
}
