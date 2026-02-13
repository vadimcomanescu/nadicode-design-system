/**
 * Opinion Rule 6.4: Required Field Indicators.
 * Mark required fields with asterisk (*). Never use "(Required)" text.
 * Never use "(Optional)" on optional fields.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Required Field Indicators (Rule 6.4)', () => {
  it('no "(Required)" text in form labels', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    const requiredText = /\(Required\)/i;

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (requiredText.test(line)) {
          violations.push(
            `${shortPath}:${i + 1}: "(Required)" text (use asterisk * instead)`
          );
        }
      }
    }

    expect(
      violations,
      `"(Required)" text found (use asterisk):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no "(Optional)" text in form labels', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    const optionalText = /\(Optional\)/i;

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (optionalText.test(line)) {
          violations.push(
            `${shortPath}:${i + 1}: "(Optional)" text (never mark optional fields)`
          );
        }
      }
    }

    expect(
      violations,
      `"(Optional)" labels found (don't mark optional fields):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
