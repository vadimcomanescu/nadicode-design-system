# World-Class Design System Upgrade

## Context

The design system currently scores ~4/10 on animation maturity. Motion v12 is installed but barely used (5 files). Animation tokens (easings, durations, springs) are defined but dead code. Most of the ~90 components use only `transition-colors`. There are no scroll animations, no page transitions, no text effects, and no 3D interactions. Key pages (404, Landing, Pricing) and blocks (FAQ, Newsletter, Contact) are missing entirely. This plan upgrades the system to feel alive, complete, and cutting-edge for 2026 apps.

**Scope**: Everything (all 6 phases). Team of 4 agents.
**Style**: Subtle + Professional (Vercel/Linear aesthetic). Gentle tilts (5-8deg max), soft auroras, restrained meteors. Glass stays dominant.
**Goal**: Animation maturity 4/10 -> 9/10, component completeness ~70% -> ~95%.

---

## Phase 0: Animation Foundation (prerequisite for everything)

### New file: `src/lib/motion.ts`
Centralizes Motion variants, spring presets, and reduced motion logic.

```
Exports:
- motionSpring.snappy / .gentle / .bouncy  (from animation.tokens.ts, converted to Motion format)
- fadeIn, fadeInUp, fadeInDown, scaleIn, slideInLeft/Right  (Variants objects)
- staggerContainer(delayMs)  (parent variant with staggerChildren)
- useMotionConfig()  (returns { duration: 0.01 } when reduced motion preferred)
```

### Update: `tailwind.config.js`
Add ~10 new keyframes: `blur-reveal`, `cursor-blink`, `gradient-sweep`, `border-spin`, `meteor`, `aurora-1/2/3`, `shimmer`, `scroll-vertical`.

### Update: Existing Motion components
Apply `useReducedMotion` to all 5 existing files that use Motion (MouseEffect, AudioVisualizerBlock, HeaderBlock, icons pattern).

---

## Phase 1: New Animation Components (18 components)

All go in `src/components/ui/`. All must support `useReducedMotion`.

### Text Animations (5)
| Component | File | Approach | Tokens Used |
|-----------|------|----------|-------------|
| **TextReveal** | `TextReveal.tsx` | CSS `blur-reveal` keyframe, word/char split with stagger | `duration.normal`, `ease-out-cubic` |
| **TypewriterText** | `TypewriterText.tsx` | RAF + state, CSS `cursor-blink` | `duration.fast` per char |
| **AnimatedGradientText** | `AnimatedGradientText.tsx` | CSS `gradient-sweep` on backgroundPosition | accent -> info gradient |
| **FlipWords** | `FlipWords.tsx` | Motion AnimatePresence, rotateX variants | `spring.gentle` |
| **NumberTicker** | `NumberTicker.tsx` | Motion useSpring + useTransform | `spring.gentle`, 900ms |

### Motion Primitives (8)
| Component | File | Approach | Tokens Used |
|-----------|------|----------|-------------|
| **ScrollFadeIn** | `ScrollFadeIn.tsx` | Motion `useInView`, fade+slide variants | `spring.snappy` |
| **TiltCard** | `TiltCard.tsx` | Motion useMotionValue, CSS perspective + rotateX/Y | `spring.snappy`, 5-8deg max (subtle/professional) |
| **MagneticElement** | `MagneticElement.tsx` | Motion useMotionValue for x/y offset | `spring.gentle` |
| **Spotlight** | `Spotlight.tsx` | Motion useMotionTemplate, radial gradient tracking | accent at 6% opacity |
| **MovingBorder** | `MovingBorder.tsx` | CSS conic-gradient + `border-spin` keyframe | coral + teal, 3s |
| **AnimatedBeam** | `AnimatedBeam.tsx` | Motion SVG pathLength animation | `ease-out-cubic`, 1500ms |
| **FloatingDock** | `FloatingDock.tsx` | Motion useMotionValue + useTransform for neighbor scaling | `spring.bouncy` |
| **BentoGrid** | `BentoGrid.tsx` | CSS Grid + ScrollFadeIn per cell | 150ms stagger |

### Decorative Effects (3)
| Component | File | Approach |
|-----------|------|----------|
| **MeteorShower** | `MeteorShower.tsx` | CSS `meteor` keyframe, random positioning, 1-3s range. Subtle: low opacity (0.15-0.3), thin streaks |
| **AuroraEffect** | `AuroraEffect.tsx` | CSS `aurora-1/2/3` keyframes, multi-layer gradients, 15s cycle. Subtle: muted colors at 10-20% opacity |
| **Marquee** (vertical) | Enhance `InfiniteSlider.tsx` | Add `direction="vertical"` prop + `scroll-vertical` keyframe |

### Page-Level (1)
| Component | File | Approach |
|-----------|------|----------|
| **PageTransition** | `PageTransition.tsx` | Motion AnimatePresence wrapping React Router, fade/slide modes |

### Stepper Enhancement (1)
| Component | File | Approach |
|-----------|------|----------|
| **Stepper** | Enhance `stepper/stepper.tsx` | Add Motion `layoutId` for active indicator slide |

---

## Phase 2: Animation Upgrades to Existing Components

### Tier 1: Tailwind-only (no new deps, ~5 lines each)

| File | Current | Upgrade |
|------|---------|---------|
| `Button.tsx` | `active:scale-[0.97]` | Add `hover:-translate-y-0.5 hover:shadow-lg transition-all duration-fast ease-out-cubic` |
| `Card.tsx` | `hover:-translate-y-0.5` | Add `hover:shadow-xl/20 transition-all duration-normal ease-out-cubic`, subtle border glow |
| `Badge.tsx` | Static | Add `animate-in fade-in-0 zoom-in-95 duration-fast` on mount |
| `Progress.tsx` | Static bar | Add `transition-all duration-slow ease-out-quart` to indicator + shimmer overlay |
| `Tabs.tsx` | `transition-colors` | Add Motion `layoutId` sliding active indicator between triggers |
| `Toast.tsx` | Basic appear | Better spring timing via token-based durations |
| `Skeleton.tsx` | `animate-pulse` | Replace with `shimmer` gradient sweep (more polished) |

### Tier 2: Motion-enhanced wrappers (new files, opt-in)

| New File | Wraps | Enhancement |
|----------|-------|-------------|
| `AnimatedDialog.tsx` | Dialog | Motion spring scale + backdrop blur transition |
| `AnimatedSheet.tsx` | Sheet | Spring slide-in + drag-to-close gesture |
| `AnimatedTabs.tsx` | Tabs content | AnimatePresence fade+slide between panels |

### Tier 3: Deeper upgrades

| File | Enhancement |
|------|-------------|
| `DataTable.tsx` | Row hover transition, Motion layout for sort reorder |
| `Sidebar.tsx` | Spring collapse/expand, stagger menu items entrance |
| `Carousel.tsx` | Spring-based sliding, scale on non-active items |
| Chart components | Entry animations (draw-in lines, grow-up bars) via Recharts `isAnimationActive` |

---

## Phase 3: Missing Blocks (10 new blocks)

All go in `src/components/blocks/`.

### Must-Have (7)
| Block | File | Composes | Animation |
|-------|------|----------|-----------|
| **NotFoundBlock** | `NotFoundBlock.tsx` | Typography, Button, MeteorShower | Meteors bg, floating 404 text, button glow |
| **FAQBlock** | `FAQBlock.tsx` | Accordion, Typography | Smooth height expand, chevron rotation |
| **ComparisonBlock** | `ComparisonBlock.tsx` | Table, Badge, Check/X icons | Row hover highlight, check icon draw-in |
| **ContactBlock** | `ContactBlock.tsx` | Field, Input, Textarea, Button | Focus glow, submit loading, success check |
| **NewsletterBlock** | `NewsletterBlock.tsx` | Input, Button, Typography, glass | Button hover glow, success animation |
| **BannerBlock** | `BannerBlock.tsx` | Button, Typography, X icon | Slide up from bottom, slide out on dismiss |
| **ChangelogBlock** | `ChangelogBlock.tsx` | Timeline, Badge, Typography | Scroll reveal, "new" badge pulse |

### Nice-to-Have (3)
| Block | File | Notes |
|-------|------|-------|
| **ActivityFeedBlock** | `ActivityFeedBlock.tsx` | Activity stream with Timeline + Avatar |
| **GalleryBlock** | `GalleryBlock.tsx` | Image grid with lightbox Dialog |
| **OnboardingBlock** | `OnboardingBlock.tsx` | Checklist with Progress + confetti |

---

## Phase 4: Missing Pages (6 new pages)

All go in `src/components/pages/`. All get routes in `App.tsx`.

### Must-Have (4)
| Page | File | Route | Key Feature |
|------|------|-------|-------------|
| **NotFoundPage** | `NotFoundPage.tsx` | `*` (catch-all) | MeteorShower bg, glass panel, animated 404 |
| **LandingPage** | `LandingPage.tsx` | `/landing` | Assembles ALL marketing blocks, scroll reveal on each section |
| **PricingPage** | `PricingPage.tsx` | `/pricing` | PricingTable + FAQBlock + ComparisonBlock, annual/monthly toggle flip |
| **OnboardingPage** | `OnboardingPage.tsx` | `/onboarding` | FormWizard/Stepper flow, progress tracking |

### Nice-to-Have (2)
| Page | File | Route |
|------|------|-------|
| **ChangelogPage** | `ChangelogPage.tsx` | `/changelog` |
| **BlogPostPage** | `BlogPostPage.tsx` | `/blog/example` |

---

## Phase 5: Missing UI Components (2)

| Component | File | Priority |
|-----------|------|----------|
| **TagInput** | `src/components/ui/TagInput.tsx` | Must-have (common form control) |
| **TreeView** | `src/components/ui/TreeView.tsx` | Nice-to-have (hierarchical nav) |

Note: ContextMenu, NavigationMenu, Menubar, Pagination, Command already exist in the codebase.

---

## Phase 6: DocsPage Updates (`src/App.tsx`)

### Foundations tab additions
- Spacing scale visual (boxes with token values)
- Shadow scale (cards with each shadow level)
- Border radius scale (shapes with each radius)
- Z-index scale (stacked layers demo)
- Animation tokens preview (easing curve visualizer, duration bars)

### Components tab additions
- Add demos for: TagInput, TreeView (once built)
- Wrap all sections in `<ScrollFadeIn>` for alive feel
- Add scroll progress indicator at top

### Blocks tab additions
- Marketing: add Newsletter, Contact, FAQ, Banner demos
- Application: add Changelog, Comparison, Activity Feed demos

### Pages tab additions
- Add cards linking to: NotFoundPage, LandingPage, PricingPage, OnboardingPage, ChangelogPage, BlogPostPage

### Global
- Wrap route transitions in `<PageTransition>`
- Apply `<ScrollFadeIn>` to each docs section

---

## Implementation Strategy: Team of 4

This is ~50 new/modified files. Parallelize with a team:

| Agent | Focus | Files |
|-------|-------|-------|
| **foundation** | Phase 0 + Phase 1 text animations + motion primitives | motion.ts, tailwind.config.js, 18 new components |
| **upgrades** | Phase 2 existing component upgrades + Phase 5 missing UI | ~20 modified files + TagInput, TreeView |
| **blocks** | Phase 3 new blocks + Phase 4 new pages | 10 blocks + 6 pages |
| **docs** | Phase 6 DocsPage updates + route integration | App.tsx, routes |

Dependencies: `foundation` must complete Phase 0 (motion.ts, tailwind keyframes) before others can use the animation utilities. All other phases can run in parallel after that.

---

## Verification

```bash
cd seed-design-system

# Type check
npx tsc -b

# Build
npm run build

# Dev server - manually verify:
# 1. All 7 tabs show new content
# 2. Scroll through Components tab - sections fade in
# 3. Blocks tab shows Marketing (newsletter, contact, FAQ, banner, changelog, comparison)
# 4. Pages tab has cards for all new pages (404, Landing, Pricing, Onboarding)
# 5. Visit /landing - full assembled page with scroll reveals
# 6. Visit /pricing - toggle flips prices, FAQ expands smoothly
# 7. Visit /nonexistent - 404 page with meteor animation
# 8. Tab switching has fade transitions
# 9. Toggle dark/light mode - all new components theme correctly
# 10. Open Chrome DevTools > Rendering > prefers-reduced-motion: reduce - all animations stop
npm run dev

# Run tests
npm run test
```

---

## Estimated Scope

- **New files**: ~35 (18 animation components + 10 blocks + 6 pages + motion.ts)
- **Modified files**: ~25 (existing component upgrades + App.tsx + tailwind.config)
- **New lines**: ~4000-5000
- **No new dependencies** (Motion v12, React Router already installed)
