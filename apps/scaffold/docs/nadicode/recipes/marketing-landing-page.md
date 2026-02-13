# Recipe: Marketing Landing

Use this recipe for public home/landing pages.

## Route Pattern

- `/`

## Required Composition

1. Hero section with clear value proposition and CTA.
2. Features/value section.
3. Trust/proof section (logos, stats, testimonials).
4. FAQ and final CTA section.

## Required Components

- `HeroBlock`
- `FeatureBlock`
- `FAQBlock`
- `Button`
- `Typography`

## Required States

- `default`
- `mobile-navigation`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
