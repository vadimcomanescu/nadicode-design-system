import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders a kbd element with content', () => {
    render(<Kbd>Ctrl</Kbd>);
    const kbd = screen.getByText('Ctrl');
    expect(kbd).toBeInTheDocument();
    expect(kbd.tagName).toBe('KBD');
  });

  it('applies custom className', () => {
    render(<Kbd className="custom-kbd">K</Kbd>);
    expect(screen.getByText('K')).toHaveClass('custom-kbd');
  });

  it('renders multiple key labels', () => {
    render(
      <div>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </div>
    );
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
