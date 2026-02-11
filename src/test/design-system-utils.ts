/**
 * Shared utilities for design system integrity tests.
 * Color math, token traversal, CSS parsing, and file scanning.
 */
import { glob } from 'tinyglobby';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ── Color utilities ──

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) throw new Error(`Invalid hex: ${hex}`);
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

/** sRGB relative luminance per WCAG 2.1 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** WCAG contrast ratio between two hex colors */
export function contrastRatio(fg: string, bg: string): number {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const l1 = relativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const l2 = relativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Token utilities ──

/** Recursively collect all dot-path keys from a nested object */
export function getNestedKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      keys.push(...getNestedKeys(val as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

/** Resolve a dot-path to a value in a nested object */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// ── CSS parsing utilities ──

/**
 * Extract CSS variable definitions from a specific selector block.
 * Returns a Set of variable names (e.g. "--color-background").
 */
export function parseCssVarDefinitions(css: string, selector: string): Set<string> {
  const vars = new Set<string>();
  // Escape special regex chars in selector
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match the selector block (handles nested braces up to 1 level)
  const blockRegex = new RegExp(`${escaped}\\s*\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}`, 'g');
  let match;
  while ((match = blockRegex.exec(css)) !== null) {
    const block = match[1];
    const varRegex = /(--[\w-]+)\s*:/g;
    let varMatch;
    while ((varMatch = varRegex.exec(block)) !== null) {
      vars.add(varMatch[1]);
    }
  }
  return vars;
}

/**
 * Extract all CSS variable references from Tailwind config color definitions.
 * Looks for var(--some-name) patterns.
 */
export function extractTailwindVarReferences(configStr: string): Set<string> {
  const vars = new Set<string>();
  const regex = /var\((--[\w-]+)\)/g;
  let match;
  while ((match = regex.exec(configStr)) !== null) {
    vars.add(match[1]);
  }
  return vars;
}

// ── File scanning utilities ──

const ROOT = resolve(import.meta.dirname, '../..');

export function readProjectFile(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

export async function readComponentFiles(): Promise<{ path: string; content: string }[]> {
  const files = await glob(['src/components/**/*.tsx'], {
    cwd: ROOT,
    ignore: ['**/*.test.tsx', '**/index.tsx'],
    absolute: true,
  });
  return files.map((f) => ({
    path: f,
    content: readFileSync(f, 'utf-8'),
  }));
}

export async function getComponentFileNames(): Promise<string[]> {
  const files = await glob(['src/components/ui/*.tsx'], {
    cwd: ROOT,
    ignore: ['**/*.test.tsx', '**/index.tsx'],
  });
  return files;
}

export async function getComponentTestFiles(): Promise<string[]> {
  const files = await glob(['src/components/ui/*.test.tsx'], {
    cwd: ROOT,
  });
  return files;
}
