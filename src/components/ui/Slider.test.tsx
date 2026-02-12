import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with default role', () => {
    render(<Slider label="Volume" defaultValue={50} max={100} step={1} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('sets initial value via defaultValue', () => {
    render(<Slider label="Volume" defaultValue={75} max={100} step={1} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('respects min and max constraints', () => {
    render(<Slider label="Range" defaultValue={25} min={10} max={90} step={1} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('supports disabled state', () => {
    render(<Slider label="Disabled" defaultValue={50} disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled', '');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Slider label="Custom" defaultValue={50} className="custom-slider" />
    );
    expect(container.querySelector('.custom-slider')).toBeInTheDocument();
  });
});
