# Tokens & Colors Reference

## Token Architecture

```
tokens.config.js  ──>  index.css  ──>  tailwind.config.js
   (master JS)       (CSS vars)       (Tailwind theme)
```

1. **`src/lib/tokens.config.js`** - Pure JS, exports `colorScales`, `colorTokens`, `tokens`
2. **`src/index.css`** - Maps tokens to CSS custom properties on `:root` (light) and `.dark`
3. **`tailwind.config.js`** - Imports tokens, extends Tailwind with CSS variable references
4. **`src/tokens.ts`** - Re-exports with TypeScript types for component code

**CSS Variable Format:** Space-separated RGB values (NOT hex).
```css
/* CORRECT */
--color-background: 15 17 20;
/* WRONG */
--color-background: #0F1114;
```

This enables Tailwind opacity modifiers: `bg-background/50` -> `rgb(15 17 20 / 0.5)`

---

## 12-Step Radix Color Scales

Steps usage guide:
- **1-2**: App/page backgrounds
- **3-5**: Component backgrounds, hover/active states
- **6-8**: Borders, separators, subtle UI
- **9-10**: Solid fills, buttons, badges
- **11-12**: High-contrast text, headings

### Gray Scale

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#0F1114`  | `#FBFCFD`  |
| 2    | `#151719`  | `#F5F7F9`  |
| 3    | `#1C1F23`  | `#EDF0F3`  |
| 4    | `#232730`  | `#E4E8EC`  |
| 5    | `#2B2F37`  | `#D9DFE5`  |
| 6    | `#33383F`  | `#CDD4DC`  |
| 7    | `#3E4550`  | `#B5BECA`  |
| 8    | `#505A68`  | `#97A3B2`  |
| 9    | `#6B7A8A`  | `#6B7A8A`  |
| 10   | `#8494A7`  | `#566878`  |
| 11   | `#A0AEBB`  | `#3E4F60`  |
| 12   | `#E1E7ED`  | `#1A2230`  |

### Gray Alpha Scale

| Step | Dark                          | Light                        |
| ---- | ----------------------------- | ---------------------------- |
| 1    | `rgba(200, 220, 240, 0.02)`  | `rgba(0, 30, 60, 0.02)`     |
| 2    | `rgba(200, 220, 240, 0.04)`  | `rgba(0, 30, 60, 0.04)`     |
| 3    | `rgba(200, 220, 240, 0.06)`  | `rgba(0, 30, 60, 0.07)`     |
| 4    | `rgba(200, 220, 240, 0.09)`  | `rgba(0, 30, 60, 0.11)`     |
| 5    | `rgba(200, 220, 240, 0.12)`  | `rgba(0, 30, 60, 0.15)`     |
| 6    | `rgba(200, 220, 240, 0.16)`  | `rgba(0, 30, 60, 0.20)`     |
| 7    | `rgba(200, 220, 240, 0.22)`  | `rgba(0, 30, 60, 0.29)`     |
| 8    | `rgba(200, 220, 240, 0.32)`  | `rgba(0, 30, 60, 0.41)`     |
| 9    | `rgba(200, 220, 240, 0.45)`  | `rgba(0, 30, 60, 0.58)`     |
| 10   | `rgba(200, 220, 240, 0.58)`  | `rgba(0, 30, 60, 0.66)`     |
| 11   | `rgba(200, 220, 240, 0.72)`  | `rgba(0, 30, 60, 0.76)`     |
| 12   | `rgba(200, 220, 240, 0.93)`  | `rgba(0, 30, 60, 0.90)`     |

### Teal Scale (Accent)

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#0B1615`  | `#F0FDFC`  |
| 2    | `#0F1F1E`  | `#E3FAF8`  |
| 3    | `#122B29`  | `#C8F3EF`  |
| 4    | `#163834`  | `#A8E9E2`  |
| 5    | `#1B4542`  | `#85DBD4`  |
| 6    | `#21554F`  | `#5DC9C0`  |
| 7    | `#2A6D66`  | `#35B2A8`  |
| 8    | `#35917F`  | `#22958D`  |
| 9    | `#38BDB8`  | `#1A8F88`  |
| 10   | `#4ECEC8`  | `#147A73`  |
| 11   | `#7EDCD6`  | `#0F6660`  |
| 12   | `#C2F0ED`  | `#08403D`  |

### Red Scale (Destructive)

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#191113`  | `#FFF5F5`  |
| 2    | `#201316`  | `#FFE8E8`  |
| 3    | `#3B1219`  | `#FECDD4`  |
| 4    | `#50141D`  | `#FDAFB7`  |
| 5    | `#661823`  | `#FA8F9A`  |
| 6    | `#7E1F2D`  | `#F16C78`  |
| 7    | `#9E2B3A`  | `#E34D5B`  |
| 8    | `#C73A4B`  | `#CE3644`  |
| 9    | `#E5484D`  | `#CE2C3B`  |
| 10   | `#EB5E5E`  | `#B82535`  |
| 11   | `#F39090`  | `#9C1E2E`  |
| 12   | `#FAD1D4`  | `#5C111A`  |

### Green Scale (Success)

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#0D1512`  | `#F2FDF6`  |
| 2    | `#111C17`  | `#E3FAEC`  |
| 3    | `#13291F`  | `#C2F2D6`  |
| 4    | `#163727`  | `#9DE8BC`  |
| 5    | `#1A4530`  | `#76D9A0`  |
| 6    | `#1F563A`  | `#4EC785`  |
| 7    | `#266E48`  | `#30B26B`  |
| 8    | `#2F8E5A`  | `#1D9B55`  |
| 9    | `#3DD68C`  | `#1B9450`  |
| 10   | `#5CE4A0`  | `#147C42`  |
| 11   | `#8CEDB8`  | `#0F6636`  |
| 12   | `#C8F5DD`  | `#08401F`  |

### Amber Scale (Warning)

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#16120B`  | `#FEFCF0`  |
| 2    | `#1D1710`  | `#FDF8E0`  |
| 3    | `#2C2011`  | `#FCEFC0`  |
| 4    | `#3D2B10`  | `#FAE39A`  |
| 5    | `#4F370F`  | `#F5D46E`  |
| 6    | `#63440E`  | `#E8C044`  |
| 7    | `#7E5711`  | `#D4A825`  |
| 8    | `#A87318`  | `#B88E15`  |
| 9    | `#F5C742`  | `#D09E10`  |
| 10   | `#FFDB5C`  | `#B08510`  |
| 11   | `#FFE588`  | `#866510`  |
| 12   | `#FFF3CC`  | `#4A380A`  |

### Blue Scale (Info)

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#0F1520`  | `#F3F8FE`  |
| 2    | `#131B2E`  | `#E6F0FD`  |
| 3    | `#15243B`  | `#C8DFFB`  |
| 4    | `#192E4C`  | `#A6CBF7`  |
| 5    | `#1D3A5E`  | `#80B4F3`  |
| 6    | `#224973`  | `#5999EC`  |
| 7    | `#2A5E92`  | `#377FE2`  |
| 8    | `#347AB8`  | `#2068D0`  |
| 9    | `#3E96F4`  | `#2E78E5`  |
| 10   | `#5EAAF7`  | `#2362C7`  |
| 11   | `#8EC3FA`  | `#1B4FA5`  |
| 12   | `#CEE1FC`  | `#0F3060`  |

### Violet Scale

| Step | Dark       | Light      |
| ---- | ---------- | ---------- |
| 1    | `#14111F`  | `#F9F6FE`  |
| 2    | `#1B1528`  | `#F1EBFD`  |
| 3    | `#241C38`  | `#E3D4FC`  |
| 4    | `#2E224A`  | `#D2B9FA`  |
| 5    | `#38295E`  | `#BF9CF7`  |
| 6    | `#443375`  | `#A87CF2`  |
| 7    | `#553F94`  | `#9060EA`  |
| 8    | `#6B54B5`  | `#7A4ADD`  |
| 9    | `#8B5CF6`  | `#7C3AED`  |
| 10   | `#9E77F8`  | `#6A2ED2`  |
| 11   | `#BAA0FA`  | `#5624B3`  |
| 12   | `#E2D5FD`  | `#351468`  |

---

## Semantic Token Map

### CSS Variable -> Tailwind Class -> Dark Value -> Light Value

| CSS Variable                  | Tailwind Class          | Dark              | Light             |
| ----------------------------- | ----------------------- | ----------------- | ----------------- |
| `--color-background`          | `bg-background`         | gray.1 `#0F1114`  | gray.1 `#FBFCFD`  |
| `--color-surface`             | `bg-surface`            | gray.2 `#151719`  | gray.2 `#F5F7F9`  |
| `--color-surface-hover`       | `bg-surface-hover`      | gray.3 `#1C1F23`  | gray.3 `#EDF0F3`  |
| `--color-surface-active`      | `bg-surface-active`     | gray.4 `#232730`  | gray.4 `#E4E8EC`  |
| `--color-surface-raised`      | `bg-surface-raised`     | gray.5 `#2B2F37`  | gray.2 `#F5F7F9`  |
| `--color-border`              | `border-border`         | gray.6 `#33383F`  | gray.6 `#CDD4DC`  |
| `--color-border-hover`        | `border-border-hover`   | gray.7 `#3E4550`  | gray.7 `#B5BECA`  |
| `--color-border-subtle`       | `border-border-subtle`  | grayA.3           | grayA.3           |
| `--color-primary`             | `bg-primary`            | gray.12 `#E1E7ED` | gray.12 `#1A2230` |
| `--color-primary-foreground`  | `text-primary-foreground`| gray.1            | gray.1            |
| `--color-secondary`           | `bg-secondary`          | gray.4 `#232730`  | gray.3 `#EDF0F3`  |
| `--color-accent`              | `bg-accent`             | teal.9 `#38BDB8`  | teal.9 `#1A8F88`  |
| `--color-destructive`         | `bg-destructive`        | red.9 `#E5484D`   | red.9 `#CE2C3B`   |
| `--color-success`             | `bg-success`            | green.9 `#3DD68C` | green.9 `#1B9450` |
| `--color-warning`             | `bg-warning`            | amber.9 `#F5C742` | amber.9 `#D09E10` |
| `--color-info`                | `bg-info`               | blue.9 `#3E96F4`  | blue.9 `#2E78E5`  |
| `--color-muted`               | `bg-muted`              | gray.4            | gray.3            |
| `--color-muted-foreground`    | `text-muted-foreground` | gray.11           | gray.11           |
| `--color-overlay`             | `bg-overlay`            | `#000000`         | `#000000`         |
| `--color-text-primary`        | `text-text-primary`     | gray.12 `#E1E7ED` | gray.12 `#1A2230` |
| `--color-text-secondary`      | `text-text-secondary`   | gray.11 `#A0AEBB` | gray.11 `#3E4F60` |
| `--color-text-tertiary`       | `text-text-tertiary`    | gray.9 `#6B7A8A`  | gray.9 `#6B7A8A`  |
| `--color-focus-ring`          | `ring-accent`           | teal.9            | teal.9            |
| `--color-link`                | `text-link`             | teal.10 `#4ECEC8` | teal.11 `#0F6660` |
| `--color-input`               | `bg-input`              | gray.4            | gray.3            |
| `--color-disabled`            | `bg-disabled`           | gray.7            | gray.6            |

### Chart Variables (space-separated RGB)

| Var        | Dark (rgb)        | Light (rgb)       | Hue    |
| ---------- | ----------------- | ----------------- | ------ |
| `--chart-1` | `56 189 184`     | `26 143 136`      | Teal   |
| `--chart-2` | `62 150 244`     | `46 120 229`      | Blue   |
| `--chart-3` | `245 199 66`     | `208 158 16`      | Amber  |
| `--chart-4` | `61 214 140`     | `27 148 80`       | Green  |
| `--chart-5` | `139 92 246`     | `124 58 237`      | Violet |
| `--chart-6` | `229 72 77`      | `206 44 59`       | Red    |

---

## Non-Color Tokens

### Typography
| Token       | Value                           |
| ----------- | ------------------------------- |
| `font-sans` | `Satoshi, sans-serif`           |
| `font-pixel`| `GeistPixel, monospace`         |
| `text-xs`   | 12px                            |
| `text-sm`   | 14px                            |
| `text-base` | 16px                            |
| `text-lg`   | 20px                            |
| `text-xl`   | 24px                            |
| `text-2xl`  | 32px                            |
| `text-3xl`  | 48px                            |
| `text-4xl`  | 64px                            |

### Border Radius
| Token        | Value  |
| ------------ | ------ |
| `rounded-sm` | 4px    |
| `rounded-md` | 8px    |
| `rounded-lg` | 16px   |
| `rounded-full`| 9999px|

### Shadows
| Token              | Value                                    |
| ------------------ | ---------------------------------------- |
| `shadow-glow`      | `0 0 20px -5px rgba(255,255,255,0.1)`   |
| `shadow-glow-accent`| `0 0 20px -5px rgba(56,189,184,0.15)` |

### Spacing
Base unit: 4px. Custom: `spacing-4.5` = `1.125rem`

---

## Bloom Style Palette

The `.bloom` CSS selector overrides the light theme with a warm, organic palette. Bloom is light-only (forces `resolvedTheme` to `'light'`).

### Key Bloom Token Overrides

| Token | Bloom Value | Arctic Light Value | Notes |
| ----- | ----------- | ------------------ | ----- |
| `--color-background` | `254 253 251` (warm cream) | `251 252 253` (cool white) | Warmer base |
| `--color-surface` | `251 249 246` | `245 247 249` | Cream tint |
| `--color-accent` | `232 87 58` (coral) | `26 143 136` (teal) | Different hue entirely |
| `--color-accent-foreground` | `255 255 255` | `255 255 255` | Both white |
| `--color-border` | `217 209 199` (warm) | `205 212 220` (cool) | Brown vs blue-gray |
| `--color-destructive` | `232 86 109` (rose) | `206 44 59` (red) | Softer destructive |
| `--color-success` | `61 214 160` (mint) | `27 148 80` (green) | Brighter |
| `--color-warning` | `245 166 35` (peach) | `208 158 16` (amber) | Warmer |

### Bloom Glass Overrides

Bloom glass uses warm cream tints instead of cool white:
- `glass-panel`: cream gradient with brown shadows (`rgba(45, 35, 24, 0.06)`)
- `glass-floating`: warm hover rotation (`rotate(0.3deg)`)
- `glass-overlay`: cream-tinted with brown shadows

See `src/index.css` for full `.bloom .glass-*` overrides.
