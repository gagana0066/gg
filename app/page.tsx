import ScoreCard from '../components/ScoreCard';
import WeeklyHeatmap from '../components/WeeklyHeatmap';
import { initialGoals, scoreBreakdown, weeklyActivity } from '../lib/mock-data';
import { calculateLifeScore, normalizeScore } from '../lib/score';

export default function HomePage() {
  const lifeScore = normalizeScore(
    calculateLifeScore(
      scoreBreakdown.discipline,
      scoreBreakdown.growth,
      scoreBreakdown.health,
      scoreBreakdown.output
    )
  );
  const activeGoals = initialGoals.filter((goal) => goal.status === 'active');

  return (
    <section className="space-y-8">
      <div className="gg-card overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="gg-pill inline-flex">Weekly Command Center</p>
            <h1 className="gg-page-title mt-4">Build Discipline. Measure Growth. Execute Daily.</h1>
            <p className="gg-subtle mt-3 max-w-2xl">
              GG Tracker is your personal operating system for high-performance execution.
              Every action compounds into your Life Score.
            </p>
          </div>
          <div className="rounded-2xl border border-[rgba(203,223,144,0.25)] bg-[rgba(15,30,56,0.55)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[rgba(238,244,220,0.72)]">Active Goals</p>
            <p className="mt-2 text-5xl font-bold text-[#CBDF90]">{activeGoals.length}</p>
            <p className="mt-2 text-sm text-[rgba(238,244,220,0.72)]">
              Average progress{' '}
              {Math.round(
                activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / Math.max(activeGoals.length, 1)
              )}
              %
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ScoreCard label="Life Score" value={lifeScore} tone="accent" />
        <ScoreCard label="Discipline" value={scoreBreakdown.discipline} />
        <ScoreCard label="Growth" value={scoreBreakdown.growth} />
        <ScoreCard label="Health" value={scoreBreakdown.health} />
        <ScoreCard label="Output" value={scoreBreakdown.output} />
      </div>

      <div className="gg-card p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Weekly Activity Heatmap</h2>
          <p className="text-sm text-[rgba(238,244,220,0.72)]">Last 7 days</p>
        </div>
        <WeeklyHeatmap data={weeklyActivity} />
      </div>

      <div className="gg-card p-6">
        <h2 className="text-xl font-semibold">Active Goal Overview</h2>
        <div className="mt-4 space-y-4">
          {activeGoals.map((goal) => (
            <article key={goal.id}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{goal.title}</span>
                <span className="text-[rgba(238,244,220,0.72)]">{goal.progress}%</span>
              </div>
              <div className="gg-progress">
                <span style={{ width: `${goal.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
