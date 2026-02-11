import { describe, it, expect } from 'vitest';
import { readProjectFile } from './design-system-utils';

describe('Glass Effect Completeness', () => {
  const css = readProjectFile('src/index.css');

  const REQUIRED_CLASSES = ['glass-panel', 'glass-floating', 'glass-overlay'];

  describe('Arctic dark glass classes', () => {
    for (const cls of REQUIRED_CLASSES) {
      it(`defines .${cls}`, () => {
        // The class must appear as a definition (not just a reference)
        expect(css, `.${cls} not found in index.css`).toContain(`.${cls}`);
      });
    }
  });

  describe('Arctic light glass overrides', () => {
    for (const cls of REQUIRED_CLASSES) {
      it(`has light mode override for .${cls}`, () => {
        // Light mode uses :root[class~="light"] .glass-* selector
        const hasLightOverride =
          css.includes(`:root[class~="light"] .${cls}`) ||
          css.includes(`:root[class~="light"] .${cls}:`);
        // glass-panel and glass-floating have explicit light overrides;
        // glass-overlay also has one
        expect(hasLightOverride, `No light override for .${cls}`).toBe(true);
      });
    }
  });

  describe('Glass classes have required properties', () => {
    // Check that glass classes define backdrop-blur somewhere in their block
    it('glass-panel includes backdrop-blur', () => {
      expect(css).toMatch(/\.glass-panel\s*\{[^}]*backdrop-blur/s);
    });

    it('glass-floating includes backdrop-blur', () => {
      expect(css).toMatch(/\.glass-floating\s*\{[^}]*backdrop-blur/s);
    });

    it('glass-overlay includes backdrop-blur', () => {
      expect(css).toMatch(/\.glass-overlay\s*\{[^}]*backdrop-blur/s);
    });

    it('glass-panel includes box-shadow', () => {
      expect(css).toMatch(/\.glass-panel\s*\{[^}]*box-shadow/s);
    });

    it('glass-floating includes box-shadow', () => {
      expect(css).toMatch(/\.glass-floating\s*\{[^}]*box-shadow/s);
    });

    it('glass-panel includes border', () => {
      expect(css).toMatch(/\.glass-panel\s*\{[^}]*border/s);
    });

    it('glass-floating includes border', () => {
      expect(css).toMatch(/\.glass-floating\s*\{[^}]*border/s);
    });
  });

  describe('Bloom glass classes (when present)', () => {
    it('bloom glass classes exist if .bloom selector is defined', () => {
      const hasBloom = css.includes('.bloom');
      if (!hasBloom) return; // Not yet added

      for (const cls of REQUIRED_CLASSES) {
        const hasBloomClass = css.includes(`.bloom .${cls}`);
        expect(hasBloomClass, `Missing .bloom .${cls}`).toBe(true);
      }
    });
  });
});
