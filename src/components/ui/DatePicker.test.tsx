import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders the trigger button with placeholder', () => {
    render(<DatePicker />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('opens calendar when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByText('Pick a date'));
    expect(screen.getByRole('grid')).toBeVisible();
  });

  it('selects a date and displays it in the trigger', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByText('Pick a date'));
    // Click on the 15th of the current month
    const dayButtons = screen.getAllByRole('gridcell');
    const day15 = dayButtons.find((cell) => cell.textContent === '15');
    expect(day15).toBeDefined();

    const button = day15!.querySelector('button');
    if (button) {
      await user.click(button);
    } else {
      await user.click(day15!);
    }

    // After selection, the placeholder should be replaced with a date string
    expect(screen.queryByText('Pick a date')).not.toBeInTheDocument();
  });

  it('has a calendar icon in the trigger', () => {
    const { container } = render(<DatePicker />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
