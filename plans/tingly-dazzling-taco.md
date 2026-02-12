# React Best Practices Audit - HIGH + MEDIUM Fixes

## Context

Ran the Vercel React Best Practices skill (57 rules across 8 categories) against the design system. Since this is a component library (not a Next.js app), server-side and data-fetching rules don't apply. Audited re-render optimization, rendering performance, bundle size, and JS performance. Applying HIGH and MEDIUM priority fixes.

---

## Change 1: MouseEffect - convert opacity state to ref + direct DOM
**File:** `src/components/ui/MouseEffect.tsx`
**Rule:** `rerender-use-ref-transient-values`
**Impact:** HIGH - mousemove fires at ~60fps, each `setOpacity(1)` triggers React's bailout check

**Current** (line 23-24, 33):
```tsx
const [opacity, setOpacity] = React.useState(0)
// ...
setOpacity(1)  // on every mousemove
// ...
setOpacity(0)  // on mouseout
```
Used in JSX: `style={{ opacity }}`

**Fix:**
- Replace `useState(0)` with `useRef(0)`
- Set opacity via `containerRef.current.style.opacity` directly
- Remove `opacity` from inline style object (set initial via style attribute or default to 0)

---

## Change 2: Lazy-load route pages in App.tsx
**File:** `src/App.tsx`
**Rule:** `bundle-dynamic-imports`
**Impact:** HIGH - 17 page imports all eagerly loaded, including heavy chart/Vanta pages

**Fix:** Convert route-level page components to `React.lazy()` + wrap `<Routes>` in `<Suspense>`:
```tsx
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("./components/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const LandingPage = lazy(() => import("./components/pages/LandingPage").then(m => ({ default: m.LandingPage })));
// ... etc for all route-level pages
```

**Scope:** Only the `<Route>` element pages (DashboardPage, LandingPage, PricingPage, OnboardingPage, ChangelogPage, BlogPostPage, VoiceAgentsPage, NotFoundPage, and the 7 VantaLoginPages). The DocsPage tab showcases (FoundationsShowcase, ComponentsShowcase, etc.) stay eager since they're the main view.

**Fallback:** Use `<Suspense fallback={<Spinner />}>` wrapping the Routes. The `Spinner` component already exists at `src/components/ui/Spinner.tsx`.

**Note:** These pages use named exports, so the lazy import needs the `.then(m => ({ default: m.PageName }))` pattern.

---

## Change 3: Passive event listeners (5 files)
**Rule:** `client-passive-event-listeners`
**Impact:** MEDIUM - frees the browser to optimize scrolling/input

| File | Line | Listener | Change |
|------|------|----------|--------|
| `src/components/ui/MouseEffect.tsx` | ~48-50 | `mousemove`, `mouseout`, `mouseleave` | Add `{ passive: true }` |
| `src/components/ui/AnimatedBeam.tsx` | ~51 | `resize` | Add `{ passive: true }` |
| `src/lib/ThemeProvider.tsx` | ~94 | media query `change` | Add `{ passive: true }` |
| `src/hooks/use-reduced-motion.ts` | ~13 | media query `change` | Add `{ passive: true }` |
| `src/hooks/use-mobile.ts` | ~13 | media query `change` | Add `{ passive: true }` |

**Skip:** `src/components/ui/Sidebar.tsx` keydown listener (calls `event.preventDefault()`, cannot be passive).

---

## Change 4: Hoist default array props (2 files)
**Rule:** `rerender-memo-with-default-value`
**Impact:** MEDIUM - prevents new array reference on every render

**`src/components/ui/FileUpload.tsx`** (line 72):
```tsx
// Add at module level:
const EMPTY_FILES: UploadedFile[] = []

// Change destructuring:
files = EMPTY_FILES,  // was: files = [],
```

**`src/components/ui/SearchCommand.tsx`** (line 64):
```tsx
// Add at module level:
const EMPTY_RESULTS: SearchResult[] = []

// Change destructuring:
results = EMPTY_RESULTS,  // was: results = [],
```

---

## Change 5: content-visibility on IconsPage grid
**File:** `src/components/pages/IconsPage.tsx`
**Rule:** `rendering-content-visibility`
**Impact:** MEDIUM - 77+ cards rendered immediately, offscreen ones can be deferred

**Fix:** Add `content-visibility: auto` via a className on each icon Card:
```tsx
<Card key={item.name} className="hover:border-accent/50 transition-colors cursor-pointer group border-accent/20"
  style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 120px' }}>
```

---

## Change 6: SuccessCheck - wrap motion.svg in motion.div
**File:** `src/components/ui/SuccessCheck.tsx`
**Rule:** `rendering-animate-svg-wrapper`
**Impact:** MEDIUM - scale/opacity animation on `<motion.svg>` triggers SVG layout recalc

**Current:**
```tsx
<motion.svg
  initial={{ scale: 0.3, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={spring.bouncy}
>
```

**Fix:**
```tsx
<motion.div
  initial={{ scale: 0.3, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={spring.bouncy}
  style={{ display: 'inline-flex' }}
>
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* motion.circle and motion.path stay as-is */}
  </svg>
</motion.div>
```

---

## NOT changing (out of scope or false positive)

- **HeaderBlock scroll state**: `setScrolled(latest > 0.05)` produces a boolean. React bails out when the value hasn't changed, so re-renders only happen when crossing the threshold. Not a real issue.
- **Barrel imports** (icons/index.ts): Vite tree-shakes effectively. The barrel is core DX for this library.
- **DataTable content-visibility**: Depends on consumer data size. Skip for now.
- **13 icon files with motion.svg**: These are hover animations on individual icons. The perf impact is negligible and changing 13+ files is high cost for low gain.

---

## Verification

1. `npx tsc -b` - zero type errors
2. `npm run test` - all tests pass (especially SuccessCheck, MouseEffect, FileUpload, SearchCommand tests)
3. `npm run dev` - verify in browser:
   - Mouse glow effect still works (opacity transitions on enter/leave)
   - Route navigation still works (pages load with lazy loading)
   - SuccessCheck animation plays correctly
   - Icon grid renders properly on IconsPage
4. Toggle light/dark themes - no regressions
