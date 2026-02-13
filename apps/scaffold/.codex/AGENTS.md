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

### Integrity Suite

- Run `npm test` before committing (design system integrity gates)

## Verification Workflow (before every commit)

1. `npx tsc --noEmit`
2. `npm run test:coverage`
3. `npm run test:e2e`

## Live Testing

- MUST start dev server and verify UI changes render correctly
- Check both light and dark themes
- Check mobile viewport (design system uses dvh units)

## Post-Clone Setup

1. npm install
2. npx playwright install --with-deps chromium
3. npm run dev (verify scaffold renders)
4. npm run test:all (verify all tests pass)
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
