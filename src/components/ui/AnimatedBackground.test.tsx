import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedBackground } from './AnimatedBackground';

describe('AnimatedBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedBackground />);
    expect(container.firstChild).toBeTruthy();
  });

  it('accepts custom className', () => {
    const { container } = render(<AnimatedBackground className="custom-animated" />);
    expect(container.firstChild).toHaveClass('custom-animated');
  });
});
