/**
 * Opinion Rule 2.4: Chart Color Tokens.
 * Use chart-1 through chart-6 semantic tokens only.
 * Never use raw hex, rgb, or Tailwind color scales in chart fills/strokes.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { glob } from 'tinyglobby';

const ROOT = resolve(import.meta.dirname, '../..');

describe('Opinion: Chart Color Tokens (Rule 2.4)', () => {
  it('no hardcoded hex colors in chart component fill/stroke attributes', async () => {
    const chartFiles = await glob(
      ['src/components/ui/charts/*.tsx', 'src/components/ui/Chart.tsx'],
      { cwd: ROOT, ignore: ['**/*.test.tsx'], absolute: true }
    );

    if (chartFiles.length === 0) return; // No chart files, pass

    const violations: string[] = [];

    // Hardcoded color patterns in fill/stroke JSX props (not CSS attribute selectors)
    // Match: fill="#hex" or stroke="rgb(1,2,3)" but NOT rgb(var(--...)) or [stroke='#fff']
    const hardcodedColorInProp =
      /(?:fill|stroke)\s*[=:]\s*["'](#[0-9a-fA-F]{3,8}|rgba?\(\d|hsl\(\d)/;

    // CSS attribute selector pattern to exclude (e.g. [stroke='#fff'])
    const cssAttrSelector = /\[(?:fill|stroke)=/;

    for (const filePath of chartFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        // Skip CSS attribute selectors (targeting recharts internals)
        if (cssAttrSelector.test(line)) continue;
        if (hardcodedColorInProp.test(line)) {
          violations.push(`${shortPath}:${i + 1}: hardcoded color in fill/stroke`);
        }
      }
    }

    expect(
      violations,
      `Hardcoded colors in chart components (use chart-1..chart-6 tokens):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('chart config objects reference semantic chart tokens, not raw colors', async () => {
    const chartFiles = await glob(
      ['src/components/ui/charts/*.tsx', 'src/components/ui/Chart.tsx'],
      { cwd: ROOT, ignore: ['**/*.test.tsx'], absolute: true }
    );

    if (chartFiles.length === 0) return;

    const violations: string[] = [];

    // Pattern: color: "#hex" or color: "rgb(...)" in config objects
    const rawColorInConfig = /color:\s*["'](#[0-9a-fA-F]{3,8}|rgb\(|rgba\()/;

    for (const filePath of chartFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (rawColorInConfig.test(line)) {
          violations.push(`${shortPath}:${i + 1}: raw color in chart config`);
        }
      }
    }

    expect(
      violations,
      `Raw colors in chart configs (use chart token variables):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
