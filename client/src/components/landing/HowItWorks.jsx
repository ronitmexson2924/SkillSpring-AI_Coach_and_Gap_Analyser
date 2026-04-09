import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Card from '../ui/Card';

const steps = [
  {
    title: 'Input Your Skills',
    description: 'Manual input, resume PDF upload, or GitHub profile link.',
  },
  {
    title: 'AI Analyzes',
    description: 'GPT-4o maps skills to industry frameworks like SFIA and O*NET.',
  },
  {
    title: 'Get Your Roadmap',
    description: 'Receive a personalized week-by-week learning path with concrete resources.',
  },
  {
    title: 'Track & Improve',
    description: 'Use the dashboard to monitor progress, milestones, and next best actions.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" ref={ref} className="section-shell py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...useScrollAnimation('fadeUp')} className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-teal">How It Works</p>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Four steps from uncertainty to a focused growth plan.
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <svg width="120" height="100%" viewBox="0 0 120 1000" className="h-full">
              <path
                d="M60 0 L60 1000"
                stroke="rgba(148, 163, 184, 0.18)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M60 0 L60 1000"
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <TimelineStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }) {
  return (
    <motion.div
      {...useScrollAnimation(index % 2 === 0 ? 'slideLeft' : 'slideRight')}
      className={`relative grid gap-6 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}`}
    >
      <div className="hidden md:block" />
      <Card className="relative p-6 md:p-8" glow>
        <motion.div
          className="absolute -left-4 top-8 hidden h-8 w-8 items-center justify-center rounded-full border border-brand-teal/40 bg-brand-bg text-sm font-semibold text-brand-teal md:flex"
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          {index + 1}
        </motion.div>
        <p className="text-sm uppercase tracking-[0.32em] text-brand-muted">Step {index + 1}</p>
        <h3 className="mt-4 font-display text-3xl text-white">{step.title}</h3>
        <p className="mt-4 text-lg leading-8 text-slate-300">{step.description}</p>
      </Card>
    </motion.div>
  );
}
