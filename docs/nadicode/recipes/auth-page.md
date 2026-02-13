# Recipe: Auth Page

Use this recipe for login/signup/reset flows.

## Route Patterns

- `/login`
- `/signup`
- `/reset-password` (optional)

## Required Composition

1. Centered auth container with clear heading and subtext.
2. Stacked form controls with explicit labels.
3. Primary action button and secondary links.
4. Error alert area and loading feedback.

## Required Components

- `Card`
- `Label`
- `Input`
- `PasswordInput`
- `Button`
- `Alert`

## Required States

- `default`
- `submitting`
- `error`
- `success`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
