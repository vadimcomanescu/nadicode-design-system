import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PixelBackground } from './PixelBackground';

describe('PixelBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<PixelBackground />);
    expect(container.firstChild).toBeTruthy();
  });

  it('is aria-hidden', () => {
    const { container } = render(<PixelBackground />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    const { container } = render(<PixelBackground className="custom-bg" />);
    expect(container.firstChild).toHaveClass('custom-bg');
  });

  it('renders with different themes', () => {
    const { container: c1 } = render(<PixelBackground theme="cyber" />);
    const { container: c2 } = render(<PixelBackground theme="encryption" />);
    const { container: c3 } = render(<PixelBackground theme="void" />);
    expect(c1.firstChild).toBeTruthy();
    expect(c2.firstChild).toBeTruthy();
    expect(c3.firstChild).toBeTruthy();
  });
});
