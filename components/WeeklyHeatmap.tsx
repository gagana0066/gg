interface WeeklyHeatmapProps {
  data: Record<string, number>;
  days?: number;
}

const colors = ['#17335f', '#1b4079', '#4d7c8a', '#8fad88', '#cbdf90'];

function getDateKeys(days: number): string[] {
  const result: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

export default function WeeklyHeatmap({ data, days = 7 }: WeeklyHeatmapProps) {
  const dates = getDateKeys(days);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => {
          const value = data[date] || 0;
          const intensity = Math.max(0, Math.min(4, value));
          const color = colors[intensity];
          return (
            <div
              key={date}
              className="h-10 rounded-md border border-[rgba(238,244,220,0.2)]"
              style={{ backgroundColor: color }}
              title={`${date}: ${value}`}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-[rgba(238,244,220,0.75)]">
        <span>Low</span>
        {colors.map((color) => (
          <span key={color} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
        ))}
        <span>High</span>
      </div>
    </div>
  );
}
