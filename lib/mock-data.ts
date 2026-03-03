import type { HabitLog } from './habits';

export interface GoalItem {
  id: string;
  title: string;
  category: string;
  deadline: string;
  progress: number;
  status: 'active' | 'paused' | 'completed';
}

export interface HabitItem {
  id: string;
  name: string;
  logs: HabitLog[];
}

export const scoreBreakdown = {
  discipline: 82,
  growth: 74,
  health: 88,
  output: 79
};

export const weeklyActivity: Record<string, number> = {
  '2026-02-24': 3,
  '2026-02-25': 4,
  '2026-02-26': 1,
  '2026-02-27': 2,
  '2026-02-28': 4,
  '2026-03-01': 2,
  '2026-03-02': 3
};

export const initialGoals: GoalItem[] = [
  {
    id: 'g1',
    title: 'Launch GG MVP v1',
    category: 'Build',
    deadline: '2026-03-21',
    progress: 62,
    status: 'active'
  },
  {
    id: 'g2',
    title: 'Cut distraction window below 45 min/day',
    category: 'Discipline',
    deadline: '2026-04-02',
    progress: 35,
    status: 'active'
  },
  {
    id: 'g3',
    title: '12 straight weeks strength progression',
    category: 'Health',
    deadline: '2026-05-10',
    progress: 48,
    status: 'active'
  }
];

export const initialHabits: HabitItem[] = [
  {
    id: 'h1',
    name: 'Morning deep work (90m)',
    logs: [
      { date: '2026-02-24', completed: true },
      { date: '2026-02-25', completed: true },
      { date: '2026-02-26', completed: false },
      { date: '2026-02-27', completed: true },
      { date: '2026-02-28', completed: true },
      { date: '2026-03-01', completed: true },
      { date: '2026-03-02', completed: true }
    ]
  },
  {
    id: 'h2',
    name: 'Workout',
    logs: [
      { date: '2026-02-24', completed: true },
      { date: '2026-02-25', completed: false },
      { date: '2026-02-26', completed: true },
      { date: '2026-02-27', completed: true },
      { date: '2026-02-28', completed: false },
      { date: '2026-03-01', completed: true },
      { date: '2026-03-02', completed: false }
    ]
  }
];
