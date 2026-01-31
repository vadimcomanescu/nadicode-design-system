# Seed Design System Agent Guide

This document is the definitive guide for agents and developers working on the `seed-design-system`. It outlines the core philosophy, technical constraints, and patterns required to maintain the system's "ultra-realistic" aesthetic and stability.

## 1. Design Philosophy

The system aims for a **premium, ultra-realistic aesthetic**. Key characteristics:
-   **Deep Blacks**: Dark mode uses `#050505` (RGB `5 5 5`) background, not pure black, to create depth.
-   **Glassmorphism**: Extensive use of backdrop blur (`backdrop-blur-md`, `backdrop-blur-xl`) and subtle gradients.
-   **Subtle Gradients**: Interfaces should feel "alive" with micro-interactions and soft glows (e.g., Mouse Glow effect).
-   **High Contrast**: Text and interactive elements must maintain accessibility while preserving the "moody" look.

## 2. Color System & Tokens

### 2.1. Variable Format (CRITICAL)
Due to `tailwind.config.js` configuration, CSS variables must follow strict formatting generally, but with a specific caveat for the Sidebar:

*   **Standard Colors**: Defined in `src/index.css` as **SPACE-SEPARATED RGB values**.
    *   Example: `--color-background: 250 250 250;`
    *   Usage in Tailwind: `rgb(var(--color-background) / <alpha>)`

*   **Sidebar Colors**: ALSO defined as **SPACE-SEPARATED RGB values**.
    *   **Reason**: Previous HSL formats (`hsl(...)`) caused rendering issues (Yellow Sidebar bug) when Tailwind config incorrectly wrapped them or browser interpretation failed.
    *   **Rule**: ALWAYS use RGB values for consistency.
    *   Example: `--sidebar-background: 5 5 5;` (NOT `hsl(240 5% 10%)`)

### 2.2. Theme Token Structure
Tokens are split into `base` (Light) and `.dark` (Dark) layers in `src/index.css`.
-   **Light Mode**: Neutral grays (`250 250 250`), standard whites (`255 255 255`).
-   **Dark Mode**: Deep grays (`5 5 5`, `23 23 26`), blue accents (`59 130 246`).

## 3. Layout Patterns

### 3.1. Sidebar Component (Preferred)
The `src/components/ui/Sidebar.tsx` component is the **standard** for application shells.
-   **Responsiveness**: AUTOMATIC. It uses `SidebarProvider` to detect mobile state and renders a `Sheet` instead of a sidebar on small screens.
-   **Usage**: Use `<Sidebar>` within a `<SidebarProvider>`.

### 3.2. Resizable Panels (Advanced)
Use `react-resizable-panels` (`src/components/ui/Resizable.tsx`) for custom, complex layouts (e.g., IDE-like panels).
-   **Responsiveness**: MANUAL. The library does not handle responsiveness automatically.
-   **Pattern**: To hide a panel on mobile, apply utility classes directly to the `ResizablePanel`.
    *   Example: `className="hidden md:flex"`
    *   *Note*: Ensure strictly one panel remains visible at all times to prevent layout collapse.

### 3.2. Glass Cards
Use the `glass` or `glass-card` utilities for containers to achieve the frosted glass effect.
-   `<Card variant="glass">` is a common pattern.

## 4. Component Extension

When creating new components:
1.  **Check `tokens.ts`**: Ensure you are using semantic tokens (`bg-surface`, `text-muted`) rather than hardcoded hex values.
2.  **Interactive States**: All interactive elements must have `:hover` and `:active` states defined via tokens (e.g., `bg-surface-hover`).
3.  **Mouse Effects**: Wrap global layouts in standard containers but ensure `MouseGlow` (in `App.tsx`) is present for the background ambient effect.

## 5. Key Files

-   `src/index.css`: **The Truth**. All CSS variables and base styles.
-   `tailwind.config.js`: Maps CSS variables to Tailwind classes. **Check this before adding new colors.**
-   `src/tokens.ts`: TypeScript definition of tokens for JS usage (sync visually with CSS).
-   `src/components/ui/MouseEffect.tsx`: Controls the global mouse glow (Dot pattern in Dark mode).

## 6. Known Issues / "Gotchas"

-   **Yellow Sidebar**: Caused by HSL variables being interpreted as RGB in Tailwind config. **Fix**: Use RGB values in `index.css`.
-   **Violet Glow**: Often caused by mixed color spaces in gradients. Stick to the defined `--color-accent` variables.
-   **Mobile Overflow**: `ResizablePanelGroup` needs explicit hiding on mobile to prevent sidebars from crushing content.

## 7. Verification Protocols

**Strict Rule**: When modifying the design system, you MUST verify integrity using TWO methods:

### 7.1. Color Palette Validation
Run the verification script to ensure all HEX values are properly tokenized and no broken variables exist.
```bash
npx tsx scripts/verify_palette.ts
```

### 7.2. Visual Verification (CRITICAL)
**You must verify all changes visually.**
1.  Run the local server (`npm run dev`).
2.  Use the `browser_subagent` tool to visit the running app (usually `http://localhost:5173`).
3.  Take screenshots of the new components to confirm:
    -   Glassmorphism effects are rendering (blur/borders visible).
    -   Text contrast is readable.
    -   Layouts are not broken on different viewports.
**Do not trust code updates alone.** CSS issues (like broken Tailwind classes) often pass build but fail at runtime.


---
*Generated by Antigravity Agent*
