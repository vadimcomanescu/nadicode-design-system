/**
 * Opinion Rule 5.4: Forbidden Motion Patterns.
 * - Parallax scrolling is FORBIDDEN
 * - Scroll-jacking is FORBIDDEN
 * - Infinite rotation animations (except loading spinners) FORBIDDEN
 * - Auto-playing carousels FORBIDDEN
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Forbidden Motion Patterns (Rule 5.4)', () => {
  it('no parallax scroll patterns (transform based on scroll position)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Parallax patterns: transforming elements based on scrollY
    const parallaxPatterns = [
      /scrollY\s*\*\s*0\.\d/,
      /translateY\(\$\{.*scroll/i,
      /transform.*scroll.*translateY/i,
      /useScroll.*useTransform/,
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        for (const pattern of parallaxPatterns) {
          if (pattern.test(line)) {
            violations.push(
              `${shortPath}:${i + 1}: parallax pattern detected (FORBIDDEN)`
            );
            break;
          }
        }
      }
    }

    expect(
      violations,
      `Parallax patterns (forbidden by Rule 5.4):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no scroll-jacking (overriding native scroll behavior)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Scroll-jacking: preventing default wheel events
    const scrollJackPatterns = [
      /addEventListener\(\s*['"]wheel['"].*preventDefault/,
      /onWheel.*preventDefault/,
      /scroll-snap-type:\s*y\s+mandatory.*scroll-snap-stop/,
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');

      // Check the whole content for multi-line patterns
      for (const pattern of scrollJackPatterns) {
        if (pattern.test(content)) {
          violations.push(
            `${shortPath}: scroll-jacking pattern detected (FORBIDDEN)`
          );
          break;
        }
      }
    }

    expect(
      violations,
      `Scroll-jacking patterns (forbidden by Rule 5.4):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no infinite rotation (except loading spinners)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Allowlist spinner components
    const spinnerAllowlist = ['Spinner.tsx', 'AudioWaveform.tsx'];

    // Infinite rotation: rotate with repeat: Infinity
    const infiniteRotation = /rotate.*Infinity|Infinity.*rotate|animate-spin/;

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (spinnerAllowlist.some((f) => shortPath.endsWith(f))) continue;
      // Skip icon definition files
      if (shortPath.includes('/icons/')) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (infiniteRotation.test(line)) {
          // Check context for loading/spinner intent
          const context = lines
            .slice(Math.max(0, i - 5), Math.min(lines.length, i + 5))
            .join('\n')
            .toLowerCase();
          if (
            !context.includes('spinner') &&
            !context.includes('loading') &&
            !context.includes('loader')
          ) {
            violations.push(
              `${shortPath}:${i + 1}: infinite rotation without loading/spinner context`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Non-spinner infinite rotations:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
