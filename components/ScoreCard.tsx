interface ScoreCardProps {
  label: string;
  value: number;
}

export default function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
