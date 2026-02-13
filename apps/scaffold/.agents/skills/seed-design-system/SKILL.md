---
name: Seed Design System
description: >
  Use when building UI with the Seed Design System, creating Next.js frontends
  with Seed components, styling with Arctic Glow tokens, or composing blocks
  from Seed primitives. Covers tokens, components, glass effects, animations,
  dual-axis theming, and Next.js App Router integration.
tags: [seed, design-system, arctic-glow, react, tailwind, radix, glassmorphism]
---

# Seed Design System -- Agent Skill

React 19 + TypeScript + Tailwind CSS 4 + Radix UI + CVA.
Dual-axis theming: `theme` (light/dark/system) + `style` (arctic/bloom).
Arctic: cool teal-tinted glassmorphism. Bloom: warm light-only organic aesthetic.
Next.js App Router with file-based routing. Dev server defaults to `localhost:5001` in this repo.

When this design system is vendored into another repository, read in this order:
1. `docs/nadicode/NADICODE_CONTRACT.md` (binary rules)
2. `docs/nadicode/factory/page-intent-catalog.json` (intent -> recipe contract)
3. matching `docs/nadicode/recipes/*.md` page recipe(s)
4. this skill file (`.agents/skills/seed-design-system/SKILL.md`)

If `scope-definition.json` is available, generate deterministic tasks before coding:
`npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md`

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
| `text-[10px]`, `text-[11px]` in admin UI | `Typography` variants or `text-xs/text-sm` scale | Enforce consistent admin typography   |
| ad-hoc `chat-*` classes               | Compose Nadicode primitives + motion tokens  | Avoid one-off chat styling islands       |
| local admin chat primitives (`./MessageList`, `./ToolProgress`, etc.) | Nadicode agentic primitives from `@/components/ui/*` | Prevent bespoke chat stacks |
| flat admin sidebar menu without `SidebarGroupLabel` | Add `SidebarGroupLabel` group headings | Enforce modern information architecture |
| manual admin chart bars (`<div style={{ width: ... }}>`) | `AreaChart` / `BarChart` / `LineChart` / `PieChart` + `ChartContainer` | Prevent pseudo-charts and inconsistent behavior |
| `pixelTheme=` in admin cards          | Use default card texture (or disable pixel background) | Avoid noisy retro glyph backgrounds in data surfaces |
| `font-pixel` in admin UI or chart text | semantic typography (`Typography`, token text classes) | Pixel fonts are decorative, not default data typography |
| `h-screen`                             | `h-dvh`                                      | Mobile viewport bug                      |
| `min-h-screen`                         | `min-h-dvh`                                  | Mobile viewport bug                      |
| `glass-card`                           | `glass-panel`                                | `glass-card` is deleted                  |
| `glass-atmospheric`                    | `glass-overlay`                              | Renamed                                  |
| `<AnimatedIcon icon={Settings} />`     | `<SettingsIcon size={16} />`                 | AnimatedIcon is deleted                  |
| `import { X } from "lucide-react"`    | `import { XIcon } from "@/components/ui/icons"` | Direct lucide-react imports forbidden (integrity test enforces) |
| `import { motion } from "framer-motion"` | `import { motion } from "motion/react"`   | Package renamed                          |
| `#6366f1` / "Electric Indigo"          | `#38BDB8` (dark) / `#1A8F88` (light) teal   | Arctic Glow palette replaced Indigo      |
| `#FB7185` / coral colors               | Use `destructive` or `accent` tokens         | Coral purged from arctic design system   |
| CSS hex in vars: `--color-bg: #0F1114` | `--color-background: 15 17 20`               | CSS vars use space-separated RGB         |
| `ring-offset-background`              | `ring-offset-surface`                        | Use surface for ring offset              |
| References to legacy Vite app docs     | See `src/app/(showcase)/layout.tsx`          | Migrated to Next.js App Router           |
| Assuming `localhost:3000` without checking scripts | Run `npm run dev` (`next dev --port 5001` in this repo) | Prevents bad local URLs in docs/tests    |

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
- Light mode and bloom mode overrides are automatic via CSS
- Bloom glass uses warm cream tints (`rgba(255, 248, 240, ...)`) and brown shadows (`rgba(45, 35, 24, ...)`)
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

**Spring presets (arctic):**
| Name       | Stiffness | Damping | Mass | Use For              |
| ---------- | --------- | ------- | ---- | -------------------- |
| `snappy`   | 400       | 28      | 0.8  | Micro-interactions   |
| `gentle`   | 200       | 20      | 1.0  | Page transitions     |
| `bouncy`   | 300       | 14      | 0.8  | Playful elements     |
| `dramatic` | 500       | 24      | 1.2  | Hero entrances       |

**Duration tokens (Tailwind):** `duration-micro` (100ms), `duration-fast` (150ms), `duration-normal` (200ms), `duration-moderate` (250ms), `duration-slow` (300ms)

**Easing (Tailwind):** `ease-out-cubic` (default for enters), `ease-in-out-cubic` (morphing)

**z-index scale:** `z-base(0)` `z-dropdown(50)` `z-sticky(100)` `z-overlay(200)` `z-modal(300)` `z-popover(400)` `z-toast(500)` `z-max(999)`

**Reduced motion:** Handled globally via CSS `prefers-reduced-motion` + `useMotionConfig()` hook.

**Style-aware motion:** Use `useStyleMotion()` hook for style-dependent animation parameters. See Section 8.

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
| **Animation**      | ScrollFadeIn, StaggerChildren, StaggeredEntrance, PageTransition, ConfettiBurst, SpringHover, SuccessCheck |
| **Charts**         | AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialBarChart, HeatmapChart (+ Chart base) |
| **AI/Voice**       | AgentAvatar, AgentStatus, AudioWaveform, ConversationThread, Avatar3D   |
| **Agentic UI**     | ToolCallCard, ThinkingIndicator, AgentMessageBubble, ApprovalCard, AgentTeamPanel, AgentTimeline, WorkflowGraph, HandoffIndicator, ContextMeter, SourceCitation, AgentMetricsCard, MemoryInspector, ArtifactCard, CodeDiffViewer, AgentTerminal |
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

### Style-Aware Motion (`useStyleMotion`)

Components that adapt animations to the active style should use the `useStyleMotion()` hook from `@/lib/motion`:

```tsx
import { useStyleMotion } from "@/lib/motion"

function MyComponent() {
  const { spring, distance, scale, blur, style } = useStyleMotion()
  // spring: style-specific spring configs (snappy, gentle, bouncy, dramatic)
  // distance: { sm, md, lg } in pixels
  // scale: { subtle, normal } starting scales (animate to 1.0)
  // blur: { subtle, normal } in px
  // style: 'arctic' | 'bloom'
}
```

**Arctic vs Bloom motion differences:**
- Arctic: precise, controlled, minimal overshoot (stiffness 400, damping 28)
- Bloom: softer, bouncier, more playful (stiffness 300, damping 16, has extra `wobbly` preset)
- Bloom uses larger distances (32px vs 40px for `md`) and more blur (8px vs 12px for `normal`)

### CSS Selectors
- `:root` -- light theme defaults
- `.dark` -- dark theme overrides
- `.bloom` -- bloom style overrides (always light, warm palette with coral accent)

### Bloom Palette Differences
- Background: warm cream (`254 253 251`) vs arctic white (`251 252 253`)
- Accent: coral `#E8573A` (bloom) vs teal `#38BDB8` / `#1A8F88` (arctic)
- Borders: warm brown tints vs cool gray
- Glass: cream-tinted gradients with brown shadows

---

## 9. Integrity Test Suite

The design system has automated gates that run on `npm test`. These catch regressions:

| Test | What It Guards |
| ---- | -------------- |
| `token-integrity` | Dark/light/bloom token parity, 12-step scales, hex format, no undefined values |
| `css-variable-completeness` | Every CSS var in tailwind.config.js defined in `:root`, `.dark`, and `.bloom` |
| `contrast` | WCAG contrast ratios for text/background pairs |
| `animation-integrity` | Spring config validity, motion distance/scale/blur ranges |
| `glass-effects` | Glass tier classes exist with light mode and bloom overrides |
| `no-hardcoded-values` | No hex colors in Tailwind classes or style objects |
| `no-static-lucide-imports` | No direct `lucide-react` imports outside `icons/` |
| `component-coverage` | Every `ui/*.tsx` has a matching `*.test.tsx` |
| `opinion-card-behavior` | Card interaction patterns follow opinions bible |
| `opinion-typography` | Typography scale and weight rules enforced |
| `opinion-navigation` | Navigation depth and pattern rules enforced |

**When extending the system, run:** `npm test` to verify all gates pass.

---

## 10. Project Structure

```
src/
  app/                                   # Next.js App Router
    layout.tsx                            # Root layout (Server Component, font loading)
    providers.tsx                          # Client providers (ThemeProvider, THREE/p5 globals)
    globals.css                           # Imports index.css
    page.tsx                              # "/" redirects to /foundations
    not-found.tsx                          # 404 page
    (showcase)/                           # Route group: showcase tabs
      layout.tsx                            # Header + AnimatedTabs + Cmd+K palette
      foundations/page.tsx
      components/page.tsx
      blocks/page.tsx
      charts/page.tsx
      icons/page.tsx
      pages/page.tsx
      patterns/page.tsx
    dashboard/page.tsx                    # Standalone pages
    landing/page.tsx
    pricing/page.tsx
    onboarding/page.tsx
    changelog/page.tsx
    blog/page.tsx
    voice-agents/page.tsx
    login/vanta/*/page.tsx               # Vanta login variants (7)
  components/
    ui/                                  # Core primitives
    ui/icons/                            # Animated icon wrappers (motion/react)
    ui/charts/                           # Chart primitives (recharts)
    ui/text-effects/                     # Text animation components
    blocks/                              # Composed page sections (*Block.tsx)
    pages/                               # Full page compositions
    pages/showcase/                      # Showcase tab content components
    layout/                              # Grid, GridSystem
  lib/
    tokens.config.js                     # Master token definitions
    utils.ts                             # cn() helper
    ThemeProvider.tsx                     # Dual-axis theme context
    motion.ts                            # Spring presets, motion variants, useStyleMotion
    animation.tokens.ts                  # Easing curves, duration scale, style-specific configs
  tokens.ts                              # TypeScript re-export
```

### Wiring New Components into the Showcase

New UI components must be added to the showcase for visual evaluation:

1. Showcase tab content lives in `src/components/pages/showcase/` (not in the App Router pages directly)
2. The route pages (`src/app/(showcase)/*/page.tsx`) render these showcase components
3. Place new components in the appropriate showcase file:
   - `FoundationsShowcase.tsx` -- tokens, colors, typography
   - `ComponentsShowcase.tsx` -- UI primitives
   - `BlocksShowcase.tsx` -- composed blocks
   - `ChartsShowcase.tsx` -- chart components
   - `PagesShowcase.tsx` -- full page demos

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
import "./globals.css"
import { Providers } from "./providers"

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){
          var t=localStorage.getItem('design-system-theme')||'system';
          var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);
          document.documentElement.classList.add(d?'dark':'light')
        })()` }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Providers (Client Component)
```tsx
// app/providers.tsx ("use client")
import { ThemeProvider } from "@/lib/ThemeProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  // Optionally load THREE/p5 globals for background effects
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
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
- Inline script in `<head>` prevents flash of wrong theme (FOUC)
- ThemeProvider hydrates from localStorage after mount
- Use `dynamic(() => import(...), { ssr: false })` for heavy client-only components (charts, carousels, Vanta backgrounds)

---

## 12. Naming & Testing Conventions

- Components: `PascalCase.tsx` in `components/ui/` or `components/blocks/`
- Blocks use `*Block.tsx` suffix (e.g., `LoginBlock.tsx`)
- Tests co-located as `ComponentName.test.tsx`
- Test framework: Vitest + @testing-library/react
- BDD-style: `describe("Button")` / `it("should render primary variant")`
- Import `cn` from `@/lib/utils`, never re-implement merge logic
- Every new UI component MUST have a colocated test (coverage gate enforces this)
- Components using `useStyleMotion()`/`useTheme()` need `ThemeProvider` wrapper in tests
- Charts need `ResizeObserver` mock in tests

---

## 13. Design Opinion Enforcement

The full opinions document lives at `docs/OPINIONS.md`. When building UI, enforce these rules:

### Pre-Commit Checklist

1. **No hardcoded colors** -- `bg-zinc-*`, `text-gray-*`, `#hex` are forbidden. Use semantic tokens.
2. **Navigation depth <= 3** -- Sidebar group > item > sub-item. Flatten deeper with tabs/filters.
3. **Stacked labels only** -- Label above input. No inline, no floating.
4. **Spring for entrances, CSS for properties** -- `motionSpring.snappy` for mounts, `transition-colors` for hover.
5. **prefers-reduced-motion respected** -- `useReducedMotion()` or `motion-reduce:` classes on every animation.
6. **Empty states have icon + title + description + CTA** -- Never show blank containers.
7. **Destructive actions use AlertDialog** -- Reversible actions skip confirmation.
8. **Chart colors use chart-1 through chart-6 tokens** -- Never raw color values.
9. **Touch targets >= 44px mobile, >= 40px desktop** -- Check all interactive elements.
10. **Font weight 300 (font-light) forbidden** -- Fails on glass backgrounds.
11. **No page-level horizontal overflow at 375px** -- Header control rows wrap on mobile and tab rails use local `overflow-x-auto`.
12. **Admin UI typography must use scale tokens** -- No arbitrary `text-[Npx]` in `app/admin/**` or `src/components/admin/**`.
13. **No `chat-*` utility classes** -- Build chat/conversation surfaces from existing design-system primitives.
14. **Admin chat must use agentic primitives** -- include conversation (`ConversationThread` or `AgentMessageBubble`), tooling (`ToolCallCard` or `ThinkingIndicator`), and traceability (`SourceCitation` or `AgentTimeline` or `WorkflowGraph` or `HandoffIndicator`) layers.

### Decision Tables

See `references/opinion-patterns.md` for machine-readable lookup tables covering:
- Navigation pattern selection
- Chart type by data shape
- Duration tiers for animation
- Form layout thresholds
- Feedback channel selection
- Responsive column rules
- Density modes

---

## 14. Reference Index

| File                              | Contents                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| `references/tokens-and-colors.md` | Full 12-step Radix scales, semantic token map, CSS var format, bloom palette |
| `references/component-inventory.md`| UI components with variants and Radix primitives, agentic UI |
| `references/component-patterns.md`| 4 real code patterns: Button, Input, Dialog, LoginBlock     |
| `references/animation-system.md`  | Springs, easings, durations, stagger, reduced motion, useStyleMotion |
| `references/nextjs-integration.md`| App Router setup, providers, SSR boundaries, showcase structure |
| `references/glass-and-effects.md` | Glass tiers CSS, decorative components, text effects        |
| `references/blocks-catalog.md`    | Blocks by domain with import paths, agentic conversation    |
| `references/icons-catalog.md`     | Animated icon usage patterns and conventions                |
| `references/opinion-patterns.md`  | Machine-readable decision tables from the Opinions Bible    |
