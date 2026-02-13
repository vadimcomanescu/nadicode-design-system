# Provenance

This project uses the [Nadicode Design System](https://github.com/vadimcomanescu/nadicode-design-system) (Seed).

- **Vendored commit**: see `.seed-version` in project root
- **Update**: clone the DS repo, then run `node <ds-path>/bin/init.mjs --update`
- **What updates**: components, tokens, icons, blocks, hooks, agent skill, CSS
- **What it won't touch**: your app routes, layouts, pages, or custom components

After updating, run `npm test` to verify integrity gates still pass.

# Seed Design System

Required read order before any UI implementation:
1. `docs/nadicode/NADICODE_CONTRACT.md` (if present)
2. `docs/nadicode/factory/page-intent-catalog.json` (if present)
3. matching `docs/nadicode/recipes/*.md` recipe files
4. `.agents/skills/seed-design-system/SKILL.md`

## Rules

- Import icons from `@/components/ui/icons/`, NEVER from `lucide-react` directly
- Use semantic tokens (`bg-background`, `text-text-primary`), never hardcoded colors
- All containers use glass effects: `glass-panel`, `glass-floating`, `glass-overlay`
- Use `cn()` from `@/lib/utils` for class merging
- Components follow the Radix + CVA + forwardRef pattern
- Theme: light/dark/bloom via CSS variables and `next-themes`
- Root layout needs a client-component wrapper with `<ThemeProvider>` from `@/lib/ThemeProvider`

## Discovery

```bash
ls src/components/ui/          # Primitives
ls src/components/blocks/      # Composed blocks
ls src/components/ui/icons/    # Animated icons
ls src/components/ui/charts/   # Chart components
npm run ds:check               # Enforce Nadicode contract rules
npm run ds:task-pack           # Generate deterministic tasks from scope-definition
```
# Scaffold Rules (MANDATORY)

## Before ANY UI Work

- MUST read `.agents/skills/seed-design-system/SKILL.md` (all 13 sections)
- MUST read relevant references in `.agents/skills/seed-design-system/references/`
- The design system has non-obvious constraints (deleted classes, renamed tokens,
  forbidden imports) that WILL fail integrity tests if ignored

## Design System Rules

- Import icons from `@/components/ui/icons/`, NEVER from `lucide-react` directly
- Use semantic tokens (`bg-background`, `text-text-primary`), never hardcoded colors
- All containers use glass effects: `glass-panel`, `glass-floating`, `glass-overlay`
- Use `cn()` from `@/lib/utils` for class merging
- Components follow the Radix + CVA + forwardRef pattern
- Theme: light/dark/bloom via CSS variables and `next-themes`
- Root layout needs a client-component wrapper with `<ThemeProvider>` from `@/lib/ThemeProvider`
- Check SKILL.md section 1 "Forbidden Patterns" table before writing any component
- Use `<Link>` from `next/link` for internal navigation, NEVER raw `<a>` tags
- Use `<Image>` from `next/image` for images where possible

## Quality Gates (enforced by git hooks)

Every commit is gated by husky pre-commit hooks. Nothing reaches the repo
without passing ALL of these:

### Pre-commit (blocks `git commit`)

1. **Type-check**: `npx tsc --noEmit` (zero tolerance for type errors)
2. **Lint + auto-fix staged files**: `npx lint-staged` (runs `eslint --fix` on staged `*.{ts,tsx}`)
3. **Unit tests + coverage**: `npx vitest run --coverage` (90%+ threshold on src/app/, src/hooks/, src/lib/)

### Pre-push (blocks `git push`)

4. **Full production build**: `npm run build` (Next.js build must succeed)

### Manual before merge

5. **E2E tests**: `npm run test:e2e` (Playwright, not in pre-commit because it's slow)

### ESLint Rules (enforced)

The ESLint config (`eslint.config.mjs`) enforces:
- `eslint-config-next/core-web-vitals` (Next.js + React + React Hooks best practices)
- `eslint-config-next/typescript` (TypeScript-specific rules)
- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: error
- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/no-unused-vars`: error (underscore prefix `_` allowed)

## NPM Scripts Reference

| Script | Purpose |
|--------|---------|
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `eslint .` (check only) |
| `npm run lint:fix` | `eslint . --fix` (auto-fix) |
| `npm run test:coverage` | `vitest run --coverage` |
| `npm run test:e2e` | `playwright test` |
| `npm run test:all` | typecheck + lint + coverage + e2e |

## Testing Requirements

### Unit Tests (Vitest)

- MUST maintain 90%+ coverage on src/app/, src/hooks/, src/lib/
- Run: `npm run test:coverage` (fails below threshold)
- Colocate tests as *.test.ts / *.test.tsx
- BDD-style describe/it with behavioral names

### E2E Tests (Playwright)

- MUST write e2e tests for every user-facing feature in e2e/*.spec.ts
- Run: `npm run test:e2e`
- First run needs: `npx playwright install --with-deps chromium`

## Verification Workflow (before every commit)

Hooks run automatically, but you can also run manually:

```bash
npm run test:all
```

## Live Testing

- MUST start dev server and verify UI changes render correctly
- Check both light and dark themes
- Check mobile viewport (design system uses dvh units)

## Post-Clone Setup

1. npm install (husky hooks auto-install via `prepare` script)
2. npx playwright install --with-deps chromium
3. npm run dev (verify scaffold renders)
4. npm run test:all (verify all gates pass)
5. Update metadata in src/app/layout.tsx with your project name

## Discovery

```bash
ls src/components/ui/          # Primitives
ls src/components/blocks/      # Composed blocks
ls src/components/ui/icons/    # Animated icons
ls src/components/ui/charts/   # Chart components
```

# Provenance

This project uses the [Nadicode Design System](https://github.com/vadimcomanescu/nadicode-design-system) (Seed).

- **Vendored commit**: see `.seed-version` in project root
- **Update**: clone the DS repo, then run `node <ds-path>/bin/init.mjs --update`
- **What updates**: components, tokens, icons, blocks, hooks, agent skill, CSS
- **What it won't touch**: your app routes, layouts, pages, or custom components

After updating, run `npm test` to verify integrity gates still pass.
