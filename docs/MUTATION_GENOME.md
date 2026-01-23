# The Mutation Genome: Design System Seeds

To adapt a generic Base Design System into a specific, living application that feels "native" to its reality, you must inject specific inputs. These "Seeds" act as the genetic code that mutates the system's appearance, structure, and behavior.

This document analyzes the **5 Dimensions of Seeds** required to fully configure the system for a specific product context.

## 1. The Operational Seed (Business Logic & Volatility)
*Dictates how the system handles "Time," "Change," and "Value".*

*   **Data Volatility (Static vs. Real-time)**
    *   *Static (e.g., Blog, Settings):* The system settles for standard loading states.
    *   *High Volatility (e.g., Crypto, Trading):* The system **must** mutate to include "Flash Updates" (value change animations) and optimistic UI patterns. It demands `Monospace/Tabular` typography for numbers so rapid changes don't jitter the layout.
*   **Monetization Model**
    *   *Subscription/Enterprise:* The UI is clean, focused purely on utility.
    *   *Ad-Supported/Freemium:* The system **must** reserve "Sacred Spaces" for upsells or ads. You need "Promotional Slot" components that intentionally break the grid structure to grab attention.

## 2. The Environmental Seed (Context of Use)
*Dictates the physical constraints of the user's reality.*

*   **Lighting Conditions**
    *   *Controlled (Office/Home):* Standard contrast is acceptable. Glassmorphism and subtle shadows work well.
    *   *Uncontrolled (Sunlight/Warehouse/Field):* Glassmorphism fails. The system must mutate to **High Contrast**, flat borders, and zero transparency to remain legible under glare.
*   **Device Fragmentation**
    *   *Standard (Phone/Laptop):* Standard responsive breakpoints (`sm`, `md`, `lg`) apply.
    *   *Exotic (TV/Watch/Kiosk):* The system needs massive font scaling, specific "Focus States" (for remote controls), or "Touch Zones" (min 60px for kiosks).

## 3. The Cognitive Seed (User Proficiency)
*Dictates the "Helpfulness" vs. "Efficiency" of the system.*

*   **User Expertise**
    *   *Novice (Public/Consumer):* The system uses **Explicit Labels** (Icon + Text). It avoids "Hidden Gestures" (right-click, swipe). It creates wide "Safe Zones" to prevent accidental clicks.
    *   *Pro (DevTool/Trader/Admin):* The system mutates to **Icon-Only** buttons (to save space). It relies heavily on "Density," "Keyboard Shortcuts," and "Context Menus." It assumes the user knows the tool.
*   **Attention Span**
    *   *Browsing (Consumption):* The system prioritizes **Media Containers** and hides chrome (buttons/nav) until interacted with.
    *   *Tasking (Creation/Work):* The system keeps all tools visible (fixed toolbars) because the user is "working," not just "viewing."

## 4. The Cultural Seed (Language & Geography)
*Dictates the spatial flexibility of the system.*

*   **Linguistic Density**
    *   *Compact (English):* Standard button widths and layouts.
    *   *Verbose (German/French):* The system must use flexible/fluid widths for buttons and navigation. Fixed-width sidebars often break.
*   **Directionality**
    *   *LTR (Western):* Standard layout.
    *   *RTL (Arabic/Hebrew):* The system must flip all margins, paddings, and icon placements (`startIcon` becomes `endIcon`).

## 5. The Structural Seed (Domain Modeling)
*Dictates the "Shape" and "Topology" of the components.*

*   **Object Relationships**
    *   *Flat List:* System evolves extensive `Table` and `List` variants.
    *   *Hierarchical (Tree):* System evolves `TreeViews`, `Breadcrumbs`, and `Nested Indentation` logic.
    *   *Network (Graph):* System evolves `Canvas` or `Node` visualizers.
*   **Information Density**
    *   *High Density:* Small fonts (12/13px), tight padding, grid layouts.
    *   *Low Density:* Large fonts (16/18px), spacious cards, generous whitespace.
*   **Mutability**
    *   *Read-Only:* Components render primarily as Text/Cards.
    *   *Editable:* Components render primarily as Forms/Inputs.
    *   *Inline-Editable:* The system creates hybrid "Text-becomes-Input-on-click" components.

---

## The Configuration Manifest

To adapt the Base Design System, you must conceptually fill out this manifest for your specific application:

```typescript
// The "Genome" of your specific App
export const APP_SEEDS = {
  // 1. OPERATION
  volatility: 'real-time',      // Need tabular nums & flash animations?
  monetization: 'enterprise',   // Need ad slots or clean UI?

  // 2. ENVIRONMENT
  lighting: 'uncontrolled',     // Sunlight? Disable glassmorphism.
  inputMethod: 'touch-kiosk',   // Kiosk? 60px minimum touch targets.

  // 3. COGNITIVE
  proficiency: 'novice',        // Novice? No icon-only buttons.
  focus: 'consumption',         // Consumption? Hide toolbars on scroll.

  // 4. CULTURAL
  language: 'german',           // Verbose? No fixed widths.
  direction: 'ltr',

  // 5. DOMAIN (The Skeleton)
  density: 'high',              // 50 rows per screen?
  structure: 'hierarchical',    // Folders/Trees?
  mutability: 'read-write'      // CRUD heavy?
};
```

**Summary:**
*   **Domain Modeling** tells the system **WHAT** data to display.
*   **Interaction Design** tells the system **HOW** it moves.
*   **Brand** tells the system **WHO** it is.
*   **Environment, Proficiency, & Culture** tell the system **WHERE** and **TO WHOM** it is speaking.
