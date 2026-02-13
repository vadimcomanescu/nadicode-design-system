/**
 * Opinion Rule 3.5: Tabular nums for data.
 * DataTable, stats components, and metric displays should use tabular-nums
 * for numeric columns and values.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { glob } from 'tinyglobby';

const ROOT = resolve(import.meta.dirname, '../..');

describe('Opinion: Tabular Nums (Rule 3.5)', () => {
  it('DataTable component uses tabular-nums for numeric content', async () => {
    const files = await glob(['src/components/ui/DataTable.tsx'], {
      cwd: ROOT,
      absolute: true,
    });

    if (files.length === 0) return;

    const content = readFileSync(files[0], 'utf-8');

    // DataTable should reference tabular-nums somewhere in its styles
    const hasTabularNums =
      content.includes('tabular-nums') ||
      content.includes('tabularNums') ||
      content.includes('font-variant-numeric');

    expect(
      hasTabularNums,
      'DataTable should use tabular-nums for numeric columns'
    ).toBe(true);
  });

  it('stats and metrics components use tabular-nums', async () => {
    const statsFiles = await glob(
      [
        'src/components/blocks/StatsBlock.tsx',
        'src/components/blocks/StatsMarketingBlock.tsx',
        'src/components/ui/AgentMetricsCard.tsx',
      ],
      { cwd: ROOT, absolute: true }
    );

    if (statsFiles.length === 0) return;

    const violations: string[] = [];

    for (const filePath of statsFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');

      const hasTabularNums =
        content.includes('tabular-nums') ||
        content.includes('tabularNums') ||
        content.includes('font-variant-numeric');

      if (!hasTabularNums) {
        violations.push(`${shortPath}: no tabular-nums for numeric displays`);
      }
    }

    expect(
      violations,
      `Stats/metrics without tabular-nums:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
