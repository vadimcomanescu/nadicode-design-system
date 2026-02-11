import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText('Type here');
    await user.type(textarea, 'Hello world');
    expect(textarea).toHaveValue('Hello world');
  });

  it('renders with a label when provided', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('associates label with textarea', () => {
    render(<Textarea label="Bio" />);
    const label = screen.getByText('Bio');
    const textarea = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', textarea.id);
  });

  it('displays error message when error is a string', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when error is true', () => {
    render(<Textarea error={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toContain('border-destructive');
  });

  it('supports disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies size variant', () => {
    render(<Textarea size="lg" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toContain('min-h-[120px]');
  });
});
