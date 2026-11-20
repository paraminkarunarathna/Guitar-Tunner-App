'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clickAt, getAudioContext } from '@/lib/synth';
import { isSilentBar, stepCount, tempoAtBar, type SpeedPlan } from '@/lib/music/speedTrainer';

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

interface QueuedBeat {
  time: number;
  beat: number;
  bar: number;
  bpm: number;
  silent: boolean;
}

export interface SpeedTrainerState {
  isPlaying: boolean;
  /** Beat within the bar now sounding, -1 when stopped. */
  beat: number;
  /** Bars played since start. */
  bar: number;
  bpm: number;
  silent: boolean;
  /** Fastest tempo held for one complete bar this session. */
  reached: number;
  held: boolean;
}

/**
 * A metronome whose tempo follows a SpeedPlan bar by bar.
 *
 * Same lookahead pattern as useMetronome: a JS timer only looks ahead and
 * hands clicks to the sample-accurate Web Audio clock, so tempo changes land
 * exactly on the bar line. Tempo is decided per bar from a "ramp bar"
 * counter that Hold freezes and Step back rewinds, while the gap-click
 * pattern follows the real bar count so it never stalls.
 */
export function useSpeedTrainer(plan: SpeedPlan, volume = 0.8) {
  const [state, setState] = useState<SpeedTrainerState>({
    isPlaying: false,
    beat: -1,
    bar: 0,
    bpm: plan.start,
    silent: false,
    reached: 0,
    held: false,
  });

  const planRef = useRef(plan);
  const volumeRef = useRef(volume);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const nextTimeRef = useRef(0);
  const beatRef = useRef(0);
  const barRef = useRef(0);
  const rampBarRef = useRef(0);
  const heldRef = useRef(false);
  const barTempoRef = useRef(plan.start);
  const queueRef = useRef<QueuedBeat[]>([]);
  const reachedRef = useRef(0);
  const lastShownBarRef = useRef<{ bar: number; bpm: number } | null>(null);

  useEffect(() => {
    planRef.current = plan;
    if (timerRef.current === null) setState((s) => ({ ...s, bpm: plan.start }));
  }, [plan]);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    const p = planRef.current;
    while (nextTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
      const beat = beatRef.current;
      if (beat === 0) barTempoRef.current = tempoAtBar(p, rampBarRef.current);
      const bpm = barTempoRef.current;
      const silent = isSilentBar(p, barRef.current);
      if (!silent) clickAt(ctx, nextTimeRef.current, beat === 0, volumeRef.current * 2.4);
      queueRef.current.push({ time: nextTimeRef.current, beat, bar: barRef.current, bpm, silent });

      nextTimeRef.current += 60 / bpm;
      beatRef.current = (beat + 1) % p.beats;
      if (beatRef.current === 0) {
        barRef.current += 1;
        if (!heldRef.current) rampBarRef.current += 1;
      }
    }
  }, []);

  const draw = useCallback(() => {
    const ctx = getAudioContext();
    const queue = queueRef.current;
    let latest: QueuedBeat | null = null;
    while (queue.length && queue[0].time <= ctx.currentTime) latest = queue.shift()!;
    if (latest) {
      const shown = latest;
      // A bar counts as reached once the next one begins — it was played whole.
      const last = lastShownBarRef.current;
      if (last && shown.bar > last.bar) reachedRef.current = Math.max(reachedRef.current, last.bpm);
      lastShownBarRef.current = { bar: shown.bar, bpm: shown.bpm };
      setState((s) => ({
        ...s,
        beat: shown.beat,
        bar: shown.bar,
        bpm: shown.bpm,
        silent: shown.silent,
        reached: reachedRef.current,
      }));
    }
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const stop = useCallback((): number => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
    queueRef.current = [];
    const reached = reachedRef.current;
    setState((s) => ({ ...s, isPlaying: false, beat: -1, silent: false, reached }));
    return reached;
  }, []);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    const ctx = getAudioContext();
    beatRef.current = 0;
    barRef.current = 0;
    rampBarRef.current = 0;
    heldRef.current = false;
    reachedRef.current = 0;
    lastShownBarRef.current = null;
    queueRef.current = [];
    nextTimeRef.current = ctx.currentTime + 0.08;
    timerRef.current = window.setInterval(scheduler, LOOKAHEAD_MS);
    rafRef.current = requestAnimationFrame(draw);
    setState({ isPlaying: true, beat: -1, bar: 0, bpm: planRef.current.start, silent: false, reached: 0, held: false });
  }, [scheduler, draw]);

  /** Stay at the current tempo until released. */
  const toggleHold = useCallback(() => {
    heldRef.current = !heldRef.current;
    setState((s) => ({ ...s, held: heldRef.current }));
  }, []);

  /** Too fast: go back one tempo step from the next bar, and keep climbing from there. */
  const stepBack = useCallback(() => {
    const p = planRef.current;
    const cycleBars = (stepCount(p) + 1) * p.barsPerStep;
    const ramp = p.atTarget === 'loop' ? rampBarRef.current % cycleBars : rampBarRef.current;
    const index = Math.min(stepCount(p), Math.floor(ramp / p.barsPerStep));
    rampBarRef.current = Math.max(0, index - 1) * p.barsPerStep;
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return { ...state, start, stop, toggleHold, stepBack };
}
