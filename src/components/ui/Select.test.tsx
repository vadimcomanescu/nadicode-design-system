import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from './Select';
import { describe, it, expect } from 'vitest';

describe('Select', () => {
  it('opens and selects an item', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="Food">
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const combobox = screen.getByRole('combobox', { name: 'Food' });
    expect(combobox).toHaveTextContent('Select a food');

    // Open select
    fireEvent.pointerDown(combobox, { pointerType: 'mouse' });

    await screen.findByRole('listbox');

    // Check items are visible
    const appleOption = await screen.findByRole('option', { name: 'Apple' });
    const bananaOption = await screen.findByRole('option', { name: 'Banana' });
    expect(appleOption).toBeInTheDocument();
    expect(bananaOption).toBeInTheDocument();

    // Select an item
    fireEvent.click(appleOption);

    // Check value updated
    await waitFor(() => {
      expect(combobox).toHaveTextContent('Apple');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('renders with placeholder when no value is selected', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select something" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByText('Select something')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('handles disabled items', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2" disabled>Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.pointerDown(trigger, { pointerType: 'mouse' });

    await screen.findByRole('listbox');

    const option2 = screen.getByRole('option', { name: 'Option 2' });
    // Radix UI sets data-disabled on disabled items and aria-disabled
    expect(option2).toHaveAttribute('data-disabled');
    expect(option2).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders groups and separators', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectGroup>
          <SelectSeparator data-testid="select-separator" />
          <SelectGroup>
            <SelectLabel>Group 2</SelectLabel>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.pointerDown(trigger, { pointerType: 'mouse' });

    await screen.findByRole('listbox');

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByTestId('select-separator')).toBeInTheDocument();
  });
});
