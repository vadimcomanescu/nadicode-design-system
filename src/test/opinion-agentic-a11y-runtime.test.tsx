import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { AgentMessageBubble } from '@/components/ui/AgentMessageBubble';
import { ToolCallCard } from '@/components/ui/ToolCallCard';
import { AgentTerminal } from '@/components/ui/AgentTerminal';
import { SourceCitation } from '@/components/ui/SourceCitation';
import { WorkflowGraph } from '@/components/ui/WorkflowGraph';

async function expectNoAxeViolations(container: HTMLElement, context: string) {
  const results = await axe.run(container, {
    rules: {
      // JSDOM does not compute full rendered colors reliably.
      'color-contrast': { enabled: false },
      // Unit tests render component fragments, not full landmark pages.
      region: { enabled: false },
    },
  });

  const formatted = results.violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`
  );

  expect(
    formatted,
    `${context} has accessibility violations:\n${formatted.join('\n')}`
  ).toHaveLength(0);
}

describe('Opinion: Agentic Runtime Accessibility', () => {
  it('agentic primitives render without axe violations', async () => {
    const { container } = render(
      <div>
        <AgentMessageBubble
          role="agent"
          content="Streaming answer..."
          timestamp="12:30"
          actions={{ onCopy: () => {}, onRetry: () => {} }}
          isStreaming
        />
        <ToolCallCard
          status="complete"
          toolName="web.search"
          args={{ q: 'design system a11y' }}
          result="3 sources found"
          defaultExpanded
        />
        <AgentTerminal
          title="Terminal"
          lines={[
            { type: 'stdin', text: 'npm run test' },
            { type: 'stdout', text: '1255 tests passed' },
          ]}
          onCopy={() => {}}
        />
        <SourceCitation
          sources={[
            {
              id: 's-1',
              title: 'Design Tokens Reference',
              url: 'https://example.com/tokens',
              score: 0.92,
              snippet: 'Use semantic tokens instead of hardcoded values.',
            },
          ]}
        />
        <WorkflowGraph
          nodes={[
            { id: 'discover', label: 'Discover', status: 'done' },
            { id: 'implement', label: 'Implement', status: 'active' },
            { id: 'verify', label: 'Verify', status: 'pending' },
          ]}
          edges={[
            { from: 'discover', to: 'implement' },
            { from: 'implement', to: 'verify' },
          ]}
        />
      </div>
    );

    await expectNoAxeViolations(container, 'Agentic primitives');
  });
});
