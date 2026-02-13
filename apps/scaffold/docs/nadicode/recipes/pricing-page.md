# Recipe: Pricing Page

Use this recipe for plan comparison and purchase entry.

## Route Pattern

- `/pricing`

## Required Composition

1. Pricing hero with billing frequency toggle.
2. Plan cards with feature matrix.
3. FAQ and enterprise/contact fallback.

## Required Components

- `PricingBlock`
- `Card`
- `Badge`
- `Button`

## Required States

- `default`
- `annual-toggle`
- `cta-loading`

## Verification

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
