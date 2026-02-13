import { describe, it, expect } from 'vitest';
import { glob } from 'tinyglobby';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

const BLOCK_TEST_DEBT_ALLOWLIST = [
  'src/components/blocks/AgentConversationBlock.tsx',
  'src/components/blocks/AuthLayout.tsx',
  'src/components/blocks/BarChartBlock.tsx',
  'src/components/blocks/ChartBlock.tsx',
  'src/components/blocks/ChartCollectionBlock.tsx',
  'src/components/blocks/GalleryBlock.tsx',
  'src/components/blocks/HeatmapChartBlock.tsx',
  'src/components/blocks/InteractiveAreaChartBlock.tsx',
  'src/components/blocks/LoginBlock.tsx',
  'src/components/blocks/NotFoundBlock.tsx',
  'src/components/blocks/OnboardingBlock.tsx',
  'src/components/blocks/SignUpBlock.tsx',
  'src/components/blocks/TeamBlock.tsx',
  'src/components/blocks/UsageDonutBlock.tsx',
  'src/components/blocks/user/InviteUserModal.tsx',
];

async function findMissingColocatedTests(options: {
  componentPattern: string;
  testPattern: string;
  componentRoot: string;
  testRoot: string;
  ignore?: string[];
}): Promise<{ components: string[]; missing: string[] }> {
  const components = await glob([options.componentPattern], {
    cwd: ROOT,
    ignore: ['**/*.test.tsx', '**/index.tsx', ...(options.ignore ?? [])],
  });
  const tests = await glob([options.testPattern], { cwd: ROOT });

  const testKeys = new Set(
    tests.map((file) =>
      file.replace(options.testRoot, '').replace(/\.test\.tsx$/, '')
    )
  );

  const missing = components
    .filter((file) => {
      const key = file.replace(options.componentRoot, '').replace(/\.tsx$/, '');
      return !testKeys.has(key);
    })
    .sort();

  return {
    components: components.sort(),
    missing,
  };
}

describe('Component Test Coverage Gate', () => {
  it('every recursive UI component (excluding icons) has a colocated test file', async () => {
    const { missing } = await findMissingColocatedTests({
      componentPattern: 'src/components/ui/**/*.tsx',
      testPattern: 'src/components/ui/**/*.test.tsx',
      componentRoot: 'src/components/ui/',
      testRoot: 'src/components/ui/',
      ignore: ['src/components/ui/icons/**'],
    });

    expect(
      missing,
      `UI components missing tests:\n${missing.join('\n')}`
    ).toHaveLength(0);
  });

  it('every page component has a colocated test file', async () => {
    const { missing } = await findMissingColocatedTests({
      componentPattern: 'src/components/pages/**/*.tsx',
      testPattern: 'src/components/pages/**/*.test.tsx',
      componentRoot: 'src/components/pages/',
      testRoot: 'src/components/pages/',
    });

    expect(
      missing,
      `Page components missing tests:\n${missing.join('\n')}`
    ).toHaveLength(0);
  });

  it('block coverage debt does not grow beyond the explicit allowlist', async () => {
    const { components, missing } = await findMissingColocatedTests({
      componentPattern: 'src/components/blocks/**/*.tsx',
      testPattern: 'src/components/blocks/**/*.test.tsx',
      componentRoot: 'src/components/blocks/',
      testRoot: 'src/components/blocks/',
    });

    const missingSet = new Set(missing);
    const staleAllowlist = BLOCK_TEST_DEBT_ALLOWLIST.filter(
      (entry) => !components.includes(entry)
    );
    const unexpectedDebt = missing.filter(
      (entry) => !BLOCK_TEST_DEBT_ALLOWLIST.includes(entry)
    );
    const resolvedDebt = BLOCK_TEST_DEBT_ALLOWLIST.filter(
      (entry) => !missingSet.has(entry)
    );

    expect(
      staleAllowlist,
      `Block debt allowlist has stale entries:\n${staleAllowlist.join('\n')}`
    ).toHaveLength(0);

    expect(
      unexpectedDebt,
      `New block components without tests are not allowed:\n${unexpectedDebt.join('\n')}`
    ).toHaveLength(0);

    expect(
      missing.length,
      [
        'Block test debt budget exceeded.',
        `Current missing block tests: ${missing.length}`,
        `Budget: ${BLOCK_TEST_DEBT_ALLOWLIST.length}`,
        resolvedDebt.length > 0
          ? `Resolved debt detected (remove these from allowlist):\n${resolvedDebt.join('\n')}`
          : '',
      ]
        .filter(Boolean)
        .join('\n')
    ).toBeLessThanOrEqual(BLOCK_TEST_DEBT_ALLOWLIST.length);
  });
});
