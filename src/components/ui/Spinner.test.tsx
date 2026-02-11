import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with sr-only loading text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('has spin animation class', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('animate-spin');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="h-8 w-8" />);
    expect(container.firstChild).toHaveClass('h-8', 'w-8');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
