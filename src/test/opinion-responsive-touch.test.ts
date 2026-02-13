/**
 * Opinion Rule 8.2: Touch Targets >= 44px.
 * Interactive elements should not use sizes smaller than h-10 w-10 (40px)
 * without a larger touch target wrapper.
 * This is an approximation test based on Tailwind class analysis.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Touch Targets (Rule 8.2)', () => {
  it('no tiny interactive elements (h-6 w-6 or smaller) without larger touch wrapper', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Tailwind size classes that are below the 40px minimum
    // h-6 = 24px, h-7 = 28px, h-8 = 32px
    // We flag h-6 and w-6 or smaller as definite violations
    const tinySize = /\b(?:h-[1-6]|w-[1-6])\b/;

    // Patterns that indicate an interactive element
    const interactivePatterns = [
      /<button/i,
      /<Button/,
      /onClick/,
      /role="button"/,
      /tabIndex/,
    ];

    // Skip non-interactive contexts
    const skipPatterns = [
      /\/icons\//, // Icon definitions (not buttons)
      /Skeleton\.tsx/, // Skeleton placeholders
      /Badge\.tsx/, // Badges are not primary touch targets
      /Separator\.tsx/,
    ];

    // TODO: These components need touch target size fixes
    const knownViolations = ['BannerBlock.tsx', 'Sidebar.tsx', 'VantaLoginPages.tsx'];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (skipPatterns.some((p) => p.test(shortPath))) continue;
      if (knownViolations.some((f) => shortPath.endsWith(f))) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        if (tinySize.test(line)) {
          // Check if this is an interactive element
          const context = lines
            .slice(Math.max(0, i - 3), Math.min(lines.length, i + 3))
            .join('\n');

          const isInteractive = interactivePatterns.some((p) => p.test(context));
          if (!isInteractive) continue;

          // Check if there's a larger wrapper providing the touch target
          const hasLargerWrapper =
            /min-h-\[4[0-9]px\]|min-h-10|min-h-11|h-10|h-11|h-12|p-2|p-3/.test(
              context
            );

          if (!hasLargerWrapper) {
            violations.push(
              `${shortPath}:${i + 1}: interactive element with size < 40px (touch target too small)`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Tiny touch targets (min 40px):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
