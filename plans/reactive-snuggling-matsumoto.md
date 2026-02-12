# Plan: Single-Command Design System Setup for Next.js

## Context

The Seed Design System needs to be consumable by multiple Next.js projects developed by AI agents. Currently it's a standalone Vite SPA with no distribution mechanism. The agent skill (`.claude/skills/seed-design-system/`, ~116KB) is critical for agents to correctly use the system. The goal: one command sets up everything.

## Approach: Vendoring CLI (shadcn/ui model)

**Why vendoring over npm package:**
- Agents can read/modify all component source directly (huge win for AI development)
- `@/` path aliases work naturally (components are in the project)
- No library build step, no npm publishing, no barrel exports needed
- Proven model (shadcn/ui, 60k+ stars)

**Single command:**
```bash
node ~/Code/nadicode-design-system/bin/init.mjs
```

## What the Script Does

### 1. Validates target is a Next.js project
Checks for `package.json` with `next` dependency. Detects `src/app/` vs `app/` layout.

### 2. Copies source files (~317 files, excluding tests)

| Source | Destination | Notes |
|--------|-------------|-------|
| `src/components/ui/` | `src/components/ui/` | All 96 primitives + icons + charts + stepper + text-effects |
| `src/components/blocks/` | `src/components/blocks/` | All 35 blocks |
| `src/components/layout/` | `src/components/layout/` | Grid system |
| `src/components/logos/` | `src/components/logos/` | Brand logos |
| `src/components/animate-ui/` | `src/components/animate-ui/` | Animation primitives |
| `src/hooks/` | `src/hooks/` | use-mobile, use-toast, etc. |
| `src/lib/*.ts(x)` | `src/lib/` | utils, ThemeProvider, tokens.config, motion, animation tokens |
| `src/tokens.ts` | `src/tokens.ts` | TypeScript token re-exports |
| `public/fonts/geist-pixel/` | `public/fonts/geist-pixel/` | Pixel fonts |
| `.claude/skills/seed-design-system/` | `.claude/skills/seed-design-system/` | Full agent skill |

**Excluded:** `*.test.tsx`, `*.test.ts`, `src/test/`, `src/components/pages/` (showcase), `App.tsx`, `main.tsx`, `vite.config.ts`

### 3. Patches `react-router-dom` imports for Next.js

Several blocks use `react-router-dom`. The script does targeted find-and-replace:
- `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
- `to=` prop on Link → `href=`
- `useLocation()` → `usePathname()` from `next/navigation`
- `useNavigate()` → `useRouter()` from `next/navigation`

### 4. Sets up configuration

- **tailwind.config.js**: Copies from design system, patches `content` array to include `./app/**/*.{ts,tsx}`
- **postcss.config.mjs**: Generates with `@tailwindcss/postcss` plugin (if missing)
- **globals.css**: Merges CSS token variables from `index.css` using sentinel comments for idempotent updates
- **tsconfig.json**: Patches `@/*` path alias if missing
- **`.claude/CLAUDE.md`**: Generates compact agent instructions (forbidden patterns, key conventions, skill reference)

### 5. Installs dependencies

~45 packages via `npm install`:
- Core: `class-variance-authority`, `clsx`, `tailwind-merge`
- Radix UI: 24 packages (slot, dialog, select, checkbox, switch, etc.)
- Animation: `motion`, `lucide-react`
- Charts: `recharts`
- UI: `cmdk`, `embla-carousel-react`, `react-day-picker`, `sonner`, `vaul`, `input-otp`, `react-resizable-panels`
- Forms: `react-hook-form`, `@hookform/resolvers`, `zod`, `date-fns`
- Data: `@tanstack/react-table`
- Other: `tailwindcss-animate`, `@tailwindcss/postcss`, `next-themes`, `prismjs`, `react-use-measure`, `dialkit`

**Not auto-installed (optional/heavy):**
- Stripe: `@stripe/react-stripe-js @stripe/stripe-js`
- 3D: `three vanta`
- Canvas: `p5`

### 6. Prints summary with next steps

## CLI Flags

| Flag | Behavior |
|------|----------|
| *(none)* | Fresh install, asks confirmation if files exist |
| `--update` | Re-copies all source files, re-merges CSS, re-installs deps |
| `--force` | Skip confirmation prompts |
| `--skip-deps` | Skip npm install |

## Files to Create/Modify

### New: `bin/init.mjs` (~400 lines)
Zero-dependency Node.js ESM script using only `node:fs`, `node:path`, `node:child_process`, `node:readline`.

Key functions:
- `validateTarget()` - Checks Next.js project, detects app dir location
- `copyDirFiltered(src, dest)` - Recursive copy excluding test files
- `patchRouterImports()` - Replaces react-router-dom with next/link + next/navigation
- `mergeGlobalsCss(appDir)` - Sentinel-based CSS merge
- `setupTailwindConfig()` - Copy + patch content paths
- `setupPostCssConfig()` - Generate if missing
- `patchTsConfig()` - Add @/* alias if missing
- `generateClaudeMd()` - Create .claude/CLAUDE.md with design system rules
- `installDependencies()` - npm install all runtime deps

### Modify: `package.json`
Add `bin` field:
```json
{
  "bin": {
    "seed-design": "./bin/init.mjs"
  }
}
```

## Edge Cases Handled

- **`src/app/` vs `app/`**: Auto-detects which layout the Next.js project uses
- **Existing files**: Asks confirmation on fresh install, overwrites on `--update`
- **Idempotent CSS merge**: Sentinel comments (`/* === Seed Design System Tokens === */`) allow re-running safely
- **Sonner.tsx**: Uses `next-themes` (correct for Next.js, included in deps)
- **`@config` CSS directive**: Stripped from globals.css (Next.js auto-discovers tailwind config)
- **Optional heavy deps**: Stripe, Three.js, p5 listed in summary but not installed

## Verification

After running the script in a Next.js project:
1. `npx tsc --noEmit` - Zero type errors
2. `npm run dev` - Components render, theme toggle works
3. `ls .claude/skills/seed-design-system/SKILL.md` - Skill exists
4. Test agent invocation: ask an agent to "build a landing page using the Seed Design System" and verify it references the skill

## Update Story

To update after the design system evolves:
```bash
node ~/Code/nadicode-design-system/bin/init.mjs --update
```
This re-copies all source files (overwriting), re-merges CSS tokens, and re-installs deps to pick up new packages. Config files (tailwind, postcss, tsconfig) are only regenerated with `--force`.
