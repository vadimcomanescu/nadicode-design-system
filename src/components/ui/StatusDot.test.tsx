import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('renders with role="status"', () => {
    render(<StatusDot />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('defaults to offline status with aria-label', () => {
    render(<StatusDot />);
    expect(screen.getByLabelText('offline')).toBeInTheDocument();
  });

  it('applies online status classes', () => {
    render(<StatusDot status="online" />);
    expect(screen.getByRole('status')).toHaveClass('bg-success');
  });

  it('applies busy status classes', () => {
    render(<StatusDot status="busy" />);
    expect(screen.getByRole('status')).toHaveClass('bg-warning');
  });

  it('applies dnd status classes', () => {
    render(<StatusDot status="dnd" />);
    expect(screen.getByRole('status')).toHaveClass('bg-destructive');
  });

  it('applies size variant', () => {
    render(<StatusDot size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('size-3');
  });

  it('applies custom className', () => {
    render(<StatusDot className="custom-dot" />);
    expect(screen.getByRole('status')).toHaveClass('custom-dot');
  });
});
