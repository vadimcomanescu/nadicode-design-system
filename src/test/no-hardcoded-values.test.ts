import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

// Patterns that indicate hardcoded color values in component code
const TAILWIND_HEX_PATTERN = /(?:bg|text|border|fill|stroke|ring|shadow|from|to|via)-\[#[0-9a-fA-F]{3,8}\]/g;
const STYLE_HEX_PATTERN = /(?:color|background|border(?:Color)?|fill|stroke)\s*:\s*['"]?#[0-9a-fA-F]{3,8}/g;
// Only match literal rgba() calls, not rgb(var(--...)) CSS variable usage
const STYLE_RGBA_PATTERN = /(?:color|background|border(?:Color)?|fill|stroke)\s*:\s*['"]?rgba?\(\s*\d/g;

describe('No Hardcoded Values in Components', () => {
  it('no hardcoded hex colors in Tailwind classes', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      const matches = content.match(TAILWIND_HEX_PATTERN);
      if (matches) {
        const shortPath = path.replace(/.*\/src\//, 'src/');
        violations.push(`${shortPath}: ${matches.join(', ')}`);
      }
    }

    expect(
      violations,
      `Hardcoded hex colors in Tailwind classes:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no hardcoded hex colors in style objects', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      // Skip lines that are comments
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('//') || line.startsWith('*')) continue;
        const matches = line.match(STYLE_HEX_PATTERN);
        if (matches) {
          const shortPath = path.replace(/.*\/src\//, 'src/');
          violations.push(`${shortPath}:${i + 1}: ${matches.join(', ')}`);
        }
      }
    }

    expect(
      violations,
      `Hardcoded hex colors in style objects:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no hardcoded rgba() in style objects', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    for (const { path, content } of files) {
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('//') || line.startsWith('*')) continue;
        const matches = line.match(STYLE_RGBA_PATTERN);
        if (matches) {
          const shortPath = path.replace(/.*\/src\//, 'src/');
          violations.push(`${shortPath}:${i + 1}: ${matches.join(', ')}`);
        }
      }
    }

    expect(
      violations,
      `Hardcoded rgba() in component style objects:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
