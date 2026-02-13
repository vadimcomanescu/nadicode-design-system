# Agent Docs Entry

This folder is the stable entrypoint for coding agents.

## Read Order

1. `AGENTS.md` (non-negotiable rules)
2. `docs/nadicode/NADICODE_CONTRACT.md` (portable binary contract)
3. `docs/nadicode/factory/page-intent-catalog.json` (intent -> recipe contract)
4. `docs/nadicode/recipes/` (page-level composition recipes)
5. `docs/nadicode/PROMPT_TEMPLATES.md` (copy-paste prompts for agent consoles)
6. `docs/agents/recipes.md` (repo task playbooks)
7. `docs/agents/reference-map.md` (deep references)

## Contract

- Keep `AGENTS.md` concise and policy-focused.
- Put procedures in recipes.
- Put large catalogs and rationale in references.
- Avoid hardcoded inventory counts in prose, use `npm run docs:inventory`.
- Keep cross-repo migration instructions in `docs/nadicode/`.

## Validation

Run:

```bash
npm run docs:check
npm run ds:check
npm run ds:ast-check
```

This catches stale paths, stale legacy references, and known drift markers.
