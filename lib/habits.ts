import { HabitLog } from '@prisma/client';

// calculate current streak given sorted logs (most recent last)
export function calculateStreak(logs: HabitLog[]): number {
  let streak = 0;
  const today = new Date();
  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i];
    if (!log.completed) break;
    const diff = (today.getTime() - log.date.getTime()) / (1000 * 60 * 60 * 24);
    // allow matching day-by-day
    if (diff <= streak + 1.1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
