import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

export default function SkillRadarChart({ data, onAdjustAxis }) {
  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Skill Overview</p>
          <h3 className="mt-3 font-display text-3xl text-white">Readiness radar</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Compare your current skill shape against the target-role benchmark. Adjust the axis
            sliders to reflect your honest self-assessment in local dev mode.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.24em] text-brand-muted">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-teal" />
            Current
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-violet" />
            Target
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.56fr_0.44fr]">
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                className="text-xs"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Radar
                dataKey="target"
                stroke="#7C3AED"
                fill="rgba(124, 58, 237, 0.16)"
                fillOpacity={1}
                strokeWidth={2}
              />
              <Radar
                dataKey="current"
                stroke="#2DD4BF"
                fill="rgba(45, 212, 191, 0.18)"
                fillOpacity={1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-5">
          {data.map((item) => (
            <div key={item.categoryKey} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{item.axis}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-brand-muted">
                    Current {item.current}% • Target {item.target}%
                  </p>
                </div>
                <span className="rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-xs text-brand-teal">
                  {item.current >= item.target ? 'Aligned' : 'In progress'}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={item.current}
                onChange={(event) => onAdjustAxis(item.categoryKey, Number(event.target.value))}
                className="mt-4 w-full accent-[#2DD4BF]"
                aria-label={`${item.axis} score`}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

