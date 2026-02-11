import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with default role', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('sets initial value via defaultValue', () => {
    render(<Slider defaultValue={[75]} max={100} step={1} aria-label="Volume" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('respects min and max constraints', () => {
    render(<Slider defaultValue={[25]} min={10} max={90} step={1} aria-label="Range" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('supports disabled state', () => {
    render(<Slider defaultValue={[50]} disabled aria-label="Disabled" />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled', '');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Slider defaultValue={[50]} className="custom-slider" aria-label="Custom" />
    );
    expect(container.querySelector('.custom-slider')).toBeInTheDocument();
  });
});
