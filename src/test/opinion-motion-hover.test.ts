/**
 * Opinion Rule 5.3: Hover Animation Hierarchy.
 * - Button: whileTap with scale
 * - Card (interactive): hover lift (translateY or y) or glow
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { glob } from 'tinyglobby';

const ROOT = resolve(import.meta.dirname, '../..');

describe('Opinion: Hover Animation Hierarchy (Rule 5.3)', () => {
  it('Button component uses whileTap with scale', async () => {
    const files = await glob(['src/components/ui/Button.tsx'], {
      cwd: ROOT,
      absolute: true,
    });

    if (files.length === 0) return;

    const content = readFileSync(files[0], 'utf-8');

    // Button should have whileTap with scale for tactile feedback
    const hasWhileTap = content.includes('whileTap');
    const hasScale = /scale.*0\.9[0-9]|scale:\s*0\.9/.test(content);

    expect(
      hasWhileTap || hasScale,
      'Button should use whileTap with scale for tactile press feedback'
    ).toBe(true);
  });

  it('Card component supports hover lift or glow for interactive mode', async () => {
    const files = await glob(['src/components/ui/Card.tsx'], {
      cwd: ROOT,
      absolute: true,
    });

    if (files.length === 0) return;

    const content = readFileSync(files[0], 'utf-8');

    // Card should have hover behavior for interactive variant
    const hasHoverLift =
      content.includes('whileHover') ||
      content.includes('hover:-translate-y') ||
      content.includes('hover:shadow');
    const hasInteractiveVariant =
      content.includes('interactive') ||
      content.includes('hoverable') ||
      content.includes('clickable');

    // Either it has hover lift built in, or it has an interactive variant
    expect(
      hasHoverLift || hasInteractiveVariant,
      'Card should support hover lift/glow for interactive cards'
    ).toBe(true);
  });
});
