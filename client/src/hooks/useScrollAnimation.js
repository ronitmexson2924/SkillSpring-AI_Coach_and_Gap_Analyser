import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  blurReveal,
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  staggerContainer,
} from '../animations/variants';

const variantMap = {
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  blurReveal,
  staggerContainer,
};

export function useScrollAnimation(variant = 'fadeUp') {
  const shouldReduceMotion = useReducedMotion();

  return useMemo(() => {
    const selected = variantMap[variant] ?? fadeUp;

    if (shouldReduceMotion) {
      return {
        initial: false,
        animate: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' },
      };
    }

    return {
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-80px' },
      variants: selected,
    };
  }, [shouldReduceMotion, variant]);
}

