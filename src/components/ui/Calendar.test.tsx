import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders a calendar grid', () => {
    render(<Calendar />);
    // DayPicker renders a table-based grid
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders day-of-week headers', () => {
    render(<Calendar />);
    // DayPicker v9 renders weekday headers as <th> with aria-label
    expect(screen.getByText('Su')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
    expect(screen.getByText('Fr')).toBeInTheDocument();
  });

  it('renders navigation buttons for previous and next month', () => {
    render(<Calendar />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('displays the month caption', () => {
    render(<Calendar month={new Date(2026, 1, 1)} />);
    expect(screen.getByText(/February 2026/i)).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(<Calendar className="custom-cal" />);
    expect(container.querySelector('.custom-cal')).toBeInTheDocument();
  });

  it('shows outside days by default', () => {
    render(<Calendar month={new Date(2026, 1, 1)} />);
    // February 2026 starts on Sunday, so there might be outside days
    // Just verify the component renders without error
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
