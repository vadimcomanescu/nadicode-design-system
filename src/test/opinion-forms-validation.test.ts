/**
 * Opinion Rule 6.2: Validate on blur, not on change.
 * Scan form components for onChange handlers that immediately trigger validation
 * or set error state. The correct pattern is onBlur validation.
 */
import { describe, it, expect } from 'vitest';
import { readComponentFiles } from './design-system-utils';

describe('Opinion: Validate on Blur (Rule 6.2)', () => {
  it('no onChange handlers that immediately set errors', async () => {
    const files = await readComponentFiles();
    const violations: string[] = [];

    // Form-related files only
    const formFilePatterns = [
      /Field\.tsx$/, /Form\.tsx$/, /LoginBlock\.tsx$/, /SignUpBlock\.tsx$/,
      /SettingsLayout\.tsx$/, /CheckoutForm\.tsx$/, /OTPBlock\.tsx$/,
      /CreateBlock\.tsx$/, /WizardBlock\.tsx$/,
    ];

    for (const { path, content } of files) {
      const shortPath = path.replace(/.*\/src\//, 'src/');
      if (!formFilePatterns.some((p) => p.test(shortPath))) continue;

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;

        // Pattern: onChange handler that calls setError or validate
        if (/onChange/.test(line)) {
          const context = lines.slice(i, Math.min(lines.length, i + 5)).join('\n');
          // Check if the onChange handler directly triggers validation/error setting
          if (
            /onChange.*(?:setError|validate|isValid|\.error)/.test(context) ||
            /onChange.*(?:setError|validate)/.test(context)
          ) {
            // Exclude password strength meters (they're allowed per the opinion)
            const broaderContext = lines
              .slice(Math.max(0, i - 10), Math.min(lines.length, i + 10))
              .join('\n')
              .toLowerCase();
            if (
              !broaderContext.includes('password') &&
              !broaderContext.includes('strength')
            ) {
              violations.push(
                `${shortPath}:${i + 1}: onChange triggers validation (use onBlur instead)`
              );
            }
          }
        }
      }
    }

    expect(
      violations,
      `onChange validation patterns (validate on blur, not change):\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
