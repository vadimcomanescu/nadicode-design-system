import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { describe, it, expect } from 'vitest';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('toggles state when clicked', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
