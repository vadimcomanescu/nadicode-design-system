/**
 * Guardrail: opinion-rule allowlists are intentional technical debt and must
 * not grow silently.
 */
import { describe, it, expect } from 'vitest';
import { readProjectFile } from './design-system-utils';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

type DebtBudget = {
  file: string;
  variableName: string;
  maxCount: number;
};

const DEBT_BUDGETS: DebtBudget[] = [
  {
    file: 'src/test/opinion-reduced-motion.test.ts',
    variableName: 'knownViolations',
    maxCount: 35,
  },
  {
    file: 'src/test/opinion-responsive-touch.test.ts',
    variableName: 'knownViolations',
    maxCount: 3,
  },
  {
    file: 'src/test/opinion-feedback-empty.test.ts',
    variableName: 'knownViolations',
    maxCount: 2,
  },
  {
    file: 'src/test/opinion-chart-empty.test.ts',
    variableName: 'knownViolations',
    maxCount: 1,
  },
  {
    file: 'src/test/opinion-reduced-motion.test.ts',
    variableName: 'allowlist',
    maxCount: 19,
  },
];

const ROOT = resolve(import.meta.dirname, '../..');

function readStringArrayItems(source: string, variableName: string): string[] {
  const pattern = new RegExp(
    `const\\s+${variableName}\\s*=\\s*\\[(?<body>[\\s\\S]*?)\\];`,
    'm'
  );
  const match = pattern.exec(source);

  if (!match || !match.groups?.body) {
    throw new Error(
      `Could not find array variable "${variableName}" in opinion test file.`
    );
  }

  const stringMatches = match.groups.body.match(/['"]([^'"]+)['"]/g) ?? [];
  return stringMatches.map((value) => value.slice(1, -1));
}

describe('Opinion Debt Budgets', () => {
  it('known allowlists do not grow beyond approved budgets', () => {
    const violations: string[] = [];

    for (const budget of DEBT_BUDGETS) {
      // Some opinion suites may not be committed yet in a partial migration.
      // Skip missing files so this guard remains stable in CI.
      if (!existsSync(resolve(ROOT, budget.file))) {
        continue;
      }

      const source = readProjectFile(budget.file);
      const items = readStringArrayItems(source, budget.variableName);

      if (items.length > budget.maxCount) {
        violations.push(
          `${budget.file} -> ${budget.variableName} has ${items.length} entries (budget: ${budget.maxCount})`
        );
      }
    }

    expect(
      violations,
      `Opinion debt budgets exceeded:\n${violations.join('\n')}`
    ).toHaveLength(0);
  });
});
