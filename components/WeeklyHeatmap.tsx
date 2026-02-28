import { useMemo } from 'react';

interface WeeklyHeatmapProps {
  // map of date string yyyy-mm-dd to value
  data: Record<string, number>;
}

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function WeeklyHeatmap({ data }: WeeklyHeatmapProps) {
  // generate past 7 days including today
  const dates = useMemo(() => {
    const arr: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      arr.push(d.toISOString().slice(0,10));
    }
    return arr;
  }, []);

  return (
    <div className="flex space-x-1">
      {dates.map(date => {
        const val = data[date] || 0;
        const intensity = Math.min(4, val);
        const bg = `bg-green-${intensity * 100}`;
        return (
          <div key={date} className={`${bg} w-6 h-6 rounded`} title={date}></div>
        );
      })}
    </div>
  );
}
