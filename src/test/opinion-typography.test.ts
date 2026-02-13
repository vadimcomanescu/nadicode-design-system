import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Typography', () => {
  it('no arbitrary text sizes in Tailwind classes', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Match text-[Npx] or text-[Nrem] arbitrary sizes
    const arbitraryTextSize = /text-\[\d+(?:px|rem)\]/g;

    // Allow specific small-label exceptions
    const allowedArbitrary = ['text-[10px]', 'text-[11px]'];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        const matches = line.match(arbitraryTextSize);
        if (matches) {
          const realViolations = matches.filter((m) => !allowedArbitrary.includes(m));
          if (realViolations.length > 0) {
            violations.push(`${shortPath}:${i + 1}: ${realViolations.join(', ')}`);
          }
        }
      }
    }

    expect(
      violations,
      `Arbitrary text sizes (use Tailwind scale instead):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no font-light (weight 300) usage', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    const fontLightPattern = /font-light|font-\[300\]|fontWeight:\s*300/g;

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (fontLightPattern.test(line)) {
          violations.push(
            `${shortPath}:${i + 1}: font-light/weight-300 (fails on glass backgrounds)`
          );
          fontLightPattern.lastIndex = 0;
        }
      }
    }

    expect(
      violations,
      `Font weight 300 usage (forbidden on glass):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
