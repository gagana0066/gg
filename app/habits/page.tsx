import { calculateStreak } from '../../lib/habits';

export default function HabitsPage() {
  // dummy logs
  const logs = [
    { date: new Date('2026-02-24'), completed: true },
    { date: new Date('2026-02-25'), completed: true },
    { date: new Date('2026-02-26'), completed: false },
    { date: new Date('2026-02-27'), completed: true },
    { date: new Date('2026-02-28'), completed: true }
  ];
  const streak = calculateStreak(logs as any);
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Habits</h2>
      <p>Current streak: {streak} days</p>
    </main>
  );
}
