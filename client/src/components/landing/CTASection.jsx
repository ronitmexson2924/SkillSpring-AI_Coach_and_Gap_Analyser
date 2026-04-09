import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CTASection() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-shell pb-24 pt-8 md:pb-32">
      <motion.div
        {...useScrollAnimation('blurReveal')}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-black/20 px-6 py-16 text-center shadow-glow md:px-10"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-teal/12 via-brand-violet/12 to-brand-indigo/12"
          animate={shouldReduceMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.34em] text-brand-teal">Ready To Start</p>
          <h2 className="mt-5 font-display text-4xl text-white md:text-6xl">
            Start mapping your future, today.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            No signup required. Just skills, gaps, and a roadmap that makes your next move obvious.
          </p>
          <Button className="mt-10" size="lg" onClick={() => navigate('/dashboard')}>
            Launch Dashboard <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

