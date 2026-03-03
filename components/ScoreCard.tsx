interface ScoreCardProps {
  label: string;
  value: number;
  tone?: 'core' | 'accent';
}

export default function ScoreCard({ label, value, tone = 'core' }: ScoreCardProps) {
  const highlight = tone === 'accent' ? 'text-[#CBDF90]' : 'text-[#EEF4DC]';
  return (
    <div className="gg-card p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[rgba(238,244,220,0.72)]">{label}</p>
      <p className={`mt-3 text-4xl font-bold ${highlight}`}>{value}</p>
      <div className="mt-4 h-1.5 w-full rounded-full bg-[rgba(238,244,220,0.12)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4D7C8A] via-[#8FAD88] to-[#CBDF90]"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
