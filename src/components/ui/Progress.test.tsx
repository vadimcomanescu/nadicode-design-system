import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with role="progressbar"', () => {
    const { container } = render(<Progress value={50} />);
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Progress value={0} className="custom-progress" />);
    expect(container.querySelector('[role="progressbar"]')).toHaveClass('custom-progress');
  });

  it('renders indicator with correct transform for value', () => {
    const { container } = render(<Progress value={75} />);
    const indicator = container.querySelector('[role="progressbar"] > div');
    expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' });
  });

  it('handles zero value', () => {
    const { container } = render(<Progress value={0} />);
    const indicator = container.querySelector('[role="progressbar"] > div');
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });
});
