'use client';

import { useMemo, useState } from 'react';
import WeeklyHeatmap from '../../components/WeeklyHeatmap';
import { calculateStreak, countWeeklyCompletions, detectMissedDays } from '../../lib/habits';
import { initialHabits } from '../../lib/mock-data';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits);
  const today = todayKey();

  const allLogs = useMemo(() => habits.flatMap((habit) => habit.logs), [habits]);
  const streak = calculateStreak(allLogs);
  const missed = detectMissedDays(allLogs, 7);
  const heatmapData = countWeeklyCompletions(allLogs);

  function toggleToday(habitId: string) {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const existing = habit.logs.find((log) => log.date === today);
        if (!existing) {
          return { ...habit, logs: [...habit.logs, { date: today, completed: true }] };
        }
        return {
          ...habit,
          logs: habit.logs.map((log) => (log.date === today ? { ...log, completed: !log.completed } : log))
        };
      })
    );
  }

  return (
    <section className="space-y-6">
      <div className="gg-card p-6">
        <h1 className="gg-page-title">Habit Tracking</h1>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="gg-pill">Streak: {streak} day(s)</span>
          <span className="gg-pill">Missed this week: {missed.length} day(s)</span>
          <span className="gg-pill">Today: {today}</span>
        </div>
      </div>

      <div className="gg-card p-6">
        <h2 className="text-xl font-semibold">Weekly Execution</h2>
        <p className="gg-subtle mt-1 text-sm">Higher intensity means more habits completed on that day.</p>
        <div className="mt-4">
          <WeeklyHeatmap data={heatmapData} />
        </div>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => {
          const todayLog = habit.logs.find((log) => log.date === today);
          const done = Boolean(todayLog?.completed);

          return (
            <article key={habit.id} className="gg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{habit.name}</h2>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    done ? 'bg-[#CBDF90] text-[#0f1e38]' : 'bg-[rgba(15,30,56,0.6)]'
                  }`}
                  onClick={() => toggleToday(habit.id)}
                >
                  {done ? 'Completed Today' : 'Mark as Done'}
                </button>
              </div>
              <p className="gg-subtle mt-3 text-sm">
                Last 7 logs:{' '}
                {habit.logs
                  .slice(-7)
                  .map((log) => `${log.date} ${log.completed ? '✓' : '×'}`)
                  .join(' · ')}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
