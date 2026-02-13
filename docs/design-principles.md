# Design Principles & Micro-interactions

> For the complete, enforceable design opinions covering all 10 domains (navigation,
> data visualization, typography, layout, effects, forms, feedback, responsive,
> spacing, accessibility), see **[`OPINIONS.md`](./OPINIONS.md)**.

This document outlines the core design philosophies and interaction rules for the Seed Design System.

## Affordance & Micro-interactions

### The "If it lifts, it clicks" Rule

We follow a strict affordance hierarchy to distinguish between interactive and passive elements.

1.  **Interactive Elements (Active)**
    *   **Behavior**: Elements that perform an action (navigation, selection) should "lift" on hover.
    *   **Visual Cue**: `translate-y-[-4px]`, increased shadow, highlight border.
    *   **Implementation**: Use the `interactive` prop on the `Card` component.
    *   **Example**: Pricing plans, Feature grid items.

2.  **Passive Elements (Static)**
    *   **Behavior**: Content to be consumed (read-only). Should remain grounded.
    *   **Visual Cue**: No movement, standard glass effect.
    *   **Implementation**: Do NOT use the `interactive` prop. Do NOT manually add `hover:scale` or `hover:-translate-y` classes.
    *   **Example**: Testimonials, Analytics stats, Info panels.

### Golden Rules

> [!IMPORTANT]
> **There is only one Card style.** Do not use variants.

*   **Standard Card**: `<Card>...</Card>` (Automatically renders Pixel Glass aesthetic).
*   **Interactive**: `<Card interactive>...</Card>` (Adds lift and glow).
*   **Forbidden**: `<Card variant="...">`, `<Card className="hover:...">`.

## Aesthetic Guidelines

### Glassmorphism & Pixelation
*   **The Standard**: All cards use the **Premium Pixel Glass** style (Glass Utility + Pixel Overlay).
*   **Depth**: Enforced automatically by the `Card` component.
*   **Floating**: Use `glass-floating` utility only for elements that need to appear detached from the surface (e.g., modals, floating toolbars).

### Borders
*   **Subtle**: Standard borders should be `border-border/50`.
*   **Highlight**: Interactive borders (on hover) should represent the brand or action color (e.g., `hover:border-primary/50` or `hover:border-accent/50`).
