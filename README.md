# Seed Design System

A premium, opinionated design system for AI-integrated web applications, with dual-axis theming (light/dark/bloom), glassmorphism effects, and a full agent skill for AI-assisted development.

## Quick Start (Development)

```bash
npm install
npm run dev        # http://localhost:5001
npm run dev:scaffold # scaffold app package
```

## Monorepo Scaffold App

The scaffold now lives in this repository at `apps/scaffold`.

- Design system source of truth: root `src/`
- Scaffold app: `apps/scaffold`
- Sync command: `npm run scaffold:sync`
- Sync guard: `npm run scaffold:check-sync` (fails when scaffold drifts)

## Using in Next.js Projects

One command vendors the entire design system into any Next.js project:

```bash
# From your Next.js project directory:
npx --yes github:vadimcomanescu/nadicode-design-system
```

This copies all components, installs dependencies, sets up Tailwind/PostCSS config, and installs the agent skill for Claude/Codex/OpenCode.

### What it does

| Step | Description |
|------|-------------|
| Source files | Copies ~300 files (components, blocks, icons, hooks, lib) with `"use client"` prepended |
| Fonts | Copies GeistPixel fonts to `public/fonts/` |
| Agent skill | Copies to `.agents/skills/`, symlinks from `.claude/`, `.codex/`, `.opencode/` |
| Agent contract kit | Writes `docs/nadicode/` (contract, recipes, prompts) |
| Factory contracts | Writes `docs/nadicode/factory/page-intent-catalog.json` |
| Enforcement | Writes `scripts/ds-check.mjs`, `scripts/ds-ast-check.mjs`, `scripts/ds-generate-task-pack.mjs`, `scripts/ds-update.mjs`, and package scripts |
| CSS tokens | Creates `seed-tokens.css` with all design tokens, glass effects, keyframes |
| globals.css | Patches with Tailwind v4 directives and seed token import |
| Tailwind | Copies config with Next.js content paths |
| PostCSS | Creates config with `@tailwindcss/postcss` |
| tsconfig | Adds `@/*` path alias |
| Agent docs | Writes CLAUDE.md/AGENTS.md to each tool directory |
| Dependencies | Installs all ~50 runtime + dev packages |

### Flags

```bash
npx --yes github:vadimcomanescu/nadicode-design-system --update     # Re-copy all files, re-install deps
npx --yes github:vadimcomanescu/nadicode-design-system --force      # Skip confirmation prompts
npx --yes github:vadimcomanescu/nadicode-design-system --skip-deps  # Skip npm install
npx --yes github:vadimcomanescu/nadicode-design-system --help       # Show help
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

4. Enforce Nadicode rules in that project:

```bash
npm run ds:check
npm run ds:ast-check
```

5. Generate deterministic tasks from scope (if present):

```bash
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
```

6. Use the portable docs in the target app:

- `docs/nadicode/NADICODE_CONTRACT.md`
- `docs/nadicode/factory/page-intent-catalog.json`
- `docs/nadicode/recipes/`
- `docs/nadicode/PROMPT_TEMPLATES.md`

### Updating

When the design system evolves, re-run from your Next.js project:

```bash
npm run ds:update
```

If this is a legacy target app that does not have `ds:update` yet, run:

```bash
npx --yes github:vadimcomanescu/nadicode-design-system --update
```

This overwrites all source files, re-merges CSS tokens, and re-installs deps. Your own code (pages, app routes) is untouched.

## Project Structure

```
apps/
  scaffold/          # In-repo scaffold app package
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
npm run dev                 # Start DS dev server
npm run dev:scaffold        # Start scaffold app dev server
npm run build               # Build design system
npm run build:all           # Build design system + scaffold
npm run test                # Run DS tests
npm run lint                # Lint DS source
npm run scaffold:sync       # Refresh apps/scaffold from DS source
npm run scaffold:check-sync # Refresh and fail on uncommitted scaffold drift
npm run scaffold:typecheck  # Typecheck scaffold app
npm run scaffold:lint       # Lint scaffold app
npm run scaffold:test       # Run scaffold unit tests
npm --prefix apps/scaffold run test:e2e # Run scaffold Playwright e2e tests
npm run scaffold:build      # Build scaffold app
npm run ds:check            # Nadicode contract enforcement
npm run ds:ast-check        # Nadicode AST contract enforcement
npm run ds:task-pack        # Build task pack from scope-definition.json
npm run docs:check          # Validate docs and agent references
```

## Scaffold Integrity

Scaffold drift is now enforced in root quality gates:

- Root CI runs `npm run scaffold:check-sync` and fails on drift (excluding `.seed-version`).
- Root pre-push also runs `npm run scaffold:check-sync` (excluding `.seed-version`).
- Root `vitest` still excludes `apps/scaffold/**`; run scaffold tests with `npm run scaffold:test`.

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
