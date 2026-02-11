import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StaggerChildren } from './StaggerChildren';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

describe('StaggerChildren', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <StaggerChildren>
        <div>A</div>
        <div>B</div>
      </StaggerChildren>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders all children', () => {
    const { getByText } = render(
      <StaggerChildren>
        <div>First</div>
        <div>Second</div>
      </StaggerChildren>
    );
    expect(getByText('First')).toBeInTheDocument();
    expect(getByText('Second')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <StaggerChildren className="stagger-custom">
        <div>Child</div>
      </StaggerChildren>
    );
    expect(container.innerHTML).toContain('stagger-custom');
  });
});
