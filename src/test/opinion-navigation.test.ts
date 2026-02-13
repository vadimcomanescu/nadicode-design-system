import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Navigation', () => {
  it('Sidebar usage includes proper import source', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      // Skip the Sidebar component definition itself
      if (shortPath.includes('Sidebar.tsx')) continue;

      // If file uses SidebarProvider or <Sidebar, verify proper import
      if (content.includes('SidebarProvider') || content.includes('<Sidebar')) {
        if (
          !content.includes('@/components/ui/Sidebar') &&
          !content.includes('../ui/Sidebar') &&
          !content.includes('./Sidebar')
        ) {
          violations.push(`${shortPath}: Sidebar usage without proper import`);
        }
      }
    }

    expect(
      violations,
      `Sidebar usage issues:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no deeply nested navigation (max 2 levels of SidebarMenuSub)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');

      // Count nesting depth of SidebarMenuSub
      let depth = 0;
      let maxDepth = 0;
      const lines = content.split('\n');
      for (const line of lines) {
        if (
          line.includes('<SidebarMenuSub') &&
          !line.includes('</SidebarMenuSub') &&
          !line.includes('/>')
        ) {
          depth++;
          maxDepth = Math.max(maxDepth, depth);
        }
        if (line.includes('</SidebarMenuSub>')) {
          depth = Math.max(0, depth - 1);
        }
      }

      if (maxDepth > 2) {
        violations.push(
          `${shortPath}: ${maxDepth} levels of nested navigation (max 3 total: nav > sub > sub)`
        );
      }
    }

    expect(
      violations,
      `Deeply nested navigation:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
