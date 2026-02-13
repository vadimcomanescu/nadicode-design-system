# Recipe: CRUD List + Detail

Use this recipe for entity management pages where users browse, filter, and inspect records.

## Route Patterns

- `/[entity]`
- `/[entity]/[id]`

## Required Composition

1. List view with search, filter, sort, and pagination.
2. Bulk actions for selected rows (if domain supports bulk).
3. Detail view with entity summary, state badge, and related records.
4. Action controls for edit, transition, archive/delete.

## Required Components

- `DataTable` or `Table`
- `Pagination`
- `Input` / `Select` for filters
- `Badge` for state
- `Dialog` or `Sheet` for quick-edit/detail

## Required States

- `loading`
- `empty`
- `has-data`
- `error`
- `filtering`

## Verification

```bash
npm run ds:check
npx tsc --noEmit
npm run build
```
