/**
 * Opinion Rule 7.3: Destructive Action Confirmation.
 * All destructive actions (delete, remove, revoke) must use AlertDialog.
 * Scan for Button variant="destructive" and verify AlertDialog is nearby.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Destructive Action Confirmation (Rule 7.3)', () => {
  it('destructive buttons in blocks/pages are wrapped with AlertDialog', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Only check blocks and pages (UI primitives define the pattern, not enforce it)
    const targetFiles = [/\/blocks\//, /\/pages\//];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (!targetFiles.some((p) => p.test(shortPath))) continue;

      // Find destructive buttons with dangerous action labels
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Look for Button with variant="destructive" that has a delete/remove/revoke label
        if (
          /variant\s*=\s*["']destructive["']/.test(line) ||
          /variant:\s*["']destructive["']/.test(line)
        ) {
          const context = lines
            .slice(Math.max(0, i - 3), Math.min(lines.length, i + 3))
            .join('\n')
            .toLowerCase();

          // Check if the button label implies permanent deletion
          const isDestructiveAction =
            /delete|remove|revoke|destroy|permanently/i.test(context);

          if (isDestructiveAction) {
            // The file should use AlertDialog
            if (
              !content.includes('AlertDialog') &&
              !content.includes('alertDialog') &&
              !content.includes('confirm')
            ) {
              violations.push(
                `${shortPath}:${i + 1}: destructive action without AlertDialog confirmation`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `Destructive actions without confirmation:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
