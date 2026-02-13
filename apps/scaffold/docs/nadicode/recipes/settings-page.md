# Recipe: Settings Page

Use this recipe for user/workspace configuration.

## Route Pattern

- `/settings`

## Required Composition

1. Settings navigation by `Tabs` or section list.
2. Section cards for profile, preferences, notifications, integrations.
3. Inline save feedback and last-saved status.

## Required Components

- `Tabs`
- `Card`
- `Input`
- `Switch`
- `Select`
- `Button`

## Required States

- `loading`
- `default`
- `saving`
- `saved`
- `error`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
