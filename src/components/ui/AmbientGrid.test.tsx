import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AmbientGrid } from './AmbientGrid';

describe('AmbientGrid', () => {
  it('renders without crashing', () => {
    const { container } = render(<AmbientGrid />);
    expect(container.firstChild).toBeTruthy();
  });

  it('is aria-hidden for accessibility', () => {
    const { container } = render(<AmbientGrid />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    const { container } = render(<AmbientGrid className="custom-grid" />);
    expect(container.firstChild).toHaveClass('custom-grid');
  });

  it('uses default cellSize of 24', () => {
    const { container } = render(<AmbientGrid />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.backgroundSize).toBe('24px 24px');
  });

  it('accepts custom cellSize', () => {
    const { container } = render(<AmbientGrid cellSize={32} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.backgroundSize).toBe('32px 32px');
  });
});
