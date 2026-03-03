export interface HabitLog {
  date: string;
  completed: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function normalizeDate(date: string): Date {
  return new Date(`${date}T00:00:00`);
}

function toKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function calculateStreak(logs: HabitLog[]): number {
  const done = new Set(logs.filter((log) => log.completed).map((log) => log.date));
  if (done.size === 0) return 0;

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (done.has(toKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }

  return streak;
}

export function detectMissedDays(logs: HabitLog[], days: number): string[] {
  const done = new Set(logs.filter((log) => log.completed).map((log) => log.date));
  const missed: string[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(cursor.getDate() - i);
    const key = toKey(cursor);
    if (!done.has(key)) {
      missed.push(key);
    }
  }

  return missed;
}

export function countWeeklyCompletions(logs: HabitLog[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const log of logs) {
    if (log.completed) {
      totals[log.date] = (totals[log.date] || 0) + 1;
    }
  }
  return totals;
}

export function isLogInFuture(date: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return normalizeDate(date).getTime() > today.getTime();
}
