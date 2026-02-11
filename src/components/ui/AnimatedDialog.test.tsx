import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Mock motion/react with cached forwardRef components to avoid infinite update loops
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();

  const cache = new Map<string, React.ForwardRefExoticComponent<Record<string, unknown>>>();

  function getMotionComponent(tag: string) {
    if (!cache.has(tag)) {
      const Comp = React.forwardRef<HTMLElement, Record<string, unknown>>(
        ({ children, style, ...rest }, ref) => {
          return React.createElement(tag, { ref, style: typeof style === 'object' ? style : undefined, ...rest }, children as React.ReactNode);
        }
      );
      Comp.displayName = `motion.${tag}`;
      cache.set(tag, Comp);
    }
    return cache.get(tag)!;
  }

  const motionProxy = new Proxy({}, {
    get(_target, prop) {
      return getMotionComponent(String(prop));
    },
  });

  return {
    ...actual,
    motion: motionProxy,
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  };
});

import {
  AnimatedDialog,
  AnimatedDialogTrigger,
  AnimatedDialogContent,
  AnimatedDialogHeader,
  AnimatedDialogFooter,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
} from './AnimatedDialog';

describe('AnimatedDialog', () => {
  it('renders the trigger', () => {
    render(
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open</AnimatedDialogTrigger>
        <AnimatedDialogContent>
          <AnimatedDialogTitle>Title</AnimatedDialogTitle>
          <AnimatedDialogDescription>Desc</AnimatedDialogDescription>
        </AnimatedDialogContent>
      </AnimatedDialog>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open</AnimatedDialogTrigger>
        <AnimatedDialogContent>
          <AnimatedDialogTitle>Dialog Title</AnimatedDialogTitle>
          <AnimatedDialogDescription>Dialog body text.</AnimatedDialogDescription>
        </AnimatedDialogContent>
      </AnimatedDialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Title')).toBeVisible();
    expect(screen.getByText('Dialog body text.')).toBeVisible();
  });

  it('has a dialog role when open', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open</AnimatedDialogTrigger>
        <AnimatedDialogContent>
          <AnimatedDialogTitle>Title</AnimatedDialogTitle>
          <AnimatedDialogDescription>Desc</AnimatedDialogDescription>
        </AnimatedDialogContent>
      </AnimatedDialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders header and footer containers', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open</AnimatedDialogTrigger>
        <AnimatedDialogContent>
          <AnimatedDialogHeader data-testid="header">
            <AnimatedDialogTitle>Title</AnimatedDialogTitle>
          </AnimatedDialogHeader>
          <AnimatedDialogFooter data-testid="footer">
            <button>OK</button>
          </AnimatedDialogFooter>
        </AnimatedDialogContent>
      </AnimatedDialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('contains a close button with sr-only label', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open</AnimatedDialogTrigger>
        <AnimatedDialogContent>
          <AnimatedDialogTitle>Title</AnimatedDialogTitle>
          <AnimatedDialogDescription>Desc</AnimatedDialogDescription>
        </AnimatedDialogContent>
      </AnimatedDialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Close')).toHaveClass('sr-only');
  });
});
