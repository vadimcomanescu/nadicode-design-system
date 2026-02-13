# Nadicode Agent Kit

Use this folder in destination projects to keep agent output consistent.

## Read Order

1. `docs/nadicode/NADICODE_CONTRACT.md`
2. `docs/nadicode/factory/page-intent-catalog.json`
3. matching recipe in `docs/nadicode/recipes/`
4. `docs/nadicode/PROMPT_TEMPLATES.md`

## Factory Mode

Generate deterministic tasks from scope:

```bash
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
```

## Validation

```bash
npm run ds:check
```

Then run typecheck/build/tests before handoff.
