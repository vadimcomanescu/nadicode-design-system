# Design System Evolution Strategy

A design system is not a static artifact; it is a **living product** that serves other products. Its evolution is dictated by the applications built with it.

This document outlines the roadmap for how the Nadicode Design System evolves, the maintenance it requires, and how application choices shape it.

## 1. The Evolutionary Cycle: "Harvesting"

Currently, the system is a **Foundation** consisting of "atoms" and "molecules" (Buttons, Inputs, Dialogs).

**How it evolves:**
Complex components (like a "User Settings Page") are generally **not** built inside the design system first.

1.  **Build in the App:** Build complex features (e.g., a Data Table with filters) inside the consuming application first.
2.  **Validate:** Use it, test it, and refine it within the app context.
3.  **Harvest (Upstream):** When a component is needed in a second place (e.g., "I need this Data Table in the Admin Panel too"), extract it.
4.  **Generalize:** Strip away app-specific logic (e.g., specific API calls) so the component becomes generic.
5.  **Integrate:** Move the cleaned, generic component into the `design-system-bundle` and document it.

## 2. Evolution by Application Type

The *type* of app being built will aggressively mutate the design system.

| If building... | The System evolves to include... |
| :--- | :--- |
| **Enterprise Dashboard** | **Data Density:** Data Grids, Pagination, Charts, Multi-selects, Filtering patterns, Sidebar Layouts. |
| **Consumer Social App** | **Interaction:** Infinite Scrolls, Image Galleries, Avatar Stacks, "Like" animations, Swipeable drawers, Media players. |
| **E-Commerce** | **Conversion:** Product Cards, Shopping Carts, Checkout Steppers, Review Ratings, Promotional Banners. |
| **Marketing / Content** | **Layout & Typography:** Hero sections, Feature Grids, Blog Layouts, complex Typography pairings, Parallax effects. |

**The Core (Buttons/Inputs) stays the same**, but the library of "Organisms" (complex components) grows in the direction of business needs.

## 3. Maintenance Cost ("What You Must Give It")

To keep the system "World Class," it requires three inputs:

### A. Governance (The "No" Power)
Not everything belongs in the design system.
*   **The Input:** Decisions. You must decide *not* to include one-off components (e.g., a seasonal marketing banner).
*   **The Rule:** Only include components used in **2+ places**.
*   **The Risk:** Dumping every unique feature into the system creates a bloated "junkyard" that is hard to maintain.

### B. Infrastructure Updates
*   **The Input:** Maintenance.
*   **The Benefit:** When dependencies update (e.g., React, Tailwind, Radix), you update the System *once*, and all consuming apps inherit the improvements and security fixes.

### C. Documentation (The Next Big Step)
*   **The Input:** Visibility.
*   **Current State:** `App.tsx` serves as a component lab and ad-hoc documentation.
*   **Future State:** As the library grows beyond 20-30 components, `App.tsx` will become unmanageable.
*   **Evolution:** Implement **Storybook**. It allows developing components in isolation and provides automatic documentation for props and variants. This becomes essential when scaling the team.

## Summary: The Phases

*   **Phase 1 (Current):** Foundation (Atoms/Molecules). Strict, high-quality UI Kit.
*   **Phase 2 (Build):** Build the App. The system stays mostly quiet, adding only essential generic components (e.g., `Card`, `Badge`).
*   **Phase 3 (Harvest):** Extract reusable patterns (e.g., `Sidebar`, `DataTable`) from the App into the System.
*   **Phase 4 (Scale):** Introduce Storybook to document the growing library.

**Recommendation:** Do not add "hypothetical" components. **Start building the app.** Let the app requirements dictate what the design system is missing.

## 4. The Genesis Input (The API of Adaptation)

While the automated pipeline handles technical evolution (Harversting), the initial setup of the system for a new project requires human input.

Refer to **`GENESIS_INTAKE.md`** and **`MUTATION_GENOME.md`** for the framework on how to configure the "Seeds" (Visual, Structural, Behavioral) that will condition the Design System before the first line of code is written.

These inputs ensure the system adapts its "Physics" and "Spirit" to the specific reality of the application (e.g., High-Density Fintech vs. Low-Density Consumer App).
