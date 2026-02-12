---
name: Seed Design System
description: >
  Use when building UI with the Seed Design System, creating Next.js frontends
  with Seed components, styling with Arctic Glow tokens, or composing blocks
  from Seed primitives. Covers tokens, components, glass effects, animations,
  and Next.js integration.
tags: [seed, design-system, arctic-glow, react, tailwind, radix, glassmorphism]
---

# Seed Design System — Agent Skill

React 19 + TypeScript + Tailwind CSS 4 + Radix UI + CVA.
Dual-axis theming: `theme` (light/dark/system) + `style` (arctic/bloom).
Arctic: cool blue-tinted glassmorphism. Bloom: warm light-only organic aesthetic.

---

## 1. Forbidden Patterns

The single most common source of bugs. Memorize this table.

| WRONG (will break)                     | CORRECT                                      | Why                                      |
| -------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| `text-foreground`                      | `text-text-primary`                          | `foreground` is undefined                |
| `text-muted-foreground`               | `text-text-secondary` or `text-text-tertiary`| Use semantic text tokens                 |
| `border-error`                         | `border-destructive`                         | `error` is undefined                     |
| `bg-black/80` (overlays)              | `bg-overlay/80`                              | Use semantic overlay token               |
| `bg-zinc-950`, `bg-slate-900`, etc.   | `bg-background` or `bg-surface`              | Never use Tailwind default colors        |
| `h-screen`                             | `h-dvh`                                      | Mobile viewport bug                      |
| `min-h-screen`                         | `min-h-dvh`                                  | Mobile viewport bug                      |
| `glass-card`                           | `glass-panel`                                | `glass-card` is deleted                  |
| `glass-atmospheric`                    | `glass-overlay`                              | Renamed                                  |
| `<AnimatedIcon icon={Settings} />`     | `<SettingsIcon size={16} />`                 | AnimatedIcon is deleted                  |
| `import { X } from "lucide-react"`    | `import { XIcon } from "@/components/ui/icons"` | Direct lucide-react imports forbidden (integrity test enforces) |
| `import { motion } from "framer-motion"` | `import { motion } from "motion/react"`   | Package renamed                          |
| `#6366f1` / "Electric Indigo"          | `#38BDB8` (dark) / `#1A8F88` (light) teal   | Arctic Glow palette replaced Indigo      |
| `#FB7185` / coral colors               | Use `destructive` or `accent` tokens         | Coral purged from design system          |
| CSS hex in vars: `--color-bg: #0F1114` | `--color-background: 15 17 20`               | CSS vars use space-separated RGB         |
| `ring-offset-background`              | `ring-offset-surface`                        | Use surface for ring offset              |

---

## 2. Semantic Token Quick Reference

### Backgrounds
| Tailwind Class       | Purpose                        |
| -------------------- | ------------------------------ |
| `bg-background`      | Page body                      |
| `bg-surface`         | Card/panel default fill        |
| `bg-surface-hover`   | Interactive surface on hover   |
| `bg-surface-active`  | Interactive surface on press   |
| `bg-surface-raised`  | Elevated surface (dark: gray.5)|
| `bg-muted`           | Subdued background areas       |
| `bg-overlay/80`      | Modal/dialog backdrop          |

### Text
| Tailwind Class        | Purpose                    |
| --------------------- | -------------------------- |
| `text-text-primary`   | Headings, body copy        |
| `text-text-secondary` | Descriptions, meta text    |
| `text-text-tertiary`  | Placeholders, disabled     |
| `text-link`           | Hyperlinks                 |

### Status
| Tailwind Class      | Purpose        |
| ------------------- | -------------- |
| `bg-destructive`    | Error/danger   |
| `bg-success`        | Positive       |
| `bg-warning`        | Caution        |
| `bg-info`           | Informational  |
| `text-destructive`  | Error text     |
| `text-success`      | Success text   |

### Borders
| Tailwind Class         | Purpose                |
| ---------------------- | ---------------------- |
| `border-border`        | Default borders        |
| `border-border-hover`  | Hover state borders    |
| `border-border-subtle` | Very faint separators  |
| `border-destructive`   | Error field borders    |

### Interactive
| Tailwind Class        | Purpose                   |
| --------------------- | ------------------------- |
| `bg-primary`          | Primary buttons (gray.12) |
| `bg-secondary`        | Secondary buttons         |
| `bg-accent`           | Accent actions (teal)     |
| `ring-accent`         | Focus rings               |

### Charts (6 colors)
`chart-1` (teal), `chart-2` (blue), `chart-3` (amber), `chart-4` (green), `chart-5` (violet), `chart-6` (red)

### Sidebar
`sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring`

---

## 3. Golden Component Pattern

Every Seed component follows this structure:

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva("base-classes-here", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
})

export interface MyComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof myComponentVariants> {
  asChild?: boolean
}

const MyComponent = React.forwardRef<HTMLButtonElement, MyComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(myComponentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

**5 rules:**
1. Always `forwardRef` for DOM access
2. Always `cn()` to merge classes (never raw template literals)
3. Use CVA for variants (never conditional class strings)
4. Support `asChild` via `Slot` for polymorphism
5. Export both the component and its variants

---

## 4. Glass Tiers

| Class            | Use For                                  | Key Properties                     |
| ---------------- | ---------------------------------------- | ---------------------------------- |
| `glass-panel`    | Dashboards, cards, data containers       | `bg-surface/30 backdrop-blur-3xl`  |
| `glass-floating` | Elevated elements, hero cards, spotlights| `bg-surface/40 backdrop-blur-[40px]` + heavy shadows |
| `glass-overlay`  | Marketing, popovers, toasts, transient UI| `bg-surface/30 backdrop-blur-md`   |

- Never use `glass-card` or `glass-atmospheric` (deleted)
- Light mode overrides are automatic via CSS
- Prefer `glass-panel` as default; use `glass-floating` only for intentional visual separation

---

## 5. Icon System

```tsx
// ALL icons must use animated wrappers from the icons/ directory
import { SettingsIcon, BellIcon, SearchIcon } from "@/components/ui/icons"

<SettingsIcon size={16} />   // size in px, default 28
<BellIcon size={20} />
```

- Import path: `@/components/ui/icons` (barrel export) or individual files (e.g., `@/components/ui/icons/settings`)
- `size` prop controls width/height in pixels
- Each icon uses `motion/react` with an imperative handle (`startAnimation`/`stopAnimation`) and hover animations
- **NEVER import directly from `lucide-react`** in component files. An integrity test (`no-static-lucide-imports.test.ts`) enforces this. Only the `icons/` directory itself may import from lucide-react SVG paths.
- **Source for new icons**: Get animated icon code from [lucide-animated.com](https://lucide-animated.com), then adapt it to the project pattern (motion/react, imperative handle, size prop). See `sun.tsx` as reference. Export from `index.ts`
- Browse available icons: `ls src/components/ui/icons/` (excluding index.ts)

---

## 6. Animation Essentials

```tsx
// CORRECT import - package is "motion", not "framer-motion"
import { motion } from "motion/react"
import { motionSpring, fadeInUp, blockStagger } from "@/lib/motion"
```

**Spring presets:**
| Name     | Duration | Bounce | Use For              |
| -------- | -------- | ------ | -------------------- |
| `snappy` | 0.2s     | 0      | Micro-interactions   |
| `gentle` | 0.4s     | 0.1    | Page transitions     |
| `bouncy` | 0.5s     | 0.25   | Playful elements     |

**Duration tokens (Tailwind):** `duration-micro` (100ms), `duration-fast` (150ms), `duration-normal` (200ms), `duration-moderate` (250ms), `duration-slow` (300ms)

**Easing (Tailwind):** `ease-out-cubic` (default for enters), `ease-in-out-cubic` (morphing)

**z-index scale:** `z-base(0)` `z-dropdown(50)` `z-sticky(100)` `z-overlay(200)` `z-modal(300)` `z-popover(400)` `z-toast(500)` `z-max(999)`

**Reduced motion:** Handled globally via CSS `prefers-reduced-motion` + `useMotionConfig()` hook.

**Style-aware motion:** Use `useStyleMotion()` hook for style-dependent animation parameters (arctic vs bloom).

---

## 7. Component Categories

Browse actual components: `ls src/components/ui/` for primitives, `ls src/components/blocks/` for blocks, `ls src/components/pages/` for pages.

| Category           | Key Components                                                          |
| ------------------ | ----------------------------------------------------------------------- |
| **Form Controls**  | Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, TagInput, PasswordInput, Combobox, DatePicker, DateRangePicker, InputOTP, NativeSelect, InputGroup, FormWizard, Form, Field |
| **Display**        | Card, Avatar, Badge, Table, DataTable, Skeleton, Progress, Empty, Timeline, Accordion, Tabs, AnimatedTabs, Tooltip, HoverCard, Popover, Alert, AlertDialog, Breadcrumb |
| **Navigation**     | Sidebar, NavigationMenu, Menubar, DropdownMenu, ContextMenu, Pagination, FloatingDock, SearchCommand, Command |
| **Layout**         | Dialog, Drawer, Sheet, AnimatedDialog, AnimatedSheet, Resizable, ScrollArea, Collapsible, BentoGrid, AspectRatio |
| **Effects**        | AmbientGrid, AuroraEffect, MeteorShower, Spotlight, AnimatedBackground, AnimatedBeam, PixelBackground, MouseEffect, MovingBorder, ProgressiveBlur, TiltCard, MagneticElement, InfiniteSlider |
| **Text Effects**   | TextReveal, AnimatedGradientText, PixelReveal, FlipWords, StreamingText, ShimmeringText, CountingNumber, MorphingText, HighlightText, SlidingNumber |
| **Animation**      | ScrollFadeIn, StaggerChildren, StaggeredEntrance, PageTransition        |
| **Charts**         | AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialBarChart, HeatmapChart (+ Chart base) |
| **AI/Voice**       | AgentAvatar, AgentStatus, AudioWaveform, ConversationThread, Avatar3D   |
| **Misc**           | ThemeToggle, StyleToggle, Toaster/Toast/Sonner, Logo, BrandIcons, Kbd, Typography, SkipNav, VisuallyHidden |

**Blocks:** Pre-composed page sections in `src/components/blocks/`. See `references/blocks-catalog.md`.

---

## 8. Theming

Dual-axis system:
- **theme**: `light` | `dark` | `system` (controlled by `ThemeToggle`)
- **style**: `arctic` | `bloom` (controlled by `StyleToggle`)

Bloom forces `resolvedTheme` to `light` (bloom is light-only). CSS vars switch via `:root`, `.dark`, `.bloom` selectors.

```tsx
import { useTheme } from "@/lib/ThemeProvider"
const { theme, style, setTheme, setStyle, resolvedTheme } = useTheme()
```

---

## 9. Integrity Test Suite

The design system has automated gates that run on `npm test`. These catch regressions:

| Test | What It Guards |
| ---- | -------------- |
| `token-integrity` | Dark/light/bloom token parity, 12-step scales, hex format, no undefined values |
| `css-variable-completeness` | Every CSS var in tailwind.config.js defined in both `:root` and `.dark` |
| `contrast` | WCAG contrast ratios for text/background pairs |
| `animation-integrity` | Spring config validity, motion distance/scale/blur ranges |
| `glass-effects` | Glass tier classes exist with light mode overrides |
| `no-hardcoded-values` | No hex colors in Tailwind classes or style objects |
| `no-static-lucide-imports` | No direct `lucide-react` imports outside `icons/` |
| `component-coverage` | Every `ui/*.tsx` has a matching `*.test.tsx` |

**When extending the system, run:** `npm test` to verify all gates pass.

---

## 10. Project Structure

```
src/
  App.tsx                              # Shell: router + DocsPage tab switcher (~175 lines)
  components/
    ui/                                # Core primitives
    ui/icons/                          # Animated icon wrappers (motion/react)
    ui/charts/                         # Chart primitives (recharts)
    ui/text-effects/                   # Text animation components
    blocks/                            # Composed page sections (*Block.tsx)
    pages/                             # Full page compositions
    pages/showcase/                    # Tab content for the dev showcase
    layout/                            # Grid, GridSystem
  lib/
    tokens.config.js                   # Master token definitions
    utils.ts                           # cn() helper
    ThemeProvider.tsx                   # Dual-axis theme context
    motion.ts                          # Spring presets, motion variants
    animation.tokens.ts                # Easing curves, duration scale
  tokens.ts                            # TypeScript re-export
```

---

## 11. Next.js Integration Essentials

### Setup Checklist
1. Copy core files: `lib/utils.ts`, `lib/tokens.config.js`, `lib/ThemeProvider.tsx`, `lib/motion.ts`, `lib/animation.tokens.ts`, `tokens.ts`
2. Copy `index.css` content into `globals.css` (CSS vars + glass classes)
3. Install deps: `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`, `motion`, `lucide-react`
4. Configure `postcss.config.js` with `@tailwindcss/postcss`
5. Set up `tailwind.config.js` with token extensions
6. Add `@/*` path alias in `tsconfig.json`

### Root Layout
```tsx
// app/layout.tsx (SERVER component)
import localFont from "next/font/local"
import { ThemeProvider } from "@/lib/ThemeProvider"
import "./globals.css"

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased min-h-dvh font-sans">
        <ThemeProvider defaultTheme="system" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Server vs Client Decision Tree
- Has hooks/state/effects? -> `"use client"`
- Has event handlers (onClick, onChange)? -> `"use client"`
- Uses `motion/react` animations? -> `"use client"`
- Renders Radix primitives? -> `"use client"` (they use context)
- Pure presentational markup? -> Keep as server component
- Layout/page wrapper? -> Server component, wrap interactive children

### Hydration Gotchas
- `suppressHydrationWarning` on `<html>` for theme class
- ThemeProvider handles localStorage SSR guard internally
- Use `dynamic(() => import(...), { ssr: false })` for heavy client-only components (charts, carousels)

---

## 12. Naming & Testing Conventions

- Components: `PascalCase.tsx` in `components/ui/` or `components/blocks/`
- Blocks use `*Block.tsx` suffix (e.g., `LoginBlock.tsx`)
- Tests co-located as `ComponentName.test.tsx`
- Test framework: Vitest + @testing-library/react
- BDD-style: `describe("Button")` / `it("should render primary variant")`
- Import `cn` from `@/lib/utils`, never re-implement merge logic
- Every new UI component MUST have a colocated test (coverage gate enforces this)

---

## 13. Reference Index

| File                              | Contents                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| `references/tokens-and-colors.md` | Full 12-step Radix scales, semantic token map, CSS var format|
| `references/component-inventory.md`| UI components with variants and Radix primitives            |
| `references/component-patterns.md`| 4 real code patterns: Button, Input, Dialog, LoginBlock     |
| `references/animation-system.md`  | Springs, easings, durations, stagger, reduced motion        |
| `references/nextjs-integration.md`| Vendoring guide, App Router setup, SSR boundaries           |
| `references/glass-and-effects.md` | Glass tiers CSS, decorative components, text effects        |
| `references/blocks-catalog.md`    | Blocks by domain with import paths                          |
| `references/icons-catalog.md`     | Animated icon usage patterns and conventions                |
