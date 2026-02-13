# Recipe: Analytics Page

Use this recipe for trend analysis and chart-heavy views.

## Route Pattern

- `/analytics`

## Required Composition

1. Filter bar for timeframe and segment.
2. KPI summary cards.
3. Primary trend chart and supporting breakdown charts.
4. Insights panel with context and anomalies.

## Required Components

- `AreaChart`
- `BarChart`
- `LineChart`
- `Card`
- `Tabs`

## Required States

- `loading`
- `empty`
- `has-data`
- `error`
- `date-filtered`

## Verification

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
