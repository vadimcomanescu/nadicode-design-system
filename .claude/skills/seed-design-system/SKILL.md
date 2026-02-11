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
"Arctic Glow" aesthetic: cool blue-tinted dark glassmorphism with teal accents.

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
// Animated icons (73 available) - SVG path animations on hover
import { SettingsIcon, BellIcon, SearchIcon } from "@/components/ui/icons"

<SettingsIcon size={16} />   // size in px, default 28
<BellIcon size={20} />

// For icons without animated version, use lucide-react directly
import { SomeOtherIcon } from "lucide-react"
```

- Import path: `@/components/ui/icons` (barrel export)
- `size` prop controls width/height in pixels
- 73 animated icons available (see `references/icons-catalog.md`)
- Icons NOT in the animated set: fall back to plain `lucide-react`

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

---

## 7. Component Categories

| Category           | Count | Key Components                                                          |
| ------------------ | ----- | ----------------------------------------------------------------------- |
| **Form Controls**  | ~20   | Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, TagInput, PasswordInput, Combobox, DatePicker, DateRangePicker, InputOTP, NativeSelect, InputGroup, FormWizard, Form, Field |
| **Display**        | ~20   | Card, Avatar, Badge, Table, DataTable, Skeleton, Progress, Empty, Timeline, Accordion, Tabs, AnimatedTabs, Tooltip, HoverCard, Popover, Alert, AlertDialog, Breadcrumb |
| **Navigation**     | ~10   | Sidebar, NavigationMenu, Menubar, DropdownMenu, ContextMenu, Pagination, FloatingDock, SearchCommand, Command |
| **Layout**         | ~10   | Dialog, Drawer, Sheet, AnimatedDialog, AnimatedSheet, Resizable, ScrollArea, Collapsible, BentoGrid, AspectRatio |
| **Effects**        | ~15   | AmbientGrid, AuroraEffect, MeteorShower, Spotlight, AnimatedBackground, AnimatedBeam, PixelBackground, MouseEffect, MovingBorder, ProgressiveBlur, TiltCard, MagneticElement, InfiniteSlider |
| **Text Effects**   | 10    | TextReveal, AnimatedGradientText, PixelReveal, FlipWords, StreamingText, ShimmeringText, CountingNumber, MorphingText, HighlightText, SlidingNumber |
| **Animation**      | ~5    | ScrollFadeIn, StaggerChildren, StaggeredEntrance, PageTransition        |
| **Charts**         | 7     | AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialBarChart, HeatmapChart (+ Chart base) |
| **AI/Voice**       | ~5    | AgentAvatar, AgentStatus, AudioWaveform, ConversationThread, Avatar3D   |
| **Misc**           | ~10   | ThemeToggle, Toaster/Toast/Sonner, Logo, BrandIcons, Kbd, Typography, SkipNav, VisuallyHidden, StatusDot, RoleBadge |

**Blocks:** 54 pre-composed page sections. See `references/blocks-catalog.md`.

---

## 8. Next.js Integration Essentials

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
import { ThemeProvider } from "@/lib/ThemeProvider"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-dvh">
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

## 9. Naming & Testing Conventions

- Components: `PascalCase.tsx` in `components/ui/` or `components/blocks/`
- Blocks use `*Block.tsx` suffix (e.g., `LoginBlock.tsx`)
- Tests co-located as `ComponentName.test.tsx`
- Test framework: Vitest + @testing-library/react
- BDD-style: `describe("Button")` / `it("should render primary variant")`
- Import `cn` from `@/lib/utils`, never re-implement merge logic

---

## 10. Reference Index

| File                              | Contents                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| `references/tokens-and-colors.md` | Full 12-step Radix scales, semantic token map, CSS var format|
| `references/component-inventory.md`| All 109+ UI components with variants and Radix primitives   |
| `references/component-patterns.md`| 4 real code patterns: Button, Input, Dialog, LoginBlock     |
| `references/animation-system.md`  | Springs, easings, durations, stagger, reduced motion        |
| `references/nextjs-integration.md`| Vendoring guide, App Router setup, SSR boundaries           |
| `references/glass-and-effects.md` | Glass tiers CSS, decorative components, text effects        |
| `references/blocks-catalog.md`    | All 54 blocks by domain with import paths                   |
| `references/icons-catalog.md`     | 73 animated icons + lucide fallback convention              |
