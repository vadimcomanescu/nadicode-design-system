# Seed Design System

A premium, opinionated design system for AI-integrated web applications, with dual-axis theming (light/dark/bloom), glassmorphism effects, and a full agent skill for AI-assisted development.

## Quick Start (Development)

```bash
npm install
npm run dev        # http://localhost:5001
```

## Using in Next.js Projects

One command vendors the entire design system into any Next.js project:

```bash
# From your Next.js project directory:
node ~/Code/nadicode-design-system/bin/init.mjs
```

This copies all components, installs dependencies, sets up Tailwind/PostCSS config, and installs the agent skill for Claude/Codex/OpenCode.

### What it does

| Step | Description |
|------|-------------|
| Source files | Copies ~300 files (components, blocks, icons, hooks, lib) with `"use client"` prepended |
| Fonts | Copies GeistPixel fonts to `public/fonts/` |
| Agent skill | Copies to `.agents/skills/`, symlinks from `.claude/`, `.codex/`, `.opencode/` |
| CSS tokens | Creates `seed-tokens.css` with all design tokens, glass effects, keyframes |
| globals.css | Patches with Tailwind v4 directives and seed token import |
| Tailwind | Copies config with Next.js content paths |
| PostCSS | Creates config with `@tailwindcss/postcss` |
| tsconfig | Adds `@/*` path alias |
| Agent docs | Writes CLAUDE.md/AGENTS.md to each tool directory |
| Dependencies | Installs all ~50 runtime + dev packages |

### Flags

```bash
node ~/Code/nadicode-design-system/bin/init.mjs --update     # Re-copy all files, re-install deps
node ~/Code/nadicode-design-system/bin/init.mjs --force      # Skip confirmation prompts
node ~/Code/nadicode-design-system/bin/init.mjs --skip-deps  # Skip npm install
node ~/Code/nadicode-design-system/bin/init.mjs --help       # Show help
```

### After running init

1. Create a client-component wrapper in your root layout:

```tsx
// src/app/providers.tsx
"use client"
import { ThemeProvider } from "@/lib/ThemeProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

2. Use it in your root layout:

```tsx
// src/app/layout.tsx
import { Providers } from "./providers"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

3. Start building with components:

```tsx
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { HomeIcon } from "@/components/ui/icons"
```

### Updating

When the design system evolves, re-run from your Next.js project:

```bash
node ~/Code/nadicode-design-system/bin/init.mjs --update
```

This overwrites all source files, re-merges CSS tokens, and re-installs deps. Your own code (pages, app routes) is untouched.

## Project Structure

```
src/
  components/
    ui/              # UI primitives and effect components
    ui/icons/        # Animated icons (motion/react)
    ui/charts/       # 7 chart primitives (recharts)
    ui/stepper/      # Multi-step stepper
    ui/text-effects/ # Streaming text, pixel reveal, etc.
    ui/vanta/        # Vanta.js 3D backgrounds
    blocks/          # Composed blocks (Hero, Pricing, Auth, etc.)
    layout/          # Grid system
    logos/            # Brand SVG logos
    animate-ui/      # Animation primitives (fade, slide, zoom, etc.)
  hooks/             # use-toast, use-mobile, use-token, etc.
  lib/
    tokens.config.js # Master token definitions
    ThemeProvider.tsx # Dual-axis theme context (theme + style)
    utils.ts         # cn() class merge helper
    motion.ts        # Motion spring/transition presets
  index.css          # CSS tokens, glass effects, keyframes
bin/
  init.mjs           # Vendoring CLI for Next.js projects
.agents/
  skills/seed-design-system/  # Agent skill (SKILL.md + references)
```

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Type check + production build
npm run test         # Run tests
npm run lint         # ESLint
npm run docs:check   # Validate docs and agent references
npx tsc -b           # Type check only
```

## Theming

Dual-axis: `theme` (light / dark / system) + `style` (arctic / bloom).

- **Arctic**: Cool teal accent, deep blacks in dark mode
- **Bloom**: Warm coral accent, cream tones, light-only

Tokens flow: `tokens.config.js` -> `index.css` (CSS vars) -> `tailwind.config.js` (Tailwind classes)

## Key Conventions

- Components use the **Radix + CVA + forwardRef** pattern
- Icons: always import from `@/components/ui/icons/`, never from `lucide-react` directly
- Colors: always use semantic tokens (`bg-background`, `text-text-primary`), never hardcoded
- Glass effects: `glass-panel` (structural), `glass-floating` (elevated), `glass-overlay` (transient)
- Class merging: always use `cn()` from `@/lib/utils`
