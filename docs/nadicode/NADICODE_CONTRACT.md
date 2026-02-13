# Nadicode Contract

Use this file as the first and only policy contract in destination apps.

## Scope

- Apply this contract only to the explicit migration scope you were given.
- Do not edit files outside scope unless the build is blocked by a required wiring step.

## Required Read Order

1. `docs/nadicode/NADICODE_CONTRACT.md`
2. `docs/nadicode/factory/page-intent-catalog.json`
3. `docs/nadicode/recipes/` (recipe matching each `page_intent`)
4. `.agents/skills/seed-design-system/SKILL.md`

## Non-Negotiable Rules

1. Use Nadicode primitives from `@/components/ui/*` and Nadicode blocks from `@/components/blocks/*`.
2. Use semantic tokens only (`bg-background`, `bg-surface`, `text-text-primary`, `border-border`, etc.).
3. Never import icons from `lucide-react` directly, import from `@/components/ui/icons`.
4. Never use `bg-black/80` for overlays, use `bg-overlay/80`.
5. Never use `text-foreground`, `text-muted-foreground`, or `border-error`.
6. Never use raw Tailwind palette classes like `bg-zinc-900` or `text-gray-500`.
7. Use glass tiers for containers: `.glass-panel`, `.glass-floating`, or `.glass-overlay`.
8. New forms must use stacked labels (`Label` above control), never inline/floating labels.
9. If a needed primitive is missing, stop and report it. Do not invent ad-hoc replacements.

## Page Composition Matrix

- Page architecture MUST be selected by `page_intent` from `docs/nadicode/factory/page-intent-catalog.json`.
- If an intent is missing from the catalog, stop and report it (do not improvise).
- Routes without a mapped intent + recipe are invalid.

## Scope Derivation (Factory Mode)

If `scope-definition.json` is available, generate a deterministic task pack before coding:

```bash
npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md
```

Then implement only from the generated task pack.

## Done Criteria

All of these must pass:

```bash
npx tsc --noEmit
npm run build
npm run lint
npm run test
npm run ds:check
```

If any command fails, the task is not complete.
