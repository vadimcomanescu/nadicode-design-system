# Opinion Patterns: Machine-Readable Decision Tables

Quick-lookup tables for enforcing `docs/OPINIONS.md` rules.
Rules marked **[ENFORCED]** have automated tests in `src/test/opinion-*.test.ts`.

## Navigation Pattern Selection [ENFORCED: opinion-navigation.test.ts]

```
IF context == "app shell" OR context == "dashboard":
  USE Sidebar + SidebarProvider
  MOBILE: Sheet (auto via Sidebar component)

IF context == "content browsing" OR context == "settings":
  USE Tabs + TabsList + TabsTrigger
  MOBILE: horizontal scroll

IF context == "marketing" OR context == "landing":
  USE top-nav (<nav> in <header>)
  MOBILE: hamburger -> Sheet

IF context == "multi-step flow":
  USE FormWizard
```

## Navigation Depth Check [ENFORCED: opinion-navigation.test.ts]

```
MAX_DEPTH = 3
Level 1: SidebarGroup / SidebarGroupLabel
Level 2: SidebarMenuItem / SidebarMenuButton
Level 3: SidebarMenuSubItem / SidebarMenuSubButton
Level 4+: VIOLATION -> flatten to Tabs, filters, or search
```

## Chart Type Selection

```
cumulative_time_series  -> AreaChart
multi_series_trends     -> LineChart
categorical_comparison  -> BarChart
part_of_whole (n < 7)   -> PieChart
part_of_whole (n >= 7)  -> BarChart
multi_axis_profile      -> RadarChart
dense_matrix            -> HeatmapChart
```

## Data Density Thresholds

```
data_points < 50        -> Chart component
50 <= data_points < 500 -> DataTable
data_points >= 500      -> DataTable + virtualization
trend > precision       -> Sparkline + delta badge
```

## Typography Scale [ENFORCED: opinion-typography.test.ts]

```
h1: text-4xl/5xl, font-semibold, leading-tight (1 per page)
h2: text-3xl, font-semibold, leading-tight
h3: text-2xl, font-semibold, leading-tight
h4: text-xl, font-semibold, leading-tight
body: text-base, font-normal, leading-7
small: text-sm, font-normal
muted: text-sm, text-text-tertiary
```

## Font Weight Rules [ENFORCED: opinion-typography.test.ts]

```
FORBIDDEN: 300 (font-light) -- fails on glass backgrounds
400 (font-normal)  = body text
500 (font-medium)  = labels, UI text
600 (font-semibold) = headings
700 (font-bold)    = CTAs, buttons
900 (font-black)   = brand display only
```

## Text Overflow Rules

```
TRUNCATE: nav items, table cells, tags, badges
WRAP:     headings (text-balance), body (text-pretty)
CLAMP:    card descriptions (line-clamp-2)
NEVER:    truncate headings, wrap inside nav items
```

## Duration Tiers

```
hover/opacity   -> 100ms  (duration-micro)
click/tab       -> 150ms  (duration-fast)
modal/dropdown  -> 200ms  (duration-normal)
page transition -> 250ms  (duration-moderate)
hero entrance   -> 300ms  (duration-slow)
NEVER           -> > 500ms
```

## Animation Type Selection

```
element_entering_viewport -> spring (motionSpring.snappy)
color_change              -> CSS transition (duration-fast)
opacity_change            -> CSS transition (duration-fast)
border_state              -> CSS transition (duration-micro)
progress_bar              -> linear
FORBIDDEN                 -> parallax, scroll-jacking
```

## Hover Animation by Element Type

```
Button            -> lift (y: -2) + scale (1.02)
Card (interactive) -> lift (y: -2) + glow border
Link              -> underline (underline-offset-4)
Icon button       -> scale (1.1)
Static element    -> nothing
```

## Card Behavior Rules [ENFORCED: opinion-card-behavior.test.ts]

```
interactive_card  -> hover: lift (y: -2) + glow border, cursor-pointer
static_card       -> no hover effect, no cursor-pointer
card_click        -> entire card is clickable (not just nested link)
card_actions      -> buttons inside card stop propagation
```

## Form Layout Rules

```
fields < 7   -> single page form
7 <= fields <= 15 -> sectioned form (labeled sections)
fields > 15  -> FormWizard (multi-step)

Label placement: ALWAYS stacked (above input)
FORBIDDEN: inline labels, floating labels
```

## Validation Timing

```
field_level   -> onBlur
form_level    -> onSubmit
on_keystroke  -> ONLY for password strength
```

## Error Display Channel

```
field_error          -> inline <p> below field
network_error        -> toast (destructive variant)
multi_field_error    -> Alert banner (top of form)
```

## Feedback Channel Selection

```
success_confirmation -> Toast (3-5s)
form_field_error     -> inline text (persistent)
form_multi_error     -> Alert banner (persistent)
network_failure      -> Toast destructive (5s)
destructive_action   -> AlertDialog (until action)
system_announcement  -> Banner (until dismissed)
```

## Loading Indicator Selection

```
wait < 300ms    -> nothing
300ms-3s        -> Spinner
3s-10s          -> Skeleton
wait > 10s      -> Progress + percentage
```

## Content Width by Context

```
marketing/landing -> max-w-7xl mx-auto
dashboard         -> fluid (no max-width)
reading/docs      -> max-w-2xl mx-auto
settings/forms    -> max-w-md
modals            -> max-w-lg
```

## Vertical Rhythm Scale

```
sections         -> space-y-12
blocks           -> space-y-8
components       -> space-y-4
fields           -> space-y-2
```

## Grid Column Rules

```
forms/settings   -> 1 column
features         -> 2 columns (md:grid-cols-2)
pricing          -> 3 columns (md:grid-cols-3)
stats            -> 4 columns (md:grid-cols-4)
icons            -> exception (can exceed 4)
NEVER            -> > 4 columns for content
```

## Responsive Breakpoints

```
default (< 640px)  -> 1 column, Sheet nav
sm (640px)         -> 2 columns available
md (768px)         -> Sidebar visible
lg (1024px)        -> 3 columns available
xl (1280px)        -> 4 columns, expanded spacing
2xl (1536px)       -> containers center
```

## Mobile Control Rails

```
header_controls_mobile -> flex-wrap enabled, no forced single row
tab_rail_mobile        -> overflow-x-auto on rail container, not page root
tab_rail_alignment     -> justify-start mobile, can center at sm+
viewport_375_check     -> documentElement.scrollWidth == documentElement.clientWidth
```

## Density Modes

```
comfortable (1x)    -> general app pages
dense (0.75x)       -> dashboards, data tables
spacious (1.5x)     -> marketing, landing, heroes
```

## Accessibility Minimums

```
body_text     -> 7:1 (AAA)
headings      -> 7:1 (AAA)
secondary     -> 4.5:1 (AA)
error_text    -> 7:1 (AAA)
placeholder   -> 4.5:1 (AA)
borders       -> 3:1
touch_target  -> 44x44px mobile, 40x40px desktop
focus_ring    -> focus-visible:ring-1 ring-accent
```

## Status Color + Icon Pairing

```
success  -> bg-success  + CheckCircleIcon
error    -> bg-destructive + XCircleIcon
warning  -> bg-warning  + TriangleAlertIcon
info     -> bg-info     + InfoIcon
RULE: always triple-encode (color + icon + text)
```

## Card vs List vs Table

```
items < 20 + rich content   -> Card grid
20 <= items <= 100          -> List
items > 100 OR sort/filter  -> DataTable
```

## Sticky Element Rules

```
STICKY:     page header (always), table headers (when tall)
NEVER:      footer, pagination, secondary nav, decorative elements
```
