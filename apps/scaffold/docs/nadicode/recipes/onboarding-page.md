# Recipe: Onboarding Page

Use this recipe for first-run setup workflows.

## Route Pattern

- `/onboarding`

## Required Composition

1. Stepper or wizard shell with progress.
2. One step per logical action group.
3. Explicit next/back controls and completion checkpoint.

## Required Components

- `FormWizard`
- `Progress`
- `Card`
- `Button`

## Required States

- `step-active`
- `step-valid`
- `step-error`
- `complete`

## Verification

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
