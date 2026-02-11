# Component Inventory

All components live under `src/components/`. Import via `@/components/ui/...` or `@/components/blocks/...`.

---

## Form Controls (~20)

| Component       | Path                    | Radix Primitive          | Key Variants / Notes                           |
| --------------- | ----------------------- | ------------------------ | ---------------------------------------------- |
| Button          | `ui/Button`             | `@radix-ui/react-slot`   | variant: primary, secondary, outline, ghost, link, destructive, accent, glass. size: sm, md, lg, icon |
| Input           | `ui/Input`              | -                        | size: sm, default, lg. Props: label, error, startIcon, endIcon |
| PasswordInput   | `ui/PasswordInput`      | -                        | Input with show/hide toggle                    |
| Textarea        | `ui/Textarea`           | -                        | Auto-grow text area                            |
| Select          | `ui/Select`             | `@radix-ui/react-select` | Compound: Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator |
| NativeSelect    | `ui/NativeSelect`       | -                        | Browser-native `<select>` styled              |
| Checkbox        | `ui/Checkbox`           | `@radix-ui/react-checkbox`| With optional label                           |
| Switch          | `ui/Switch`             | `@radix-ui/react-switch` | Toggle switch                                  |
| RadioGroup      | `ui/RadioGroup`         | `@radix-ui/react-radio-group` | RadioGroup + RadioGroupItem              |
| Slider          | `ui/Slider`             | `@radix-ui/react-slider` | Range slider                                   |
| Combobox        | `ui/Combobox`           | `cmdk`                   | Searchable select                              |
| TagInput        | `ui/TagInput`           | -                        | Multi-value tag input                          |
| DatePicker      | `ui/DatePicker`         | `react-day-picker`       | Single date picker                             |
| DateRangePicker | `ui/DateRangePicker`    | `react-day-picker`       | Date range selection                           |
| Calendar        | `ui/Calendar`           | `react-day-picker`       | Calendar grid primitive                        |
| InputOTP        | `ui/InputOTP`           | `input-otp`              | InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator |
| InputGroup      | `ui/InputGroup`         | -                        | Input + addon composition                      |
| Form            | `ui/Form`               | `react-hook-form`        | FormField, FormItem, FormLabel, FormControl, FormMessage |
| FormWizard      | `ui/FormWizard`         | -                        | Multi-step form wizard                         |
| Field           | `ui/Field`              | -                        | Generic field wrapper (label + error)          |
| Label           | `ui/Label`              | `@radix-ui/react-label`  | Accessible label                               |
| FileUpload      | `ui/FileUpload`         | -                        | Drag-and-drop file upload zone                 |
| CheckoutForm    | `ui/CheckoutForm`       | `@stripe/react-stripe-js`| Stripe Elements checkout form                  |

---

## Display (~20)

| Component       | Path                    | Radix Primitive              | Notes                                        |
| --------------- | ----------------------- | ---------------------------- | -------------------------------------------- |
| Card            | `ui/Card`               | -                            | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Avatar          | `ui/Avatar`             | `@radix-ui/react-avatar`    | Avatar, AvatarImage, AvatarFallback          |
| AvatarUpload    | `ui/AvatarUpload`       | -                            | Avatar with upload functionality             |
| Badge           | `ui/Badge`              | -                            | variant: default, secondary, outline, destructive, success, warning |
| RoleBadge       | `ui/RoleBadge`          | -                            | Role-specific badge styling                  |
| Table           | `ui/Table`              | -                            | Table, TableHeader, TableBody, TableRow, TableHead, TableCell |
| DataTable       | `ui/DataTable`          | `@tanstack/react-table`     | Full-featured data table with sorting/filtering |
| Skeleton        | `ui/Skeleton`           | -                            | Loading placeholder                          |
| Spinner         | `ui/Spinner`            | -                            | Loading spinner                              |
| Progress        | `ui/Progress`           | `@radix-ui/react-progress`  | Progress bar                                 |
| Empty           | `ui/Empty`              | -                            | Empty state placeholder                      |
| Timeline        | `ui/Timeline`           | -                            | Vertical timeline                            |
| StatusDot       | `ui/StatusDot`          | -                            | Status indicator dot                         |
| Accordion       | `ui/Accordion`          | `@radix-ui/react-accordion`  | Accordion, AccordionItem, AccordionTrigger, AccordionContent |
| Tabs            | `ui/Tabs`               | `@radix-ui/react-tabs`      | Tabs, TabsList, TabsTrigger, TabsContent     |
| AnimatedTabs    | `ui/AnimatedTabs`       | -                            | Tabs with animated indicator                 |
| Tooltip         | `ui/Tooltip`            | `@radix-ui/react-tooltip`   | TooltipProvider, Tooltip, TooltipTrigger, TooltipContent |
| HoverCard       | `ui/HoverCard`          | `@radix-ui/react-hover-card`| HoverCard, HoverCardTrigger, HoverCardContent|
| Popover         | `ui/Popover`            | `@radix-ui/react-popover`   | Popover, PopoverTrigger, PopoverContent      |
| Alert           | `ui/Alert`              | -                            | variant: default, destructive                |
| AlertDialog     | `ui/AlertDialog`        | `@radix-ui/react-alert-dialog`| AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel |
| Breadcrumb      | `ui/Breadcrumb`         | -                            | Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator |
| Kbd             | `ui/Kbd`                | -                            | Keyboard shortcut display                    |
| PromoCard       | `ui/PromoCard`          | -                            | Promotional card with rich layout            |
| AnnouncementBanner | `ui/AnnouncementBanner` | -                        | Top-of-page announcement                     |
| Typography      | `ui/Typography`         | -                            | Heading and text components                  |

---

## Navigation (~10)

| Component       | Path                    | Radix Primitive                | Notes                                      |
| --------------- | ----------------------- | ------------------------------ | ------------------------------------------ |
| Sidebar         | `ui/Sidebar`            | -                              | Full sidebar system: SidebarProvider, SidebarTrigger, SidebarContent, SidebarGroup, SidebarMenu, etc. |
| NavigationMenu  | `ui/NavigationMenu`     | `@radix-ui/react-navigation-menu` | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent |
| Menubar         | `ui/Menubar`            | `@radix-ui/react-menubar`     | Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem |
| DropdownMenu    | `ui/DropdownMenu`       | `@radix-ui/react-dropdown-menu`| DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator |
| ContextMenu     | `ui/ContextMenu`        | `@radix-ui/react-context-menu`| ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem |
| Pagination      | `ui/Pagination`         | -                              | Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext |
| FloatingDock    | `ui/FloatingDock`       | -                              | macOS-style floating dock                  |
| SearchCommand   | `ui/SearchCommand`      | `cmdk`                         | Cmd+K search dialog                        |
| Command         | `ui/Command`            | `cmdk`                         | Command palette primitive                  |

---

## Layout & Overlays (~10)

| Component       | Path                    | Radix Primitive              | Notes                                      |
| --------------- | ----------------------- | ---------------------------- | ------------------------------------------ |
| Dialog          | `ui/Dialog`             | `@radix-ui/react-dialog`    | Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription |
| AnimatedDialog  | `ui/AnimatedDialog`     | `@radix-ui/react-dialog`    | Dialog with motion animations              |
| Drawer          | `ui/Drawer`             | `vaul`                       | Mobile-friendly bottom drawer              |
| Sheet           | `ui/Sheet`              | `@radix-ui/react-dialog`    | Slide-in side panel                        |
| AnimatedSheet   | `ui/AnimatedSheet`      | `@radix-ui/react-dialog`    | Sheet with motion animations               |
| Resizable       | `ui/Resizable`          | `react-resizable-panels`    | ResizablePanelGroup, ResizablePanel, ResizableHandle |
| ScrollArea      | `ui/ScrollArea`         | `@radix-ui/react-scroll-area`| Custom scrollbar                          |
| Collapsible     | `ui/Collapsible`        | `@radix-ui/react-collapsible`| Collapsible, CollapsibleTrigger, CollapsibleContent |
| BentoGrid       | `ui/BentoGrid`          | -                            | CSS grid layout system                     |
| AspectRatio     | `ui/AspectRatio`        | `@radix-ui/react-aspect-ratio`| Fixed aspect ratio container              |
| Separator       | `ui/Separator`          | `@radix-ui/react-separator`  | Horizontal/vertical divider               |
| Toggle          | `ui/Toggle`             | `@radix-ui/react-toggle`    | variant: default, outline                  |
| ToggleGroup     | `ui/ToggleGroup`        | `@radix-ui/react-toggle-group`| Group of toggles                          |

---

## Decorative Effects (~15)

| Component         | Path                      | Notes                                      |
| ----------------- | ------------------------- | ------------------------------------------ |
| AmbientGrid       | `ui/AmbientGrid`          | CSS grid overlay (24px cells, 0.06 opacity)|
| AuroraEffect      | `ui/AuroraEffect`         | Animated gradient aurora background        |
| MeteorShower      | `ui/MeteorShower`         | Falling meteor particles                   |
| Spotlight         | `ui/Spotlight`            | Mouse-following spotlight effect           |
| AnimatedBackground| `ui/AnimatedBackground`   | Vanta.js 3D background                    |
| AnimatedBeam      | `ui/AnimatedBeam`         | SVG beam connector animation               |
| PixelBackground   | `ui/PixelBackground`      | Pixel art background effects               |
| MouseEffect       | `ui/MouseEffect`          | Mouse-tracking visual effects              |
| MovingBorder      | `ui/MovingBorder`         | Animated border rotation                   |
| ProgressiveBlur   | `ui/ProgressiveBlur`      | Gradient blur effect                       |
| TiltCard          | `ui/TiltCard`             | 3D perspective tilt on hover               |
| MagneticElement   | `ui/MagneticElement`      | Magnetic cursor attraction                 |
| InfiniteSlider    | `ui/InfiniteSlider`       | Auto-scrolling content slider              |

---

## Text Effects (10)

| Component            | Path                               | Notes                                |
| -------------------- | ---------------------------------- | ------------------------------------ |
| TextReveal           | `ui/text-effects/TextReveal`       | Scroll-triggered text reveal         |
| AnimatedGradientText | `ui/text-effects/AnimatedGradientText` | Animated gradient sweep on text  |
| PixelReveal          | `ui/text-effects/PixelReveal`      | Pixel-by-pixel text animation        |
| FlipWords            | `ui/text-effects/FlipWords`        | Word cycling with flip animation     |
| StreamingText        | `ui/text-effects/StreamingText`    | ChatGPT-style streaming output       |
| ShimmeringText       | `ui/text-effects/ShimmeringText`   | Shimmer highlight sweep              |
| CountingNumber       | `ui/text-effects/CountingNumber`   | Animated number counter              |
| MorphingText         | `ui/text-effects/MorphingText`     | SVG text morphing transitions        |
| HighlightText        | `ui/text-effects/HighlightText`    | Animated highlight marker            |
| SlidingNumber        | `ui/text-effects/SlidingNumber`    | Digit-by-digit sliding animation     |

---

## Animation Utilities (~5)

| Component          | Path                        | Notes                                    |
| ------------------ | --------------------------- | ---------------------------------------- |
| ScrollFadeIn       | `ui/ScrollFadeIn`           | Fade in on scroll intersection           |
| StaggerChildren    | `ui/StaggerChildren`        | Stagger child element entrances          |
| StaggeredEntrance  | `ui/StaggeredEntrance`      | Sequential entrance animation            |
| PageTransition     | `ui/PageTransition`         | Route transition wrapper                 |

---

## Charts (7 + base)

| Component       | Path                         | Notes                              |
| --------------- | ---------------------------- | ---------------------------------- |
| Chart           | `ui/Chart`                   | Base chart config (ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent) |
| AreaChart       | `ui/charts/AreaChart`        | Recharts area chart                |
| BarChart        | `ui/charts/BarChart`         | Recharts bar chart                 |
| LineChart       | `ui/charts/LineChart`        | Recharts line chart                |
| PieChart        | `ui/charts/PieChart`         | Recharts pie/donut chart           |
| RadarChart      | `ui/charts/RadarChart`       | Recharts radar chart               |
| RadialBarChart  | `ui/charts/RadialBarChart`   | Recharts radial bar chart          |
| HeatmapChart    | `ui/charts/HeatmapChart`     | Custom heatmap visualization       |

---

## AI / Voice (~5)

| Component          | Path                        | Notes                                  |
| ------------------ | --------------------------- | -------------------------------------- |
| AgentAvatar        | `ui/AgentAvatar`            | AI agent avatar with idle/listening/speaking states |
| Avatar3D           | `ui/Avatar3D`               | 3D avatar with Three.js               |
| AgentStatus        | `ui/AgentStatus`            | Agent connection status indicator      |
| AudioWaveform      | `ui/AudioWaveform`          | Real-time audio visualization          |
| ConversationThread | `ui/ConversationThread`     | Chat message thread                    |

---

## Miscellaneous

| Component          | Path                        | Notes                                  |
| ------------------ | --------------------------- | -------------------------------------- |
| ThemeToggle        | `ui/ThemeToggle`            | Light/dark/system theme switcher       |
| Toast / Toaster    | `ui/Toast`, `ui/Toaster`    | `@radix-ui/react-toast` based         |
| Sonner             | `ui/Sonner`                 | Sonner toast integration               |
| Logo               | `ui/Logo`                   | Brand logo component                   |
| BrandIcons         | `ui/BrandIcons`             | Google, GitHub, etc. brand SVGs        |
| Typography         | `ui/Typography`             | Heading, Text, Paragraph components    |
| SkipNav            | `ui/SkipNav`                | Accessibility skip navigation          |
| VisuallyHidden     | `ui/VisuallyHidden`         | Screen-reader-only content             |
| Responsive         | `ui/Responsive`             | Responsive breakpoint utilities        |
| ButtonGroup        | `ui/ButtonGroup`            | Grouped button layout                  |
| Item               | `ui/Item`                   | Generic list item                      |
| Example            | `ui/Example`                | Documentation example wrapper          |

---

## Layout

| Component | Path            | Notes              |
| --------- | --------------- | ------------------ |
| Grid      | `layout/Grid`   | CSS Grid wrapper   |
