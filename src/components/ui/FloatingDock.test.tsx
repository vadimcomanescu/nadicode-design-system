import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Mock motion/react with cached forwardRef components
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
  };
});

// Mock dialkit
vi.mock('dialkit', () => ({
  useDialKit: (_name: string, defaults: Record<string, unknown>) => defaults,
}));

import { FloatingDock } from './FloatingDock';

const items = [
  { icon: <span>H</span>, label: 'Home' },
  { icon: <span>S</span>, label: 'Settings' },
  { icon: <span>P</span>, label: 'Profile' },
];

describe('FloatingDock', () => {
  it('renders all dock items', () => {
    render(<FloatingDock items={items} />);
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile')).toBeInTheDocument();
  });

  it('renders item icons', () => {
    render(<FloatingDock items={items} />);
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();
  });

  it('renders tooltip labels for each item', () => {
    render(<FloatingDock items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('calls onClick when an item is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const clickItems = [
      { icon: <span>X</span>, label: 'Action', onClick: handleClick },
    ];

    render(<FloatingDock items={clickItems} />);
    await user.click(screen.getByLabelText('Action'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<FloatingDock items={items} className="my-dock" />);
    expect(container.querySelector('.my-dock')).toBeInTheDocument();
  });
});
