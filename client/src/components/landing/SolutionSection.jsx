import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const panels = [
  {
    title: 'Skill Mapping',
    body: 'Turn messy inputs into a visual skill fingerprint across technical depth, communication, leadership, and problem solving.',
    badge: 'Radar intelligence',
  },
  {
    title: 'Gap Analysis',
    body: 'Compare your profile against real role expectations and immediately see the missing pieces, confidence gaps, and readiness score.',
    badge: 'Real-time scoring',
  },
  {
    title: 'AI Roadmap',
    body: 'Get a structured week-by-week learning path tailored to your available time, target role, and existing strengths.',
    badge: 'Action-first planning',
  },
];

function RadarVisual() {
  return (
    <div className="relative mx-auto flex h-72 w-full max-w-[320px] items-center justify-center">
      {[220, 170, 120].map((size) => (
        <motion.div
          key={size}
          className="radial-outline"
          style={{ height: size, width: size }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: size / 400 }}
        />
      ))}
      <svg viewBox="0 0 300 300" className="absolute h-[260px] w-[260px]">
        <motion.polygon
          points="150,30 242,94 212,226 88,226 58,94"
          fill="rgba(45, 212, 191, 0.12)"
          stroke="rgba(45, 212, 191, 0.9)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute h-4 w-4 rounded-full bg-brand-teal shadow-[0_0_24px_rgba(45,212,191,0.9)]" />
    </div>
  );
}

function GapBars() {
  const bars = [
    ['React patterns', 88],
    ['Testing depth', 54],
    ['System design', 41],
    ['Accessibility', 72],
  ];

  return (
    <div className="space-y-5">
      {bars.map(([label, width], index) => (
        <div key={label}>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>{label}</span>
            <span>{width}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-teal"
              initial={{ width: 0 }}
              whileInView={{ width: `${width}%` }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: index * 0.12 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function NodeGraph() {
  const nodes = [
    { top: '14%', left: '20%' },
    { top: '30%', left: '56%' },
    { top: '58%', left: '35%' },
    { top: '68%', left: '74%' },
  ];

  const links = [
    ['18%', '24%', '54%', '34%'],
    ['58%', '34%', '38%', '60%'],
    ['38%', '60%', '74%', '72%'],
  ];

  return (
    <div className="relative h-72 rounded-[32px] border border-white/10 bg-black/20">
      {links.map(([left, top, width, rotate], index) => (
        <motion.div
          key={`${left}-${top}`}
          className="absolute h-[2px] origin-left rounded-full bg-gradient-to-r from-brand-teal to-brand-violet"
          style={{ left, top, width, rotate }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: index * 0.18 }}
        />
      ))}
      {nodes.map((node, index) => (
        <motion.div
          key={`${node.left}-${node.top}`}
          className="absolute h-4 w-4 rounded-full bg-brand-teal shadow-[0_0_24px_rgba(45,212,191,0.75)]"
          style={node}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.25 + index * 0.16 }}
        />
      ))}
    </div>
  );
}

function PanelVisual({ index, progress }) {
  const translateY = useTransform(progress, [0, 1], ['-20px', '20px']);

  return (
    <motion.div style={{ y: translateY }}>
      <Card className="p-6 md:p-8" glow>
        {index === 0 && <RadarVisual />}
        {index === 1 && <GapBars />}
        {index === 2 && <NodeGraph />}
      </Card>
    </motion.div>
  );
}

function SolutionPanel({ index, panel }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const reverse = index % 2 === 1;

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-2">
      <motion.div
        className={reverse ? 'order-2 lg:order-1' : ''}
        {...useScrollAnimation(reverse ? 'slideRight' : 'slideLeft')}
      >
        <Badge tone={index === 1 ? 'violet' : index === 2 ? 'indigo' : 'teal'}>
          {panel.badge}
        </Badge>
        <h3 className="mt-5 font-display text-3xl text-white md:text-4xl">{panel.title}</h3>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{panel.body}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {['Role-aware', 'Editable', 'Exportable', 'Live-updating']
            .slice(index, index + 2)
            .map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
        </div>
      </motion.div>

      <div className={reverse ? 'order-1 lg:order-2' : ''}>
        <PanelVisual index={index} progress={scrollYProgress} />
      </div>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section className="section-shell py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div {...useScrollAnimation('fadeUp')} className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-teal">The Solution</p>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
            A skill operating system built for career momentum.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            SkillSpring blends visual mapping, role-aware diagnostics, and an AI coach that knows
            what to prioritize next.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {panels.map((panel, index) => (
            <SolutionPanel key={panel.title} index={index} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  );
}
