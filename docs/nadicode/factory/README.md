# Nadicode Factory Contracts

Machine-readable and stage-consumable contracts for deterministic app evolution.

## Files

- `page-intent-catalog.json`: maps `page_intent` -> recipe + required components/states/routes
- `PIPELINE_INTEGRATION.md`: how Stage 06 should consume this contract

## Usage

Generate route/task pack from scope:

```bash
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
```

Then implement by recipe and validate:

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```
