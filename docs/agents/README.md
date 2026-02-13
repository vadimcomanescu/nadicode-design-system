# Agent Docs Entry

This folder is the stable entrypoint for coding agents.

## Read Order

1. `AGENTS.md` (non-negotiable rules)
2. `docs/agents/recipes.md` (task playbooks)
3. `docs/agents/reference-map.md` (deep references)

## Contract

- Keep `AGENTS.md` concise and policy-focused.
- Put procedures in recipes.
- Put large catalogs and rationale in references.
- Avoid hardcoded inventory counts in prose, use `npm run docs:inventory`.

## Validation

Run:

```bash
npm run docs:check
```

This catches stale paths, stale legacy references, and known drift markers.
