# Seed Design System: Opinions Bible

> Every decision documented here was made deliberately. This is not a suggestion list.
> These are the laws of the system. Break them only with explicit justification.

## How to Read This Document

Each opinion follows a consistent format:
- **THE RULE**: What to do (imperative)
- **WHY**: The UX law or principle behind it
- **WHEN TO USE / WHEN NOT TO**: Context for application
- **DO / DON'T**: Code examples showing correct and incorrect usage

## UX Laws Referenced

| Law | Core Insight |
|-----|-------------|
| Hick's Law | More choices = longer decisions |
| Fitts's Law | Bigger + closer = faster to reach |
| Miller's Law | 7 +/- 2 items in working memory |
| Doherty Threshold | < 400ms response keeps flow state |
| Peak-End Rule | Users judge by peaks and endings |
| Von Restorff Effect | Different items are memorable |
| Jakob's Law | Users prefer familiar patterns |
| Serial Position Effect | First and last items remembered |
| Law of Proximity | Close = related |
| Law of Similarity | Similar = grouped |
| Aesthetic-Usability Effect | Pretty = perceived as usable |
| Tesler's Law | Complexity must live somewhere |
| Zeigarnik Effect | Incomplete tasks are remembered |
| Goal-Gradient Effect | Closer to goal = more motivated |
| Postel's Law | Liberal input, strict output |

---

## Domain 1: Navigation

### Rule 1.1: Navigation Pattern by Context

**THE RULE:** Use Sidebar for app shells, Tabs for content browsing, top-nav for marketing pages.

**WHY:** Jakob's Law. Users expect sidebars in dashboards, tabs in settings, and horizontal navs on marketing sites. Breaking these expectations forces relearning.

**WHEN TO USE:** Every time you choose a navigation pattern.
**WHEN NOT TO:** Never mix patterns at the same level. A dashboard page does not get a top-nav.

**DO:**
```tsx
// App shell: Sidebar
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={true}>
            <HomeIcon size={16} />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>

// Content browsing: Tabs
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>
```

**DON'T:**
```tsx
// Tabs as primary app navigation
<Tabs defaultValue="dashboard">
  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
  <TabsTrigger value="settings">Settings</TabsTrigger>
  <TabsTrigger value="billing">Billing</TabsTrigger>
</Tabs>

// Sidebar on a marketing page
<SidebarProvider>
  <Sidebar>...</Sidebar>
  <HeroBlock />
</SidebarProvider>
```

---

### Rule 1.2: Mobile Navigation Collapse

**THE RULE:** Sidebar collapses to a Sheet below 768px. Never use a bottom bar unless the app has exactly 3-5 voice-agent-style primary actions.

**WHY:** Tesler's Law. The complexity of navigation cannot disappear, only be relocated. A Sheet preserves the full sidebar menu. Bottom bars work only when the action count is tiny and each action is a primary verb (not a navigation destination).

**WHEN TO USE:** Every responsive layout with a Sidebar.
**WHEN NOT TO:** Voice agent UIs with 3-5 primary actions may use a bottom bar.

**DO:**
```tsx
// Sidebar auto-collapses to Sheet on mobile (built-in behavior)
<SidebarProvider>
  <Sidebar>
    {/* isMobile triggers Sheet automatically */}
    <SidebarContent>...</SidebarContent>
  </Sidebar>
</SidebarProvider>
```

**DON'T:**
```tsx
// Custom bottom bar for a dashboard
<div className="fixed bottom-0 left-0 right-0 flex md:hidden">
  <button>Home</button>
  <button>Search</button>
  <button>Settings</button>
  <button>Profile</button>
  <button>Notifications</button>
  <button>Help</button>  {/* 6 items = too many */}
</div>
```

---

### Rule 1.3: Maximum Navigation Depth

**THE RULE:** Never exceed 3 navigation levels. Flatten deeper hierarchies into tabs, filters, or search.

**WHY:** Miller's Law. Users can hold 7 +/- 2 items in working memory. Each navigation level consumes cognitive slots. Three levels (sidebar group > item > sub-item) is the limit before users lose context.

**WHEN TO USE:** Any nested navigation structure.
**WHEN NOT TO:** If you have 4+ levels, redesign with tabs or filters.

**DO:**
```tsx
// Level 1: Sidebar group. Level 2: Menu item. Level 3: Sub-item.
<SidebarGroup>
  <SidebarGroupLabel>Settings</SidebarGroupLabel>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton>Account</SidebarMenuButton>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton>Profile</SidebarMenuSubButton>
        </SidebarMenuSubItem>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton>Security</SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
```

**DON'T:**
```tsx
// 4+ levels deep: nested accordions inside sub-menus
<SidebarMenuSub>
  <Accordion>          {/* Level 3 */}
    <AccordionItem>
      <SidebarMenuSub>  {/* Level 4 - STOP */}
        <Accordion>      {/* Level 5 - user is lost */}
```

---

### Rule 1.4: Active Navigation Indicators

**THE RULE:** Sidebar active = background highlight with ring. Tabs active = surface fill with shadow. Top-nav active = underline.

**WHY:** Von Restorff Effect. The active item must be visually distinct from its siblings. Each navigation pattern has an established indicator style that users recognize instantly.

**WHEN TO USE:** Every navigation component that tracks active state.
**WHEN NOT TO:** Never mix indicator styles (no underline in a sidebar).

**DO:**
```tsx
// Sidebar: bg highlight (built into SidebarMenuButton)
<SidebarMenuButton isActive={true}>
  {/* data-[active=true]:bg-sidebar-accent
      data-[active=true]:ring-1 ring-sidebar-ring/30 */}
  <HomeIcon size={16} />
  <span>Dashboard</span>
</SidebarMenuButton>

// Tabs: surface fill (built into TabsTrigger)
<TabsTrigger value="active">
  {/* data-[state=active]:bg-surface
      data-[state=active]:shadow-sm */}
  Overview
</TabsTrigger>
```

**DON'T:**
```tsx
// Underline in a sidebar
<SidebarMenuButton className="border-b-2 border-accent">
  Dashboard
</SidebarMenuButton>

// Background fill in a top nav
<nav>
  <a className="bg-surface rounded-md px-3 py-1">Home</a>
</nav>
```

---

### Rule 1.5: Content Transitions

**THE RULE:** Use spring transitions for page-level content entrances. No animation between tab panels.

**WHY:** Doherty Threshold. Spring-based entrances keep content feeling alive (< 400ms perceived latency). Tab content must appear instantly because the user already committed to the action by clicking the tab; animation here feels like lag.

**WHEN TO USE:** Route changes, modal opens, page loads.
**WHEN NOT TO:** Tab switches, accordion expands (these must be instant).

**DO:**
```tsx
// Page entrance: spring fade-in-up
import { fadeInUp, motionSpring } from "@/lib/motion"

<motion.div {...fadeInUp}>
  <PageContent />
</motion.div>

// Tab content: no animation
<TabsContent value="settings">
  <SettingsForm />  {/* Appears immediately */}
</TabsContent>
```

**DON'T:**
```tsx
// Animating tab content switches
<TabsContent value="settings">
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <SettingsForm />
  </motion.div>
</TabsContent>
```

---

### Rule 1.6: Command Palette

**THE RULE:** Provide a Cmd+K palette on every app shell. It is always available.

**WHY:** Hick's Law. Power users need to bypass navigation hierarchies entirely. A command palette reduces decision time from O(depth) to O(1) by flattening all actions into a searchable list.

**WHEN TO USE:** App shells (dashboards, tools, admin panels).
**WHEN NOT TO:** Marketing sites, onboarding flows, checkout pages.

**DO:**
```tsx
// Always render SearchCommand at app shell level
<SidebarProvider>
  <Sidebar>...</Sidebar>
  <SidebarInset>
    {children}
    <SearchCommand /> {/* Cmd+K globally available */}
  </SidebarInset>
</SidebarProvider>
```

**DON'T:**
```tsx
// Cmd+K only on specific pages
function SettingsPage() {
  return (
    <>
      <SearchCommand /> {/* Should be at layout level, not page level */}
      <SettingsForm />
    </>
  )
}
```

---

## Domain 2: Data Visualization

### Rule 2.1: Chart Type Selection

**THE RULE:** AreaChart for cumulative time series. LineChart for multi-series trends. BarChart for categorical comparison. PieChart for part-of-whole with fewer than 7 segments. RadarChart for multi-axis profiles. HeatmapChart for dense matrix data.

**WHY:** Law of Similarity. Each chart type creates a visual pattern that the brain maps to a specific data relationship. Using the wrong chart forces users to decode the data rather than perceive it.

**WHEN TO USE:** Any data visualization.
**WHEN NOT TO:** If you need a chart type not listed here, question whether a chart is even the right choice.

| Data Shape | Chart Type | Example |
|-----------|-----------|---------|
| Cumulative over time | AreaChart | Revenue growth, total users |
| Multiple trends over time | LineChart | CPU vs memory, weekly signups by plan |
| Categorical comparison | BarChart | Sales by region, feature usage counts |
| Part-of-whole (< 7 slices) | PieChart | Traffic sources, budget allocation |
| Multi-axis profile | RadarChart | Skill assessments, product comparison |
| Dense matrix (rows x cols) | HeatmapChart | Activity heatmap, correlation matrix |

**DO:**
```tsx
// Cumulative metric over time: AreaChart
<AreaChart data={revenueData} />

// Categorical comparison: BarChart
<BarChart data={salesByRegion} />
```

**DON'T:**
```tsx
// Categorical data in a LineChart (lines imply continuity)
<LineChart data={salesByRegion} />

// 12 slices in a PieChart (unreadable)
<PieChart data={monthlyBreakdown} /> {/* 12 slices = use BarChart */}
```

---

### Rule 2.2: Chart Gridlines and Axes

**THE RULE:** Horizontal gridlines only, dashed, 40% opacity. Y-axis labels hidden by default (show on hover or in tooltip). Legends at the bottom.

**WHY:** Aesthetic-Usability Effect. Clean charts are perceived as more trustworthy. Vertical gridlines add noise without aiding comparison. Bottom legends follow reading direction (data first, legend second).

**WHEN TO USE:** All chart configurations.
**WHEN NOT TO:** Scatter plots may need both axes visible.

**DO:**
```tsx
<LineChart
  data={data}
  gridLines="horizontal"    // Horizontal only
  showYAxis={false}          // Clean left edge
  legendPosition="bottom"
/>
```

**DON'T:**
```tsx
<LineChart
  data={data}
  gridLines="both"           // Vertical gridlines add noise
  showYAxis={true}           // Clutters the chart
  legendPosition="right"     // Steals horizontal space
/>
```

---

### Rule 2.3: Data Density Thresholds

**THE RULE:** Fewer than 50 points: chart. 50-500 points: DataTable. Over 500 points: virtualized table. When trend matters more than exact values: sparkline + delta.

**WHY:** Goal-Gradient Effect. Users need to see progress and direction quickly. Charts reveal trends at a glance. Tables provide precision for comparison. Virtualized tables handle scale without browser meltdown.

**WHEN TO USE:** Choosing between chart vs table representation.
**WHEN NOT TO:** If the user explicitly needs both views, provide a toggle.

| Data Points | Presentation | Component |
|-------------|-------------|-----------|
| < 50 | Chart | AreaChart, BarChart, etc. |
| 50-500 | Sortable table | DataTable |
| 500+ | Virtualized table | DataTable with virtualization |
| Trend > exact | Sparkline + number | Inline sparkline with delta badge |

---

### Rule 2.4: Chart Color Tokens

**THE RULE:** Use `chart-1` through `chart-6` semantic tokens only. Never use raw Tailwind color scales in charts.

**WHY:** Law of Similarity. Consistent chart colors across the system create visual grouping. Raw colors break theme-awareness and create accessibility failures when switching between light and dark modes.

**WHEN TO USE:** Every chart color assignment.
**WHEN NOT TO:** Never.

**DO:**
```tsx
// Semantic chart tokens
const chartConfig = {
  revenue: { color: "var(--color-chart-1)" },
  expenses: { color: "var(--color-chart-2)" },
  profit: { color: "var(--color-chart-3)" },
}
```

**DON'T:**
```tsx
// Raw color values
const chartConfig = {
  revenue: { color: "#3b82f6" },     // Breaks in dark mode
  expenses: { color: "rgb(239, 68, 68)" },
  profit: { color: "green" },
}
```

---

### Rule 2.5: Empty Chart States

**THE RULE:** When a chart has no data, show the Empty component with an icon, title, description, and CTA. Never show a blank chart area.

**WHY:** Zeigarnik Effect. An empty state with a call-to-action keeps the user engaged because the incomplete task (populating the chart) stays in working memory. A blank area is a dead end.

**WHEN TO USE:** Any chart or data visualization with potentially empty data.
**WHEN NOT TO:** Never show a blank chart frame with no data.

**DO:**
```tsx
{data.length === 0 ? (
  <Empty>
    <EmptyIcon>
      <BarChartIcon size={24} />
    </EmptyIcon>
    <EmptyTitle>No data yet</EmptyTitle>
    <EmptyDescription>
      Start tracking metrics to see your chart populate.
    </EmptyDescription>
    <Button variant="outline" size="sm">Import Data</Button>
  </Empty>
) : (
  <BarChart data={data} />
)}
```

**DON'T:**
```tsx
// Empty chart with just axes
<BarChart data={[]} />

// Generic "No data" text
{data.length === 0 && <p>No data available</p>}
```

---

### Rule 2.6: Chart Animation

**THE RULE:** Animate charts on mount (spring entrance, ~300-500ms). No animation on data updates.

**WHY:** Peak-End Rule. The first impression of a chart matters. Mount animation creates a polished entrance. But animating on data refresh makes the chart feel unstable and prevents users from tracking changes by eye.

**WHEN TO USE:** Initial chart render.
**WHEN NOT TO:** Data refreshes, filter changes, real-time updates.

---

## Domain 3: Typography

### Rule 3.1: Heading Scale

**THE RULE:** h1: text-4xl/text-5xl (one per page). h2: text-3xl. h3: text-2xl. h4: text-xl. Body: text-base (16px). Small: text-sm. Muted: text-sm + text-text-tertiary.

**WHY:** Serial Position Effect. The largest heading anchors the page. Users scan top-to-bottom by size. A consistent scale creates a predictable visual hierarchy that supports scanning.

**WHEN TO USE:** All text elements.
**WHEN NOT TO:** Never skip heading levels (h1 then h3). Never use more than one h1 per page.

**DO:**
```tsx
<h1 className="text-4xl font-semibold tracking-tight text-text-primary">
  Dashboard
</h1>
<h2 className="text-3xl font-semibold tracking-tight text-text-primary">
  Revenue Overview
</h2>
<p className="text-base leading-7 text-text-secondary">
  Your revenue grew 12% this quarter.
</p>
<p className="text-sm text-text-tertiary">
  Last updated 5 minutes ago
</p>
```

**DON'T:**
```tsx
// Multiple h1s on the same page
<h1>Dashboard</h1>
<h1>Settings</h1>

// Skipping heading levels
<h1>Dashboard</h1>
<h4>Revenue</h4>  {/* Skipped h2 and h3 */}

// Raw pixel sizes
<h1 style={{ fontSize: '42px' }}>Dashboard</h1>
```

---

### Rule 3.2: Line Height by Context

**THE RULE:** Headings: leading-tight (1.25). Body text: leading-7 (1.75). Dense UI (tables, forms): leading-snug (1.375).

**WHY:** Aesthetic-Usability Effect. Generous body line height improves readability and perceived quality. Tight heading line height prevents gaps in multi-line titles. Dense UI needs compact but readable spacing.

**WHEN TO USE:** All text elements.
**WHEN NOT TO:** Never use leading-none (1.0) on multi-line text.

**DO:**
```tsx
<h2 className="text-3xl font-semibold leading-tight">
  Multi-line Heading That Wraps Gracefully
</h2>
<p className="text-base leading-7 text-text-secondary">
  Body copy with generous line height for comfortable reading.
</p>
<td className="text-sm leading-snug">Dense table cell</td>
```

**DON'T:**
```tsx
// Default leading on headings (too loose)
<h2 className="text-3xl font-semibold leading-normal">
  This heading has too much line spacing
</h2>

// Tight leading on body (cramped)
<p className="text-base leading-tight">
  Body text that is uncomfortable to read because lines are too close.
</p>
```

---

### Rule 3.3: Font Weight Rules

**THE RULE:** Weight 300 NEVER (fails on glass backgrounds). 400 = body text. 500 = labels and UI text. 600 = headings. 700 = CTAs and buttons. 900 = brand display only.

**WHY:** Aesthetic-Usability Effect. Thin text (300) becomes invisible against glass/blur backgrounds. Each weight tier has a purpose that creates visual hierarchy. Mixing them randomly collapses the hierarchy.

**WHEN TO USE:** All text styling decisions.
**WHEN NOT TO:** Never use font-light (300) anywhere in the system.

**DO:**
```tsx
<p className="font-normal text-text-secondary">Body text (400)</p>
<Label className="font-medium">Form Label (500)</Label>
<h2 className="font-semibold">Section Heading (600)</h2>
<Button>Submit Order (700 via Button default)</Button>
```

**DON'T:**
```tsx
// Weight 300 on glass backgrounds
<Card>
  <p className="font-light text-text-secondary">
    This text will be barely visible on glass.
  </p>
</Card>

// Weight 900 for body text
<p className="font-black">This is overkill for body copy.</p>
```

---

### Rule 3.4: Text Overflow Strategy

**THE RULE:** Truncate: navigation items, table cells, tags/badges. Wrap: headings (text-balance), body text (text-pretty). Line-clamp: card descriptions (2 lines max).

**WHY:** Tesler's Law. Long text must go somewhere. Truncation preserves layout stability in constrained spaces. Wrapping preserves meaning in reading contexts. Clamping gives cards a consistent height.

**WHEN TO USE:** Any text that might exceed its container.
**WHEN NOT TO:** Never truncate body paragraphs. Never wrap inside nav items.

**DO:**
```tsx
// Navigation: truncate
<SidebarMenuButton>
  <span className="truncate">Very Long Navigation Label</span>
</SidebarMenuButton>

// Heading: wrap with balance
<h2 className="text-3xl font-semibold text-balance">
  A Heading That Wraps Evenly Across Lines
</h2>

// Card description: clamp to 2 lines
<CardDescription className="line-clamp-2">
  This description might be very long but will always occupy
  exactly two lines maximum in the card layout.
</CardDescription>
```

**DON'T:**
```tsx
// Truncating a heading
<h2 className="truncate">Important Heading Cut O...</h2>

// Wrapping inside a nav item
<SidebarMenuButton>
  <span className="whitespace-normal">
    This wraps and breaks the sidebar layout
  </span>
</SidebarMenuButton>
```

---

### Rule 3.5: Numeric Typography

**THE RULE:** Use tabular-nums in tables, charts, dashboards, and any numeric display. Use proportional (default) in prose.

**WHY:** Law of Similarity. Tabular numerals align vertically, making columns scannable. Proportional numerals look better in sentences. Mixing them causes visual jitter when numbers update.

**WHEN TO USE:** Any numeric data display.
**WHEN NOT TO:** Numbers embedded in prose sentences.

**DO:**
```tsx
// Dashboard stat
<span className="text-3xl font-semibold tabular-nums">
  $12,847.50
</span>

// Table cell
<td className="text-sm tabular-nums text-right">1,234</td>
```

**DON'T:**
```tsx
// Proportional nums in a table column
<td className="text-sm text-right">1,234</td>  {/* Digits won't align */}

// Tabular nums in a paragraph
<p className="tabular-nums">
  We served 1,234 customers last month.  {/* Looks mechanical in prose */}
</p>
```

---

### Rule 3.6: Maximum Line Width

**THE RULE:** Prose: max-w-2xl (~65 characters). Forms: max-w-md. Marketing headlines: max-w-4xl.

**WHY:** Aesthetic-Usability Effect. Lines longer than 75 characters cause eye-tracking fatigue. Shorter lines improve comprehension. Each context has an optimal width.

**WHEN TO USE:** All content containers.
**WHEN NOT TO:** Full-width dashboards (fluid layout) and data tables.

**DO:**
```tsx
// Prose content
<div className="max-w-2xl">
  <p className="leading-7 text-text-secondary">
    Long-form content constrained to comfortable reading width.
  </p>
</div>

// Form container
<form className="max-w-md space-y-4">
  <Field>...</Field>
</form>

// Marketing headline
<div className="max-w-4xl">
  <h1 className="text-5xl font-bold">Ship faster with Seed</h1>
</div>
```

**DON'T:**
```tsx
// Full-width prose
<div className="w-full">
  <p>This line stretches the entire viewport and is exhausting to read...</p>
</div>
```

---

### Rule 3.7: Text Alignment

**THE RULE:** Left-align everything. Center: empty states, modal content, hero sections. Right-align: numeric columns only.

**WHY:** Jakob's Law. LTR readers anchor on the left edge. Left alignment creates a consistent scan line. Center alignment breaks the scan line and is reserved for focal elements. Right alignment on numbers enables decimal point alignment.

**WHEN TO USE:** All text elements.
**WHEN NOT TO:** Never right-align prose. Never center table content.

**DO:**
```tsx
// Default: left aligned
<h2 className="text-3xl font-semibold">Section Title</h2>

// Empty state: centered
<Empty>
  <EmptyTitle>No results found</EmptyTitle>  {/* text-center built in */}
</Empty>

// Numeric column: right aligned
<td className="text-right tabular-nums">$12,847</td>
```

**DON'T:**
```tsx
// Centered body text
<p className="text-center text-text-secondary">
  This paragraph is centered and hard to read beyond two lines.
</p>

// Right-aligned labels
<Label className="text-right">Username</Label>
```

---

## Domain 4: Page Organization & Layout

### Rule 4.1: Content Width by Context

**THE RULE:** Marketing: max-w-7xl. Dashboard: fluid (full width). Reading/docs: max-w-2xl. Modals: max-w-lg. Forms: max-w-md.

**WHY:** Fitts's Law. Marketing pages need horizontal space for visual impact. Dashboards need every pixel for data density. Reading content needs narrow columns for comprehension. Modals need focus.

**WHEN TO USE:** Every page and container layout decision.
**WHEN NOT TO:** Never use a fixed width for dashboards.

| Context | Max Width | Tailwind Class |
|---------|----------|---------------|
| Marketing/landing | 7xl (80rem) | `max-w-7xl mx-auto` |
| Dashboard | Fluid | No max-width |
| Reading/docs | 2xl (42rem) | `max-w-2xl mx-auto` |
| Settings/forms | md (28rem) | `max-w-md` |
| Modals | lg (32rem) | `max-w-lg` (Dialog default) |

**DO:**
```tsx
// Marketing page section
<section className="mx-auto max-w-7xl px-6">
  <HeroBlock />
</section>

// Dashboard: fluid
<div className="flex-1 p-6">
  <StatsBlock />
  <DataGridBlock />
</div>
```

**DON'T:**
```tsx
// Marketing page too narrow
<section className="mx-auto max-w-2xl">
  <HeroBlock />  {/* Hero needs room to breathe */}
</section>

// Dashboard constrained
<div className="mx-auto max-w-4xl">
  <DataGridBlock />  {/* Wasting screen real estate */}
</div>
```

---

### Rule 4.2: Vertical Rhythm

**THE RULE:** Sections: space-y-12. Blocks within sections: space-y-8. Components within blocks: space-y-4. Form fields: space-y-2.

**WHY:** Law of Proximity. Items closer together are perceived as related. A consistent spacing scale creates visual grouping at four levels: macro (section), meso (block), micro (component), nano (field).

**WHEN TO USE:** All vertical stacking layouts.
**WHEN NOT TO:** Never mix spacing levels within the same container.

**DO:**
```tsx
// Page-level sections
<div className="space-y-12">
  <section>
    <h2>Overview</h2>
    {/* Blocks within section */}
    <div className="space-y-8">
      <StatsBlock />
      <ChartBlock />
    </div>
  </section>
  <section>
    <h2>Activity</h2>
    {/* Components within block */}
    <div className="space-y-4">
      <ActivityItem />
      <ActivityItem />
    </div>
  </section>
</div>
```

**DON'T:**
```tsx
// Random spacing values
<div>
  <StatsBlock className="mb-3" />
  <ChartBlock className="mb-10" />
  <ActivityBlock className="mb-5" />
</div>
```

---

### Rule 4.3: Grid Column Rules

**THE RULE:** 1 column: forms, settings. 2 columns: feature sections. 3 columns: pricing cards. 4 columns: stat cards. Never more than 4 columns except icon grids.

**WHY:** Miller's Law. Each column is a parallel track the eye must scan. Beyond 4 columns, users cannot compare items horizontally. Icon grids are an exception because icons are scanned as a visual field, not read linearly.

**WHEN TO USE:** All grid layouts.
**WHEN NOT TO:** Data tables (these have their own column logic).

**DO:**
```tsx
// Feature section: 2 columns
<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
  <FeatureBlock />
  <FeatureBlock />
</div>

// Pricing: 3 columns
<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <PricingBlock tier="starter" />
  <PricingBlock tier="pro" />
  <PricingBlock tier="enterprise" />
</div>

// Stats: 4 columns
<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
  <StatCard /><StatCard /><StatCard /><StatCard />
</div>
```

**DON'T:**
```tsx
// 5+ columns for content cards
<div className="grid grid-cols-5 gap-4">
  <Card /><Card /><Card /><Card /><Card />
</div>

// Single column for pricing
<div className="space-y-4">
  <PricingBlock tier="starter" />
  <PricingBlock tier="pro" />
  <PricingBlock tier="enterprise" />
</div>
```

---

### Rule 4.4: Card vs List vs Table

**THE RULE:** Card layout: fewer than 20 items with rich content (images, descriptions, actions). List layout: 20-100 items with minimal metadata. Table layout: over 100 items or any data needing sort/filter.

**WHY:** Goal-Gradient Effect. Users need to feel they can reach the end. Cards with rich content cap at ~20 before scrolling feels endless. Lists handle medium density. Tables enable scanning at scale with sort/filter as shortcuts.

**WHEN TO USE:** Choosing between collection presentation styles.
**WHEN NOT TO:** If the item count is dynamic, design for the upper bound.

| Item Count | Content Richness | Component |
|-----------|-----------------|-----------|
| < 20 | Rich (images, descriptions) | Card grid |
| 20-100 | Minimal (title, status, date) | List |
| 100+ | Any, needs sort/filter | DataTable |

---

### Rule 4.5: Above-the-Fold Priority

**THE RULE:** The first 600px of any page must contain: headline, description, primary CTA, and supporting visual. No exceptions.

**WHY:** Serial Position Effect. Users judge a page by what they see first. The primacy effect means the first 600px forms the lasting impression. Burying the CTA below the fold drops conversion.

**WHEN TO USE:** Every landing, marketing, and onboarding page.
**WHEN NOT TO:** Dashboards (data is the hero). Documentation (navigation is the hero).

**DO:**
```tsx
<section className="flex min-h-[600px] items-center">
  <div className="max-w-2xl space-y-6">
    <h1 className="text-5xl font-bold tracking-tight text-text-primary">
      Ship faster with Seed
    </h1>
    <p className="text-lg leading-7 text-text-secondary">
      A premium design system for teams that refuse to compromise.
    </p>
    <Button size="lg">Get Started</Button>
  </div>
  <div className="flex-1">
    <HeroVisual />
  </div>
</section>
```

**DON'T:**
```tsx
// Logo bar eating the fold
<LogoCloud className="h-[400px]" />
<h1>Ship faster with Seed</h1>
<p>Description...</p>
<Button>Get Started</Button>  {/* CTA is at 800px+ */}
```

---

### Rule 4.6: Sticky Elements

**THE RULE:** Sticky: page header (always). Table headers (when table is tall). Never sticky: footer, pagination, secondary navs.

**WHY:** Fitts's Law. The header stays in reach (distance = 0). Table headers provide context for scrolled data. Sticky footers waste vertical space. Sticky pagination creates a false floor.

**WHEN TO USE:** Layout decisions for fixed/sticky positioning.
**WHEN NOT TO:** Never make decorative elements sticky.

**DO:**
```tsx
// Sticky page header
<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
  <nav>...</nav>
</header>

// Sticky table header (conditional on table height)
<Table>
  <TableHeader className="sticky top-0 bg-surface">
    <TableRow>...</TableRow>
  </TableHeader>
</Table>
```

**DON'T:**
```tsx
// Sticky footer
<footer className="sticky bottom-0 bg-background">
  <p>Copyright 2025</p>
</footer>

// Sticky pagination
<div className="sticky bottom-0">
  <Pagination />
</div>
```

---

## Domain 5: Effects & Motion

### Rule 5.1: Duration Tiers

**THE RULE:** Micro (100ms): hover states. Fast (150-200ms): clicks, tab switches. Normal (200-300ms): page transitions, modals. Slow (300-500ms): hero entrances. Never exceed 500ms.

**WHY:** Doherty Threshold. Responses under 400ms maintain flow state. Each tier matches the user's expectation for how "heavy" the interaction is. Exceeding 500ms makes the UI feel sluggish regardless of context.

**WHEN TO USE:** All animation duration decisions.
**WHEN NOT TO:** Never. Every animation must fit a tier.

| Tier | Duration | Use Cases | Token |
|------|---------|-----------|-------|
| Micro | 100ms | Hover color, opacity | `duration-micro` |
| Fast | 150ms | Click feedback, tab switch | `duration-fast` |
| Normal | 200ms | Modal open, dropdown | `duration-normal` |
| Moderate | 250ms | Page transitions | `duration-moderate` |
| Slow | 300ms | Hero entrance, stagger | `duration-slow` |
| NEVER | > 500ms | Nothing | Forbidden |

**DO:**
```tsx
// Hover: micro duration
<button className="transition-colors duration-micro hover:bg-surface-hover">

// Modal: spring (resolves in ~300ms)
<motion.div
  initial={{ scale: 0.85, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={motionSpring.snappy}
>
```

**DON'T:**
```tsx
// Slow hover
<button className="transition-colors duration-700 hover:bg-surface-hover">

// Glacial entrance
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
```

---

### Rule 5.2: Spring vs CSS Easing

**THE RULE:** Spring physics for entrances, modals, lifts, and any element entering the viewport. CSS easing for color transitions, opacity changes, and border state changes. Linear for progress bars only.

**WHY:** Aesthetic-Usability Effect. Springs create organic, physical motion that signals quality. CSS easing is efficient for property interpolation. Linear motion feels mechanical and is reserved for progress indicators where mechanical precision is the point.

**WHEN TO USE:** Every animation implementation.
**WHEN NOT TO:** Never use linear for UI entrances. Never use springs for color transitions.

**DO:**
```tsx
// Entrance: spring
<motion.div
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={motionSpring.snappy}
/>

// Color transition: CSS easing
<button className="transition-colors duration-fast ease-out-cubic hover:bg-surface-hover" />

// Progress: linear
<Progress className="[&>div]:transition-all [&>div]:duration-300 [&>div]:ease-linear" />
```

**DON'T:**
```tsx
// Spring for color change (wasteful)
<motion.button
  animate={{ backgroundColor: hovered ? "var(--surface-hover)" : "transparent" }}
  transition={motionSpring.snappy}
/>

// Linear entrance (robotic)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: "linear" }}
/>
```

---

### Rule 5.3: Hover Animation Hierarchy

**THE RULE:** Button: lift (y: -2) + scale (1.02). Interactive Card: lift (y: -2) + glow border. Link: underline. Icon: scale (1.1). Static elements: nothing.

**WHY:** Von Restorff Effect. Each interactive element type has a distinct hover signature. This creates a learnable system where hover behavior communicates the element type before the user clicks.

**WHEN TO USE:** All interactive elements.
**WHEN NOT TO:** Never add hover animations to static/read-only elements.

**DO:**
```tsx
// Button: lift + scale (built into Button component)
<Button>Click me</Button>
// whileHover: { scale: 1.02, y: -2 }

// Interactive Card: lift + glow (built into Card interactive)
<Card interactive>
  <CardContent>Clickable card</CardContent>
</Card>
// whileHover: { y: -2 } + hover:border-primary/50

// Link: underline
<a className="underline-offset-4 hover:underline">Read more</a>

// Icon button: scale
<button className="transition-transform hover:scale-110">
  <SettingsIcon size={16} />
</button>
```

**DON'T:**
```tsx
// Lift on a static card
<Card className="hover:-translate-y-1">
  <p>Read-only content that shouldn't move</p>
</Card>

// Scale on a text link
<a className="hover:scale-105">Read more</a>
```

---

### Rule 5.4: Forbidden Motion Patterns

**THE RULE:** Parallax scrolling is FORBIDDEN. Scroll-jacking is FORBIDDEN. Scroll-triggered fade-in is allowed on marketing pages only.

**WHY:** Jakob's Law. Users expect native scroll behavior. Parallax causes motion sickness in a significant minority. Scroll-jacking hijacks expected behavior and breaks accessibility tools. Scroll-triggered fade-ins are acceptable on marketing pages where discovery is the goal.

**WHEN TO USE:** This is a prohibition. Always enforce.
**WHEN NOT TO:** No exceptions for parallax or scroll-jacking.

**DO:**
```tsx
// Marketing page: scroll-triggered fade-in (OK)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={motionSpring.snappy}
>
  <FeatureBlock />
</motion.div>
```

**DON'T:**
```tsx
// Parallax (FORBIDDEN)
<div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
  <img src="/hero-bg.jpg" />
</div>

// Scroll-jacking (FORBIDDEN)
useEffect(() => {
  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    smoothScrollTo(currentSection + 1)
  })
}, [])
```

---

### Rule 5.5: Loading Indicator Tiers

**THE RULE:** Under 300ms: show nothing. 300ms-3s: Spinner. 3s-10s: Skeleton. Over 10s: Progress bar with percentage.

**WHY:** Doherty Threshold + Goal-Gradient Effect. Sub-300ms loads feel instant and adding a spinner creates flicker. Spinners signal "working" for short waits. Skeletons reduce perceived duration by showing anticipated layout. Progress bars with percentage leverage the goal-gradient effect for long operations.

**WHEN TO USE:** All loading states.
**WHEN NOT TO:** Never show a spinner for under 300ms. Never use a skeleton for over 10s.

| Delay | Indicator | Component |
|-------|-----------|-----------|
| < 300ms | Nothing | -- |
| 300ms - 3s | Spinner | `<Spinner />` |
| 3s - 10s | Skeleton | `<Skeleton />` |
| > 10s | Progress bar + % | `<Progress value={percent} />` |

**DO:**
```tsx
// Short load: spinner with delay
const [showSpinner, setShowSpinner] = useState(false)
useEffect(() => {
  const timer = setTimeout(() => setShowSpinner(true), 300)
  return () => clearTimeout(timer)
}, [])

{isLoading && showSpinner && <Spinner />}

// Long load: skeleton layout
{isLoading && (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
)}
```

**DON'T:**
```tsx
// Instant spinner (causes flicker on fast loads)
{isLoading && <Spinner />}

// Spinner for a 15-second operation
{isUploading && <Spinner />}  {/* User has no idea how long this takes */}
```

---

### Rule 5.6: Reduced Motion

**THE RULE:** When `prefers-reduced-motion` is active: reduce all durations to 10ms, remove transforms (translate, scale, rotate), keep opacity and color transitions. This is NON-NEGOTIABLE.

**WHY:** Accessibility is not optional. Motion sensitivity affects a significant portion of users. The reduced-motion media query exists for a reason. Ignoring it is a liability.

**WHEN TO USE:** Always. Every animation must respect this preference.
**WHEN NOT TO:** Never override the user's reduced-motion preference.

**DO:**
```tsx
// motion/react handles this when you use useReducedMotion()
const prefersReduced = useReducedMotion()
const motionProps = prefersReduced
  ? {}  // No transforms
  : { whileHover: { scale: 1.02, y: -2 }, transition: motionSpring.snappy }

// CSS approach
<button className="transition-colors duration-fast motion-reduce:transition-none">
```

**DON'T:**
```tsx
// Ignoring reduced motion
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  {/* This bounces forever regardless of user preference */}
</motion.div>
```

---

## Domain 6: Forms & Input

### Rule 6.1: Label Placement

**THE RULE:** Stacked labels ALWAYS (label above input). Inline labels NEVER. Floating labels FORBIDDEN.

**WHY:** Fitts's Law + Law of Proximity. Stacked labels are directly above their field, creating the shortest scan path. Inline labels (label left, input right) break the vertical scan line. Floating labels have terrible UX: they obscure placeholder text, shift on focus, and confuse screen readers.

**WHEN TO USE:** All form fields.
**WHEN NOT TO:** No exceptions.

**DO:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

**DON'T:**
```tsx
// Inline label (breaks scan line)
<div className="flex items-center gap-4">
  <Label htmlFor="email" className="w-32">Email</Label>
  <Input id="email" />
</div>

// Floating label (FORBIDDEN)
<div className="relative">
  <Input id="email" className="peer" placeholder=" " />
  <Label className="absolute top-2 left-3 peer-focus:-translate-y-4 peer-focus:text-xs">
    Email
  </Label>
</div>
```

---

### Rule 6.2: Validation Timing

**THE RULE:** Validate individual fields on blur. Validate the full form on submit. Never validate on keystroke (except password strength meters).

**WHY:** Postel's Law. Be liberal in what you accept (let users type freely), strict in what you produce (validate before submission). Validating on every keystroke is hostile: it shows errors before the user finishes typing. Blur validation catches mistakes at the natural pause point.

**WHEN TO USE:** All form validation.
**WHEN NOT TO:** Password strength meters may validate on keystroke because they show encouragement, not errors.

**DO:**
```tsx
// Validate on blur
<Input
  onBlur={(e) => {
    if (!isValidEmail(e.target.value)) {
      setError("email", "Please enter a valid email")
    }
  }}
/>

// Validate on submit
<form onSubmit={(e) => {
  e.preventDefault()
  const errors = validateForm(formData)
  if (errors.length === 0) submit(formData)
}}>
```

**DON'T:**
```tsx
// Validate on every keystroke (hostile)
<Input
  onChange={(e) => {
    if (!isValidEmail(e.target.value)) {
      setError("email", "Invalid email")  // Fires after typing "j"
    }
  }}
/>
```

---

### Rule 6.3: Error Placement

**THE RULE:** Field errors: inline, directly below the field. Network/server errors: toast. Multi-field validation errors: alert banner at top of form.

**WHY:** Law of Proximity. Field errors must be adjacent to the field they describe. Network errors are transient and not field-specific, making toasts appropriate. Multi-field errors (conflicting values, business logic) need a summary above the form.

**WHEN TO USE:** All error display decisions.
**WHEN NOT TO:** Never show field errors in a toast. Never show network errors inline under a field.

**DO:**
```tsx
// Field error: inline below
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" aria-invalid={!!error} />
  {error && (
    <p className="text-sm text-destructive">{error}</p>
  )}
</div>

// Network error: toast
try {
  await submitForm(data)
} catch {
  toast({ variant: "destructive", title: "Failed to save changes" })
}

// Multi-field error: alert banner
<Alert variant="destructive">
  <AlertTitle>Please fix the following errors</AlertTitle>
  <AlertDescription>
    <ul className="list-disc pl-4">
      {errors.map(e => <li key={e.field}>{e.message}</li>)}
    </ul>
  </AlertDescription>
</Alert>
```

---

### Rule 6.4: Required Field Indicators

**THE RULE:** Mark required fields with an asterisk (*) after the label text. Never use "(Required)" text. Never use "(Optional)" on optional fields.

**WHY:** Jakob's Law. The asterisk convention is universally understood. "(Required)" wastes horizontal space. Marking optional fields implies required is the exception, which is backwards (most fields in well-designed forms are required).

**WHEN TO USE:** All required form fields.
**WHEN NOT TO:** Never mark optional fields.

**DO:**
```tsx
<Label htmlFor="email">
  Email <span className="text-destructive">*</span>
</Label>
<Input id="email" required />
```

**DON'T:**
```tsx
// Verbose
<Label>Email (Required)</Label>

// Marking optional fields
<Label>Phone (Optional)</Label>
<Label>Email</Label>
```

---

### Rule 6.5: Form Length Thresholds

**THE RULE:** Fewer than 7 fields: single page. 7-15 fields: divide into labeled sections. Over 15 fields: FormWizard (multi-step).

**WHY:** Miller's Law + Goal-Gradient Effect. Under 7 fields fits in working memory. Sections create mental chunks for 7-15 fields. FormWizard provides progress indicators that trigger the goal-gradient effect (closer to done = more motivated).

**WHEN TO USE:** All form layout decisions.
**WHEN NOT TO:** Never put 20 fields on a single unbroken page.

**DO:**
```tsx
// < 7 fields: single form
<form className="max-w-md space-y-4">
  <Field label="Name"><Input /></Field>
  <Field label="Email"><Input type="email" /></Field>
  <Field label="Password"><Input type="password" /></Field>
  <Button type="submit">Create Account</Button>
</form>

// 7-15 fields: sections
<form className="max-w-md space-y-8">
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Personal Info</h3>
    <Field label="Name"><Input /></Field>
    <Field label="Email"><Input /></Field>
  </section>
  <section className="space-y-4">
    <h3 className="text-lg font-semibold">Address</h3>
    <Field label="Street"><Input /></Field>
    <Field label="City"><Input /></Field>
  </section>
</form>

// 15+ fields: wizard
<FormWizard steps={["Account", "Profile", "Preferences"]} />
```

---

## Domain 7: Feedback & Status

### Rule 7.1: Feedback Channel Selection

**THE RULE:** Toast: transient confirmations (3-5s auto-dismiss). Alert: persistent in-page status. Banner: system-wide announcements.

**WHY:** Von Restorff Effect + Serial Position Effect. Each feedback channel has a distinct visual location and persistence, creating a learnable system. Toasts appear and vanish (transient success). Alerts persist until resolved (important context). Banners span the top of the app (system-level).

**WHEN TO USE:** Every user feedback decision.
**WHEN NOT TO:** Never use a toast for something the user needs to act on. Never use an alert for a success confirmation.

| Feedback Type | Channel | Duration | Component |
|--------------|---------|----------|-----------|
| Success confirmation | Toast | 3-5s | `toast({ title: "Saved" })` |
| Form error (field) | Inline text | Persistent | `<p className="text-destructive">` |
| Form error (multi) | Alert banner | Persistent | `<Alert variant="destructive">` |
| Network failure | Toast (destructive) | 5s | `toast({ variant: "destructive" })` |
| System maintenance | Banner | Until dismissed | Top banner |
| Destructive warning | AlertDialog | Until action | `<AlertDialog>` |

---

### Rule 7.2: Status Color and Icon Pairing

**THE RULE:** Success = bg-success + CheckCircleIcon. Error = bg-destructive + XCircleIcon. Warning = bg-warning + TriangleAlertIcon. Info = bg-info + InfoIcon. Always pair an icon with text. Never color alone.

**WHY:** Law of Similarity + Accessibility. Color conveys category. Icons convey severity. Text explains the situation. Color alone fails for colorblind users (~8% of males). The triple encoding (color + icon + text) ensures universal comprehension.

**WHEN TO USE:** All status indicators (badges, alerts, toasts).
**WHEN NOT TO:** Never use color without an icon. Never use an icon without text.

**DO:**
```tsx
// Success
<Alert variant="success">
  <CheckCircleIcon size={16} />
  <AlertTitle>Changes saved</AlertTitle>
  <AlertDescription>Your profile has been updated.</AlertDescription>
</Alert>

// Error
<Alert variant="destructive">
  <XCircleIcon size={16} />
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>Please try again later.</AlertDescription>
</Alert>
```

**DON'T:**
```tsx
// Color alone (fails for colorblind users)
<div className="bg-success rounded-md p-4">
  <p>Profile updated</p>
</div>

// Icon alone (ambiguous without text)
<XCircleIcon className="text-destructive" />
```

---

### Rule 7.3: Destructive Action Confirmation

**THE RULE:** All destructive actions (delete, remove, revoke) must use an AlertDialog. Reversible actions (archive, hide) need no confirmation.

**WHY:** Loss Aversion. Users weigh losses more heavily than gains. A destructive action with no undo is perceived as high-risk. The AlertDialog creates a deliberate friction point that prevents accidental data loss. Reversible actions should not create friction because the cost of error is zero.

**WHEN TO USE:** Any action that permanently destroys data.
**WHEN NOT TO:** Archiving, hiding, toggling, and other reversible actions.

**DO:**
```tsx
// Destructive: AlertDialog required
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete your account?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All your data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className={buttonVariants({ variant: "destructive" })}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Reversible: direct action
<Button variant="ghost" onClick={() => archiveItem(id)}>
  Archive
</Button>
```

**DON'T:**
```tsx
// Destructive without confirmation
<Button variant="destructive" onClick={() => deleteAccount()}>
  Delete Account  {/* One misclick = gone forever */}
</Button>

// Confirmation for reversible action (unnecessary friction)
<AlertDialog>
  <AlertDialogTrigger>
    <Button>Archive</Button>  {/* User can un-archive later */}
  </AlertDialogTrigger>
  {/* ... */}
</AlertDialog>
```

---

### Rule 7.4: Empty State Pattern

**THE RULE:** Every empty state must have: icon (in EmptyIcon), title (EmptyTitle), description (EmptyDescription), and a CTA button. Never show a blank area.

**WHY:** Zeigarnik Effect. An empty state with a call-to-action keeps the incomplete task in the user's working memory. A blank area provides no guidance, no motivation, and no path forward.

**WHEN TO USE:** Any collection, list, table, or chart that can be empty.
**WHEN NOT TO:** Never show a blank container.

**DO:**
```tsx
<Empty>
  <EmptyIcon>
    <InboxIcon size={24} />
  </EmptyIcon>
  <EmptyTitle>No messages yet</EmptyTitle>
  <EmptyDescription>
    When you receive messages, they will appear here.
  </EmptyDescription>
  <Button variant="outline" size="sm">
    Compose Message
  </Button>
</Empty>
```

**DON'T:**
```tsx
// Blank container
<div className="min-h-[200px]" />

// Text-only empty state
<p className="text-center text-text-tertiary">No items found</p>
```

---

## Domain 8: Responsive Design

### Rule 8.1: Breakpoint System

**THE RULE:** Mobile-first. sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px. Default styles are mobile. Build up with min-width breakpoints.

**WHY:** Jakob's Law. Tailwind's mobile-first approach matches the industry standard. Starting from mobile ensures the most constrained layout works first. Adding complexity at wider breakpoints is progressive enhancement.

**WHEN TO USE:** All responsive layouts.
**WHEN NOT TO:** Never use max-width breakpoints. Never design desktop-first and strip features at mobile.

| Breakpoint | Width | Typical Layout |
|-----------|-------|---------------|
| Default | < 640px | Single column, Sheet nav |
| sm | 640px | 2-column where needed |
| md | 768px | Sidebar becomes visible |
| lg | 1024px | 3-column layouts |
| xl | 1280px | 4-column, expanded spacing |
| 2xl | 1536px | Max-width containers center |

**DO:**
```tsx
// Mobile-first: starts single column, expands
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

**DON'T:**
```tsx
// Desktop-first: hides columns at mobile (backwards)
<div className="grid grid-cols-4 gap-4">
  {items.map(item => (
    <Card key={item.id} className="hidden sm:block last:block" />
  ))}
</div>
```

---

### Rule 8.2: Touch Targets

**THE RULE:** Minimum 44x44px touch targets on mobile. Minimum 40x40px on desktop. Apply to all interactive elements.

**WHY:** Fitts's Law. Smaller targets take longer to acquire and produce more errors, especially on touch devices. 44px is the Apple HIG minimum. 40px is acceptable on desktop where mouse precision is higher.

**WHEN TO USE:** All buttons, links, icons, form controls.
**WHEN NOT TO:** Never make a clickable element smaller than 40x40px.

**DO:**
```tsx
// Icon button: meets 44px touch target
<button className="flex h-11 w-11 items-center justify-center rounded-md md:h-10 md:w-10">
  <SettingsIcon size={16} />
</button>

// List item: tall enough for touch
<li className="flex min-h-[44px] items-center px-4 md:min-h-[40px]">
  <span>List item text</span>
</li>
```

**DON'T:**
```tsx
// Tiny icon button
<button className="h-6 w-6">
  <SettingsIcon size={12} />  {/* 24px target = miss-taps */}
</button>

// Cramped list
<li className="py-0.5 px-2">
  <a href="/settings">Settings</a>  {/* ~20px tall = unusable on mobile */}
</li>
```

---

### Rule 8.3: Responsive Column Rules

**THE RULE:** Under 640px: single column, Sheet navigation. 640-1024px: 2 columns max. Over 1024px: 3-4 columns.

**WHY:** Law of Proximity + Fitts's Law. Narrow viewports cannot display parallel columns without cramping content or requiring horizontal scrolling. Each breakpoint threshold unlocks enough horizontal space for an additional column.

**WHEN TO USE:** All grid and column layouts.
**WHEN NOT TO:** Tables use horizontal scroll on mobile instead of column reduction.

**DO:**
```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <FeatureBlock />
  <FeatureBlock />
  <FeatureBlock />
</div>
```

**DON'T:**
```tsx
// 3 columns on mobile
<div className="grid grid-cols-3 gap-2">
  {/* Each column is ~100px wide on a 375px phone */}
</div>
```

---

### Rule 8.4: Control Rails Must Not Create Page Overflow

**THE RULE:** Mobile control rails (top action rows, tab strips, segmented filters) must either wrap or scroll within their own container. The page root must never gain horizontal scroll.

**WHY:** Fitts's Law + Law of Proximity. When controls overflow the viewport, targets become clipped, hard to acquire, and unrelated controls appear disconnected. Localized overflow preserves hierarchy without breaking the page layout.

**WHEN TO USE:** Headers that include search/theme/style controls, tabs, filter chips, and other horizontal control groups.
**WHEN NOT TO:** Never force single-line control rows that push the document wider than the viewport.

**DO:**
```tsx
// Header controls: wrap on mobile, align right on desktop
<div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap md:justify-end">
  <button className="min-h-11 px-3">Search</button>
  <ThemeToggle />
  <StyleToggle />
</div>

// Tabs: local horizontal scroll, hidden scrollbar
<TabsList className="w-full justify-start overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
  <TabsTrigger value="foundations">Foundations</TabsTrigger>
  <TabsTrigger value="components">Components</TabsTrigger>
</TabsList>
```

**DON'T:**
```tsx
// Forces page-level overflow on narrow viewports
<div className="flex items-center justify-between gap-4">
  <button className="whitespace-nowrap">Search ⌘K</button>
  <ThemeToggle />
  <StyleToggle />
</div>

// Tabs clipped off-screen with no local scroll
<TabsList className="justify-center">
  {/* Long tab labels become unreachable on mobile */}
</TabsList>
```

---

## Domain 9: Spacing & Density

### Rule 9.1: Base Unit

**THE RULE:** 8px is the base unit. All spacing derives from the 8px grid: xs=8px (2), sm=16px (4), md=24px (6), lg=32px (8), xl=48px (12), 2xl=64px (16).

**WHY:** Law of Proximity. A consistent spatial grid creates predictable grouping. Elements spaced at multiples of 8px create a visual rhythm that users perceive as organized and intentional.

**WHEN TO USE:** All padding, margin, and gap values.
**WHEN NOT TO:** Optical adjustments of 1-2px are acceptable for alignment (p-[3px]).

| Token | Pixels | Tailwind | Use |
|-------|--------|---------|-----|
| xs | 8px | 2 | Inline gap, icon padding |
| sm | 16px | 4 | Field gap, compact padding |
| md | 24px | 6 | Card padding, section gap |
| lg | 32px | 8 | Section padding |
| xl | 48px | 12 | Page sections |
| 2xl | 64px | 16 | Hero spacing |

**DO:**
```tsx
<Card className="p-6">          {/* 24px = md */}
  <div className="space-y-4">   {/* 16px = sm between items */}
    <h3>Title</h3>
    <p>Description</p>
  </div>
</Card>
```

**DON'T:**
```tsx
<Card className="p-5">          {/* 20px = not on grid */}
  <div className="space-y-3">   {/* 12px = not on grid */}
    <h3>Title</h3>
    <p>Description</p>
  </div>
</Card>
```

---

### Rule 9.2: Component Padding Standards

**THE RULE:** Card: p-6 desktop, p-4 mobile. Modal: p-6 desktop, p-4 mobile. Input: px-3 py-2. Button: px-4 py-2.

**WHY:** Aesthetic-Usability Effect. Consistent internal spacing across components creates a polished, unified feel. Reducing padding on mobile reclaims space without sacrificing readability.

**WHEN TO USE:** All component styling.
**WHEN NOT TO:** Never override these paddings without a compelling reason.

| Component | Desktop | Mobile | Tailwind |
|-----------|---------|--------|---------|
| Card | p-6 (24px) | p-4 (16px) | `p-4 md:p-6` |
| Dialog/Modal | p-6 (24px) | p-4 (16px) | `p-6` (built-in) |
| Input | px-3 py-2 | Same | `px-3 py-2` (built-in) |
| Button (default) | px-4 py-2 | Same | `px-4 py-2` (built-in) |
| Button (sm) | px-3 py-1 | Same | `h-8 px-3` (built-in) |
| Button (lg) | px-8 py-2.5 | Same | `h-10 px-8` (built-in) |
| Table cell | px-4 py-3 | px-3 py-2 | `px-3 py-2 md:px-4 md:py-3` |

---

### Rule 9.3: Density Modes

**THE RULE:** Three density modes. Comfortable (default, 100% spacing): general use. Dense (75% spacing): dashboards and data-heavy screens. Spacious (150% spacing): marketing and landing pages.

**WHY:** Tesler's Law. Complexity must live somewhere. Data-heavy interfaces benefit from tighter spacing to show more data per viewport. Marketing pages benefit from generous whitespace that signals premium quality.

**WHEN TO USE:** Layout-level decisions based on page type.
**WHEN NOT TO:** Never mix density modes on the same page.

| Mode | Multiplier | Use Case | Example |
|------|-----------|----------|---------|
| Comfortable | 1x | General app pages | `space-y-4`, `p-6`, `gap-4` |
| Dense | 0.75x | Dashboards, tables | `space-y-3`, `p-4`, `gap-3` |
| Spacious | 1.5x | Marketing, heroes | `space-y-8`, `p-12`, `gap-8` |

**DO:**
```tsx
// Dashboard: dense spacing
<div className="space-y-3 p-4">
  <StatsBlock />
  <div className="grid grid-cols-2 gap-3">
    <ChartBlock />
    <DataGridBlock />
  </div>
</div>

// Marketing: spacious
<section className="space-y-8 px-6 py-16">
  <h1 className="text-5xl">Ship faster</h1>
  <p className="text-lg">Premium design system.</p>
</section>
```

---

## Domain 10: Accessibility

### Rule 10.1: Focus Indicators

**THE RULE:** Use `focus-visible:ring-1 ring-accent` on all interactive elements. Never remove focus indicators. Use `focus-visible` (not `focus`) to avoid showing rings on mouse click.

**WHY:** WCAG 2.4.7 (Focus Visible). Keyboard users must see where they are. Removing focus rings makes the application unusable for keyboard-only users. `focus-visible` preserves the ring for keyboard navigation while hiding it for mouse users.

**WHEN TO USE:** Every interactive element (buttons, inputs, links, toggles).
**WHEN NOT TO:** Never remove focus rings. Never use `outline-none` without a replacement.

**DO:**
```tsx
// Button (built-in)
<Button>Submit</Button>
// focus-visible:ring-1 ring-accent

// Custom interactive element
<div
  role="button"
  tabIndex={0}
  className="cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
>
  Custom action
</div>
```

**DON'T:**
```tsx
// Removing focus indicators
<button className="outline-none focus:outline-none">
  Submit  {/* Keyboard users can't see this is focused */}
</button>

// Using focus instead of focus-visible
<button className="focus:ring-1 ring-accent">
  Submit  {/* Shows ring on every mouse click */}
</button>
```

---

### Rule 10.2: Color Contrast

**THE RULE:** AA (4.5:1) minimum everywhere. AAA (7:1) for body text, error messages, and headings.

**WHY:** WCAG 1.4.3 (Contrast Minimum). Low contrast text is unreadable in sunlight, on low-quality monitors, and for users with vision impairments. Body text at AAA (7:1) ensures readability in all conditions.

**WHEN TO USE:** All text and interactive elements.
**WHEN NOT TO:** Decorative text (watermarks, background patterns) is exempt.

| Element | Minimum Ratio | Tailwind Classes |
|---------|--------------|-----------------|
| Body text | 7:1 (AAA) | `text-text-primary` on `bg-background` |
| Headings | 7:1 (AAA) | `text-text-primary` on `bg-background` |
| Secondary text | 4.5:1 (AA) | `text-text-secondary` on `bg-background` |
| Error messages | 7:1 (AAA) | `text-destructive` on `bg-background` |
| Placeholder text | 4.5:1 (AA) | `text-text-tertiary` on `bg-background` |
| Interactive borders | 3:1 | `border-border` |

---

### Rule 10.3: Screen Reader and Semantic HTML

**THE RULE:** All icons must have sr-only text or aria-label. Use semantic HTML landmarks (nav, main, aside, header, footer). Add skip-nav on all pages.

**WHY:** WCAG 1.3.1 (Info and Relationships). Screen readers rely on semantic structure to navigate. Icons without labels are invisible. Missing landmarks force linear navigation through the entire page.

**WHEN TO USE:** Every page and component.
**WHEN NOT TO:** Never.

**DO:**
```tsx
// Icon with sr-only text
<button>
  <SettingsIcon size={16} />
  <span className="sr-only">Settings</span>
</button>

// Semantic landmarks
<header><nav>...</nav></header>
<main>{children}</main>
<aside><Sidebar /></aside>
<footer>...</footer>

// Skip nav
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4">
  Skip to content
</a>
<main id="main">{children}</main>
```

**DON'T:**
```tsx
// Icon without label
<button>
  <SettingsIcon size={16} />
  {/* Screen reader: "button" - what does it do? */}
</button>

// Div soup
<div className="header">
  <div className="nav">...</div>
</div>
<div className="main">{children}</div>
```

---

### Rule 10.4: Keyboard Navigation

**THE RULE:** Tab: move between interactive elements. Enter/Space: activate buttons and toggles. Escape: close modals, dropdowns, popovers. Arrow keys: navigate within lists, menus, tabs, radio groups. Radix UI handles most of this.

**WHY:** WCAG 2.1.1 (Keyboard). All functionality must be operable via keyboard. This is a legal requirement, not a nice-to-have. Radix UI primitives provide correct keyboard behavior out of the box.

**WHEN TO USE:** All interactive components.
**WHEN NOT TO:** Never build custom interactive widgets without keyboard support.

**DO:**
```tsx
// Radix handles keyboard behavior automatically
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button> {/* Enter/Space opens, Escape closes */}
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

// Custom list: manual keyboard handling
<div
  role="listbox"
  onKeyDown={(e) => {
    if (e.key === "ArrowDown") focusNext()
    if (e.key === "ArrowUp") focusPrev()
    if (e.key === "Enter") selectCurrent()
  }}
>
  {items.map(item => (
    <div role="option" tabIndex={-1} key={item.id}>
      {item.label}
    </div>
  ))}
</div>
```

**DON'T:**
```tsx
// Click-only interaction
<div onClick={() => setOpen(true)}>
  Open menu  {/* Not focusable, no keyboard support */}
</div>

// Missing Escape to close
function CustomModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-overlay/80">
      <div className="glass-panel p-6">
        {/* No Escape handler. User is trapped. */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
```

---

## Quick Reference: Decision Tables

### Navigation Decision Table

| Context | Pattern | Mobile Behavior |
|---------|---------|----------------|
| Dashboard / app shell | Sidebar | Collapses to Sheet |
| Settings / profiles | Tabs | Horizontal scroll |
| Marketing / landing | Top-nav | Hamburger menu |
| Content browsing | Tabs | Horizontal scroll |
| Multi-step flow | FormWizard (stepper) | Same |

### Chart Type Decision Table

| Data Question | Chart Type |
|--------------|-----------|
| How much over time (cumulative)? | AreaChart |
| How do trends compare? | LineChart |
| Which category is biggest? | BarChart |
| What's the breakdown? (< 7 parts) | PieChart |
| How does this profile compare? | RadarChart |
| What's the pattern in this matrix? | HeatmapChart |

### Feedback Channel Decision Table

| Event | Channel | Duration |
|-------|---------|----------|
| Action succeeded | Toast | 3s |
| Action failed (network) | Toast (destructive) | 5s |
| Field validation error | Inline text | Persistent |
| Multi-field validation | Alert banner | Persistent |
| Destructive action | AlertDialog | Until action |
| System announcement | Banner | Until dismissed |

### Loading Indicator Decision Table

| Wait Time | Indicator |
|-----------|-----------|
| < 300ms | Nothing |
| 300ms - 3s | Spinner |
| 3s - 10s | Skeleton |
| > 10s | Progress bar + % |

### Spacing Decision Table

| Context | Vertical Rhythm | Card Padding | Grid Gap |
|---------|----------------|-------------|---------|
| Dashboard | space-y-3 | p-4 | gap-3 |
| App page | space-y-4 | p-6 | gap-4 |
| Marketing | space-y-8 | p-8 | gap-8 |
| Form | space-y-2 | -- | -- |

---

## Appendix: The 5 Cardinal Rules

If you read nothing else, memorize these:

1. **Never hardcode colors.** Use semantic tokens (`bg-surface`, `text-text-primary`, `border-border`). Raw Tailwind colors (`bg-zinc-900`, `text-gray-500`) break theme switching.

2. **Spring for entrances, CSS easing for properties.** Use `motionSpring.snappy` for elements entering the viewport. Use `transition-colors duration-fast` for hover states.

3. **Stacked labels always.** Label above input. No exceptions. No floating labels. No inline labels.

4. **prefers-reduced-motion is non-negotiable.** Every animation must degrade gracefully. Use `useReducedMotion()` from motion/react.

5. **Max 3 navigation levels.** Sidebar group > item > sub-item. Deeper hierarchies must be flattened into tabs, filters, or search.
