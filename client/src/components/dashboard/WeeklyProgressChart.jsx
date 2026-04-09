import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../ui/Card';

export default function WeeklyProgressChart({ data }) {
  return (
    <Card className="p-6">
      <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Weekly Progress</p>
      <h3 className="mt-3 font-display text-3xl text-white">Skills learned vs. tasks completed</h3>

      <div className="mt-8 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="skills-area" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tasks-area" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" stroke="#64748B" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17, 17, 24, 0.96)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
              }}
            />
            <Area
              type="monotone"
              dataKey="skills"
              stroke="#2DD4BF"
              fill="url(#skills-area)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#7C3AED"
              fill="url(#tasks-area)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

