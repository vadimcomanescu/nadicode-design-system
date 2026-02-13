# Recipe: Error and Not Found

Use this recipe for fallback surfaces and hard failures.

## Route Patterns

- `/404`
- `/500`

## Required Composition

1. Clear error title and one-sentence explanation.
2. Primary recovery action (`Go Home` / `Retry`).
3. Optional secondary action (`Contact Support`).

## Required Components

- `Card`
- `Typography`
- `Button`

## Required States

- `not-found`
- `server-error`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
