# Nadicode Factory Integration

This file describes how Nadicode Stage 06 should consume Nadicode design-system contracts deterministically.

## Goal

Convert scope-definition use cases into route-level implementation tasks with fixed recipes and acceptance gates.

## Required Inputs

- input/scope-definition.json
- `docs/nadicode/factory/page-intent-catalog.json`
- `docs/nadicode/NADICODE_CONTRACT.md`

## Deterministic Build Protocol

1. Generate task pack from scope:

```bash
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
```

2. Stage 06 spec-writer MUST include docs/nadicode/generated/task-pack.md as a hard dependency.
3. Stage 06 build MUST implement route batches by intent from the task pack.
4. Route implementation is valid only if the mapped recipe exists and is referenced.

## Required Stage 06 Gates

```bash
npm run ds:check
npm run ds:ast-check
npx tsc --noEmit
npm run build
```

Optional, if tests are configured for generated app:

```bash
npm run test
```

## Failure Conditions

Fail stage if any occur:

- Unmapped `page_intent` in scope file
- Recipe missing for mapped intent
- Route generated without recipe coverage
- `ds:check` fails
- `ds:ast-check` fails
- Build/typecheck fails

## Stage Prompt Upgrade (Required)

Add to Stage 06 spec-writer prompt:

- "Run `npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md` and use it as authoritative route/recipe contract."

Add to Stage 06 build prompt:

- "No route implementation without mapped intent + recipe from docs/nadicode/generated/task-pack.md."

## Why this works

It removes agent choice at page architecture level:

- `page_intent` decides recipe
- recipe decides composition and states
- gates enforce compliance

This is the required shape for factory-grade reliability.
