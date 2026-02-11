import { describe, it, expect } from 'vitest';
import { readProjectFile, parseCssVarDefinitions } from './design-system-utils';

describe('CSS Variable Completeness', () => {
  const css = readProjectFile('src/index.css');
  const tailwindConfig = readProjectFile('tailwind.config.js');

  // Extract all --color-* var references from tailwind.config.js
  const varRefRegex = /var\((--[\w-]+)\)/g;
  const referencedVars = new Set<string>();
  let match;
  while ((match = varRefRegex.exec(tailwindConfig)) !== null) {
    referencedVars.add(match[1]);
  }

  // Separate color vars from other vars (sidebar, chart, etc.)
  const colorVars = [...referencedVars].filter((v) => v.startsWith('--color-'));
  const sidebarVars = [...referencedVars].filter((v) => v.startsWith('--sidebar-'));
  const chartVars = [...referencedVars].filter((v) => v.startsWith('--chart-'));

  const rootVars = parseCssVarDefinitions(css, ':root');
  const darkVars = parseCssVarDefinitions(css, '.dark');

  describe('Arctic Light (:root) defines all referenced color vars', () => {
    for (const varName of colorVars) {
      it(`defines ${varName}`, () => {
        expect(rootVars.has(varName), `Missing ${varName} in :root`).toBe(true);
      });
    }
  });

  describe('Arctic Dark (.dark) defines all referenced color vars', () => {
    for (const varName of colorVars) {
      it(`defines ${varName}`, () => {
        expect(darkVars.has(varName), `Missing ${varName} in .dark`).toBe(true);
      });
    }
  });

  describe('Sidebar vars defined in both :root and .dark', () => {
    for (const varName of sidebarVars) {
      it(`${varName} in :root`, () => {
        expect(rootVars.has(varName), `Missing ${varName} in :root`).toBe(true);
      });
    }

    for (const varName of sidebarVars) {
      it(`${varName} in .dark`, () => {
        expect(darkVars.has(varName), `Missing ${varName} in .dark`).toBe(true);
      });
    }
  });

  describe('Chart vars defined in both :root and .dark', () => {
    for (const varName of chartVars) {
      it(`${varName} in :root`, () => {
        expect(rootVars.has(varName), `Missing ${varName} in :root`).toBe(true);
      });
    }

    for (const varName of chartVars) {
      it(`${varName} in .dark`, () => {
        expect(darkVars.has(varName), `Missing ${varName} in .dark`).toBe(true);
      });
    }
  });

  describe('Bloom (.bloom) defines all color vars (when present)', () => {
    const bloomVars = parseCssVarDefinitions(css, '.bloom');

    it('bloom selector exists or is not yet added', () => {
      // If bloom vars are present, they must cover all color vars
      if (bloomVars.size === 0) return; // Not yet added
      for (const varName of colorVars) {
        expect(bloomVars.has(varName), `Missing ${varName} in .bloom`).toBe(true);
      }
    });
  });
});
