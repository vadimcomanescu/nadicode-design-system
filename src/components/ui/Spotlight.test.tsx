import { createRef } from "react";
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Spotlight } from './Spotlight';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, style, ...props }: Record<string, unknown>) => (
      <div className={className as string} style={style as React.CSSProperties} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useMotionTemplate: () => 'mock-gradient',
  useReducedMotion: () => false,
}));

describe('Spotlight', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Spotlight>Spotlight content</Spotlight>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Spotlight>Inner content</Spotlight>
    );
    expect(getByText('Inner content')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <Spotlight className="custom-spot">Test</Spotlight>
    );
    expect(container.firstChild).toHaveClass('custom-spot');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spotlight ref={ref}>Ref</Spotlight>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
