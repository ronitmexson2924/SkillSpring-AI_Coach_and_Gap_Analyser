const toneMap = {
  teal: 'border-brand-teal/30 bg-brand-teal/10 text-brand-teal',
  violet: 'border-brand-violet/30 bg-brand-violet/10 text-violet-200',
  indigo: 'border-brand-indigo/30 bg-brand-indigo/10 text-indigo-200',
  slate: 'border-white/10 bg-white/5 text-slate-300',
  rose: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
};

export default function Badge({ children, tone = 'slate', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${toneMap[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

