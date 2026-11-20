/** Achievements: milestones worked out from what the tools already store.
 *
 *  Nothing new is tracked to award them — each one is a threshold on data
 *  the practice log, trainers and trackers already keep, so they appear
 *  retroactively for existing players and travel with the progress backup.
 *  The only extra state is which ones the visitor has already seen, so new
 *  ones can be highlighted once. */

export interface AchievementFacts {
  practiceDays: number;
  bestStreak: number;
  timedMinutes: number;
  routines: number;
  /** Distinct tools used on any day. */
  toolsUsed: number;
  dailyPlayed: number;
  dailyPerfect: number;
  dailyBestStreak: number;
  courseDays: number;
  earBest: number;
  fretBest: number;
  quizBest: number;
  rhythmBest: number;
  speedTop: number;
  guitarsTracked: number;
  stringChanges: number;
}

export type AchievementGroup = 'Habit' | 'Explore' | 'Skills' | 'Gear';

export interface Achievement {
  id: string;
  title: string;
  /** How to earn it, shown while locked and after. */
  description: string;
  group: AchievementGroup;
  goal: number;
  value: (facts: AchievementFacts) => number;
  /** Where to go to work on it. */
  href: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Habit
  { id: 'first-day', title: 'First Note', description: 'Practise on one day', group: 'Habit', goal: 1, value: (f) => f.practiceDays, href: '/practice-routine' },
  { id: 'streak-3', title: 'On a Roll', description: 'Practise 3 days in a row', group: 'Habit', goal: 3, value: (f) => f.bestStreak, href: '/practice-routine' },
  { id: 'streak-7', title: 'Week Warrior', description: 'Practise 7 days in a row', group: 'Habit', goal: 7, value: (f) => f.bestStreak, href: '/practice-routine' },
  { id: 'streak-30', title: 'Month of Music', description: 'Practise 30 days in a row', group: 'Habit', goal: 30, value: (f) => f.bestStreak, href: '/practice-routine' },
  { id: 'streak-100', title: 'Unstoppable', description: 'Practise 100 days in a row', group: 'Habit', goal: 100, value: (f) => f.bestStreak, href: '/practice-routine' },
  { id: 'days-25', title: 'Regular', description: 'Practise on 25 different days', group: 'Habit', goal: 25, value: (f) => f.practiceDays, href: '/practice-routine' },
  { id: 'days-100', title: 'Dedicated', description: 'Practise on 100 different days', group: 'Habit', goal: 100, value: (f) => f.practiceDays, href: '/practice-routine' },
  { id: 'routine-1', title: 'Full Session', description: 'Finish a whole practice routine', group: 'Habit', goal: 1, value: (f) => f.routines, href: '/practice-routine' },
  { id: 'hours-10', title: 'Ten Hours In', description: 'Log 10 hours of timed practice', group: 'Habit', goal: 600, value: (f) => f.timedMinutes, href: '/practice-routine' },
  { id: 'daily-7', title: 'Daily Habit', description: 'Finish the daily challenge 7 days in a row', group: 'Habit', goal: 7, value: (f) => f.dailyBestStreak, href: '/daily-challenge' },

  // Explore
  { id: 'tools-3', title: 'Curious', description: 'Use 3 different practice tools', group: 'Explore', goal: 3, value: (f) => f.toolsUsed, href: '/practice-routine' },
  { id: 'tools-8', title: 'Explorer', description: 'Use 8 different practice tools', group: 'Explore', goal: 8, value: (f) => f.toolsUsed, href: '/ear-training' },
  { id: 'tools-12', title: 'Full Toolbox', description: 'Use 12 different practice tools', group: 'Explore', goal: 12, value: (f) => f.toolsUsed, href: '/chord-quiz' },
  { id: 'course-7', title: 'First Week', description: 'Finish 7 days of the beginner course', group: 'Explore', goal: 7, value: (f) => f.courseDays, href: '/beginner-guitar-course' },
  { id: 'course-30', title: 'Graduate', description: 'Finish all 30 days of the beginner course', group: 'Explore', goal: 30, value: (f) => f.courseDays, href: '/beginner-guitar-course' },

  // Skills
  { id: 'daily-perfect', title: 'Perfect Five', description: 'Get 5 out of 5 in a daily challenge', group: 'Skills', goal: 1, value: (f) => f.dailyPerfect, href: '/daily-challenge' },
  { id: 'ear-10', title: 'Golden Ears', description: 'A streak of 10 in ear training', group: 'Skills', goal: 10, value: (f) => f.earBest, href: '/ear-training' },
  { id: 'fret-15', title: 'Neck Navigator', description: 'A streak of 15 in the fretboard trainer', group: 'Skills', goal: 15, value: (f) => f.fretBest, href: '/fretboard-trainer' },
  { id: 'quiz-10', title: 'Chord Spotter', description: 'A streak of 10 in the chord quiz', group: 'Skills', goal: 10, value: (f) => f.quizBest, href: '/chord-quiz' },
  { id: 'rhythm-90', title: 'In the Pocket', description: 'Score 90 or more in the rhythm trainer', group: 'Skills', goal: 90, value: (f) => f.rhythmBest, href: '/rhythm-trainer' },
  { id: 'speed-120', title: 'Up to Speed', description: 'Hold 120 BPM in the speed trainer', group: 'Skills', goal: 120, value: (f) => f.speedTop, href: '/speed-trainer' },
  { id: 'speed-180', title: 'Shredder', description: 'Hold 180 BPM in the speed trainer', group: 'Skills', goal: 180, value: (f) => f.speedTop, href: '/speed-trainer' },

  // Gear
  { id: 'strings-track', title: 'String Keeper', description: 'Track a guitar in the string change tracker', group: 'Gear', goal: 1, value: (f) => f.guitarsTracked, href: '/string-change-tracker' },
  { id: 'strings-change', title: 'Fresh Set', description: 'Log a string change', group: 'Gear', goal: 1, value: (f) => f.stringChanges, href: '/string-change-tracker' },
];

export interface AchievementState {
  achievement: Achievement;
  earned: boolean;
  /** Progress towards the goal, 0–1. */
  progress: number;
  current: number;
}

export function evaluateAchievements(facts: AchievementFacts): AchievementState[] {
  return ACHIEVEMENTS.map((achievement) => {
    const current = Math.max(0, achievement.value(facts) || 0);
    return {
      achievement,
      current,
      earned: current >= achievement.goal,
      progress: Math.min(1, current / achievement.goal),
    };
  });
}

/** The locked achievement nearest to done — the one to suggest next. */
export function nextAchievement(states: AchievementState[]): AchievementState | undefined {
  return states.filter((s) => !s.earned).sort((a, b) => b.progress - a.progress)[0];
}

const SEEN_KEY = 'gtp-achievements';

export function loadSeen(): Set<string> {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    const seen = raw ? JSON.parse(raw)?.seen : null;
    return new Set(Array.isArray(seen) ? seen.filter((x: unknown) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

export function saveSeen(ids: Iterable<string>) {
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify({ seen: [...new Set(ids)] }));
  } catch {
    // Storage blocked: new badges will just be highlighted again next time.
  }
}
