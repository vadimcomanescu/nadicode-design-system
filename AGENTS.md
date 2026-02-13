# CLAUDE.md / AGENTS.md (Single Source of Truth)

This file is the canonical agent guide for this repository. `CLAUDE.md` symlinks here.

# Seed Design System Agent Guide

## Quick Reference

| Item | Value |
|------|-------|
| Stack | React 19, TypeScript, Next.js App Router, Tailwind CSS 4, Radix UI, CVA |
| Components | Dynamic inventory, see `npm run docs:inventory` |
| Tokens | `src/lib/tokens.config.js` -> `src/index.css` -> `tailwind.config.js` |
| Theme | Dual-axis: `theme` (light/dark/system) + `style` (arctic/bloom) |
| Tests | Vitest + Testing Library, co-located `*.test.tsx` |
| Dev | `npm run dev` (port 5001) |
| Type check | `npx tsc --noEmit` |
| Test | `npm run test` |
| Lint | `npm run lint` |

## Instruction Authority

When rules conflict, apply this precedence:
1. Root `AGENTS.md` (this file)
2. `.agents/skills/seed-design-system/SKILL.md`
3. `docs/OPINIONS.md`
4. Other docs under `docs/` and `.agents/skills/seed-design-system/references/`

For volatile facts (counts, inventories, generated files), prefer repository state over prose.

## 1. Design Philosophy

The system is **OPINIONATED** and **PREMIUM**.
- **No Compromise**: Never trade visual fidelity for code simplicity. The default component must look expensive, layered, and high-fidelity.
- **Premium Pixel Glass**: All containers use the **Hybrid Aesthetic**: glass base (blur, noise, emboss, shadows via `.glass-panel`) + pixel overlay (subtle grid texture).

Key characteristics:
- **Deep Blacks**: Dark mode uses `#050505` (RGB `5 5 5`).
- **Rich Texture**: Always prioritize depth (layers, borders, noise) over flat surfaces.
- **Glassmorphism**: Extensive use of backdrop blur.

### 1.1. Critical Constraints (DO NOT IGNORE)
> [!CAUTION]
> **NEVER FLATTEN THE DESIGN.**
> When enforcing "opinionated" rules, do NOT strip away the glassmorphism, noise, or emboss effects. The "Opinionated" choice is always the **highest fidelity** choice.

### 1.2. Iconography (STRICT)
> [!IMPORTANT]
> **ALWAYS use animated icon components from `src/components/ui/icons/`.**
> Never import static icons from `lucide-react` directly (e.g., `import { Home } from 'lucide-react'`).
> Instead, import the animated wrapper:
> ```tsx
> import { HomeIcon } from '@/components/ui/icons/home';
> // or barrel import:
> import { HomeIcon } from '@/components/ui/icons';
> ```
> - Animated icon components live in `src/components/ui/icons/` (see `npm run docs:inventory` for current counts).
> - Each uses `motion/react` for hover animations with an imperative handle (`startAnimation` / `stopAnimation`).
> - Icons accept `size` prop (default 28) and standard `HTMLAttributes<HTMLDivElement>`.
> - An integrity test (`src/test/no-static-lucide-imports.test.ts`) enforces zero direct lucide-react imports in components.

## 2. Token Architecture

### 2.1. Three-File Flow

```
tokens.config.js (master definition, both light/dark palettes)
        |
        v
  index.css (CSS custom properties on :root and .dark)
        |
        v
  tailwind.config.js (maps CSS vars to Tailwind classes)
```

**Rule**: Never define colors directly in components. Always reference tokens via Tailwind classes.

### 2.2. Semantic Color Tokens

| Token | Tailwind Class | Purpose |
|-------|---------------|---------|
| background | `bg-background` | Page background |
| surface | `bg-surface` | Card/panel backgrounds |
| surface-hover | `bg-surface-hover` | Hover state for surfaces |
| border | `border-border` | Default borders |
| primary | `bg-primary`, `text-primary` | Primary actions/text |
| secondary | `bg-secondary` | Secondary elements |
| accent | `bg-accent`, `text-accent` | Brand accent (teal in arctic, warm orange in bloom) |
| destructive | `bg-destructive`, `text-destructive` | Danger/delete actions |
| success | `bg-success`, `text-success` | Success states |
| warning | `bg-warning`, `text-warning` | Warning states |
| info | `bg-info`, `text-info` | Informational states |
| overlay | `bg-overlay/80` | Modal/dialog overlays |
| muted | `bg-muted` | Subdued backgrounds |
| muted-foreground | `text-text-secondary` | Subdued body/meta text |
| text-primary | `text-text-primary` | Primary body text |
| text-secondary | `text-text-secondary` | Secondary body text |
| text-tertiary | `text-text-tertiary` | Tertiary/placeholder text |

### 2.3. CSS Variable Format
Variables use **space-separated RGB values** (not hex, not HSL):
```css
--color-background: 250 250 250;  /* Light */
--color-background: 5 5 5;        /* Dark */
```

### 2.4. Typography
**Font**: `Satoshi`, geometric sans-serif. Bundled locally as woff2 in `public/fonts/satoshi/` (for scaffold customers) and `src/app/fonts/` (for `next/font/local` in this repo). Loaded via `next/font/local` in `src/app/layout.tsx` with CSS variable `--font-satoshi`.
**Pixel fonts**: `GeistPixel`, `GeistPixelGrid`, `GeistPixelLine` for decorative use. Bundled in `public/fonts/geist-pixel/`.

## 3. Component Patterns (Golden Pattern)

Every component follows the **Radix UI + CVA + forwardRef** pattern:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { sm: "...", default: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

**Rules**:
1. Use `cn()` (from `@/lib/utils`) for all class merging. Never concatenate strings.
2. Use CVA for any component with variants.
3. Use `forwardRef` on all components.
4. Use `asChild` + `Slot` for polymorphic components.
5. Export both the component and its variants for composition.

## 4. File Structure

```
src/
  app/                # Next.js App Router
    layout.tsx          # Root layout (Server Component)
    providers.tsx       # Client providers (ThemeProvider, THREE/p5 globals)
    page.tsx            # "/" redirects to /foundations
    not-found.tsx       # 404 page
    globals.css         # Imports index.css
    (showcase)/         # Route group: showcase tabs
      layout.tsx          # Header + tab navigation
      foundations/page.tsx
      components/page.tsx
      blocks/page.tsx
      charts/page.tsx
      icons/page.tsx
      pages/page.tsx
      patterns/page.tsx
    dashboard/page.tsx  # Standalone pages
    landing/page.tsx
    pricing/page.tsx
    login/vanta/*/page.tsx  # Vanta login variants
  components/
    ui/           # Core primitives (Button, Input, Dialog, etc.)
    ui/charts/    # Chart primitives (AreaChart, BarChart, etc.)
    ui/stepper/   # Multi-step stepper components
    blocks/       # Composed UI blocks (*Block.tsx naming)
    pages/        # Full page compositions
    layout/       # Layout components (Grid)
  lib/
    tokens.config.js  # Master token definitions
    utils.ts          # cn() helper
    ThemeProvider.tsx  # Theme context + toggle logic
    useToken.ts       # Runtime token access hook
  tokens.ts           # TypeScript re-export of tokens
```

**Naming conventions**:
- UI primitives: PascalCase (`Button.tsx`, `Dialog.tsx`)
- Blocks: PascalCase with `Block` suffix (`HeroBlock.tsx`, `PricingBlock.tsx`)
- Tests: Co-located (`Button.test.tsx` next to `Button.tsx`)

## 5. Component Inventory

Inventory is intentionally not hardcoded in this guide.

Use runtime discovery commands:
```bash
npm run docs:inventory
ls src/components/ui
ls src/components/blocks
find src/components/pages -name '*.tsx'
```

Detailed references:
- `.agents/skills/seed-design-system/references/component-inventory.md`
- `.agents/skills/seed-design-system/references/blocks-catalog.md`

## 6. Testing Standards

**Framework**: Vitest + jsdom + @testing-library/react + @testing-library/jest-dom

**Commands**:
```bash
npm run test          # Run all tests once
npx vitest            # Watch mode
npx vitest Button     # Run specific test
```

**Test template**:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Component } from "./Component"

describe("Component", () => {
  it("renders with default props", () => {
    render(<Component>Content</Component>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    render(<Component variant="outline">Content</Component>)
    expect(screen.getByText("Content")).toHaveClass("border")
  })

  it("forwards ref", () => {
    const ref = { current: null }
    render(<Component ref={ref}>Content</Component>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("has accessible role", () => {
    render(<Component role="button">Click</Component>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

## 7. Code Cookbook

### Adding a new UI component
```bash
# 1. Create file
touch src/components/ui/MyComponent.tsx

# 2. Follow Golden Pattern (Section 3)
# 3. Create co-located test
touch src/components/ui/MyComponent.test.tsx

# 4. Export from the component file (no barrel needed)
# 5. MANDATORY: Wire into showcase route for preview (see rule below)
```

> [!CAUTION]
> **MANDATORY: Wire new components into showcase routes.**
> Every new component MUST be added to the visual showcase under `src/app/(showcase)/` so it can be evaluated in the browser. Never leave a new component unrendered. Place it in the appropriate section (Foundations, Components, Blocks, etc.) with a demo that exercises its key props and variants. This is NOT optional.

### Using overlay tokens (modals, drawers)
```tsx
// Always use bg-overlay/80, never bg-black/80
<div className="fixed inset-0 bg-overlay/80" />
```

### Using status tokens (alerts, badges)
```tsx
<Badge className="bg-success text-success-foreground">Active</Badge>
<Badge className="bg-warning text-warning-foreground">Pending</Badge>
<Badge className="bg-destructive text-destructive-foreground">Error</Badge>
```

### Creating a new block
```bash
# Blocks compose UI primitives into reusable sections
# Always use *Block.tsx suffix
touch src/components/blocks/MyFeatureBlock.tsx
```

### Theme-aware glass effects
```tsx
// Three glass tiers:
// .glass-panel   - Structural (cards, dashboards)
// .glass-floating - Elevated (popovers, modals)
// .glass-overlay  - Transient (toasts, marketing)
<Card className="glass-panel">...</Card>
```

## 8. Layout Patterns

### Sidebar (Preferred for app shells)
`Sidebar.tsx` uses `SidebarProvider` for responsive behavior (auto-switches to Sheet on mobile).

### Resizable Panels (Advanced)
`Resizable.tsx` wraps `react-resizable-panels`. Responsiveness is MANUAL (hide panels with `className="hidden md:flex"`).

## 9. Verification Protocols

**Strict Rule**: When modifying the design system, verify using TWO methods:

### 9.1. Automated Validation
```bash
npx tsc --noEmit                                    # Zero type errors
npm run test                                   # All tests pass
npm run lint                                   # Clean lint
python3 tests/validate_design.py                     # Token validation
```

### 9.2. Visual Verification (CRITICAL)
1. Run `npm run dev`.
2. Toggle Light/Dark Mode. Verify components in BOTH modes.
3. Check for: washed-out text, invisible glass cards, hardcoded dark backgrounds, proper glows and contrast.

> [!WARNING]
> If you think "it's just a small CSS change, I don't need to check," **YOU ARE WRONG.** Small changes cause the biggest breakages. **ALWAYS VERIFY VISUALLY.**

## 10. Anti-Regression Rules

1. **NEVER hardcode grayscale colors** (e.g., `bg-zinc-950`, `text-gray-500`). ALWAYS use semantic tokens.
2. **Glassmorphism requires light-mode overrides** in `index.css`.
3. **Test card visibility** on the default background of both themes.
4. **NEVER use `text-foreground`** (undefined). Use `text-text-primary` instead.
5. **NEVER use `bg-black/80`** for overlays. Use `bg-overlay/80`.
6. **NEVER use `border-error`** (undefined). Use `border-destructive`.

## 11. Accessibility Requirements

- All interactive components must use Radix UI primitives or proper ARIA
- Keyboard navigation must work (Tab, Enter, Escape, Arrow keys)
- Focus indicators must be visible (using `focus-visible:ring-1`)
- Screen reader labels must be present (aria-label or associated labels)

## 12. Key Dependencies

**Core:** react 19, react-dom, tailwindcss 4, @tailwindcss/postcss, class-variance-authority, clsx, tailwind-merge

**Radix UI:** @radix-ui/react-slot, -dialog, -select, -checkbox, -switch, -label, -separator

**Icons & Utilities:** lucide-react, tailwindcss-animate

## 13. Quality Gates (enforced by git hooks)

Every commit is gated by husky hooks. Nothing reaches the repo
without passing all of these checks:

### Pre-commit (blocks `git commit`)

1. **Type-check**: `npx tsc --noEmit` (zero tolerance for type errors)
2. **Lint + auto-fix staged files**: `npx lint-staged` (runs `eslint --fix` on staged `*.{ts,tsx}`)
3. **Nadicode contract**: `npm run ds:check` (forbidden patterns and composition contract)
4. **Docs integrity**: `npm run docs:check` (agent/docs drift checks)
5. **Unit tests**: `npx vitest run` (all tests must pass)

### Pre-push (blocks `git push`)

6. **Typecheck + lint + contract + docs + tests + build** run on tracked snapshot:
   `npm run typecheck`, `npm run lint`, `npm run ds:check`, `npm run docs:check`, `npx vitest run --coverage`, `npm run build`
7. **Scaffold sync drift**: `npm run scaffold:check-sync` (fails if vendored scaffold diverges from source-of-truth)

### NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `eslint .` (check only) |
| `npm run lint:fix` | `eslint . --fix` (auto-fix) |
| `npm run test` | `vitest run` |
| `npm run test:all` | typecheck + lint + tests |

### ESLint Config

Modern flat config (`eslint.config.mjs`) with typescript-eslint, react-hooks, react-refresh.

### Commits

`type(scope): subject` (scope optional). Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`. Imperative mood, <= 72 chars, no trailing period.

## 14. Skill Maintenance

> [!IMPORTANT]
> **After any architectural change, update the agent skill.**
> The `.agents/skills/seed-design-system/` directory contains an agent skill (SKILL.md + reference files) that teaches AI assistants how to use this design system. When you make changes that affect the system's architecture, conventions, or component inventory, you MUST update the skill to match:
> - **SKILL.md**: Forbidden patterns, token references, component categories, theming, animation, project structure
> - **`.agents/skills/seed-design-system/references/`**: Token catalog, component inventory, animation system, glass effects, blocks catalog, icons catalog, Next.js integration
>
> The skill should contain **general guidance** (patterns, conventions, rules), not fragile specifics (exact counts, exhaustive lists). Point agents to `ls` or `grep` commands for dynamic discovery instead of hardcoding inventories.

## 15. Design Opinions

See `docs/OPINIONS.md` for the complete opinions bible (10 domains, ~60 rules). Top 5 cardinal rules:

1. **Never hardcode colors** -- use semantic tokens (`bg-surface`, `text-text-primary`). Raw Tailwind scales break theming.
2. **Spring for entrances, CSS easing for properties** -- `motionSpring.snappy` for mounts, `transition-colors` for hover.
3. **Stacked labels always** -- label above input. No floating, no inline. No exceptions.
4. **prefers-reduced-motion is non-negotiable** -- every animation must degrade via `useReducedMotion()`.
5. **Max 3 navigation levels** -- sidebar group > item > sub-item. Flatten deeper into tabs/filters/search.

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output AGENTS.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
