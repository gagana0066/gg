export function calculateLifeScore(discipline: number, growth: number, health: number, output: number): number {
  return (discipline + growth + health + output) / 4;
}

export function normalizeScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
