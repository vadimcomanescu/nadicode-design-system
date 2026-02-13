# Scaffold Agent Guide

This is the canonical policy for evolving `apps/scaffold`.
All agent entrypoints must resolve to this file.

## Install And Bootstrap

1. `npm install`
2. `npx playwright install --with-deps chromium`
3. `npm run ds:check`
4. `npm run ds:ast-check`
5. `npm run typecheck && npm run lint && npm run test:unit && npm run build`
6. `npm run dev`

## Mandatory Read Order Before Any UI Change

1. `docs/nadicode/NADICODE_CONTRACT.md`
2. `docs/nadicode/factory/page-intent-catalog.json`
3. matching `docs/nadicode/recipes/*.md`
4. `.agents/skills/seed-design-system/SKILL.md`

If an `input/` scope definition file exists, generate deterministic tasks first:

`npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md`

Then implement only from that task pack.

## Non-Negotiable Implementation Rules

- Use Nadicode primitives from `@/components/ui/*` and blocks from `@/components/blocks/*`.
- Use semantic tokens only, no raw Tailwind palette classes.
- Never import icons from `lucide-react` directly, use `@/components/ui/icons`.
- Never use forbidden tokens/classes (`text-foreground`, `text-muted-foreground`, `border-error`, `bg-black/80`).
- Use glass tiers only (`glass-panel`, `glass-floating`, `glass-overlay`).
- Do not invent ad-hoc replacements if a primitive is missing, stop and report it.

## Required Gates

Before commit:

1. `npm run ds:check`
2. `npm run ds:ast-check`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run test:unit`
6. `npm run build`

Before merge/release:

1. `npm run test:e2e`

## Skill And Docs Availability

- Skill path: `.agents/skills/seed-design-system/SKILL.md`
- Reference docs: `.agents/skills/seed-design-system/references/`
- Next.js version docs: `.next-docs/`

Do not rely on memory for Next.js behavior when `.next-docs/` exists.
