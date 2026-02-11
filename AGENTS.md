# CLAUDE.md / AGENTS.md (Single Source of Truth)

This file is the canonical agent guide for this repository. `CLAUDE.md` symlinks here.

# Seed Design System Agent Guide

## Quick Reference

| Item | Value |
|------|-------|
| Stack | React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI, CVA |
| Components | 96 UI primitives, 35 blocks, 10 pages, 7 chart primitives |
| Tokens | `src/lib/tokens.config.js` -> `src/index.css` -> `tailwind.config.js` |
| Theme | Light + Dark via CSS variables, `darkMode: 'class'` |
| Tests | Vitest + Testing Library, co-located `*.test.tsx` |
| Dev | `npm run dev` (port 5173) |
| Type check | `npx tsc -b` |
| Test | `npm run test` |
| Lint | `npm run lint` |

## 1. Design Philosophy

The system is **OPINIONATED** and **PREMIUM**.
- **No Compromise**: Never trade visual fidelity for code simplicity. The default component must look expensive, layered, and high-fidelity.
- **Premium Pixel Glass**: All containers use the **Hybrid Aesthetic**: glass base (blur, noise, emboss, shadows via `.glass-panel`) + pixel overlay (subtle grid texture).

Key characteristics:
- **Deep Blacks**: Dark mode uses `#050505` (RGB `5 5 5`).
- **Rich Texture**: Always prioritize depth (layers, borders, noise) over flat surfaces.
- **Glassmorphism**: Extensive use of backdrop blur.

### 1.1. Critical Constraints (DO NOT IGNORE)
> [!CAUTION]
> **NEVER FLATTEN THE DESIGN.**
> When enforcing "opinionated" rules, do NOT strip away the glassmorphism, noise, or emboss effects. The "Opinionated" choice is always the **highest fidelity** choice.

### 1.2. Iconography (STRICT)
> [!IMPORTANT]
> **ALWAYS use `AnimatedIcon`.**
> Never use static `lucide-react` icons directly (e.g., `<Home />`). Use `<AnimatedIcon icon={Home} />` for a living, premium feel.
> - The component auto-selects contextual animations per icon (arrows slide, settings rotate, bell rings).
> - Override with `animation` prop: `"scale" | "rotate" | "wiggle" | "shake" | "pulse" | "slideRight" | "slideLeft" | "ring"`.
> - Default fallback: `"scale"`.

## 2. Token Architecture

### 2.1. Three-File Flow

```
tokens.config.js (master definition, both light/dark palettes)
        |
        v
  index.css (CSS custom properties on :root and .dark)
        |
        v
  tailwind.config.js (maps CSS vars to Tailwind classes)
```

**Rule**: Never define colors directly in components. Always reference tokens via Tailwind classes.

### 2.2. Semantic Color Tokens

| Token | Tailwind Class | Purpose |
|-------|---------------|---------|
| background | `bg-background` | Page background |
| surface | `bg-surface` | Card/panel backgrounds |
| surface-hover | `bg-surface-hover` | Hover state for surfaces |
| border | `border-border` | Default borders |
| primary | `bg-primary`, `text-primary` | Primary actions/text |
| secondary | `bg-secondary` | Secondary elements |
| accent | `bg-accent`, `text-accent` | Brand accent (Electric Indigo) |
| destructive | `bg-destructive`, `text-destructive` | Danger/delete actions |
| success | `bg-success`, `text-success` | Success states |
| warning | `bg-warning`, `text-warning` | Warning states |
| info | `bg-info`, `text-info` | Informational states |
| overlay | `bg-overlay/80` | Modal/dialog overlays |
| muted | `bg-muted` | Subdued backgrounds |
| muted-foreground | `text-muted-foreground` | Subdued text |
| text-primary | `text-text-primary` | Primary body text |
| text-secondary | `text-text-secondary` | Secondary body text |
| text-tertiary | `text-text-tertiary` | Tertiary/placeholder text |

### 2.3. CSS Variable Format
Variables use **space-separated RGB values** (not hex, not HSL):
```css
--color-background: 250 250 250;  /* Light */
--color-background: 5 5 5;        /* Dark */
```

### 2.4. Typography
**Font**: `Satoshi` (Fontshare CDN), geometric sans-serif.
**Pixel fonts**: `GeistPixel`, `GeistPixelGrid`, `GeistPixelLine` for decorative use.

## 3. Component Patterns (Golden Pattern)

Every component follows the **Radix UI + CVA + forwardRef** pattern:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { sm: "...", default: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

**Rules**:
1. Use `cn()` (from `@/lib/utils`) for all class merging. Never concatenate strings.
2. Use CVA for any component with variants.
3. Use `forwardRef` on all components.
4. Use `asChild` + `Slot` for polymorphic components.
5. Export both the component and its variants for composition.

## 4. File Structure

```
src/
  components/
    ui/           # Core primitives (Button, Input, Dialog, etc.)
    ui/charts/    # Chart primitives (AreaChart, BarChart, etc.)
    ui/stepper/   # Multi-step stepper components
    blocks/       # Composed UI blocks (*Block.tsx naming)
    pages/        # Full page compositions
    layout/       # Layout components (Grid)
  lib/
    tokens.config.js  # Master token definitions
    utils.ts          # cn() helper
    ThemeProvider.tsx  # Theme context + toggle logic
    useToken.ts       # Runtime token access hook
  tokens.ts           # TypeScript re-export of tokens
  App.tsx             # Component Lab (dev preview)
```

**Naming conventions**:
- UI primitives: PascalCase (`Button.tsx`, `Dialog.tsx`)
- Blocks: PascalCase with `Block` suffix (`HeroBlock.tsx`, `PricingBlock.tsx`)
- Tests: Co-located (`Button.test.tsx` next to `Button.tsx`)

## 5. Component Inventory

### UI Primitives (96)

**Forms**: Accordion, Button, ButtonGroup, Calendar, Checkbox, Combobox, Command, DatePicker, DateRangePicker, Field, Form, Input, InputGroup, InputOTP, Label, NativeSelect, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup

**Display**: Alert, AlertDialog, Avatar, AvatarUpload, Badge, Breadcrumb, Card, Carousel, Collapsible, ContextMenu, DataTable, Dialog, Drawer, DropdownMenu, Empty, HoverCard, Kbd, Menubar, NavigationMenu, Pagination, Popover, Progress, PromoCard, RoleBadge, ScrollArea, Separator, Sheet, Sidebar, Skeleton, Spinner, Table, Tabs, Toast, Toaster, Tooltip, Typography

**Effects**: AnimatedBackground, AnimatedIcon, InfiniteSlider, MouseEffect, PixelBackground, PixelReveal, ProgressiveBlur

**Charts** (in `ui/charts/`): AreaChart, BarChart, HeatmapChart, LineChart, PieChart, RadarChart, RadialBarChart

**AI / Voice Agent**: AgentStatus, AudioWaveform, ConversationThread, FileUpload, FormWizard, NotificationCenter, SearchCommand, StreamingText

**Other**: BrandIcons, Chart (recharts wrapper), CheckoutForm, CheckoutFormDemo, Logo, Resizable, Responsive, Sonner, ThemeToggle

### Blocks (35)

**Marketing**: HeroBlock, HeroSectionBlock, FeatureBlock, FeatureGridBlock, IntegrationsBlock, PricingBlock, PricingTableBlock, CallToActionBlock, TestimonialsBlock, SocialProofBlock, FooterBlock, HeaderBlock, LogoCloud

**Auth**: AuthLayout, LoginBlock, LoginSimpleBlock, SignUpBlock, OTPBlock

**Dashboard**: StatsBlock, StatsMarketingBlock, DataGridBlock, DirectoryBlock, ChartBlock, ChartCollectionBlock, BarChartBlock, HeatmapChartBlock, InteractiveAreaChartBlock, UsageDonutBlock

**Application**: ChatLayout, CodeBlock, CreateBlock, SettingsLayout, WizardBlock, AudioVisualizerBlock

**User**: InviteUserModal (in `blocks/user/`)

### Pages (10)

CheckoutPage, DashboardPage, IconsPage, LoginPage, PatternsPage, SignupPage, VerificationPage, VantaLoginPages (auth/), ProfilePage (settings/), TeamPage (settings/)

## 6. Testing Standards

**Framework**: Vitest + jsdom + @testing-library/react + @testing-library/jest-dom

**Commands**:
```bash
npm run test          # Run all tests once
npx vitest            # Watch mode
npx vitest Button     # Run specific test
```

**Test template**:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Component } from "./Component"

describe("Component", () => {
  it("renders with default props", () => {
    render(<Component>Content</Component>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    render(<Component variant="outline">Content</Component>)
    expect(screen.getByText("Content")).toHaveClass("border")
  })

  it("forwards ref", () => {
    const ref = { current: null }
    render(<Component ref={ref}>Content</Component>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("has accessible role", () => {
    render(<Component role="button">Click</Component>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
```

## 7. Code Cookbook

### Adding a new UI component
```bash
# 1. Create file
touch src/components/ui/MyComponent.tsx

# 2. Follow Golden Pattern (Section 3)
# 3. Create co-located test
touch src/components/ui/MyComponent.test.tsx

# 4. Export from the component file (no barrel needed)
# 5. MANDATORY: Wire into App.tsx for preview (see rule below)
```

> [!CAUTION]
> **MANDATORY: Wire new components into App.tsx.**
> Every new component MUST be added to the visual showcase in `src/App.tsx` so it can be evaluated in the browser. Never leave a new component unrendered. Place it in the appropriate tab section (Foundations, Components, Blocks, etc.) with a demo that exercises its key props and variants. This is NOT optional.

### Using overlay tokens (modals, drawers)
```tsx
// Always use bg-overlay/80, never bg-black/80
<div className="fixed inset-0 bg-overlay/80" />
```

### Using status tokens (alerts, badges)
```tsx
<Badge className="bg-success text-success-foreground">Active</Badge>
<Badge className="bg-warning text-warning-foreground">Pending</Badge>
<Badge className="bg-destructive text-destructive-foreground">Error</Badge>
```

### Creating a new block
```bash
# Blocks compose UI primitives into reusable sections
# Always use *Block.tsx suffix
touch src/components/blocks/MyFeatureBlock.tsx
```

### Theme-aware glass effects
```tsx
// Three glass tiers:
// .glass-panel   - Structural (cards, dashboards)
// .glass-floating - Elevated (popovers, modals)
// .glass-overlay  - Transient (toasts, marketing)
<Card className="glass-panel">...</Card>
```

## 8. Layout Patterns

### Sidebar (Preferred for app shells)
`Sidebar.tsx` uses `SidebarProvider` for responsive behavior (auto-switches to Sheet on mobile).

### Resizable Panels (Advanced)
`Resizable.tsx` wraps `react-resizable-panels`. Responsiveness is MANUAL (hide panels with `className="hidden md:flex"`).

## 9. Verification Protocols

**Strict Rule**: When modifying the design system, verify using TWO methods:

### 9.1. Automated Validation
```bash
npx tsc -b                                    # Zero type errors
npm run test                                   # All tests pass
npm run lint                                   # Clean lint
python3 tests/validate_design.py                     # Token validation
```

### 9.2. Visual Verification (CRITICAL)
1. Run `npm run dev`.
2. Toggle Light/Dark Mode. Verify components in BOTH modes.
3. Check for: washed-out text, invisible glass cards, hardcoded dark backgrounds, proper glows and contrast.

> [!WARNING]
> If you think "it's just a small CSS change, I don't need to check," **YOU ARE WRONG.** Small changes cause the biggest breakages. **ALWAYS VERIFY VISUALLY.**

## 10. Anti-Regression Rules

1. **NEVER hardcode grayscale colors** (e.g., `bg-zinc-950`, `text-gray-500`). ALWAYS use semantic tokens.
2. **Glassmorphism requires light-mode overrides** in `index.css`.
3. **Test card visibility** on the default background of both themes.
4. **NEVER use `text-foreground`** (undefined). Use `text-text-primary` instead.
5. **NEVER use `bg-black/80`** for overlays. Use `bg-overlay/80`.
6. **NEVER use `border-error`** (undefined). Use `border-destructive`.

## 11. Accessibility Requirements

- All interactive components must use Radix UI primitives or proper ARIA
- Keyboard navigation must work (Tab, Enter, Escape, Arrow keys)
- Focus indicators must be visible (using `focus-visible:ring-1`)
- Screen reader labels must be present (aria-label or associated labels)

## 12. Key Dependencies

**Core:** react 19, react-dom, tailwindcss 4, @tailwindcss/postcss, class-variance-authority, clsx, tailwind-merge

**Radix UI:** @radix-ui/react-slot, -dialog, -select, -checkbox, -switch, -label, -separator

**Icons & Utilities:** lucide-react, tailwindcss-animate

## 13. ESLint & Commit Standard

**ESLint:** Modern flat config (`eslint.config.js`) with typescript-eslint, react-hooks, react-refresh. Ignores `dist/`.

**Commits:** `type(scope): subject` (scope optional). Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`. Imperative mood, <= 72 chars, no trailing period.
