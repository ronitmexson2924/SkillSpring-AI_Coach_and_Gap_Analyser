import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Search, Compass, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const cards = [
  {
    title: 'Blind Spots',
    description:
      "73% of students can't articulate which skills they're missing for their target role.",
    value: 73,
    suffix: '%',
    icon: Search,
  },
  {
    title: 'No Direction',
    description:
      "Generic advice doesn't map to specific careers. Students waste months on the wrong things.",
    value: 5,
    suffix: ' mo',
    icon: Compass,
  },
  {
    title: 'Missed Opportunities',
    description:
      'Employers reject candidates not for lack of talent, but for lack of visible, structured skills.',
    value: 61,
    suffix: '%',
    icon: TrendingDown,
  },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, motionValue, rounded, value]);

  return (
    <span ref={ref} className="font-display text-5xl text-white">
      {display}
      {suffix}
    </span>
  );
}

export default function ProblemSection() {
  const animation = useScrollAnimation('staggerContainer');

  return (
    <section className="section-shell py-24 md:py-32">
      <motion.div className="mx-auto max-w-7xl" {...animation}>
        <motion.div {...useScrollAnimation('fadeUp')} className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-brand-teal">The Problem</p>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Students are talented, but the signal is scattered.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Most learners are building skills in the dark. They know they want the role, but not
            the exact gaps standing between them and a confident application.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <ProblemCard key={card.title} card={card} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProblemCard({ card }) {
  const Icon = card.icon;

  return (
    <motion.div {...useScrollAnimation('scaleIn')}>
      <Card
        className="group relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-violet/70"
        glow
      >
        <div className="stat-glow" />
        <div className="relative z-10">
          <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
            <Icon className="h-6 w-6 text-brand-teal" />
          </div>
          <Counter value={card.value} suffix={card.suffix} />
          <h3 className="mt-5 text-2xl font-semibold text-white">{card.title}</h3>
          <p className="mt-3 leading-7 text-slate-300">{card.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
