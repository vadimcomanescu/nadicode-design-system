# Design System Quality Sweep: Tests, App.tsx Split, Fixes

## Context

App.tsx is 1,875 lines of monolithic showcase code. Test coverage is patchy: UI primitives are at ~70%, blocks at 14%, charts/pages/text-effects at 0%. 127 component files lack tests entirely. Two components use static lucide icons violating project rules. `@vitest/coverage-v8` isn't installed. The component-coverage gate test has its assertion commented out.

Goal: 90%+ component test coverage, App.tsx under 300 lines, quality fixes applied.

---

## Phase 0: Setup (team lead, sequential)

1. Install `@vitest/coverage-v8`
2. Add coverage config to `vite.config.ts`
3. Uncomment assertion in `src/test/component-coverage.test.ts`
4. Run baseline: `npm test`, `npx tsc -b`
5. Create team, spawn agents

---

## Phase 1: App.tsx Decomposition (1 agent)

Extract each tab into its own file under `src/components/pages/showcase/`:

| Tab | New File | ~Lines |
|-----|----------|--------|
| Foundations | `FoundationsShowcase.tsx` | 380 |
| Components | `ComponentsShowcase.tsx` | 640 |
| Charts | `ChartsShowcase.tsx` | 22 |
| Blocks | `BlocksShowcase.tsx` | 343 |
| Pages | `PagesShowcase.tsx` | 153 |

Icons and Patterns tabs already delegate to `IconsPage` and `PatternsPage`.

**Result**: App.tsx drops to ~250 lines (imports, tab shell, router).

Each showcase file gets a smoke test (renders, major sections present).

**Critical files**:
- `src/App.tsx` (1875 lines -> ~250)
- New: `src/components/pages/showcase/*.tsx` (5 files + 5 test files)

---

## Phase 2: Quality Fixes (1 agent, parallel with Phase 1)

1. **Fix static icon violations**:
   - `src/components/ui/StyleToggle.tsx` - replace `<Snowflake>` / `<Sun>` with animated icon wrappers from `src/components/ui/icons/`
   - `src/components/ui/PasswordInput.tsx` - replace `<Eye>` / `<EyeOff>` with animated wrappers

2. **Update CLAUDE.md Section 1.2** to reflect actual icon pattern (74 individual animated icon components in `/icons/`, not a single `AnimatedIcon` wrapper)

3. **Add integrity test** for static lucide-react imports (new test in `src/test/`)

---

## Phase 3: Test Blitz (3 agents in parallel)

### Agent A: UI Components (38 missing tests)

AnimatedBeam, AnimatedSheet, AspectRatio, AuroraEffect, AvatarUpload, BentoGrid, BrandIcons, Chart, CheckoutForm, CheckoutFormDemo, ConfettiBurst, Example, Field, InputOTP, Item, Logo, MagneticElement, MeteorShower, MouseEffect, MovingBorder, ProgressiveBlur, PromoCard, Resizable, Responsive, RoleBadge, ScrollArea, Sidebar, SkipNav, Sonner, SpringHover, StaggeredEntrance, StyleToggle, SuccessCheck, TiltCard, Toast, Toaster, TreeView, VisuallyHidden

Each test covers: renders without crash, key props, ref forwarding (if applicable), variant classes.

### Agent B: Blocks (top 30 of 55 missing) + Text Effects (10 missing)

**Text Effects** (all in `src/components/ui/text-effects/`):
AnimatedGradientText, CountingNumber, FlipWords, HighlightText, MorphingText, PixelReveal, ShimmeringText, SlidingNumber, TextReveal, TypingEffect

**Blocks** (in `src/components/blocks/`):
HeroBlock, HeroSectionBlock, HeaderBlock, FooterBlock, PricingBlock, PricingTableBlock, FeatureBlock, FeatureGridBlock, CallToActionBlock, TestimonialsBlock, SocialProofBlock, LogoCloud, StatsBlock, StatsMarketingBlock, IntegrationsBlock, FAQBlock, NewsletterBlock, ContactBlock, BannerBlock, ChangelogBlock, ComparisonBlock, ActivityFeedBlock, CodeBlock, AudioVisualizerBlock, ChatLayout, DirectoryBlock, CreateBlock, WizardBlock, DataGridBlock, SettingsLayout

Block tests: smoke render, verify key sections/text present.

### Agent C: Charts (7) + Pages (17)

**Charts** (in `src/components/ui/charts/`):
AreaChart, BarChart, HeatmapChart, LineChart, PieChart, RadarChart, RadialBarChart

Chart tests: render with sample data, handle empty data, SVG element present.

**Pages** (in `src/components/pages/`):
DashboardPage, LoginPage, SignupPage, CheckoutPage, VerificationPage, ProfilePage, TeamPage, NotFoundPage, LandingPage, PricingPage, OnboardingPage, VoiceAgentsPage, ChangelogPage, BlogPostPage, VantaLoginPages, IconsPage, PatternsPage

Page tests: smoke render (wrap with ThemeProvider + MemoryRouter where needed).

---

## Phase 4: Verification (team lead, sequential)

1. `npm test` - all tests pass
2. `npx vitest run --coverage` - verify 90%+ file coverage
3. `npx tsc -b` - zero type errors
4. `npm run lint` - clean
5. Visual check: `npm run dev`, toggle light/dark/bloom, navigate all tabs
6. Confirm App.tsx < 300 lines

---

## Team Structure

| Role | Agent Type | Phase | Work |
|------|-----------|-------|------|
| Lead | (me) | 0, 4 | Setup, verification, coordination |
| app-splitter | sonnet | 1 | App.tsx decomposition |
| quality-fixer | sonnet | 2 | Icon fixes, docs, integrity test |
| test-ui | sonnet | 3 | 38 UI component tests |
| test-blocks | sonnet | 3 | 30 block + 10 text effect tests |
| test-charts-pages | sonnet | 3 | 7 chart + 17 page tests |

Phases 1+2 run in parallel. Phase 3 starts after 1+2 complete (showcase pages need to exist before page tests).

---

## Success Criteria

- [ ] App.tsx < 300 lines
- [ ] All 7 showcase tabs functional
- [ ] Zero static lucide-react violations
- [ ] 90%+ components have test files
- [ ] All tests pass
- [ ] Zero type errors
- [ ] CLAUDE.md icon docs updated
- [ ] component-coverage gate enabled
