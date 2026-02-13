/**
 * Opinion Rule 10.1: Focus Indicators.
 * Every outline-none must have a corresponding focus-visible:ring-* or
 * focus-visible:outline-*. Never remove focus indicators without replacement.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Focus Indicators (Rule 10.1)', () => {
  it('outline-none always paired with focus-visible ring replacement', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Components where Radix UI handles focus internally, or outline-none is used
    // in CSS selector context targeting internal library elements
    const radixManagedComponents = [
      'Command.tsx', 'ContextMenu.tsx', 'DropdownMenu.tsx', 'Menubar.tsx',
      'NavigationMenu.tsx', 'Select.tsx', 'HoverCard.tsx', 'Popover.tsx',
      'Chart.tsx', 'SearchCommand.tsx', 'Slider.tsx', 'TagInput.tsx',
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      // Skip Radix-managed components (focus is handled by Radix primitives)
      if (radixManagedComponents.some((f) => shortPath.endsWith(f))) continue;

      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Skip CSS attribute selectors (e.g., [&_.recharts-layer]:outline-none)
        if (/\[&/.test(line) && /\]:outline-none/.test(line)) continue;

        // Look for outline-none in className strings
        if (/outline-none/.test(line)) {
          // Check surrounding context for focus-visible ring replacement
          const context = lines
            .slice(Math.max(0, i - 5), Math.min(lines.length, i + 5))
            .join(' ');

          const hasFocusReplacement =
            /focus-visible:ring/.test(context) ||
            /focus-visible:outline/.test(context) ||
            /focus-visible:border/.test(context) ||
            /focus:ring/.test(context) ||
            /ring-offset/.test(context) ||
            /ring-1|ring-2/.test(context) ||
            /data-\[state/.test(context) || // Radix data attribute states handle focus
            /data-\[focus/.test(context);

          if (!hasFocusReplacement) {
            violations.push(
              `${shortPath}:${i + 1}: outline-none without focus-visible ring replacement`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Missing focus indicators:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
