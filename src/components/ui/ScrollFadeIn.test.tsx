import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScrollFadeIn } from './ScrollFadeIn';
import { ThemeProvider } from '@/lib/ThemeProvider';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}

describe('ScrollFadeIn', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ScrollFadeIn>Content</ScrollFadeIn>,
      { wrapper: Wrapper }
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <ScrollFadeIn>Visible content</ScrollFadeIn>,
      { wrapper: Wrapper }
    );
    expect(getByText('Visible content')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <ScrollFadeIn className="custom-fade">Test</ScrollFadeIn>,
      { wrapper: Wrapper }
    );
    expect(container.innerHTML).toContain('custom-fade');
  });
});
