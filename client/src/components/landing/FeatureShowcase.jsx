import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, ChartColumnBig, Bot, Activity } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const features = [
  {
    icon: Map,
    title: 'Skill Mapper',
    description: 'Upload a resume or add skills manually to generate a visual radar snapshot.',
  },
  {
    icon: ChartColumnBig,
    title: 'Gap Analyzer',
    description: 'Compare your current profile with role requirements in real time.',
  },
  {
    icon: Bot,
    title: 'AI Coach',
    description: 'Ask focused questions and get role-aware advice grounded in your actual gaps.',
  },
  {
    icon: Activity,
    title: 'Progress Tracker',
    description: 'Monitor streaks, milestones, and steady growth week after week.',
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={sectionRef} className="section-shell h-[240vh] py-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div {...useScrollAnimation('fadeUp')} className="mb-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-brand-teal">Feature Showcase</p>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              A scroll story that turns career ambiguity into visible action.
            </h2>
          </motion.div>

          <motion.div style={{ x }} className="flex gap-6 will-change-transform">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="relative min-h-[440px] min-w-[88vw] overflow-hidden p-8 md:min-w-[46vw] lg:min-w-[36vw]"
                  glow
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-brand-violet/10" />
                  <div className="relative z-10 flex h-full flex-col">
                    <Badge tone={index % 2 === 0 ? 'teal' : 'violet'}>
                      {index + 1}. {feature.title}
                    </Badge>
                    <div className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5">
                      <Icon className="h-8 w-8 text-brand-teal" />
                    </div>
                    <h3 className="mt-10 font-display text-3xl text-white">{feature.title}</h3>
                    <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
                      {feature.description}
                    </p>

                    <div className="mt-auto rounded-[28px] border border-white/10 bg-black/20 p-5">
                      {index === 0 && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[92, 74, 65].map((value) => (
                            <div key={value} className="rounded-2xl bg-white/5 p-4">
                              <p className="font-display text-2xl text-white">{value}%</p>
                              <p className="text-sm text-brand-muted">axis confidence</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {index === 1 && (
                        <div className="space-y-4">
                          {[
                            ['Problem solving', 'Strong'],
                            ['Testing', 'Needs work'],
                            ['Architecture', 'Gap detected'],
                          ].map(([label, state]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
                            >
                              <span>{label}</span>
                              <span className="text-sm text-brand-teal">{state}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {index === 2 && (
                        <div className="space-y-3">
                          <div className="rounded-2xl bg-brand-indigo/10 p-4 text-sm text-indigo-100">
                            What should I learn first for frontend interviews?
                          </div>
                          <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
                            Start with testing strategy, component architecture, and browser
                            rendering fundamentals.
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="grid gap-3 sm:grid-cols-7">
                          {Array.from({ length: 28 }).map((_, gridIndex) => (
                            <div
                              key={gridIndex}
                              className={`h-8 rounded-md ${
                                gridIndex % 5 === 0
                                  ? 'bg-brand-teal/80'
                                  : gridIndex % 3 === 0
                                    ? 'bg-brand-indigo/60'
                                    : 'bg-white/5'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

