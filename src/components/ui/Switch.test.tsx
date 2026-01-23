import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';
import { describe, it, expect } from 'vitest';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="switch" />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeInTheDocument();
  });

  it('toggles state when clicked', () => {
    render(<Switch />);
    const switchEl = screen.getByRole('switch');
    
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    
    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'checked');
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
    
    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  it('can be disabled', () => {
    render(<Switch disabled />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeDisabled();
  });
});
