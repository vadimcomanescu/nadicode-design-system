/**
 * Opinion Rule 6.1: Stacked labels always.
 * Label above input. No floating labels. No inline labels.
 * Scans form-related components for forbidden floating label patterns.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Stacked Labels Always (Rule 6.1)', () => {
  it('no floating label patterns (peer + absolute label positioning)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Floating label pattern: a Label/label with absolute positioning that
    // moves on peer-focus (the hallmark of a floating label)
    const floatingPatterns = [
      /peer-focus:-translate-y/,
      /peer-focus:text-xs/,
      /peer-focus:top-/,
      /peer-placeholder-shown:/,
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        for (const pattern of floatingPatterns) {
          if (pattern.test(line)) {
            violations.push(
              `${shortPath}:${i + 1}: floating label pattern detected (${pattern.source})`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Floating label patterns (use stacked labels instead):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no inline label layout (label and input side by side in flex row)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Only scan form-related component files
    const formFilePatterns = [
      /Input\.tsx$/, /Select\.tsx$/, /Textarea\.tsx$/, /Field\.tsx$/,
      /Combobox\.tsx$/, /DatePicker\.tsx$/, /DateRangePicker\.tsx$/,
      /Form\.tsx$/, /LoginBlock\.tsx$/, /SignUpBlock\.tsx$/,
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (!formFilePatterns.some((p) => p.test(shortPath))) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Detect: flex row containing both Label and Input on same level
        // Pattern: flex items-center with a Label that has a fixed width
        if (/flex\s+items-center/.test(line) || /flex.*gap-\d+/.test(line)) {
          // Check surrounding context for Label + Input on same level
          const context = lines.slice(i, Math.min(lines.length, i + 5)).join('\n');
          if (
            (context.includes('<Label') || context.includes('<label')) &&
            (context.includes('<Input') || context.includes('<input'))
          ) {
            // Allow search/filter bars where label is sr-only
            if (!context.includes('sr-only')) {
              violations.push(
                `${shortPath}:${i + 1}: possible inline label layout (label + input in flex row)`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `Inline label patterns (use stacked labels instead):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
