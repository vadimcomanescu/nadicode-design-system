import { createRef } from "react";
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    expect(container.firstChild).toHaveClass('h-4', 'w-32');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('contains shimmer animation element', () => {
    const { container } = render(<Skeleton />);
    const shimmer = container.querySelector('.animate-shimmer');
    expect(shimmer).toBeInTheDocument();
  });
});
