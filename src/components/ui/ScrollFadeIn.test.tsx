import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScrollFadeIn } from './ScrollFadeIn';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

describe('ScrollFadeIn', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ScrollFadeIn>Content</ScrollFadeIn>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <ScrollFadeIn>Visible content</ScrollFadeIn>
    );
    expect(getByText('Visible content')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <ScrollFadeIn className="custom-fade">Test</ScrollFadeIn>
    );
    expect(container.innerHTML).toContain('custom-fade');
  });
});
