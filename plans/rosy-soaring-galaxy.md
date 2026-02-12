# Plan: Bloom Style Variant, Grid System, Animation Overhaul, and Design System Integrity Testing

## Context

The design system embodies one aesthetic: **Arctic Glow** -- cold, precise, dark glassmorphism built for tech. Beautiful but one-dimensional. Real products need emotional range. A dashboard for devs can be Arctic. An onboarding flow, a consumer product, a creative tool -- these need warmth, joy, humanity.

The animations exist but are invisible. Springs have `bounce: 0`, distances are 16-20px, scales start at 0.95. The human eye barely registers these.

The grid is basic CSS Grid. Geist's grid is both layout AND visual alignment guide -- it creates the rhythmic precision that makes Vercel's interfaces feel intentional.

**Critical gap**: The current test suite (90+ files) tests component behavior but has ZERO design system integrity testing. No token completeness checks, no contrast ratio validation, no hardcoded value detection, no hookify enforcement. Every design system change is a manual trust exercise. We build the enforcement layer FIRST so every subsequent change is automatically validated.

### Decisions
- **Bloom is light-only** (no bloom-dark). Warmth and light are inseparable. Simpler, naturally cohesive.
- **Upgrade primitives only** for animations. Blocks auto-inherit bolder motion through shared primitives.
- **Grid guides are dual-purpose**: `showGuides` prop for dev-time alignment (column highlighting), plus existing `AmbientGrid` stays as decorative pattern. Same rhythm, two tools.
- **Enforcement first**: Build integrity tests before any design changes. Tests catch regressions automatically.

---

## Phase 0: Design System Integrity Testing & Enforcement

This phase creates the automated safety net. Every test in this phase will catch regressions from Phases 1-3 without manual verification.

### 0a. Token Schema Integrity Tests

**New file:** `src/test/token-integrity.test.ts`

Tests that token structures are complete and consistent across all variants:

```typescript
// 1. Semantic token parity
//    Every key in colorTokens.dark must exist in colorTokens.light (and bloom when added)
//    Recursively compares object shapes (not values)
//    e.g., if dark has surface.hover, light must also have surface.hover

// 2. Color scale completeness
//    Every scale in colorScales must have exactly steps 1-12
//    No step can be undefined or empty string

// 3. Style token parity
//    styleTokens.arctic and styleTokens.bloom must have identical top-level keys
//    (radius, shadows, etc.)

// 4. No undefined values
//    Recursively walk all token objects, assert no value is undefined/null/""

// 5. Hex format validation
//    All hex colors match /^#[0-9a-fA-F]{6}$/ or valid rgba() pattern
```

**Reuses:** `colorScales`, `colorTokens`, `styleTokens` from `src/lib/tokens.config.js`

### 0b. CSS Variable Completeness Tests

**New file:** `src/test/css-variable-completeness.test.ts`

Tests that every CSS variable referenced by Tailwind is defined in ALL theme/style selectors:

```typescript
// 1. Read src/index.css as string
// 2. Parse CSS variable definitions per selector:
//    - :root (arctic-light)
//    - .dark (arctic-dark)
//    - .bloom (bloom-light) [after Phase 1]
// 3. Extract all var(--color-*) references from tailwind.config.js
// 4. Assert: every referenced variable is defined in EVERY selector
// 5. Assert: radius variables (--radius-sm, --radius-md, --radius-lg) are defined per style

// Helper: parseCssVarDefinitions(css: string, selector: string) => Set<string>
// Helper: extractTailwindVarReferences(config: object) => Set<string>
```

**Reuses:** Raw file reads of `src/index.css` and `tailwind.config.js`

### 0c. WCAG Contrast Ratio Tests

**New file:** `src/test/contrast.test.ts`

Automated accessibility validation for all foreground/background color pairs:

```typescript
// Utility functions (no external deps):
// hexToRgb(hex: string): { r: number, g: number, b: number }
// relativeLuminance(r: number, g: number, b: number): number
// contrastRatio(fg: string, bg: string): number

// Test pairs for each theme variant (dark, light, bloom):
const CONTRAST_PAIRS = [
  { fg: 'text.primary',       bg: 'background',       minRatio: 4.5, label: 'body text' },
  { fg: 'text.primary',       bg: 'surface.DEFAULT',   minRatio: 4.5, label: 'text on surface' },
  { fg: 'text.secondary',     bg: 'background',       minRatio: 4.5, label: 'secondary text' },
  { fg: 'text.tertiary',      bg: 'background',       minRatio: 3.0, label: 'tertiary (large)' },
  { fg: 'accent.foreground',  bg: 'accent.DEFAULT',    minRatio: 4.5, label: 'accent button' },
  { fg: 'destructive.foreground', bg: 'destructive.DEFAULT', minRatio: 4.5, label: 'destructive' },
  { fg: 'success.foreground', bg: 'success.DEFAULT',   minRatio: 4.5, label: 'success' },
  { fg: 'warning.foreground', bg: 'warning.DEFAULT',   minRatio: 3.0, label: 'warning' },
  { fg: 'primary.foreground', bg: 'primary.DEFAULT',   minRatio: 4.5, label: 'primary button' },
  { fg: 'text.primary',       bg: 'muted.DEFAULT',     minRatio: 4.5, label: 'text on muted' },
];

// For each variant: resolve hex values from colorTokens, compute ratio, assert >= min
// Output on failure: "WCAG AA FAIL: text.primary (#E1E7ED) on background (#0F1114) = 12.3:1 OK"
//                    "WCAG AA FAIL: warning.foreground (#16120B) on warning (#F5C742) = 2.8:1 < 3.0"
```

**Reuses:** `colorTokens` from `src/lib/tokens.config.js`

### 0d. Animation Coherence Tests

**New file:** `src/test/animation-integrity.test.ts`

Tests that animation presets are physically reasonable and structurally complete:

```typescript
// 1. Spring validity
//    For every spring in spring{} and springBloom{}:
//    - stiffness > 0 and <= 1000
//    - damping > 0 and <= 100
//    - mass > 0 and <= 5
//    - type === 'spring'

// 2. Style parity
//    Every key in motionDistance.arctic exists in motionDistance.bloom (and vice versa)
//    Same for motionScale, motionBlur

// 3. Distance bounds
//    All distance values: > 0 and <= 200 (px)

// 4. Scale bounds
//    All scale values: > 0 and < 1 (starting scale must be less than final 1.0)

// 5. Blur bounds
//    All blur values: >= 0 and <= 50 (px)

// 6. Variant objects reference defined springs
//    fadeInUp, scaleIn, etc. must use springs from the exported presets
```

**Reuses:** `spring`, `springBloom`, `motionDistance`, `motionScale`, `motionBlur` from `src/lib/animation.tokens.ts`

### 0e. Glass Effect Completeness Tests

**New file:** `src/test/glass-effects.test.ts`

Tests that glass classes are defined for all style/theme variants:

```typescript
// 1. Read src/index.css as string
// 2. Assert these selectors exist:
//    Arctic: .glass-panel, .glass-floating, .glass-overlay
//    Arctic light: :root[class~="light"] .glass-panel, etc.
//    Bloom: .bloom .glass-panel, .bloom .glass-floating, .bloom .glass-overlay [after Phase 1]
// 3. Each glass class must have backdrop-blur defined
// 4. Each glass class must have box-shadow defined
// 5. Each glass class must have border defined
```

### 0f. Hardcoded Value Detection Tests

**New file:** `src/test/no-hardcoded-values.test.ts`

Scans component files for design system violations:

```typescript
// 1. Glob all src/components/**/*.tsx files
// 2. Read each file as string
// 3. Assert NO hardcoded hex colors (#XXXXXX or #XXX) in:
//    - className strings
//    - style objects
//    - Tailwind classes (bg-[#...], text-[#...], border-[#...])
//    EXCEPTIONS: test files, tokens.config.js, index.css, tailwind.config.js
// 4. Assert NO hardcoded rgba() in className/style
//    EXCEPTIONS: same as above
// 5. Assert NO hardcoded pixel values for spacing in Tailwind arbitrary values
//    (e.g., p-[13px] -- should use token-aligned values)
//    EXCEPTIONS: specific patterns like blur-[40px] in glass effects

// Pattern: /(?:bg|text|border|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/
// Pattern: /#[0-9a-fA-F]{6}(?=[^0-9a-fA-F]|$)/ (in style={{ color: '#...' }})
```

### 0g. Component Test Coverage Gate

**New file:** `src/test/component-coverage.test.ts`

Ensures every component has a colocated test:

```typescript
// 1. Glob all src/components/ui/*.tsx (excluding *.test.tsx, index.tsx)
// 2. For each component file, assert a corresponding *.test.tsx exists
// 3. Report missing tests as failures with helpful message
```

### 0h. Hookify Rules for AI Development Enforcement

**Configure via:** hookify skill

Rules to create:

| Rule | Trigger | What it prevents |
|------|---------|-----------------|
| `no-hardcoded-colors` | Before writing .tsx component files | Inserting hex colors or rgba() in components |
| `require-token-import` | Before writing animation code | Using magic number spring/distance values instead of token imports |
| `require-test-file` | After creating new component | Creating component without corresponding test |
| `no-inline-styles` | Before writing .tsx files | Using `style={{}}` instead of Tailwind classes |

### 0i. Interface-craft Design Critique Integration

After completing Phases 1-3, run the interface-craft Design Critique skill against:
- The Component Lab page in Arctic dark mode
- The Component Lab page in Bloom mode
- A representative block (HeroBlock) in both styles

This is a manual step triggered by invoking the interface-craft skill, not automated. But the critique checklist (5-step: first impressions, visual design, interface design, consistency, user context) serves as the final quality gate.

### 0j. Test Utilities Module

**New file:** `src/test/design-system-utils.ts`

Shared utilities for all integrity tests:

```typescript
// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number };
export function relativeLuminance(r: number, g: number, b: number): number;
export function contrastRatio(fg: string, bg: string): number;

// Token utilities
export function getNestedKeys(obj: object, prefix?: string): string[];
export function getNestedValue(obj: object, path: string): unknown;

// CSS parsing utilities
export function parseCssVarDefinitions(css: string, selector: string): Set<string>;
export function extractTailwindVarReferences(config: object): Set<string>;

// File scanning utilities
export function readComponentFiles(): { path: string; content: string }[];
```

---

## Phase 1: Bloom Style Infrastructure

### 1a. Extend ThemeProvider with `style` dimension

**File:** `src/lib/ThemeProvider.tsx`

Add a `style` axis orthogonal to `theme`:

```typescript
type Style = 'arctic' | 'bloom';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  style: Style;
  setTheme: (theme: Theme) => void;
  setStyle: (style: Style) => void;
}
```

- New state: `style` with localStorage key `design-system-style`, default `'arctic'`
- When `style === 'bloom'`, add `.bloom` class on `document.documentElement`
- When `style === 'bloom'`, force `resolvedTheme` to `'light'` (bloom is light-only)
- Remove `.bloom` class when switching back to arctic
- CSS selectors: `:root` / `.dark` (arctic), `.bloom` (bloom-light only)

### 1b. Bloom color scales

**File:** `src/lib/tokens.config.js` -- add `colorScales.bloom` object

12-step Radix-style scales (light-only):

| Scale | Purpose | Hero (step 9) | Feel |
|-------|---------|---------------|------|
| **sand** | Warm neutral (replaces gray) | `#887968` | Parchment, linen, earth |
| **coral** | Primary accent | `#E8573A` | Energy, warmth, welcome |
| **lavender** | Secondary accent | `#8B5CF6` | Creativity, softness, play |
| **mint** | Success | `#3DD6A0` | Growth, freshness |
| **peach** | Warning | `#F5A623` | Gentle caution |
| **rose** | Destructive | `#E8566D` | Softer than Arctic red |
| **sky** | Info | `#5AB4F5` | Open, calm |

Full sand scale (light):
```
1: #FEFDFB  2: #FBF9F6  3: #F5F1EC  4: #EDE8E1
5: #E4DED5  6: #D9D1C7  7: #C4B9AC  8: #A89B8C
9: #887968  10: #72624F  11: #574938  12: #2D2318
```

Bloom semantic tokens:

| Token | Value | Source |
|-------|-------|--------|
| background | `#FEFDFB` | sand.1 (warm white) |
| surface.DEFAULT | `#FBF9F6` | sand.2 (cream) |
| surface.hover | `#F5F1EC` | sand.3 |
| surface.active | `#EDE8E1` | sand.4 |
| border.DEFAULT | `#D9D1C7` | sand.6 |
| accent | `#E8573A` | coral.9 |
| focusRing | `#8B5CF6` | lavender.9 |
| overlay | `#2D2318` | warm ink (not pure black) |
| text.primary | `#2D2318` | sand.12 (warm ink) |
| text.secondary | `#574938` | sand.11 |
| text.tertiary | `#887968` | sand.9 |
| link | `#6338C4` | lavender.11 |

### 1c. Style-dependent non-color tokens

**File:** `src/lib/tokens.config.js` -- add `styleTokens` export

| Property | Arctic | Bloom |
|----------|--------|-------|
| radius.sm | 4px | 8px |
| radius.md | 8px | 14px |
| radius.lg | 16px | 24px |
| shadow.glow | cold white glow | warm coral glow |
| shadow.glow-accent | teal glow | lavender glow |
| shadow.soft | -- | `0 2px 12px -2px rgba(45,35,24,0.08)` |
| shadow.lifted | -- | `0 8px 30px -8px rgba(45,35,24,0.12)` |

Driven by CSS custom properties:
```css
:root { --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; }
.bloom { --radius-sm: 8px; --radius-md: 14px; --radius-lg: 24px; }
```

### 1d. CSS variable blocks for Bloom

**File:** `src/index.css`

Add `.bloom { ... }` variable block with all semantic color vars mapped to the bloom palette. Single block (no `.bloom.dark` needed).

### 1e. Bloom glass effects

**File:** `src/index.css` -- add `.bloom .glass-panel`, `.bloom .glass-floating`, `.bloom .glass-overlay`

Key differences from Arctic glass:

| Property | Arctic | Bloom |
|----------|--------|-------|
| Background tint | `rgba(255,255,255,...)` | `rgba(255,248,240,...)` warm cream |
| Shadow color | `rgba(0,0,0,...)` | `rgba(45,35,24,...)` warm brown |
| Border tint | `white/10` | `warm-white/20` |
| Inset highlight | cool white | warm cream |
| Hover float | `translateY(-4px) scale(1.005)` | `translateY(-6px) scale(1.01) rotate(0.3deg)` |

### 1f. Tailwind config

**File:** `tailwind.config.js`

- `borderRadius` values reference CSS variables (`var(--radius-sm)`, etc.)
- Add bloom shadow tokens to `boxShadow` extend
- No other structural changes (semantic color vars already switch via CSS)

### 1g. TypeScript types

**File:** `src/tokens.ts` -- add `Style` type, bloom scale interfaces, `styleTokens` re-export

### 1h. StyleToggle component

**New file:** `src/components/ui/StyleToggle.tsx`

Pill toggle with two options:
- Snowflake icon -> Arctic
- Flower/Sun icon -> Bloom
- Uses `useTheme().setStyle`

### 1i. Update ThemeToggle

**File:** `src/components/ui/ThemeToggle.tsx`

When style is `bloom`, disable the dark/system theme options (bloom is light-only). Show a visual indicator of the active style.

---

## Phase 2: Animation Overhaul

### Why animations are invisible today

| What | Current | Problem |
|------|---------|---------|
| `spring.snappy` | `duration: 0.2, bounce: 0` | No overshoot, 200ms = imperceptible |
| `spring.gentle` | `duration: 0.4, bounce: 0.1` | Barely any bounce |
| `fadeInUp` | `y: 20` | 20px ~ 1 line of text |
| `scaleIn` | `scale: 0.95` | 5% is invisible |
| `PageTransition` slide | `y: 8` | 8 pixels. Eight. |
| `blockStagger.child` | `y: 16` | Still subtle |

### 2a. Spring preset overhaul

**File:** `src/lib/animation.tokens.ts`

Replace duration-based springs with stiffness/damping (more physical, visible overshoot):

```typescript
export const spring = {
  snappy:   { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 },
  gentle:   { type: 'spring', stiffness: 200, damping: 20, mass: 1 },
  bouncy:   { type: 'spring', stiffness: 300, damping: 14, mass: 0.8 },
  dramatic: { type: 'spring', stiffness: 500, damping: 24, mass: 1.2 },  // NEW
} as const;

export const springBloom = {
  snappy:   { type: 'spring', stiffness: 300, damping: 16, mass: 0.6 },
  gentle:   { type: 'spring', stiffness: 150, damping: 12, mass: 0.8 },
  bouncy:   { type: 'spring', stiffness: 200, damping: 8, mass: 0.5 },
  dramatic: { type: 'spring', stiffness: 250, damping: 8, mass: 0.6 },
  wobbly:   { type: 'spring', stiffness: 180, damping: 6, mass: 0.4 },  // bloom-exclusive
} as const;
```

Add style-aware distance/scale/blur presets:

```typescript
export const motionDistance = {
  arctic: { sm: 16, md: 32, lg: 56 },
  bloom:  { sm: 20, md: 40, lg: 72 },
} as const;

export const motionScale = {
  arctic: { subtle: 0.90, normal: 0.80 },
  bloom:  { subtle: 0.85, normal: 0.70 },
} as const;

export const motionBlur = {
  arctic: { subtle: 4, normal: 8 },
  bloom:  { subtle: 6, normal: 12 },
} as const;
```

### 2b. Style-aware motion hook

**File:** `src/lib/motion.ts`

```typescript
export function useStyleMotion() {
  const { style } = useTheme();
  return {
    spring: style === 'bloom' ? springBloom : springPresets,
    distance: motionDistance[style],
    scale: motionScale[style],
    blur: motionBlur[style],
  };
}
```

Update existing variant objects to bolder defaults:
- `fadeInUp`: `y: 32`, add `filter: 'blur(4px)'`
- `fadeInDown`: `y: -32`, add blur
- `scaleIn`: `scale: 0.85`, add `filter: 'blur(6px)'`
- `blockStagger.child`: `y: 24`
- `heroStagger.child`: `y: 36`

### 2c. Update existing animation components

| Component | Change |
|-----------|--------|
| `StaggerChildren` (`src/components/ui/StaggerChildren.tsx`) | Use `useStyleMotion()` for distance + spring. Default distance becomes `motionDistance[style].md` |
| `PageTransition` (`src/components/ui/PageTransition.tsx`) | slide: `y: 32` + blur (was 8). scale: `0.90` + blur (was 0.98) |
| `AnimatedDialog` (`src/components/ui/AnimatedDialog.tsx`) | `scale: 0.85` + `blur(8px)` (was 0.95, no blur) |
| `ScrollFadeIn` (`src/components/ui/ScrollFadeIn.tsx`) | Use `useStyleMotion()` for distance + spring |

### 2d. Tailwind keyframe updates

**File:** `tailwind.config.js`

Make CSS keyframes more dramatic:
- `fade-in-up`: `translateY(32px)` + `blur(4px)` (was `translateY(8px)`, no blur)
- `scale-in`: `scale(0.85)` (was 0.95)
- Add `bounce-in`: 0% scale(0.3) -> 50% scale(1.08) -> 100% scale(1)
- Add `wobble`: rotation oscillation 3deg -> -2deg -> 1deg -> 0
- Add `draw-check`: SVG stroke-dashoffset animation

### 2e. New delight components

**`src/components/ui/SuccessCheck.tsx`** (NEW)
Animated SVG checkmark: arc draws itself with spring overshoot, optional confetti burst on completion. Colors adapt to current style.

**`src/components/ui/ConfettiBurst.tsx`** (NEW)
Particle spray using motion. N small elements spray outward with spring physics. Arctic: teal/gray particles. Bloom: coral/lavender/mint particles.

**`src/components/ui/SpringHover.tsx`** (NEW)
Wrapper component for spring-based hover/press:
- Hover: `scale(1.03)` with overshoot spring; bloom adds subtle `rotate(0.5deg)`
- Press: `scale(0.95)` with bounce-back
- Uses `motion.div` wrapping children

### 2f. DialKit animation tuning

**New file:** `src/lib/animation-dials.ts`

Centralized DialKit configs for major animations. Components opt in with `useDialKit("ComponentName", ANIMATION_DIALS.fadeInUp)` for live tuning during development.

---

## Phase 3: Geist-Inspired Grid System

### 3a. Three-tier grid component

**New file:** `src/components/layout/GridSystem.tsx`

```
GridSystem                    -- container: max-width, columns, gutter, margin
  GridSystem.Grid             -- row: alignment, gap override
    GridSystem.Cell           -- unit: responsive span, offset
```

Implementation:
- CSS Grid with `grid-template-columns: repeat(var(--grid-cols), 1fr)`
- React context passes grid config from GridSystem to children
- Responsive breakpoints via CSS custom properties + media query classes

Default config:
```
columns: { xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }
gutter:  { xs: 16, sm: 20, md: 24, lg: 32, xl: 32 }
margin:  { xs: 16, sm: 24, md: 32, lg: 48, xl: auto }
maxWidth: 1280
```

### 3b. Dev-time guide overlay

`showGuides` prop renders semi-transparent column indicators (absolute-positioned divs matching the grid's actual column structure). Like Figma's layout grid -- visible during development, off in production.

The existing `AmbientGrid` component stays as-is for decorative use. Both share the same underlying rhythm through the token system's spacing base.

### 3c. Style-aware spacing

Bloom uses more generous gutters:
```css
.bloom { --grid-gutter-scale: 1.15; }
```

Applied via `calc(var(--grid-gutter) * var(--grid-gutter-scale, 1))`.

### 3d. Tests

**New file:** `src/components/layout/GridSystem.test.tsx`

- Default column rendering
- Cell spanning at different breakpoints
- Offset behavior
- showGuides toggle
- Responsive config

### 3e. Backward compatibility

Existing `Grid` component stays untouched. `GridSystem` is purely additive.

---

## Implementation Sequence

```
Phase 0 (Enforcement -- MUST go first, safety net for everything after):
  0j  Test utilities module (shared helpers for all integrity tests)
  0a  Token schema integrity tests
  0b  CSS variable completeness tests
  0c  WCAG contrast ratio tests
  0d  Animation coherence tests
  0e  Glass effect completeness tests
  0f  Hardcoded value detection tests
  0g  Component test coverage gate
  0h  Hookify rules for AI enforcement
  >>> Run: npm run test -- verify ALL pass against current state before any changes

Phase 1 (Bloom -- depends on Phase 0 passing):
  1a  ThemeProvider style axis
  1b  Bloom color scales in tokens.config.js
  1c  Style-dependent non-color tokens (radius, shadows)
  1d  CSS variable block for .bloom in index.css
  1e  Bloom glass effects in index.css
  1f  Tailwind config (CSS var radius, bloom shadows)
  1g  TypeScript types in tokens.ts
  1h  StyleToggle component
  1i  ThemeToggle update
  >>> Run: npm run test -- integrity tests auto-validate bloom completeness

Phase 2 (Animations -- depends on 1a for useStyleMotion):
  2a  Spring preset overhaul in animation.tokens.ts
  2b  useStyleMotion hook in motion.ts + bolder variant defaults
  2c  Update StaggerChildren, PageTransition, AnimatedDialog, ScrollFadeIn
  2d  Tailwind keyframe updates
  2e  SuccessCheck, ConfettiBurst, SpringHover components
  2f  DialKit animation registry
  >>> Run: npm run test -- animation coherence tests validate new presets

Phase 3 (Grid -- independent, can parallel with Phase 2):
  3a  GridSystem component
  3b  Visual guide overlay
  3c  Style-aware spacing
  3d  Tests
  >>> Run: npm run test -- component coverage gate validates test exists

Phase 4 (Design Critique -- manual, after all code changes):
  Run interface-craft Design Critique on Arctic dark, Bloom, and HeroBlock
```

---

## Verification

After each phase, run `npm run test`. The integrity tests catch regressions automatically:

| Phase | What the integrity tests auto-validate |
|-------|----------------------------------------|
| Phase 0 | Baseline: all tests pass against current codebase |
| Phase 1 | Token parity (bloom has all semantic keys), CSS var completeness (.bloom vars defined), contrast (bloom pairs pass WCAG AA), glass effects (.bloom variants exist), hardcoded values (new code uses tokens) |
| Phase 2 | Animation coherence (new springs have valid stiffness/damping/mass bounds), style parity (arctic/bloom distance/scale/blur keys match), no hardcoded values in new components |
| Phase 3 | Component coverage (GridSystem.test.tsx exists), no hardcoded values |

Full verification after all phases:
1. `npm run test` -- all 90+ existing tests + 8 new integrity tests pass
2. `npx tsc -b` -- no type errors
3. `npm run build` -- clean production build
4. `npm run dev` -- visual verification:
   - Toggle Arctic/Bloom: colors, radii, shadows, glass switch
   - Bloom forces light mode (dark toggle disabled)
   - Entrances are obvious (32px travel, visible blur, spring overshoot)
   - Bloom warmth: cream backgrounds, coral accents, rounded corners
   - GridSystem `showGuides` -- column lines align
5. Interface-craft Design Critique on final output

---

## Files Summary

### Modified (13 files)
- `src/tokens.test.ts` -- REPLACED: becomes comprehensive schema integrity (merged into 0a)
- `src/lib/tokens.config.js` -- bloom color scales, styleTokens
- `src/lib/ThemeProvider.tsx` -- style axis (arctic/bloom)
- `src/lib/animation.tokens.ts` -- stiffness/damping springs, style-aware presets
- `src/lib/motion.ts` -- useStyleMotion hook, bolder variant defaults
- `src/tokens.ts` -- Style type, bloom interfaces
- `src/index.css` -- .bloom CSS vars, bloom glass effects
- `tailwind.config.js` -- CSS var radius, bloom shadows, dramatic keyframes
- `src/components/ui/ThemeToggle.tsx` -- bloom-aware (disable dark in bloom)
- `src/components/ui/StaggerChildren.tsx` -- useStyleMotion
- `src/components/ui/PageTransition.tsx` -- bolder transitions
- `src/components/ui/AnimatedDialog.tsx` -- bolder entrance
- `src/components/ui/ScrollFadeIn.tsx` -- useStyleMotion

### Created (15 files)

**Integrity tests (Phase 0 -- 8 files):**
- `src/test/design-system-utils.ts` -- shared utilities (hex-to-rgb, contrast ratio, CSS parsing)
- `src/test/token-integrity.test.ts` -- token schema parity, scale completeness, no undefined
- `src/test/css-variable-completeness.test.ts` -- every CSS var defined for all selectors
- `src/test/contrast.test.ts` -- WCAG AA for all fg/bg pairs per variant
- `src/test/animation-integrity.test.ts` -- spring bounds, style parity, distance/scale/blur valid
- `src/test/glass-effects.test.ts` -- glass classes exist for all style variants
- `src/test/no-hardcoded-values.test.ts` -- no hex/rgba in component files
- `src/test/component-coverage.test.ts` -- every component has a colocated test

**Feature files (Phases 1-3 -- 7 files):**
- `src/components/ui/StyleToggle.tsx` -- arctic/bloom toggle
- `src/components/ui/SuccessCheck.tsx` -- animated checkmark + confetti
- `src/components/ui/ConfettiBurst.tsx` -- particle burst
- `src/components/ui/SpringHover.tsx` -- spring hover/press wrapper
- `src/lib/animation-dials.ts` -- DialKit animation configs
- `src/components/layout/GridSystem.tsx` -- three-tier grid
- `src/components/layout/GridSystem.test.tsx` -- grid tests
