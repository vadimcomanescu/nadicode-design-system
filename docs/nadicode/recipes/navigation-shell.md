# Recipe: Navigation Shell

Use this recipe for shared app navigation and route framing.

## Required Structure

1. App shell with persistent primary navigation.
2. Top-level groups aligned to use-case categories.
3. Max three levels depth (`group > item > sub-item`).

## Required Components

- `Sidebar`
- `NavigationMenu`
- `Breadcrumb`
- `SearchCommand` (optional but recommended for large nav)

## Non-Negotiable Rules

- Navigation labels come from `labels`/i18n sources, not hardcoded literals.
- Keep route taxonomy stable, avoid intent re-mapping inside page components.
- Do not exceed max navigation depth.

## Verification

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
