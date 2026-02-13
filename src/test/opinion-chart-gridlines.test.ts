/**
 * Opinion Rule 2.2: Horizontal gridlines only, dashed.
 * CartesianGrid in charts must have vertical={false} and strokeDasharray set.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { glob } from 'tinyglobby';

const ROOT = resolve(import.meta.dirname, '../..');

describe('Opinion: Chart Gridlines (Rule 2.2)', () => {
  it('CartesianGrid uses vertical={false} (horizontal lines only)', async () => {
    const chartFiles = await glob(
      ['src/components/ui/charts/*.tsx', 'src/components/ui/Chart.tsx'],
      { cwd: ROOT, ignore: ['**/*.test.tsx'], absolute: true }
    );

    if (chartFiles.length === 0) return;

    const violations: string[] = [];

    for (const filePath of chartFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Find CartesianGrid usage
        if (line.includes('<CartesianGrid') || line.includes('CartesianGrid')) {
          // Look at the full element (may span multiple lines)
          const context = lines.slice(i, Math.min(lines.length, i + 5)).join(' ');
          if (!context.includes('<CartesianGrid')) continue;

          // Check for vertical={false}
          if (
            !context.includes('vertical={false}') &&
            !context.includes("vertical='false'") &&
            !context.includes('vertical="false"')
          ) {
            // Allow if it's a self-closing tag with horizontal={true} only
            if (!context.includes('horizontal={true}')) {
              violations.push(
                `${shortPath}:${i + 1}: CartesianGrid without vertical={false}`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `CartesianGrid with vertical gridlines (use vertical={false}):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('CartesianGrid uses strokeDasharray (dashed lines)', async () => {
    const chartFiles = await glob(
      ['src/components/ui/charts/*.tsx', 'src/components/ui/Chart.tsx'],
      { cwd: ROOT, ignore: ['**/*.test.tsx'], absolute: true }
    );

    if (chartFiles.length === 0) return;

    const violations: string[] = [];

    for (const filePath of chartFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const shortPath = filePath.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        if (line.includes('<CartesianGrid')) {
          const context = lines.slice(i, Math.min(lines.length, i + 5)).join(' ');
          if (!context.includes('<CartesianGrid')) continue;

          if (!context.includes('strokeDasharray')) {
            violations.push(
              `${shortPath}:${i + 1}: CartesianGrid without strokeDasharray (use dashed lines)`
            );
          }
        }
      }
    }

    expect(
      violations,
      `CartesianGrid without dashed lines:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
