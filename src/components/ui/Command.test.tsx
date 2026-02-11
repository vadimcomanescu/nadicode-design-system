import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';

describe('Command', () => {
  function renderCommand() {
    return render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Fruits">
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
            <CommandItem>Cherry</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }

  it('renders the search input with placeholder', () => {
    renderCommand();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders all command items', () => {
    renderCommand();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('renders group heading', () => {
    renderCommand();
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('filters items based on search input', async () => {
    const user = userEvent.setup();
    renderCommand();

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'app');

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('shows empty state when no items match', async () => {
    const user = userEvent.setup();
    renderCommand();

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'zzzzz');

    expect(screen.getByText('No results found.')).toBeVisible();
  });

  it('renders separator between groups', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Group 1">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
          <CommandSeparator data-testid="separator" />
          <CommandGroup heading="Group 2">
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('renders shortcut text', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>
              Settings
              <CommandShortcut>Ctrl+S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });
});
