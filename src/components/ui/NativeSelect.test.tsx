import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NativeSelect } from './NativeSelect';

describe('NativeSelect', () => {
  it('renders a select element', () => {
    render(
      <NativeSelect aria-label="Choose">
        <option value="a">A</option>
        <option value="b">B</option>
      </NativeSelect>
    );
    expect(screen.getByLabelText('Choose')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose').tagName).toBe('SELECT');
  });

  it('renders options', () => {
    render(
      <NativeSelect>
        <option value="x">Option X</option>
      </NativeSelect>
    );
    expect(screen.getByText('Option X')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NativeSelect className="custom-select" />);
    expect(container.firstChild).toHaveClass('custom-select');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<NativeSelect ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('supports disabled state', () => {
    render(<NativeSelect disabled aria-label="Disabled select" />);
    expect(screen.getByLabelText('Disabled select')).toBeDisabled();
  });
});
