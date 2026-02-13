# Next.js Integration Guide

Seed Design System is vendored (shadcn/ui-style): copy source files into your Next.js project.

---

## Step 1: Core Files to Copy

Copy these files first (they have no component dependencies):

```
your-nextjs-project/
├── src/
│   ├── lib/
│   │   ├── utils.ts              # cn() helper (clsx + tailwind-merge)
│   │   ├── tokens.config.js      # Master token source
│   │   ├── ThemeProvider.tsx      # Theme context + localStorage
│   │   ├── motion.ts             # Motion variants + springs
│   │   └── animation.tokens.ts   # Easing + duration + spring configs
│   ├── tokens.ts                 # TypeScript re-export of tokens
│   └── components/
│       ├── ui/                   # Copy individual components as needed
│       │   ├── icons/            # Animated icon files
│       │   ├── charts/           # Chart components
│       │   └── text-effects/     # Text effect components
│       └── blocks/               # Copy blocks as needed
```

---

## Step 2: Install Dependencies

### Required (always)
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot
```

### Animation
```bash
npm install motion
```

### Common Radix Primitives (install as needed)
```bash
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-checkbox \
  @radix-ui/react-switch @radix-ui/react-label @radix-ui/react-separator \
  @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-dropdown-menu \
  @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-toggle \
  @radix-ui/react-toggle-group @radix-ui/react-avatar @radix-ui/react-progress \
  @radix-ui/react-slider @radix-ui/react-radio-group @radix-ui/react-alert-dialog \
  @radix-ui/react-hover-card @radix-ui/react-context-menu @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-scroll-area @radix-ui/react-collapsible \
  @radix-ui/react-aspect-ratio @radix-ui/react-toast
```

### Optional (based on features used)
```bash
# Charts
npm install recharts

# Carousel
npm install embla-carousel-react

# Command palette
npm install cmdk

# Drawer
npm install vaul

# Toast (alternative to Radix)
npm install sonner

# OTP input
npm install input-otp

# Forms
npm install react-hook-form @hookform/resolvers zod

# Date picker
npm install react-day-picker date-fns

# Data table
npm install @tanstack/react-table

# Resizable panels
npm install react-resizable-panels

# Animation utilities
npm install tailwindcss-animate
```

---

## Step 3: CSS Setup

Copy the contents of Seed's `src/index.css` into your `app/globals.css`. Key sections:

```css
/* Fonts are bundled locally - loaded via next/font/local in layout.tsx */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));
@config "../tailwind.config.js";

@layer base {
  /* Light theme (default) */
  :root {
    color-scheme: light;
    --color-background: 251 252 253;
    --color-surface: 245 247 249;
    --color-surface-hover: 237 240 243;
    /* ... all CSS variables from index.css ... */
  }

  /* Dark theme */
  .dark {
    color-scheme: dark;
    --color-background: 15 17 20;
    --color-surface: 21 23 25;
    /* ... all dark CSS variables ... */
  }

  body {
    @apply bg-background text-text-primary antialiased min-h-dvh transition-colors duration-300;
  }

  ::selection {
    @apply bg-primary/15 text-text-primary;
  }
}

@layer utilities {
  .glass-panel { /* ... */ }
  .glass-floating { /* ... */ }
  .glass-overlay { /* ... */ }
  /* + light mode overrides */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Step 4: PostCSS Config

```js
// postcss.config.js (or .mjs)
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

For Tailwind CSS 4, this single plugin handles everything.

---

## Step 5: Tailwind Config

Copy `tailwind.config.js` from Seed. Critical sections:

```js
import { tokens, colorScales } from './src/lib/tokens.config.js';
import tailwindAnimate from 'tailwindcss-animate';

export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS variable-based semantic tokens
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
          // ... etc
        },
        // ... all semantic color definitions
      },
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.sizes,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadows,
      zIndex: {
        base: '0', dropdown: '50', sticky: '100',
        overlay: '200', modal: '300', popover: '400',
        toast: '500', max: '999',
      },
      transitionTimingFunction: { /* easing tokens */ },
      transitionDuration: { /* duration tokens */ },
      keyframes: { /* all keyframes */ },
      animation: { /* all animations */ },
    },
  },
  plugins: [tailwindAnimate],
}
```

---

## Step 6: TypeScript Path Alias

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step 7: Root Layout

```tsx
// app/layout.tsx (SERVER component - no "use client")
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "./providers"

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

export const metadata: Metadata = {
  title: "My App",
  description: "Built with Seed Design System",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){
          var t=localStorage.getItem('design-system-theme')||'system';
          var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);
          document.documentElement.classList.add(d?'dark':'light')
        })()` }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Step 7b: Client Providers

```tsx
// app/providers.tsx ("use client")
import { ThemeProvider } from "@/lib/ThemeProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  // Optionally load THREE/p5 globals for background effects
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
```

Satoshi fonts are bundled locally in `public/fonts/satoshi/` (for scaffold customers) and `src/app/fonts/` (for `next/font/local` in this repo).

---

## Server vs Client Component Decision Tree

```
Does the component...
├── Have hooks (useState, useEffect, useRef, useContext)?
│   └── YES -> "use client"
├── Have event handlers (onClick, onChange, onSubmit)?
│   └── YES -> "use client"
├── Use motion/react animations (motion.div, AnimatePresence)?
│   └── YES -> "use client"
├── Render Radix UI primitives (Dialog, Select, Tooltip, etc.)?
│   └── YES -> "use client" (they use React context internally)
├── Access browser APIs (localStorage, window, document)?
│   └── YES -> "use client"
├── Is it a page.tsx or layout.tsx wrapper?
│   └── Keep as SERVER component, wrap interactive children
└── Is it purely presentational (just props -> JSX)?
    └── Keep as SERVER component
```

### Practical Examples

**Server components (no directive needed):**
```tsx
// app/page.tsx
import { HeroBlock } from "@/components/blocks/HeroBlock"  // block is client
import { Card } from "@/components/ui/Card"                 // Card is just divs

export default function HomePage() {
  return (
    <main>
      <HeroBlock title="Welcome" />
      <Card>
        <p>Static content</p>
      </Card>
    </main>
  )
}
```

**Client components (need "use client"):**
```tsx
"use client"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { motion } from "motion/react"

export function InteractiveSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>...</DialogContent>
      </Dialog>
    </motion.div>
  )
}
```

---

## Hydration Gotchas

### 1. Theme Flash Prevention
- `suppressHydrationWarning` on `<html>` prevents React mismatch warning when theme class differs between server and client
- Default `className="dark"` on `<html>` ensures dark theme renders on first paint
- ThemeProvider applies the correct class after hydration

### 2. localStorage Not Available in SSR
The ThemeProvider guards against this:
```tsx
const [theme, setThemeState] = React.useState<Theme>(() => {
  if (typeof window === 'undefined') return defaultTheme;
  const stored = localStorage.getItem(storageKey);
  // ...
})
```

### 3. Dynamic Imports for Heavy Client Components
```tsx
import dynamic from "next/dynamic"

const ChartBlock = dynamic(() => import("@/components/blocks/ChartBlock"), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px]" />,
})

const Carousel = dynamic(() => import("@/components/ui/Carousel").then(m => m.Carousel), {
  ssr: false,
})
```

Use `ssr: false` for:
- Chart components (recharts uses DOM measurement)
- Carousel (embla measures container)
- AudioWaveform (uses Web Audio API)
- AnimatedBackground (uses Three.js/Vanta)
- PixelBackground (uses p5.js)

### 4. Avoid Importing motion at Module Level in Server Components
```tsx
// BAD - will error in server component
import { motion } from "motion/react"

// GOOD - wrap in client component
// InteractiveWrapper.tsx ("use client")
import { motion } from "motion/react"
export function AnimatedDiv({ children }) {
  return <motion.div {...fadeInUp}>{children}</motion.div>
}
```

---

## Common Next.js + Seed Patterns

### Authenticated Layout with Sidebar
```tsx
// app/(dashboard)/layout.tsx - server component
import { SidebarProvider } from "@/components/ui/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />  {/* client component */}
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  )
}
```

### Auth Pages
```tsx
// app/(auth)/login/page.tsx - server component
import { LoginBlock } from "@/components/blocks/LoginBlock"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-background">
      <LoginBlock type="login" showSocial />
    </div>
  )
}
```

---

## App Router File Structure (this repo)

```
src/app/
  layout.tsx              # Root layout: font loading, <Providers>
  providers.tsx           # Client: ThemeProvider + THREE/p5 globals
  globals.css             # Imports index.css
  page.tsx                # "/" redirects to /foundations
  not-found.tsx           # 404 page
  (showcase)/             # Route group: showcase tabs
    layout.tsx              # Header + AnimatedTabs + Cmd+K palette + PageTransition
    foundations/page.tsx     # Renders FoundationsShowcase
    components/page.tsx     # Renders ComponentsShowcase
    blocks/page.tsx         # Renders BlocksShowcase
    charts/page.tsx         # Renders ChartsShowcase
    icons/page.tsx          # Renders IconsPage
    pages/page.tsx          # Renders PagesShowcase
    patterns/page.tsx       # Renders PatternsPage
  dashboard/page.tsx      # Standalone pages (no showcase chrome)
  landing/page.tsx
  pricing/page.tsx
  onboarding/page.tsx
  changelog/page.tsx
  blog/page.tsx
  voice-agents/page.tsx
  login/vanta/*/page.tsx  # Vanta login variants (7)
```

### Showcase Structure

The `(showcase)` route group provides the design system browser:
- `layout.tsx` renders the header, `AnimatedTabs` for navigation, `StyleToggle`, `ThemeToggle`, Cmd+K command palette, and `PageTransition`
- Tab content lives in `src/components/pages/showcase/` as client components
- Route pages simply import and render the showcase components

To add a new component to the showcase, edit the appropriate file in `src/components/pages/showcase/` (e.g., `ComponentsShowcase.tsx` for UI primitives).
