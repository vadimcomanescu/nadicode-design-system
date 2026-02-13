# Glass & Effects Reference

---

## Glass Tiers

### `glass-panel` (Structural)
**Use for:** Dashboards, cards, data containers, sidebars.

```css
.glass-panel {
  @apply bg-surface/30 backdrop-blur-3xl border border-white/10;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 10px 15px -3px rgba(0, 0, 0, 0.4),
    0 20px 25px -5px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  background-image: linear-gradient(to bottom right,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01));
}

/* Light mode */
:root[class~="light"] .glass-panel {
  @apply bg-surface/70 border-border/60;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
  background-image: linear-gradient(to bottom right,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.2));
}
```

### `glass-floating` (Levitation)
**Use for:** Hero cards, elevated spotlights, featured content.

```css
.glass-floating {
  @apply bg-surface/40 backdrop-blur-[40px] border border-white/20;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.5),
    0 30px 60px rgba(0, 0, 0, 0.7),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
}
.glass-floating::after {
  content: '';
  @apply absolute inset-0 rounded-[inherit] pointer-events-none;
  box-shadow: inset 0 0 10px 0 rgba(200, 220, 240, 0.04);
}
.glass-floating:hover {
  transform: translateY(-4px) scale(1.005);
}
```

### `glass-overlay` (Transient)
**Use for:** Marketing sections, popovers, toasts, notification panels.

```css
.glass-overlay {
  @apply bg-surface/30 backdrop-blur-md border border-white/10 transition-colors duration-300;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
}
.glass-overlay:hover {
  @apply bg-background/30;
}
```

### Decision Guide

| Situation                    | Use            |
| ---------------------------- | -------------- |
| Card in a dashboard          | `glass-panel`  |
| Dialog/modal content         | `glass-panel`  |
| Hero feature showcase        | `glass-floating`|
| Dropdown menu/popover        | `glass-overlay` |
| Toast notification           | `glass-overlay` |
| Marketing section background | `glass-overlay` |
| Sidebar                      | `glass-panel`   |

---

## Decorative Background Components

### PixelBackground
Pixel art generative backgrounds.

```tsx
import { PixelBackground } from "@/components/ui/PixelBackground"

<PixelBackground
  theme="arctic"     // "arctic" | "ember" | "neon" | "midnight" | "custom"
  className="absolute inset-0 -z-10"
/>
```

### AmbientGrid
Subtle CSS grid overlay for structural rhythm.

```tsx
import { AmbientGrid } from "@/components/ui/AmbientGrid"

<AmbientGrid />            // 24px cells, 0.06 opacity
<AmbientGrid debug />      // 0.15 opacity for alignment checking
<AmbientGrid size={32} />  // Custom cell size
```

Implementation: Uses `repeating-linear-gradient` with `rgba(200, 220, 240, opacity)`.

### AuroraEffect
Slow-moving gradient aurora background.

```tsx
import { AuroraEffect } from "@/components/ui/AuroraEffect"

<AuroraEffect className="absolute inset-0 -z-10" />
```

Uses three layered animations (`aurora-1`, `aurora-2`, `aurora-3`) at 12-18s cycles.

### MeteorShower
Animated diagonal streak particles.

```tsx
import { MeteorShower } from "@/components/ui/MeteorShower"

<MeteorShower count={20} />
```

### MouseSpotlight
Mouse-following spotlight radial gradient (consolidated from former Spotlight component).

```tsx
import { MouseSpotlight } from "@/components/ui/MouseEffect"

<MouseSpotlight className="...">Content</MouseSpotlight>
```

### AnimatedBackground
Three.js/Vanta.js 3D backgrounds.

```tsx
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"

<AnimatedBackground effect="fog" />
```

**Note:** Heavy component. Use `dynamic(() => import(...), { ssr: false })` in Next.js.

### Other Effect Components

| Component         | Purpose                               |
| ----------------- | ------------------------------------- |
| AnimatedBeam      | SVG beam connector between elements   |
| MouseEffect       | Mouse-tracking visual feedback        |
| MovingBorder      | Animated border rotation              |
| ProgressiveBlur   | Gradient blur transition              |
| TiltCard          | 3D perspective tilt on hover          |
| MagneticElement   | Magnetic cursor attraction            |
| InfiniteSlider    | Auto-scrolling horizontal content     |

---

## Text Effect Components

All in `@/components/ui/text-effects/`.

| Component            | Effect                                    | Key Props                    |
| -------------------- | ----------------------------------------- | ---------------------------- |
| TextReveal           | Scroll-triggered character reveal         | `text`, `className`          |
| AnimatedGradientText | Animated gradient sweep across text       | `children`, `className`      |
| PixelReveal          | Pixel-by-pixel text appearance            | `text`, `delay`              |
| FlipWords            | Word cycling with flip animation          | `words: string[]`, `duration`|
| StreamingText        | ChatGPT-style character streaming         | `text`, `speed`              |
| ShimmeringText       | Shimmer highlight sweep across text       | `children`, `className`      |
| CountingNumber       | Animated number counter                   | `value`, `duration`          |
| MorphingText         | SVG text morphing between strings         | `texts: string[]`            |
| HighlightText        | Animated highlight marker behind text     | `children`, `className`      |
| SlidingNumber        | Digit-by-digit sliding number display     | `value`                      |

---

## Animation Utility Components

| Component          | Purpose                                  | Usage                               |
| ------------------ | ---------------------------------------- | ----------------------------------- |
| ScrollFadeIn       | Fade in element when scrolled into view  | `<ScrollFadeIn>content</ScrollFadeIn>` |
| StaggerChildren    | Stagger children entrance animations     | `<StaggerChildren delay={100}>...</StaggerChildren>` |
| StaggeredEntrance  | Sequential entrance with index-based delay| `<StaggeredEntrance>...</StaggeredEntrance>` |
| PageTransition     | Route-level page transition wrapper      | `<PageTransition>page content</PageTransition>` |

---

## Agent/AI-Specific Components

| Component          | Purpose                                  | Key Props                    |
| ------------------ | ---------------------------------------- | ---------------------------- |
| AgentAvatar        | Avatar with idle/listening/speaking states| `state: "idle" \| "listening" \| "speaking"`, `src`, `fallback` |
| Avatar3D           | 3D avatar using Three.js                 | `state`, custom 3D options   |
| AgentStatus        | Connection status indicator              | `status: "connected" \| "disconnected" \| "connecting"` |
| AudioWaveform      | Real-time audio level visualization      | `audioData`, `isActive`      |
| ConversationThread | Chat message list with roles             | `messages`, `isStreaming`    |

Agent animations use `--color-primary` (not accent) for glow effects:
```css
.agent-avatar-speaking { animation: agent-speaking-ring 1.5s ease-in-out infinite; }
.agent-avatar-listening { animation: agent-listening-pulse 2s ease-in-out infinite; }
.agent-avatar-breathe { animation: agent-breathe 4s ease-in-out infinite; }
```
