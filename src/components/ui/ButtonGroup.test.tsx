import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('applies inline-flex layout', () => {
    const { container } = render(<ButtonGroup>Buttons</ButtonGroup>);
    expect(container.firstChild).toHaveClass('inline-flex');
  });

  it('applies custom className', () => {
    const { container } = render(<ButtonGroup className="custom-group">G</ButtonGroup>);
    expect(container.firstChild).toHaveClass('custom-group');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ButtonGroup ref={ref}>R</ButtonGroup>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
