import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Mock motion/react to avoid animation complexities
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripping motion props from DOM spread
        const { initial, animate, exit, transition, whileHover, whileTap, layoutId, ...domProps } = props;
        return <div {...domProps}>{children}</div>;
      },
      span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripping motion props from DOM spread
        const { initial, animate, exit, transition, whileHover, whileTap, layoutId, ...domProps } = props;
        return <span {...domProps}>{children}</span>;
      },
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  };
});

import {
  AnimatedTabs,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
} from './AnimatedTabs';

describe('AnimatedTabs', () => {
  function renderTabs(defaultValue = 'tab1') {
    return render(
      <AnimatedTabs defaultValue={defaultValue}>
        <AnimatedTabsList>
          <AnimatedTabsTrigger value="tab1">Tab 1</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="tab2">Tab 2</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="tab3">Tab 3</AnimatedTabsTrigger>
        </AnimatedTabsList>
        <AnimatedTabsContent value="tab1">Content 1</AnimatedTabsContent>
        <AnimatedTabsContent value="tab2">Content 2</AnimatedTabsContent>
        <AnimatedTabsContent value="tab3">Content 3</AnimatedTabsContent>
      </AnimatedTabs>
    );
  }

  it('renders all tab triggers', () => {
    renderTabs();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows the default tab content', () => {
    renderTabs('tab1');
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('switches content when a different tab is clicked', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');

    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('marks the active trigger with data-state=active', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab1).toHaveAttribute('data-state', 'active');

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active');
  });

  it('supports keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    await user.click(firstTab);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
  });

  it('has correct tablist role', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
