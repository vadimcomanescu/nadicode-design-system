/**
 * Opinion Rule 10.3: Screen Reader Labels for Icons.
 * Icon-only buttons must have aria-label, aria-labelledby, or sr-only text.
 * Scan for button elements that contain only an icon without accessible labeling.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Screen Reader Labels (Rule 10.3)', () => {
  it('icon-only buttons have accessible labels', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Skip icon definition files (they provide the icon, not the button context)
    const skipPaths = [/\/icons\//, /Icon\.tsx$/];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (skipPaths.some((p) => p.test(shortPath))) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Pattern: <button or <Button that contains an Icon but no visible text
        if (/<(?:button|Button)\b/.test(line)) {
          // Gather the element context (up to closing tag)
          const context = lines.slice(i, Math.min(lines.length, i + 8)).join('\n');

          // Check if it's an icon-only button (contains Icon, no text content)
          const hasIcon = /Icon\s*[/>]|Icon\s+/.test(context);
          const hasVisibleText =
            />[\w\s]+</.test(context) || // Text between tags
            />\{.*\}</.test(context); // Dynamic text between tags

          if (hasIcon && !hasVisibleText) {
            // Check for accessibility labels
            const hasA11yLabel =
              /aria-label/.test(context) ||
              /aria-labelledby/.test(context) ||
              /sr-only/.test(context) ||
              /title=/.test(context) ||
              // Tooltip components often provide accessible names
              /Tooltip/.test(context);

            if (!hasA11yLabel) {
              violations.push(
                `${shortPath}:${i + 1}: icon-only button without accessible label (add aria-label or sr-only text)`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `Icon-only buttons without accessible labels:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
