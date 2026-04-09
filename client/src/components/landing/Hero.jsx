import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PlayCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const headline = 'Your skills, mapped to your future.'.split(' ');

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return undefined;
    }

    const particles = [];
    const count = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.4,
      });
    }

    let frameId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, sourceIndex) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.slice(sourceIndex + 1).forEach((target) => {
          const dx = particle.x - target.x;
          const dy = particle.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 - distance / 1800})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      frameId = window.requestAnimationFrame(draw);
    };

    frameId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" aria-hidden="true" />;
}

export default function Hero() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section-shell relative flex min-h-[100svh] items-center justify-center pb-12 pt-8">
      <ParticleCanvas />
      <div className="noise-overlay opacity-30" />

      <motion.div
        className="hero-blob left-[4%] top-[10%] h-64 w-64 bg-brand-teal/35"
        animate={shouldReduceMotion ? undefined : { x: [0, 35, -10, 0], y: [0, -20, 25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-blob right-[8%] top-[12%] h-72 w-72 bg-brand-violet/35"
        animate={shouldReduceMotion ? undefined : { x: [0, -25, 18, 0], y: [0, 24, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-blob bottom-[8%] left-1/2 h-80 w-80 -translate-x-1/2 bg-brand-indigo/25"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 0.95, 1], y: [0, -18, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brand-teal via-cyan-200 to-brand-indigo shadow-teal" />
            <div>
              <p className="font-display text-lg text-white">SkillSpring</p>
              <p className="text-xs uppercase tracking-[0.28em] text-brand-muted">AI Growth Tracker</p>
            </div>
          </div>

          <Badge tone="violet">Local dev mode active</Badge>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="mb-6 flex flex-wrap gap-2"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Badge tone="teal">AI-powered skill mapping</Badge>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Badge tone="indigo">Gap analysis + live roadmap</Badge>
              </motion.div>
            </motion.div>

            <h1 className="font-display text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              {headline.map((word, index) => (
                <motion.span
                  key={word}
                  className="mr-4 inline-block bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              AI-powered gap analysis and personalized roadmaps for students who want to get
              hired, not just graduate.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="min-w-[220px]"
                onClick={() => navigate('/dashboard')}
                aria-label="Explore dashboard"
              >
                Explore Dashboard <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="min-w-[220px]"
                onClick={scrollToHowItWorks}
                aria-label="Watch demo"
              >
                <PlayCircle className="h-5 w-5" /> Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
            >
              {[
                ['24', 'skills tracked'],
                ['6', 'gaps surfaced'],
                ['3', 'learning paths ready'],
              ].map(([value, label]) => (
                <div key={label} className="glass-card rounded-3xl p-4">
                  <p className="font-display text-3xl text-white">{value}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.24em] text-brand-muted">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-6 rounded-[36px] bg-gradient-to-br from-brand-violet/25 via-transparent to-brand-teal/20 blur-3xl" />
            <div className="glass-card dashboard-grid relative overflow-hidden rounded-[36px] border border-white/10 p-6 shadow-glow">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-brand-muted">
                    Readiness Engine
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-white">Frontend Developer</h2>
                </div>
                <Badge tone="teal">84% aligned</Badge>
              </div>

              <div className="grid gap-4 pt-5">
                <div className="glass-card rounded-3xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brand-muted">Top skill delta</p>
                      <p className="mt-1 font-semibold text-white">Testing + Architecture</p>
                    </div>
                    <div className="rounded-full bg-brand-violet/12 px-3 py-1 text-sm text-violet-200">
                      Priority
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-teal"
                      initial={{ width: 0 }}
                      animate={{ width: '68%' }}
                      transition={{ duration: 1.1, delay: 1.05 }}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="glass-card rounded-3xl p-4">
                    <p className="text-sm text-brand-muted">Weekly roadmap</p>
                    <div className="mt-4 space-y-3">
                      {['Ship one React metrics widget', 'Practice component testing', 'Review accessibility gaps'].map(
                        (item, index) => (
                          <motion.div
                            key={item}
                            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-3 py-2"
                            initial={{ opacity: 0, x: 18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.12 }}
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
                            <span className="text-sm text-slate-200">{item}</span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-4">
                    <p className="text-sm text-brand-muted">AI coach pulse</p>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl bg-brand-indigo/10 p-3 text-sm text-indigo-100">
                        You are strongest in React and UI polish. Let&apos;s close testing and state
                        management next.
                      </div>
                      <div className="rounded-2xl bg-white/5 p-3 text-sm text-slate-200">
                        Suggested first step: build one feature with Vitest and document tradeoffs.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={scrollToHowItWorks}
          className="mx-auto mt-10 flex flex-col items-center gap-2 text-brand-muted"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          aria-label="Scroll to how it works"
        >
          <span className="text-xs uppercase tracking-[0.35em]">Scroll</span>
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
}

