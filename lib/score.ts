export function calculateLifeScore(discipline: number, growth: number, health: number, output: number): number {
  return (discipline + growth + health + output) / 4;
}
