# Agent Recipes

Use these task playbooks instead of ad-hoc workflows.

## Recipe Template

- Goal
- Inputs
- Constraints
- Steps
- Verification
- Output

## Migrate Existing App To Nadicode (Portable)

- Goal: Apply Nadicode in an existing external app without allowing implementation drift.
- Inputs: Target feature scope (paths), destination repo root.
- Constraints: Follow `docs/nadicode/NADICODE_CONTRACT.md` and recipe files in `docs/nadicode/`.
- Steps:
  1. Run `node <nadicode-repo>/bin/init.mjs` from destination app root.
  2. If scope exists, run `npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md`.
  3. Use one prompt from `docs/nadicode/PROMPT_TEMPLATES.md` with explicit scope.
  4. Migrate one route/feature slice at a time.
  5. Run `npm run ds:check` and `npm run ds:ast-check` before typecheck/build/tests.
- Verification:
  1. `npm run ds:check`
  2. `npm run ds:ast-check`
  3. `npm run ds:task-pack -- --scope input/scope-definition.json --out docs/nadicode/generated/task-pack.md`
  4. `npx tsc --noEmit`
  5. `npm run build`
  6. `npm run test`
- Output: Scoped migration with enforced Nadicode conventions.

## Add A New UI Primitive

- Goal: Add a new component under `src/components/ui/`.
- Inputs: Component name, variants, expected behavior.
- Constraints: Radix + CVA + `forwardRef`, semantic tokens only, no direct `lucide-react` imports.
- Steps:
  1. Create `src/components/ui/<Name>.tsx` using the golden pattern.
  2. Add `src/components/ui/<Name>.test.tsx` with behavioral tests.
  3. Wire demo usage into `src/components/pages/showcase/ComponentsShowcase.tsx`.
- Verification:
  1. `npx tsc --noEmit`
  2. `npm run test`
  3. `npm run docs:check`
- Output: Component + tests + showcase demo.

## Add Or Update A Block

- Goal: Add/update a composed block under `src/components/blocks/`.
- Inputs: Block name, target page context, required props.
- Constraints: Compose existing primitives, avoid speculative abstractions.
- Steps:
  1. Create/update `src/components/blocks/<Name>Block.tsx`.
  2. Add/update corresponding `*.test.tsx`.
  3. Wire usage in `src/components/pages/showcase/BlocksShowcase.tsx`.
- Verification:
  1. `npx tsc --noEmit`
  2. `npm run test`
  3. `npm run docs:check`
- Output: Block + tests + showcase integration.

## Update Tokens Or Theming

- Goal: Change semantic tokens safely.
- Inputs: Token(s) to change and intended visual outcome.
- Constraints: Edit only token sources, no hardcoded component colors.
- Steps:
  1. Update `src/lib/tokens.config.js`.
  2. Ensure propagation in `src/index.css` and `tailwind.config.js` mappings.
  3. Check affected components in light, dark, and bloom styles.
- Verification:
  1. `npx tsc --noEmit`
  2. `npm run test`
  3. `python3 tests/validate_design.py`
  4. `npm run docs:check`
- Output: Consistent tokens across JS config, CSS vars, and Tailwind classes.
