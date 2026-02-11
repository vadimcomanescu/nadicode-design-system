/**
 * Animation tokens derived from Emil Kowalski's "Animations on the Web" course.
 * Single source of truth for easing, duration, and spring configs.
 *
 * Springs now use stiffness/damping/mass for physical, visible overshoot.
 * Style-aware presets (arctic/bloom) let components adapt motion to the active style.
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

// Arctic springs: precise, controlled, minimal overshoot
export const spring = {
  snappy:   { type: 'spring' as const, stiffness: 400, damping: 28, mass: 0.8 },
  gentle:   { type: 'spring' as const, stiffness: 200, damping: 20, mass: 1 },
  bouncy:   { type: 'spring' as const, stiffness: 300, damping: 14, mass: 0.8 },
  dramatic: { type: 'spring' as const, stiffness: 500, damping: 24, mass: 1.2 },
} as const;

// Bloom springs: softer, bouncier, more playful overshoot
export const springBloom = {
  snappy:   { type: 'spring' as const, stiffness: 300, damping: 16, mass: 0.6 },
  gentle:   { type: 'spring' as const, stiffness: 150, damping: 12, mass: 0.8 },
  bouncy:   { type: 'spring' as const, stiffness: 200, damping: 8, mass: 0.5 },
  dramatic: { type: 'spring' as const, stiffness: 250, damping: 8, mass: 0.6 },
  wobbly:   { type: 'spring' as const, stiffness: 180, damping: 6, mass: 0.4 },
} as const;

// Style-aware motion distances (px)
export const motionDistance = {
  arctic: { sm: 16, md: 32, lg: 56 },
  bloom:  { sm: 20, md: 40, lg: 72 },
} as const;

// Style-aware starting scales (< 1, animates to 1.0)
export const motionScale = {
  arctic: { subtle: 0.90, normal: 0.80 },
  bloom:  { subtle: 0.85, normal: 0.70 },
} as const;

// Style-aware blur amounts (px)
export const motionBlur = {
  arctic: { subtle: 4, normal: 8 },
  bloom:  { subtle: 6, normal: 12 },
} as const;

export const animationTokens = { easing, duration, spring, springBloom, motionDistance, motionScale, motionBlur } as const;
