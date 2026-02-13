/**
 * Opinion Rule 3.1: Heading Scale Enforcement.
 * No arbitrary text sizes on heading elements (text-[Npx], text-[Nrem]).
 * Use the standard Tailwind text-* scale instead.
 *
 * Note: The existing opinion-typography.test.ts already checks for arbitrary
 * text sizes globally. This test focuses specifically on heading elements
 * and also checks for inline style fontSize on headings.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Typography Scale (Rule 3.1)', () => {
  it('no inline style fontSize on heading elements', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Match heading elements with inline style fontSize
    const inlineFontSize = /<h[1-6][^>]*style\s*=\s*\{[^}]*fontSize/;

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (inlineFontSize.test(line)) {
          violations.push(
            `${shortPath}:${i + 1}: inline fontSize on heading (use Tailwind text-* scale)`
          );
        }
      }
    }

    expect(
      violations,
      `Inline fontSize on headings:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('heading elements use standard Tailwind text scale, not arbitrary values', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Check if line has a heading tag with an arbitrary text size
        if (/<h[1-6]/.test(line)) {
          const context = lines.slice(i, Math.min(lines.length, i + 3)).join(' ');
          if (/text-\[\d+(?:px|rem|em)\]/.test(context)) {
            violations.push(
              `${shortPath}:${i + 1}: heading with arbitrary text size (use text-xl..text-5xl)`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Headings with arbitrary text sizes:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
