import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with content', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('starts in unpressed state by default', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off');
  });

  it('toggles pressed state on click', async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveAttribute('data-state', 'on');
    await user.click(button);
    expect(button).toHaveAttribute('data-state', 'off');
  });

  it('supports defaultPressed prop', () => {
    render(<Toggle aria-label="Bold" defaultPressed>B</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
  });

  it('supports disabled state', () => {
    render(<Toggle aria-label="Bold" disabled>B</Toggle>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies outline variant', () => {
    render(<Toggle aria-label="Bold" variant="outline">B</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border');
  });

  it('applies size variant', () => {
    render(<Toggle aria-label="Bold" size="sm">B</Toggle>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('h-8');
  });
});
