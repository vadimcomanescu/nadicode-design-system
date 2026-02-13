/**
 * Opinion Rule 5.2: Spring for entrances, CSS easing for properties.
 * - motion/react initial/animate transitions should use spring (type: "spring")
 * - CSS transitions (transition-colors, transition-opacity) should use CSS easing
 * - Linear easing is reserved for progress bars only
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Spring vs CSS Easing (Rule 5.2)', () => {
  it('entrance animations do not use linear easing', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Pattern: motion component with transition containing ease: "linear"
    // This is forbidden for entrances (linear = mechanical/robotic)
    const linearEntrance = /transition\s*=\s*\{[^}]*ease:\s*["']linear["']/;

    // Allowlist progress-related files
    const progressAllowlist = ['Progress.tsx', 'ContextMeter.tsx'];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (progressAllowlist.some((f) => shortPath.endsWith(f))) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        if (linearEntrance.test(line)) {
          violations.push(
            `${shortPath}:${i + 1}: linear easing in motion transition (use spring for entrances)`
          );
        }
      }
    }

    expect(
      violations,
      `Linear easing used for entrances:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });

  it('no excessively long animation durations (> 500ms / 0.5s)', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Match duration values > 0.5 in motion transition props
    // Only match when preceded by "transition" context (within ~5 lines)
    const longDuration = /duration:\s*(0\.[6-9]\d*|[1-9]\d*\.?\d*)/;

    // Allowlist: stagger parent containers where duration is for the stagger delay
    const allowlist = [
      'InfiniteSlider.tsx', 'PixelReveal.tsx', 'AudioWaveform.tsx',
      'ConfettiBurst.tsx', 'ThinkingIndicator.tsx',
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (allowlist.some((f) => shortPath.endsWith(f))) continue;
      // Skip icon hover animations and showcase demo data
      if (shortPath.includes('/icons/')) continue;
      if (shortPath.includes('/showcase/')) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
        // Only flag if it's in a motion transition context (not CSS duration-*)
        if (/duration-\d/.test(line)) continue; // Tailwind CSS class, skip

        const match = line.match(longDuration);
        if (match) {
          const val = parseFloat(match[1]);
          if (val > 0.5) {
            // Only flag if this looks like a motion/animation duration, not data
            const context = lines
              .slice(Math.max(0, i - 5), Math.min(lines.length, i + 3))
              .join('\n');
            const isAnimationContext =
              /transition/.test(context) ||
              /animate/.test(context) ||
              /motion/.test(context) ||
              /spring/.test(context);
            if (isAnimationContext) {
              violations.push(
                `${shortPath}:${i + 1}: duration ${val}s exceeds 500ms limit`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `Animation durations exceeding 500ms:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
