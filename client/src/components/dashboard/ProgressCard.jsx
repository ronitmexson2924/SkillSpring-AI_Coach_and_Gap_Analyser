import Card from '../ui/Card';

export default function ProgressCard({ label, value, helper, tone = 'teal' }) {
  const toneMap = {
    teal: 'from-brand-teal/18 to-brand-teal/0 text-brand-teal',
    violet: 'from-brand-violet/18 to-brand-violet/0 text-violet-200',
    indigo: 'from-brand-indigo/18 to-brand-indigo/0 text-indigo-200',
  };

  return (
    <Card className="relative overflow-hidden p-5">
      <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[tone]}`} />
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.26em] text-brand-muted">{label}</p>
        <p className="mt-4 font-display text-4xl text-white">{value}</p>
        <p className="mt-3 text-sm text-slate-300">{helper}</p>
      </div>
    </Card>
  );
}

