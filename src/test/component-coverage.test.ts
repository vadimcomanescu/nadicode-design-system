import { describe, it, expect } from 'vitest';
import { getComponentFileNames, getComponentTestFiles } from './design-system-utils';

describe('Component Test Coverage Gate', () => {
  it('every UI component has a colocated test file', async () => {
    const components = await getComponentFileNames();
    const tests = await getComponentTestFiles();

    const testBasenames = new Set(
      tests.map((t) => t.replace('.test.tsx', '.tsx'))
    );

    const missing: string[] = [];
    for (const comp of components) {
      if (!testBasenames.has(comp)) {
        missing.push(comp);
      }
    }

    expect(missing, `Components missing tests:\n${missing.join('\n')}`).toHaveLength(0);
  });
});
