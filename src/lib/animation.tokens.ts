/**
 * Animation tokens derived from Emil Kowalski's "Animations on the Web" course.
 * Single source of truth for easing, duration, and spring configs.
 */

// Easing curves (CSS cubic-bezier values)
export const easing = {
  // ease-out: user-initiated interactions (dropdowns, modals, tooltips)
  'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
  'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',

  // ease-in-out: elements already on screen moving or morphing
  'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
} as const;

// Duration scale (ms)
export const duration = {
  micro: '100ms',
  fast: '150ms',
  normal: '200ms',
  moderate: '250ms',
  slow: '300ms',
} as const;

// Spring configs (for Framer Motion / React Spring)
export const spring = {
  snappy: { type: 'spring' as const, duration: 0.2, bounce: 0 },
  gentle: { type: 'spring' as const, duration: 0.4, bounce: 0.1 },
  bouncy: { type: 'spring' as const, duration: 0.5, bounce: 0.25 },
} as const;

export const animationTokens = { easing, duration, spring } as const;
