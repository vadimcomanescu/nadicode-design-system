/**
 * Centralized Motion variants, spring presets, and reduced motion logic.
 * All animation components should import from here instead of defining their own.
 */
import { useReducedMotion } from "motion/react";
import { spring as springTokens } from "./animation.tokens";

// Spring presets in Motion format
export const motionSpring = {
  snappy: { type: "spring" as const, duration: springTokens.snappy.duration, bounce: springTokens.snappy.bounce },
  gentle: { type: "spring" as const, duration: springTokens.gentle.duration, bounce: springTokens.gentle.bounce },
  bouncy: { type: "spring" as const, duration: springTokens.bouncy.duration, bounce: springTokens.bouncy.bounce },
} as const;

// Variant objects for common animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: motionSpring.snappy },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: motionSpring.snappy },
} as const;

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: motionSpring.snappy },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: motionSpring.snappy },
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

// Reduced motion hook - returns near-zero duration when user prefers reduced motion
export function useMotionConfig() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return { duration: 0.01 };
  }
  return {};
}
