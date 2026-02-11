import { describe, it, expect } from 'vitest';
import { colorScales, colorTokens, tokens, bloomScales, styleTokens } from '../lib/tokens.config';
import { getNestedKeys } from './design-system-utils';

describe('Token Schema Integrity', () => {
  describe('Semantic token parity', () => {
    it('dark and light colorTokens have identical key shapes', () => {
      const darkKeys = getNestedKeys(colorTokens.dark).sort();
      const lightKeys = getNestedKeys(colorTokens.light).sort();
      expect(darkKeys).toEqual(lightKeys);
    });

    it('bloom colorTokens match dark/light key shape', () => {
      const darkKeys = getNestedKeys(colorTokens.dark).sort();
      const bloomKeys = getNestedKeys(colorTokens.bloom).sort();
      expect(bloomKeys).toEqual(darkKeys);
    });
  });

  describe('Color scale completeness', () => {
    const EXPECTED_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const variant of ['dark', 'light'] as const) {
      const scales = colorScales[variant];
      for (const [name, scale] of Object.entries(scales)) {
        it(`${variant}.${name} has all 12 steps`, () => {
          const stepKeys = Object.keys(scale).map(Number).sort((a, b) => a - b);
          expect(stepKeys).toEqual(EXPECTED_STEPS);
        });

        it(`${variant}.${name} has no empty values`, () => {
          for (const step of EXPECTED_STEPS) {
            const val = (scale as Record<number, string>)[step];
            expect(val, `step ${step} is empty`).toBeTruthy();
          }
        });
      }
    }
  });

  describe('Bloom scale completeness', () => {
    const EXPECTED_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const [name, scale] of Object.entries(bloomScales)) {
      it(`bloom.${name} has all 12 steps`, () => {
        const stepKeys = Object.keys(scale).map(Number).sort((a, b) => a - b);
        expect(stepKeys).toEqual(EXPECTED_STEPS);
      });

      it(`bloom.${name} has no empty values`, () => {
        for (const step of EXPECTED_STEPS) {
          const val = (scale as Record<number, string>)[step];
          expect(val, `step ${step} is empty`).toBeTruthy();
        }
      });
    }
  });

  describe('Style token parity', () => {
    it('styleTokens.arctic and styleTokens.bloom have matching top-level keys', () => {
      const arcticKeys = Object.keys(styleTokens.arctic).sort();
      const bloomKeys = Object.keys(styleTokens.bloom).sort();
      // Bloom can have extra keys, but must cover all arctic keys
      for (const key of arcticKeys) {
        expect(bloomKeys, `styleTokens.bloom missing key: ${key}`).toContain(key);
      }
    });

    it('both styles define radius with sm, md, lg', () => {
      for (const style of ['arctic', 'bloom'] as const) {
        expect(styleTokens[style].radius).toHaveProperty('sm');
        expect(styleTokens[style].radius).toHaveProperty('md');
        expect(styleTokens[style].radius).toHaveProperty('lg');
      }
    });
  });

  describe('No undefined values in tokens', () => {
    function assertNoUndefined(obj: unknown, path: string) {
      if (obj === null || obj === undefined) {
        throw new Error(`Found null/undefined at ${path}`);
      }
      if (typeof obj === 'string' && obj === '') {
        throw new Error(`Found empty string at ${path}`);
      }
      if (typeof obj === 'object' && !Array.isArray(obj)) {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          assertNoUndefined(v, `${path}.${k}`);
        }
      }
    }

    it('colorTokens.dark has no undefined/null/empty values', () => {
      assertNoUndefined(colorTokens.dark, 'colorTokens.dark');
    });

    it('colorTokens.light has no undefined/null/empty values', () => {
      assertNoUndefined(colorTokens.light, 'colorTokens.light');
    });

    it('colorTokens.bloom has no undefined/null/empty values', () => {
      assertNoUndefined(colorTokens.bloom, 'colorTokens.bloom');
    });

    it('bloomScales have no undefined/null/empty values', () => {
      assertNoUndefined(bloomScales, 'bloomScales');
    });

    it('styleTokens have no undefined/null/empty values', () => {
      assertNoUndefined(styleTokens, 'styleTokens');
    });

    it('colorScales have no undefined/null/empty values', () => {
      assertNoUndefined(colorScales, 'colorScales');
    });

    it('non-color tokens have no undefined/null/empty values', () => {
      assertNoUndefined(tokens, 'tokens');
    });
  });

  describe('Hex format validation', () => {
    const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;
    const RGBA_REGEX = /^rgba?\(\s*\d+/;

    function collectColorValues(obj: unknown, path: string): { path: string; value: string }[] {
      const results: { path: string; value: string }[] = [];
      if (typeof obj === 'string') {
        results.push({ path, value: obj });
      } else if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          results.push(...collectColorValues(v, `${path}.${k}`));
        }
      }
      return results;
    }

    for (const variant of ['dark', 'light', 'bloom'] as const) {
      it(`colorTokens.${variant} values are valid hex or rgba`, () => {
        const values = collectColorValues(colorTokens[variant], variant);
        for (const { path, value } of values) {
          const isValid = HEX_REGEX.test(value) || RGBA_REGEX.test(value);
          expect(isValid, `Invalid color at ${path}: "${value}"`).toBe(true);
        }
      });
    }

    for (const variant of ['dark', 'light'] as const) {
      const scales = colorScales[variant];
      for (const [name, scale] of Object.entries(scales)) {
        it(`colorScales.${variant}.${name} values are valid hex or rgba`, () => {
          for (const [step, value] of Object.entries(scale as Record<string, string>)) {
            const isValid = HEX_REGEX.test(value) || RGBA_REGEX.test(value);
            expect(isValid, `Invalid color at ${variant}.${name}.${step}: "${value}"`).toBe(true);
          }
        });
      }
    }

    it('bloomScales values are valid hex', () => {
      for (const [name, scale] of Object.entries(bloomScales)) {
        for (const [step, value] of Object.entries(scale as Record<string, string>)) {
          const isValid = HEX_REGEX.test(value);
          expect(isValid, `Invalid color at bloom.${name}.${step}: "${value}"`).toBe(true);
        }
      }
    });
  });
});
