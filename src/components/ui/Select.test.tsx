import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from './Select';
import { describe, it, expect } from 'vitest';

// Needed for Radix UI Select to work in JSDOM
// https://github.com/radix-ui/primitives/issues/1220#issuecomment-1126785647
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.HTMLElement.prototype.scrollIntoView = (() => {}) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.HTMLElement.prototype.releasePointerCapture = (() => {}) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.HTMLElement.prototype.hasPointerCapture = (() => false) as any;

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

    const trigger = screen.getByLabelText('Food');
    expect(screen.getByText('Select a food')).toBeInTheDocument();

    // Open select
    fireEvent.pointerDown(trigger, { pointerType: 'mouse' });

    // Check items are visible
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();

    // Select an item
    const appleItem = screen.getByText('Apple');
    // We need to use pointer events for Radix Select
    fireEvent.click(appleItem);

    // Check value updated
    expect(screen.getByText('Apple')).toBeInTheDocument();
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

  it('handles disabled items', () => {
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

    const option2 = screen.getByRole('option', { name: 'Option 2' });
    // Radix UI sets data-disabled on disabled items and aria-disabled
    expect(option2).toHaveAttribute('data-disabled');
    expect(option2).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders groups and separators', () => {
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

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByTestId('select-separator')).toBeInTheDocument();
  });
});
