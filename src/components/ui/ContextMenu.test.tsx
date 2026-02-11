import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
} from './ContextMenu';

describe('ContextMenu', () => {
  function openContextMenu() {
    const trigger = screen.getByText('Right click me');
    fireEvent.contextMenu(trigger);
  }

  it('renders the trigger area', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(screen.getByText('Right click me')).toBeInTheDocument();
  });

  it('opens menu on right-click (contextmenu event)', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    openContextMenu();
    expect(screen.getByText('Cut')).toBeVisible();
    expect(screen.getByText('Copy')).toBeVisible();
    expect(screen.getByText('Paste')).toBeVisible();
  });

  it('renders labels and separators', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuSeparator data-testid="sep" />
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    openContextMenu();
    expect(screen.getByText('Edit')).toBeVisible();
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });

  it('renders shortcuts within items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    openContextMenu();
    expect(screen.getByText('Ctrl+C')).toBeVisible();
  });

  it('renders checkbox items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>
            Show Grid
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    openContextMenu();
    expect(screen.getByText('Show Grid')).toBeVisible();
  });

  it('has correct menu role when open', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    openContextMenu();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
