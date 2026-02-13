# Icons Catalog

Animated icon wrappers with SVG path animations on hover.
Import from `@/components/ui/icons`.

To browse the current set: `ls src/components/ui/icons/*.tsx` (excluding `index.ts`).

---

## Usage

```tsx
import { SettingsIcon, BellIcon, SearchIcon } from "@/components/ui/icons"

// Size in pixels, default 28
<SettingsIcon size={16} />
<BellIcon size={20} />
<SearchIcon size={24} />
```

Each icon uses `motion/react` with an imperative handle (`startAnimation`/`stopAnimation`) and hover animations.

---

## Rules

- **NEVER import directly from `lucide-react`** in component files. An integrity test (`no-static-lucide-imports.test.ts`) enforces this.
- Only the `icons/` directory itself may import from lucide-react for SVG paths.
- If you need an icon that doesn't have an animated wrapper yet, create one in `src/components/ui/icons/` following the pattern from existing icons (e.g., `sun.tsx`), then export it from `index.ts`.

---

## Adding a New Icon

**Source**: Get animated icon code from [lucide-animated.com](https://lucide-animated.com), then adapt it to fit the design system pattern.

1. Find the icon on lucide-animated.com and grab the animation code
2. Create a file in `src/components/ui/icons/` (e.g., `my-icon.tsx`)
3. Adapt to match the project pattern: `motion/react` animations, imperative handle with `startAnimation`/`stopAnimation`, `size` prop (see `sun.tsx` as reference)
4. Export from `src/components/ui/icons/index.ts`

---

## Icon List

| Export Name | File | Common Use |
| --- | --- | --- |
| ActivityIcon | `activity.tsx` | Activity feed |
| AlertTriangleIcon | `alert-triangle.tsx` | Warning |
| ArrowDownRightIcon | `arrow-down-right.tsx` | Directional |
| ArrowLeftIcon | `arrow-left.tsx` | Back navigation |
| ArrowRightIcon | `arrow-right.tsx` | Forward navigation |
| ArrowUpRightIcon | `arrow-up-right.tsx` | External link |
| BellIcon | `bell.tsx` | Notifications |
| BoldIcon | `bold.tsx` | Text formatting |
| BotIcon | `bot.tsx` | AI agent |
| CalendarIcon | `calendar.tsx` | Date picker, events |
| ChartBarIcon | `chart-bar.tsx` | Analytics |
| CheckIcon | `check.tsx` | Confirmations, checkmarks |
| ChevronDownIcon | `chevron-down.tsx` | Expand, dropdown |
| ChevronLeftIcon | `chevron-left.tsx` | Previous |
| ChevronRightIcon | `chevron-right.tsx` | Next |
| ChevronUpIcon | `chevron-up.tsx` | Collapse |
| ChevronsUpDownIcon | `chevrons-up-down.tsx` | Sort, reorder |
| CircleIcon | `circle.tsx` | Status indicator |
| CloudIcon | `cloud.tsx` | Cloud services |
| Code2Icon | `code-2.tsx` | Source code |
| CopyIcon | `copy.tsx` | Copy to clipboard |
| CornerDownLeftIcon | `corner-down-left.tsx` | Reply, enter |
| CreditCardIcon | `credit-card.tsx` | Payments |
| DatabaseIcon | `database.tsx` | Database |
| DollarSignIcon | `dollar-sign.tsx` | Pricing, money |
| DotIcon | `dot.tsx` | Bullet, separator |
| EllipsisIcon | `ellipsis.tsx` | More actions |
| EyeIcon | `eye.tsx` | Show, visibility |
| EyeOffIcon | `eye-off.tsx` | Hide, toggle visibility |
| FileIcon | `file.tsx` | Files, documents |
| FolderIcon | `folder.tsx` | Folders, files |
| GithubIcon | `github.tsx` | GitHub link |
| GlobeIcon | `globe.tsx` | International, web |
| GripVerticalIcon | `grip-vertical.tsx` | Drag handle |
| HomeIcon | `home.tsx` | Home, dashboard |
| InfoIcon | `info.tsx` | Information |
| ItalicIcon | `italic.tsx` | Text formatting |
| KeyIcon | `key.tsx` | Authentication, API keys |
| LaptopIcon | `laptop.tsx` | Desktop device |
| LayersIcon | `layers.tsx` | Stacks, layers |
| LayoutDashboardIcon | `layout-dashboard.tsx` | Dashboard |
| LinkedinIcon | `linkedin.tsx` | LinkedIn link |
| LoaderCircleIcon | `loader-circle.tsx` | Loading spinner |
| LockIcon | `lock.tsx` | Security, locked state |
| MailIcon | `mail.tsx` | Email |
| MenuIcon | `menu.tsx` | Hamburger menu |
| MicIcon | `mic.tsx` | Voice input, recording |
| MonitorIcon | `monitor.tsx` | Display, screen |
| MoonIcon | `moon.tsx` | Dark mode |
| Package2Icon | `package-2.tsx` | Alt package icon |
| PackageIcon | `package.tsx` | Packages, shipping |
| PanelLeftIcon | `panel-left.tsx` | Sidebar toggle |
| PlusIcon | `plus.tsx` | Add, create |
| RefreshCwIcon | `refresh-cw.tsx` | Refresh, sync |
| RocketIcon | `rocket.tsx` | Launch, deploy |
| SearchIcon | `search.tsx` | Search fields |
| SendIcon | `send.tsx` | Send message |
| Settings2Icon | `settings-2.tsx` | Alt settings |
| SettingsIcon | `settings.tsx` | Settings, preferences |
| ShieldCheckIcon | `shield-check.tsx` | Security verified |
| ShieldIcon | `shield.tsx` | Security |
| SmartphoneIcon | `smartphone.tsx` | Mobile device |
| SnowflakeIcon | `snowflake.tsx` | Arctic style, winter |
| SparklesIcon | `sparkles.tsx` | AI, magic, premium |
| StarIcon | `star.tsx` | Favorites, rating |
| SunIcon | `sun.tsx` | Light mode |
| TerminalIcon | `terminal.tsx` | Code, CLI |
| Trash2Icon | `trash-2.tsx` | Delete |
| TwitterIcon | `twitter.tsx` | Twitter/X link |
| UnderlineIcon | `underline.tsx` | Text formatting |
| UploadIcon | `upload.tsx` | File upload |
| UserIcon | `user.tsx` | User profile |
| UsersIcon | `users.tsx` | Team, groups |
| WrenchIcon | `wrench.tsx` | Tools, configuration |
| XIcon | `x.tsx` | Close, dismiss |
| ZapIcon | `zap.tsx` | Power, performance |
