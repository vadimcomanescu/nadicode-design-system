import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription } from './Empty';

describe('Empty', () => {
  it('renders children', () => {
    render(<Empty>No data</Empty>);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Empty className="custom-empty">Test</Empty>);
    expect(container.firstChild).toHaveClass('custom-empty');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Empty ref={ref}>Ref</Empty>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('EmptyIcon', () => {
  it('renders children', () => {
    render(<EmptyIcon>icon</EmptyIcon>);
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyIcon ref={ref}>I</EmptyIcon>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('EmptyTitle', () => {
  it('renders as h3', () => {
    render(<EmptyTitle>Nothing here</EmptyTitle>);
    expect(screen.getByText('Nothing here').tagName).toBe('H3');
  });
});

describe('EmptyDescription', () => {
  it('renders as p', () => {
    render(<EmptyDescription>Try again</EmptyDescription>);
    expect(screen.getByText('Try again').tagName).toBe('P');
  });
});
