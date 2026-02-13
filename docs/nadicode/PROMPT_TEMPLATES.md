# Nadicode Prompt Templates

Use these prompts in agent consoles (Codex, Claude, OpenCode). Keep scope tight.

## Template 1: Migrate One Feature Slice

```text
Migrate only this scope to Nadicode:
<PASTE_SCOPE_PATHS>

Rules:
- Follow docs/nadicode/NADICODE_CONTRACT.md exactly
- Use Nadicode primitives/components only where equivalents exist
- Use semantic tokens only
- No direct lucide-react imports
- No raw Tailwind color classes
- No changes outside scope unless required to wire providers/imports

Done when all pass:
- npm run ds:check
- npm run ds:ast-check
- npx tsc --noEmit
- npm run build
- npm run test
```

## Template 1B: Factory Scope To Task Pack

```text
Use input/scope-definition.json as source of truth.

First run:
- npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md

Then implement ONLY what is in docs/nadicode/generated/task-pack.md.
Rules:
- Every route must map to a page_intent in docs/nadicode/factory/page-intent-catalog.json
- Every intent must use its mapped recipe under docs/nadicode/recipes/
- No unmapped intent or improvised page architecture

Done when all pass:
- npm run ds:check
- npm run ds:ast-check
- npx tsc --noEmit
- npm run build
- npm run test
```

## Template 2: Build Agents Management Page

```text
Create/replace the agents management page at:
<PASTE_ROUTE_PATH>

Use docs/nadicode/recipes/agents-management-page.md as the exact build recipe.

Required:
- Team/status region, conversation region, work region, composer region
- Required states: empty, loading, running, blocked approval, failed, complete
- Nadicode components and semantic tokens only

Done when all pass:
- npm run ds:check
- npm run ds:ast-check
- npx tsc --noEmit
- npm run build
- npm run test
```

## Template 3: Enforce Contract On Existing Changes

```text
Review and fix only these files:
<PASTE_FILE_LIST>

Fix violations of docs/nadicode/NADICODE_CONTRACT.md:
- icon imports
- raw palette classes
- forbidden tokens/classes
- incorrect overlay usage

Do not refactor unrelated logic.
Run:
- npm run ds:check
- npm run ds:ast-check
- npx tsc --noEmit
```
