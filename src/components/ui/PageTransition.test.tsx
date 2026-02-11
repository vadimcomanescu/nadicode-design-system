import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageTransition } from './PageTransition';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => true,
}));

describe('PageTransition', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PageTransition pathname="/test">Page content</PageTransition>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <PageTransition pathname="/test">Page content</PageTransition>
    );
    expect(getByText('Page content')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <PageTransition pathname="/test" className="page-custom">Content</PageTransition>
    );
    expect(container.innerHTML).toContain('page-custom');
  });
});
