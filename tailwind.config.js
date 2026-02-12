import { tokens, colorScales } from './src/lib/tokens.config.js';
import tailwindAnimate from 'tailwindcss-animate';

// Generate scale-based Tailwind utilities from 12-step color scales
// Produces e.g. gray-1 through gray-12, teal-1 through teal-12, etc.
function buildScaleColors(scales) {
  const result = {};
  for (const [name, steps] of Object.entries(scales)) {
    if (name === 'grayAlpha') continue; // alpha scales use rgba, skip for now
    result[name] = {};
    for (const [step, hex] of Object.entries(steps)) {
      result[name][step] = hex;
    }
  }
  return result;
}

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 12-step scale colors (static, from dark theme; override per-theme via CSS vars)
        ...buildScaleColors(colorScales.dark),

        // CSS variable-based colors for theming
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
          active: 'rgb(var(--color-surface-active) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          subtle: 'rgb(var(--color-border-subtle))',
          'subtle-hover': 'rgb(var(--color-border-subtle-hover))',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive) / <alpha-value>)',
          foreground: 'rgb(var(--color-destructive-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          foreground: 'rgb(var(--color-success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          foreground: 'rgb(var(--color-warning-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          foreground: 'rgb(var(--color-info-foreground) / <alpha-value>)',
        },
        overlay: {
          DEFAULT: 'rgb(var(--color-overlay) / <alpha-value>)',
          foreground: 'rgb(var(--color-overlay-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        },
        'focus-ring': 'rgb(var(--color-focus-ring) / <alpha-value>)',
        link: 'rgb(var(--color-link) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        disabled: {
          DEFAULT: 'rgb(var(--color-disabled) / <alpha-value>)',
          foreground: 'rgb(var(--color-disabled-foreground) / <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar-background))',
          foreground: 'rgb(var(--sidebar-foreground))',
          primary: 'rgb(var(--sidebar-primary))',
          'primary-foreground': 'rgb(var(--sidebar-primary-foreground))',
          accent: 'rgb(var(--sidebar-accent))',
          'accent-foreground': 'rgb(var(--sidebar-accent-foreground))',
          border: 'rgb(var(--sidebar-border))',
          ring: 'rgb(var(--sidebar-ring))',
        },
        chart: {
          1: 'rgb(var(--chart-1))',
          2: 'rgb(var(--chart-2))',
          3: 'rgb(var(--chart-3))',
          4: 'rgb(var(--chart-4))',
          5: 'rgb(var(--chart-5))',
          6: 'rgb(var(--chart-6))',
        },
      },
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.sizes,
      borderRadius: {
        sm: 'var(--radius-sm, 4px)',
        md: 'var(--radius-md, 8px)',
        lg: 'var(--radius-lg, 16px)',
        full: tokens.radius.full,
      },
      spacing: tokens.spacing,
      boxShadow: {
        ...tokens.shadows,
        'bloom-soft': '0 2px 12px -2px rgba(45, 35, 24, 0.08)',
        'bloom-lifted': '0 8px 30px -8px rgba(45, 35, 24, 0.12)',
        'bloom-glow': '0 0 20px -5px rgba(232, 87, 58, 0.12)',
        'bloom-glow-accent': '0 0 20px -5px rgba(139, 92, 246, 0.15)',
      },
      zIndex: {
        base: '0',
        dropdown: '50',
        sticky: '100',
        overlay: '200',
        modal: '300',
        popover: '400',
        toast: '500',
        max: '999',
      },
      transitionTimingFunction: {
        'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      transitionDuration: {
        micro: '100ms',
        fast: '150ms',
        normal: '200ms',
        moderate: '250ms',
        slow: '300ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(32px)", filter: "blur(4px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-32px)", filter: "blur(4px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.85)", filter: "blur(6px)" },
          to: { opacity: "1", transform: "scale(1)", filter: "blur(0)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
          "70%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
        "wobble": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(1deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "draw-check": {
          from: { strokeDashoffset: "100" },
          to: { strokeDashoffset: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "blur-reveal": {
          from: { opacity: "0", filter: "blur(8px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "gradient-sweep": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "border-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "meteor": {
          "0%": { transform: "translateY(-20%) translateX(-20%) rotate(215deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(300%) translateX(300%) rotate(215deg)", opacity: "0" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translateX(0%) translateY(0%) scale(1)", opacity: "0.15" },
          "33%": { transform: "translateX(10%) translateY(-15%) scale(1.1)", opacity: "0.2" },
          "66%": { transform: "translateX(-5%) translateY(10%) scale(0.95)", opacity: "0.12" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translateX(0%) translateY(0%) scale(1)", opacity: "0.12" },
          "25%": { transform: "translateX(-10%) translateY(10%) scale(1.05)", opacity: "0.18" },
          "75%": { transform: "translateX(8%) translateY(-8%) scale(0.9)", opacity: "0.1" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translateX(0%) translateY(0%) scale(1.05)", opacity: "0.1" },
          "50%": { transform: "translateX(5%) translateY(12%) scale(1)", opacity: "0.16" },
        },
        "shimmer": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
        "scroll-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 150ms ease-out",
        "fade-in": "fade-in 200ms cubic-bezier(0.215, 0.61, 0.355, 1)",
        "fade-in-up": "fade-in-up 200ms cubic-bezier(0.215, 0.61, 0.355, 1)",
        "scale-in": "scale-in 200ms cubic-bezier(0.215, 0.61, 0.355, 1)",
        "blur-reveal": "blur-reveal 300ms cubic-bezier(0.215, 0.61, 0.355, 1) both",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "gradient-sweep": "gradient-sweep 8s linear infinite",
        "border-spin": "border-spin 3s linear infinite",
        "meteor": "meteor var(--meteor-duration, 2s) linear infinite",
        "aurora-1": "aurora-1 15s ease-in-out infinite",
        "aurora-2": "aurora-2 18s ease-in-out infinite",
        "aurora-3": "aurora-3 12s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "scroll-vertical": "scroll-vertical var(--duration, 40s) linear infinite",
        "bounce-in": "bounce-in 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
        "wobble": "wobble 400ms ease-in-out",
        "draw-check": "draw-check 600ms cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
      },
    },
  },
  plugins: [tailwindAnimate],
}

export default config;
