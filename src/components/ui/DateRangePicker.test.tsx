import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { DatePickerWithRange } from './DateRangePicker';

describe('DatePickerWithRange', () => {
  it('renders the trigger button showing a date range', () => {
    render(<DatePickerWithRange />);
    // Default date range: Jan 20 - Feb 09, 2023
    expect(screen.getByText(/Jan 20, 2023/)).toBeInTheDocument();
  });

  it('opens a calendar when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePickerWithRange />);

    await user.click(screen.getByRole('button', { name: /jan/i }));
    // Should show two months (numberOfMonths={2})
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBe(2);
  });

  it('has a calendar icon in the trigger', () => {
    const { container } = render(<DatePickerWithRange />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
