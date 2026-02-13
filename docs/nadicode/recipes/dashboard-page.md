# Recipe: Dashboard Page

Use this recipe for overview/summary surfaces with KPIs, trends, and quick actions.

## Route Pattern

- `/dashboard`

## Required Composition

1. Header with page title, time filter, and primary action.
2. KPI row using `Card` or `AgentMetricsCard`.
3. Trends section with `Tabs` and chart components.
4. Recent activity section with `Timeline` or table.

## Required Components

- `Card`
- `AgentMetricsCard` (or equivalent metric card)
- `Tabs`
- `AreaChart` / `BarChart` / `LineChart`
- `Badge`

## Required States

- `loading`
- `empty`
- `has-data`
- `error`

## Styling Rules

- Use semantic tokens only.
- Use `.glass-panel` for structural dashboard containers.
- No raw palette utility classes.

## Verification

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
