# Animation System

Central animation infrastructure built on `motion/react` (NOT framer-motion) and custom tokens derived from Emil Kowalski's "Animations on the Web" course.

---

## Core Files

| File                          | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| `src/lib/animation.tokens.ts` | Easing curves, duration scale, spring configs |
| `src/lib/motion.ts`           | Motion variants, spring presets, stagger, reduced motion |
| `tailwind.config.js`          | Tailwind keyframes and animation utilities |
| `src/index.css`               | CSS keyframes and `prefers-reduced-motion` |

---

## Easing Curves

### Ease-Out (for user-initiated interactions: dropdowns, modals, tooltips)

| Name         | CSS `cubic-bezier`                     | Tailwind Class      |
| ------------ | -------------------------------------- | ------------------- |
| `out-quad`   | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | `ease-out-quad`   |
| `out-cubic`  | `cubic-bezier(0.215, 0.61, 0.355, 1)`  | `ease-out-cubic`  |
| `out-quart`  | `cubic-bezier(0.165, 0.84, 0.44, 1)`   | `ease-out-quart`  |
| `out-quint`  | `cubic-bezier(0.23, 1, 0.32, 1)`       | `ease-out-quint`  |
| `out-expo`   | `cubic-bezier(0.19, 1, 0.22, 1)`       | (token only)      |

### Ease-In-Out (for morphing, elements already on screen)

| Name          | CSS `cubic-bezier`                       | Tailwind Class       |
| ------------- | ---------------------------------------- | -------------------- |
| `in-out-quad` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | (token only)      |
| `in-out-cubic`| `cubic-bezier(0.645, 0.045, 0.355, 1)`  | `ease-in-out-cubic`  |
| `in-out-quart`| `cubic-bezier(0.77, 0, 0.175, 1)`       | `ease-in-out-quart`  |

**Default recommendation:** `ease-out-cubic` for enters/opens, `ease-in-out-cubic` for morphing.

---

## Duration Scale

| Token      | Value  | Tailwind Class      | Use For                    |
| ---------- | ------ | ------------------- | -------------------------- |
| `micro`    | 100ms  | `duration-micro`    | Micro-feedback (ripples)   |
| `fast`     | 150ms  | `duration-fast`     | Hover states, toggles      |
| `normal`   | 200ms  | `duration-normal`   | Standard transitions       |
| `moderate` | 250ms  | `duration-moderate` | Medium elements            |
| `slow`     | 300ms  | `duration-slow`     | Large/prominent elements   |

---

## Spring Presets

Defined in `src/lib/motion.ts` as `motionSpring`:

| Name     | Duration | Bounce | Use For                              |
| -------- | -------- | ------ | ------------------------------------ |
| `snappy` | 0.2s     | 0      | Micro-interactions, tooltips, badges |
| `gentle` | 0.4s     | 0.1    | Page transitions, slide-ins          |
| `bouncy` | 0.5s     | 0.25   | Playful UI, celebratory moments      |

```tsx
import { motionSpring } from "@/lib/motion"

<motion.div
  animate={{ opacity: 1 }}
  transition={motionSpring.snappy}
/>
```

---

## Pre-Built Motion Variants

Import from `@/lib/motion`:

### Simple Entrance Variants

```tsx
import { fadeIn, fadeInUp, fadeInDown, scaleIn, slideInLeft, slideInRight } from "@/lib/motion"

// Usage with motion component
<motion.div {...fadeInUp}>Content</motion.div>

// Spread syntax applies initial + animate + transition
```

| Variant        | Initial State                  | Spring   |
| -------------- | ------------------------------ | -------- |
| `fadeIn`       | `opacity: 0`                   | snappy   |
| `fadeInUp`     | `opacity: 0, y: 20`           | snappy   |
| `fadeInDown`   | `opacity: 0, y: -20`          | snappy   |
| `scaleIn`      | `opacity: 0, scale: 0.95`     | snappy   |
| `slideInLeft`  | `opacity: 0, x: -30`          | gentle   |
| `slideInRight` | `opacity: 0, x: 30`           | gentle   |

### Stagger Patterns

```tsx
import { staggerContainer, blockStagger, heroStagger } from "@/lib/motion"

// Generic stagger container
<motion.div variants={staggerContainer(100)} initial="initial" animate="animate">
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>

// Block-level stagger (80ms delay, 16px up)
<motion.div variants={blockStagger.container()} initial="hidden" animate="visible">
  <motion.div variants={blockStagger.child}>Card 1</motion.div>
  <motion.div variants={blockStagger.child}>Card 2</motion.div>
</motion.div>

// Hero-level stagger (100ms delay, 24px up, gentle spring)
<motion.div variants={heroStagger.container} initial="hidden" animate="visible">
  <motion.div variants={heroStagger.child}>Headline</motion.div>
  <motion.div variants={heroStagger.child}>Subtitle</motion.div>
</motion.div>
```

| Pattern         | Delay  | Distance | Spring  | Best For          |
| --------------- | ------ | -------- | ------- | ----------------- |
| `staggerContainer` | configurable | N/A | N/A | Custom stagger |
| `blockStagger`  | 80ms   | 16px up  | snappy  | Card grids, lists |
| `heroStagger`   | 100ms  | 24px up  | gentle  | Hero sections     |

---

## Reduced Motion Support

Three layers of reduced-motion protection:

### 1. Global CSS Rule (in `index.css`)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2. Motion Hook (`useMotionConfig`)
```tsx
import { useMotionConfig } from "@/lib/motion"

function MyComponent() {
  const motionConfig = useMotionConfig()
  // Returns { duration: 0.01 } when reduced motion preferred, {} otherwise
  return (
    <motion.div transition={{ ...motionSpring.snappy, ...motionConfig }}>
      ...
    </motion.div>
  )
}
```

### 3. Radix `useReducedMotion` (from motion/react)
```tsx
import { useReducedMotion } from "motion/react"
const prefersReduced = useReducedMotion() // boolean
```

---

## Tailwind Animation Utilities

Pre-defined in `tailwind.config.js`:

| Tailwind Class          | Animation                              | Duration/Timing              |
| ----------------------- | -------------------------------------- | ---------------------------- |
| `animate-fade-in`       | Opacity 0 -> 1                         | 200ms ease-out-cubic         |
| `animate-fade-in-up`    | Opacity 0 + translateY(8px) -> normal  | 200ms ease-out-cubic         |
| `animate-scale-in`      | Opacity 0 + scale(0.95) -> normal      | 200ms ease-out-cubic         |
| `animate-blur-reveal`   | Opacity 0 + blur(8px) -> normal        | 300ms ease-out-cubic         |
| `animate-accordion-down`| Height 0 -> auto (for Radix)          | 200ms ease-out               |
| `animate-accordion-up`  | Height auto -> 0 (for Radix)          | 150ms ease-out               |
| `animate-cursor-blink`  | Opacity blink                          | 1s step-end infinite         |
| `animate-gradient-sweep`| Background position sweep              | 8s linear infinite           |
| `animate-border-spin`   | Border rotation                        | 3s linear infinite           |
| `animate-meteor`        | Diagonal streak                        | var(--meteor-duration, 2s)   |
| `animate-aurora-1/2/3`  | Slow ambient drift                     | 12-18s ease-in-out infinite  |
| `animate-shimmer`       | Horizontal shimmer                     | 2s linear infinite           |
| `animate-scroll-vertical`| Vertical scroll                       | var(--duration, 40s) linear  |

---

## Z-Index Scale

| Tailwind Class | Value | Use For                        |
| -------------- | ----- | ------------------------------ |
| `z-base`       | 0     | Default stacking               |
| `z-dropdown`   | 50    | Dropdowns, selects             |
| `z-sticky`     | 100   | Sticky headers, toolbars       |
| `z-overlay`    | 200   | Modal backdrops, overlays      |
| `z-modal`      | 300   | Modal/dialog content           |
| `z-popover`    | 400   | Popovers, tooltips             |
| `z-toast`      | 500   | Toast notifications            |
| `z-max`        | 999   | Maximum z-index (rare)         |
