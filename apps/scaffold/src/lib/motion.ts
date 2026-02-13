'use client'

/**
 * Centralized Motion variants, spring presets, and reduced motion logic.
 * All animation components should import from here instead of defining their own.
 */
import { useReducedMotion } from "motion/react";
import {
  spring as springPresets,
  springBloom,
  motionDistance,
  motionScale,
  motionBlur,
} from "./animation.tokens";
import { useTheme } from "./ThemeProvider";

// Spring presets in Motion format (stiffness/damping/mass)
export const motionSpring = {
  snappy: springPresets.snappy,
  gentle: springPresets.gentle,
  bouncy: springPresets.bouncy,
  dramatic: springPresets.dramatic,
} as const;

// Style-aware motion hook
export function useStyleMotion() {
  const { style } = useTheme();
  return {
    spring: style === 'bloom' ? springBloom : springPresets,
    distance: motionDistance[style],
    scale: motionScale[style],
    blur: motionBlur[style],
    style,
  };
}

// Variant objects for common animations (bolder defaults)
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: motionSpring.snappy },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 32, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: motionSpring.snappy },
} as const;

export const fadeInDown = {
  initial: { opacity: 0, y: -32, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: motionSpring.snappy },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: motionSpring.snappy },
} as const;

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: motionSpring.gentle },
} as const;

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: motionSpring.gentle },
} as const;

// Stagger container variant
export function staggerContainer(delayMs = 100) {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: delayMs / 1000,
      },
    },
  } as const;
}

// Block-level stagger preset (80ms default, 24px up)
export const blockStagger = {
  container: (delayMs = 80) => ({
    visible: { transition: { staggerChildren: delayMs / 1000 } },
    hidden: {},
  }),
  child: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: motionSpring.snappy },
  },
} as const;

// Hero-level stagger preset (100ms, 36px up, gentle spring)
export const heroStagger = {
  container: {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    hidden: {},
  },
  child: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: motionSpring.gentle },
  },
} as const;

// Reduced motion hook - returns near-zero duration when user prefers reduced motion
export function useMotionConfig() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return { duration: 0.01 };
  }
  return {};
}
