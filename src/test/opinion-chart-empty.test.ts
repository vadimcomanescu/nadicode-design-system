/**
 * Opinion Rule 2.5: Empty Chart Fallback.
 * Chart wrapper components must check for empty/undefined data
 * and show a fallback state instead of rendering a blank chart.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { glob } from 'tinyglobby';

const ROOT = resolve(import.meta.dirname, '../..');

describe('Opinion: Empty Chart Fallback (Rule 2.5)', () => {
  it('chart components handle empty data with a fallback', async () => {
    const chartFiles = await glob(['src/components/ui/charts/*.tsx'], {
      cwd: ROOT,
      ignore: ['**/*.test.tsx'],
      absolute: true,
    });

    if (chartFiles.length === 0) return;

    const violations: string[] = [];

    // TODO: These charts need empty data fallback added
    const knownViolations = ['HeatmapChart.tsx'];

    // Patterns that indicate empty data handling
    const emptyHandlingPatterns = [
      /data\.length\s*===?\s*0/,
      /data\.length\s*[<>]/,
      /!data\b/,
      /data\s*\?\?/,
      /data\s*&&/,
      /\.length\s*===?\s*0/,
      /Empty/,
      /No\s+data/i,
      /empty.*state/i,
    ];

    for (const filePath of chartFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');
      if (knownViolations.some((f) => shortPath.endsWith(f))) continue;

      // Check if this file accepts a data prop
      if (!content.includes('data') || !content.includes('props')) continue;

      const hasEmptyHandling = emptyHandlingPatterns.some((p) => p.test(content));
      if (!hasEmptyHandling) {
        violations.push(
          `${shortPath}: no empty data fallback (show <Empty> when data is empty)`
        );
      }
    }

    expect(
      violations,
      `Charts without empty data fallback:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
