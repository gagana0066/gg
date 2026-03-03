'use client';

import { FormEvent, useMemo, useState } from 'react';
import { initialGoals } from '../../lib/mock-data';

type GoalStatus = 'active' | 'paused' | 'completed';

interface GoalDraft {
  title: string;
  category: string;
  deadline: string;
}

const defaultDraft: GoalDraft = {
  title: '',
  category: 'Build',
  deadline: ''
};

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [draft, setDraft] = useState(defaultDraft);

  const activeCount = useMemo(
    () => goals.filter((goal) => goal.status === 'active').length,
    [goals]
  );

  function addGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.deadline) return;
    setGoals((prev) => [
      {
        id: `g-${Date.now()}`,
        title: draft.title.trim(),
        category: draft.category,
        deadline: draft.deadline,
        progress: 0,
        status: 'active'
      },
      ...prev
    ]);
    setDraft(defaultDraft);
  }

  function updateProgress(goalId: string, progress: number) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, progress, status: progress >= 100 ? 'completed' : goal.status } : goal
      )
    );
  }

  function updateStatus(goalId: string, status: GoalStatus) {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, status } : goal)));
  }

  function removeGoal(goalId: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }

  return (
    <section className="space-y-6">
      <div className="gg-card p-6">
        <h1 className="gg-page-title">Goals Module</h1>
        <p className="gg-subtle mt-2">
          Create, track and finish high-impact goals. Active: {activeCount} / Total: {goals.length}
        </p>
      </div>

      <form onSubmit={addGoal} className="gg-card grid gap-4 p-6 md:grid-cols-4">
        <input
          className="rounded-lg border border-[rgba(203,223,144,0.35)] bg-[rgba(15,30,56,0.6)] px-3 py-2 text-sm outline-none"
          placeholder="Goal title"
          value={draft.title}
          onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
          required
        />
        <input
          className="rounded-lg border border-[rgba(203,223,144,0.35)] bg-[rgba(15,30,56,0.6)] px-3 py-2 text-sm outline-none"
          placeholder="Category"
          value={draft.category}
          onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
          required
        />
        <input
          className="rounded-lg border border-[rgba(203,223,144,0.35)] bg-[rgba(15,30,56,0.6)] px-3 py-2 text-sm outline-none"
          type="date"
          value={draft.deadline}
          onChange={(event) => setDraft((prev) => ({ ...prev, deadline: event.target.value }))}
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-[#CBDF90] px-4 py-2 font-semibold text-[#0f1e38] transition hover:opacity-90"
        >
          Add Goal
        </button>
      </form>

      <div className="space-y-4">
        {goals.map((goal) => (
          <article key={goal.id} className="gg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{goal.title}</h2>
                <p className="gg-subtle text-sm">
                  {goal.category} · Deadline {goal.deadline}
                </p>
              </div>
              <button
                type="button"
                className="rounded-md border border-[rgba(238,244,220,0.2)] px-3 py-1.5 text-xs"
                onClick={() => removeGoal(goal.id)}
              >
                Delete
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <label className="text-sm">
                Progress {goal.progress}%
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={goal.progress}
                  onChange={(event) => updateProgress(goal.id, Number(event.target.value))}
                  className="ml-3 align-middle"
                />
              </label>
              <label className="text-sm">
                Status
                <select
                  value={goal.status}
                  onChange={(event) => updateStatus(goal.id, event.target.value as GoalStatus)}
                  className="ml-2 rounded-md border border-[rgba(203,223,144,0.35)] bg-[rgba(15,30,56,0.6)] px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>

            <div className="gg-progress mt-4">
              <span style={{ width: `${goal.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
