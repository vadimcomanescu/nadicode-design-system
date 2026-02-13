# Recipe: CRUD Form

Use this recipe for create/edit flows.

## Route Patterns

- `/[entity]/new`
- `/[entity]/[id]/edit`

## Required Composition

1. Page title and concise helper text.
2. Grouped form sections in `Card` containers.
3. Stacked labels only (`Label` above control).
4. Persistent actions row (`Save`, `Cancel`, optional `Delete`).

## Required Components

- `Form`
- `Field`
- `Label`
- `Input` / `Textarea` / `Select` / `Switch` as needed
- `Button`
- `Alert` for submit errors

## Required States

- `pristine`
- `dirty`
- `submitting`
- `success`
- `validation-error`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
