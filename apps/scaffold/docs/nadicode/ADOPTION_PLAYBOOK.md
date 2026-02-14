# Nadicode Adoption Playbook

This playbook is for applying Nadicode to an existing app with agents.

## One-Time Setup In Target Project

Run from the target app root:

```bash
npx --yes github:vadimcomanescu/nadicode-design-system
```

After first install, use this stable update command in the target app:

```bash
npm run ds:update
```

Then verify:

```bash
npm run ds:check
npm run ds:ast-check
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
npx tsc --noEmit
npm run build
```

## What `init` installs

- Nadicode source primitives and blocks
- The Seed agent skill under `.agents/skills/seed-design-system/`
- `docs/nadicode/` contract, recipes, and prompt templates
- `docs/nadicode/factory/page-intent-catalog.json`
- `scripts/ds-check.mjs`
- `scripts/ds-ast-check.mjs`
- `scripts/ds-generate-task-pack.mjs`
- `scripts/ds-update.mjs`
- `package.json` script: `ds:check`
- `package.json` script: `ds:ast-check`
- `package.json` script: `ds:task-pack`
- `package.json` script: `ds:update`

## How To Work With Agents (Simple)

1. Always scope migrations by feature or route, not "entire app".
2. If scope-definition exists, generate `docs/nadicode/generated/task-pack.md` first.
3. Use `docs/nadicode/PROMPT_TEMPLATES.md` prompts as-is.
4. Require this gate on every migration PR:
   - `npm run ds:check`
   - `npm run ds:ast-check`
   - `npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md`
   - `npx tsc --noEmit`
   - `npm run build`

## Recommended Migration Order

1. Layout and shell
2. Forms and controls
3. Tables and list views
4. Dialogs and overlays
5. Agentic surfaces (chat, timeline, terminal, approvals)

## Do Not Do This

- Do not migrate whole app in one agent prompt.
- Do not allow direct `lucide-react` imports in feature code.
- Do not allow raw Tailwind palette classes.
- Do not let agents invent replacement primitives when Nadicode components exist.

## If Agents Stall

- Reduce scope to one route or one feature folder.
- Re-run with a stricter prompt from `docs/nadicode/PROMPT_TEMPLATES.md`.
- If a primitive is missing, add it intentionally in Nadicode first, then continue migration.
