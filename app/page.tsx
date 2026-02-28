import ScoreCard from '../components/ScoreCard';
import WeeklyHeatmap from '../components/WeeklyHeatmap';
import { calculateLifeScore } from '../lib/score';

export default function HomePage() {
  // dummy values
  const discipline = 80;
  const growth = 65;
  const health = 90;
  const output = 70;
  const lifeScore = calculateLifeScore(discipline, growth, health, output);
  const heatData: Record<string, number> = {
    // last 7 days simulated
    '2026-02-22': 1,
    '2026-02-23': 3,
    '2026-02-24': 2,
    '2026-02-25': 4,
    '2026-02-26': 0,
    '2026-02-27': 2,
    '2026-02-28': 3
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">GG Tracker Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard label="Life Score" value={Math.round(lifeScore)} />
        <ScoreCard label="Discipline" value={discipline} />
        <ScoreCard label="Growth" value={growth} />
        <ScoreCard label="Health" value={health} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Weekly Activity</h2>
        <WeeklyHeatmap data={heatData} />
      </div>
    </main>
  );
}
