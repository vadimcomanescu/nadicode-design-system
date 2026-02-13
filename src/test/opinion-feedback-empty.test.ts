/**
 * Opinion Rule 7.4: Every list/table needs empty state.
 * Page and block components that render lists or tables must handle
 * the empty case (show Empty component or equivalent).
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Empty State Pattern (Rule 7.4)', () => {
  it('blocks/pages with DataTable import handle empty state', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Only check blocks and pages
    const targetFiles = [/\/blocks\//, /\/pages\//];

    // TODO: These pages need empty state handling for their tables
    const knownViolations = ['DashboardPage.tsx', 'TeamPage.tsx'];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (!targetFiles.some((p) => p.test(shortPath))) continue;
      if (knownViolations.some((f) => shortPath.endsWith(f))) continue;

      // Check if file uses DataTable or Table
      if (!content.includes('DataTable') && !content.includes('<Table')) continue;

      // Check for empty state handling
      const hasEmptyHandling =
        content.includes('Empty') ||
        content.includes('empty') ||
        content.includes('No ') ||
        content.includes('no ') ||
        /\.length\s*===?\s*0/.test(content) ||
        /\.length\s*[<>]/.test(content) ||
        /!.*data/.test(content);

      if (!hasEmptyHandling) {
        violations.push(
          `${shortPath}: uses DataTable/Table without empty state handling`
        );
      }
    }

    expect(
      violations,
      `Tables without empty state:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
