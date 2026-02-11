# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a design system built with React 19, TypeScript, Vite, Tailwind CSS 4, and Radix UI primitives. The system follows a "dark glassmorphism" aesthetic with a centralized token system.

**Key Stack:**
- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS 4 (using @tailwindcss/postcss)
- Radix UI for accessible component primitives
- Vitest + Testing Library for tests
- class-variance-authority (CVA) for variant management

## Development Commands

```bash
# Development server (runs on http://localhost:5173 by default)
npm run dev

# Run all tests
npm run test

# Run tests in watch mode
npx vitest

# Type checking
npx tsc -b

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Single Source of Truth for Design Tokens

The design system uses a centralized token architecture where `src/lib/tokens.config.js` is the **master definition**:

1. **tokens.config.js** (Pure JS) -> Master token source
2. **tailwind.config.js** -> Imports tokens and extends Tailwind theme
3. **tokens.ts** -> Re-exports tokens with TypeScript types for component usage

**Critical Rule:** Never define colors, spacing, shadows, or typography values directly in components or Tailwind config. Always reference tokens.

### Theme Support: Light + Dark Mode

**Architecture:**
- `tokens.config.js` defines dual color palettes (`colorTokens.dark` and `colorTokens.light`)
- `index.css` maps tokens to CSS variables on `:root` (light) and `.dark` (dark)
- `tailwind.config.js` uses `darkMode: 'class'` strategy with CSS variable references
- `ThemeProvider` (`src/lib/ThemeProvider.tsx`) manages theme state with localStorage persistence
- `ThemeToggle` component (`src/components/ui/ThemeToggle.tsx`) provides user-facing toggle
- `@custom-variant dark (&:is(.dark *))` enables the `.dark` class selector

**Semantic color tokens:** `background`, `surface`, `border`, `primary`, `secondary`, `accent`, `destructive`, `success`, `warning`, `info`, `muted`, `overlay`, `text-primary`, `text-secondary`, `text-tertiary`

**Default appearance:** Dark mode (`.dark` class on root). Light mode activates when `.dark` is removed.

### Component Architecture

Components follow the **Radix UI + CVA pattern**:

1. **Radix UI Primitives** provide accessible, unstyled foundations (Dialog, Select, Checkbox, Switch, etc.)
2. **CVA (class-variance-authority)** manages variant logic declaratively
3. **Utility Function `cn()`** (`src/lib/utils.ts`) merges Tailwind classes safely using `clsx` + `tailwind-merge`
4. **Slot Pattern** (@radix-ui/react-slot) enables polymorphic components via `asChild` prop

### File Structure

```
src/
  components/
    ui/          # Core UI components (Button, Input, Dialog, etc.)
    layout/      # Layout components (Grid)
  lib/
    tokens.config.js  # Master design tokens (JS)
    utils.ts          # Utility functions (cn helper)
  test/
    setup.ts     # Vitest setup with @testing-library/jest-dom
  tokens.ts        # TypeScript re-export of tokens
  App.tsx          # Component Lab for testing
```

### Testing Standards

- **Framework:** Vitest with jsdom environment
- **Library:** @testing-library/react + @testing-library/jest-dom
- **Co-location:** Tests live next to components as `ComponentName.test.tsx`
- **Coverage:** All interactive components have accessibility and interaction tests
- **Setup:** Global test setup in `src/test/setup.ts`

**Test Execution:**
- `npm run test` - Run all tests once
- `npx vitest` - Run tests in watch mode
- `npx vitest ComponentName` - Run specific test file

### TypeScript Configuration

Uses TypeScript project references:
- `tsconfig.json` - Root config (references only)
- `tsconfig.app.json` - Application source code
- `tsconfig.node.json` - Vite config and build tools

## Component Development Guidelines

### When Adding New Components

1. **Use Radix UI primitives** when available for accessibility
2. **Define variants with CVA** for maintainable styling logic
3. **Support `asChild` prop** via Slot pattern for polymorphism
4. **Forward refs** for proper DOM access
5. **Write co-located tests** covering accessibility and interactions
6. **Export both component and variants** (for composition)

### Styling Conventions

- Use Tailwind utility classes, never inline styles
- Reference design tokens via Tailwind (e.g., `bg-surface`, `text-text-primary`)
- Apply `cn()` helper when merging dynamic classes
- Use CVA for variant management, not conditional class strings
- Glassmorphism aesthetic: subtle borders, soft shadows, backdrop-blur effects

### Accessibility Requirements

- All interactive components must use Radix UI primitives or proper ARIA
- Keyboard navigation must work (Tab, Enter, Escape, Arrow keys)
- Focus indicators must be visible (using `focus-visible:ring-1`)
- Screen reader labels must be present (aria-label or associated labels)

## Key Dependencies

**Core:**
- `react`, `react-dom` - React 19
- `tailwindcss`, `@tailwindcss/postcss` - Tailwind 4
- `class-variance-authority` - Variant management
- `clsx`, `tailwind-merge` - Class merging utilities

**Radix UI Primitives:**
- `@radix-ui/react-slot` - Polymorphic component pattern
- `@radix-ui/react-dialog` - Modal/dialog system
- `@radix-ui/react-select` - Accessible dropdowns
- `@radix-ui/react-checkbox`, `@radix-ui/react-switch` - Form controls
- `@radix-ui/react-label`, `@radix-ui/react-separator` - Utilities

**Icons & Utilities:**
- `lucide-react` - Icon library
- `tailwindcss-animate` - Animation utilities

## ESLint Configuration

Uses modern flat config (`eslint.config.js`):
- TypeScript support via `typescript-eslint`
- React Hooks rules via `eslint-plugin-react-hooks`
- React Refresh rules for Vite HMR
- Ignores `dist/` directory

## Commit Standard

- Format: `type(scope): subject` (scope optional)
- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- Subject: imperative, <= 72 chars, no trailing period
- Body (optional): 1-5 lines focused on *why*
