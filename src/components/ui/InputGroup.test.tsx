import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputGroup, InputGroupAddon } from './InputGroup';

describe('InputGroup', () => {
  it('renders children', () => {
    render(<InputGroup>Group content</InputGroup>);
    expect(screen.getByText('Group content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<InputGroup className="custom-group">Test</InputGroup>);
    expect(container.firstChild).toHaveClass('custom-group');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<InputGroup ref={ref}>Ref</InputGroup>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('InputGroupAddon', () => {
  it('renders addon content', () => {
    render(<InputGroupAddon>$</InputGroupAddon>);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<InputGroupAddon ref={ref}>@</InputGroupAddon>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
