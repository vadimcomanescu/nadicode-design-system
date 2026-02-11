import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Combobox } from './Combobox';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Combobox', () => {
  it('renders with placeholder text', () => {
    render(<Combobox options={options} placeholder="Pick a fruit..." />);
    expect(screen.getByText('Pick a fruit...')).toBeInTheDocument();
  });

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Apple')).toBeVisible();
    expect(screen.getByText('Banana')).toBeVisible();
    expect(screen.getByText('Cherry')).toBeVisible();
  });

  it('selects an option and closes the dropdown', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banana'));

    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls onValueChange when an option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Combobox options={options} onValueChange={handleChange} />);

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Cherry'));

    expect(handleChange).toHaveBeenCalledWith('cherry');
  });

  it('has combobox role on the trigger', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows empty text when search has no results', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} emptyText="Nothing here." />);

    await user.click(screen.getByRole('combobox'));
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'zzzzz');

    expect(screen.getByText('Nothing here.')).toBeVisible();
  });
});
