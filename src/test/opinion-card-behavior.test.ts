import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Card Behavior', () => {
  it('elements with hover lift transforms should have interactive intent', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Patterns that indicate hover lift (in className strings or motion props)
    const hoverLiftPatterns = [
      /hover:-translate-y/,
      /hover:scale-\[/,
      /whileHover.*(?:y:|scale:)/,
    ];

    // Patterns that indicate interactive intent
    const interactivePatterns = [
      /interactive/,
      /onClick/,
      /onPress/,
      /href=/,
      /role="button"/,
      /<button/i,
      /<Button/,
      /<a\s/,
      /asChild/,
      /cursor-pointer/,
    ];

    // Component definitions that provide hover behavior for interactive children
    const skipFiles = [
      'src/components/ui/Button.tsx',
      'src/components/ui/Card.tsx',
      'src/components/ui/SpringHover.tsx',
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (skipFiles.some((f) => shortPath === f)) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        const hasHoverLift = hoverLiftPatterns.some((p) => p.test(line));
        if (hasHoverLift) {
          // Check surrounding context (10 lines before and after) for interactive intent
          const context = lines
            .slice(Math.max(0, i - 10), Math.min(lines.length, i + 10))
            .join('\n');
          const hasInteractive = interactivePatterns.some((p) => p.test(context));
          if (!hasInteractive) {
            violations.push(`${shortPath}:${i + 1}: hover lift without interactive intent`);
          }
        }
      }
    }

    expect(
      violations,
      `Elements with hover lifts but no interactive intent:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
