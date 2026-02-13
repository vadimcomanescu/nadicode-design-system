# Agent Recipes

Use these task playbooks instead of ad-hoc workflows.

## Recipe Template

- Goal
- Inputs
- Constraints
- Steps
- Verification
- Output

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
