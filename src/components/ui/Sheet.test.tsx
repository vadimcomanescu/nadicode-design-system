import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './Sheet';

describe('Sheet', () => {
  it('renders the trigger', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Hidden Sheet</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.queryByText('Hidden Sheet')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    await user.click(screen.getByText('Open'));
    expect(await screen.findByText('Sheet Title')).toBeInTheDocument();
    expect(screen.getByText('Sheet description')).toBeInTheDocument();
  });

  it('renders header and footer sections', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Header Title</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <button>Save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
    await user.click(screen.getByText('Open'));
    expect(await screen.findByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders close button with sr-only label', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    await user.click(screen.getByText('Open'));
    await screen.findByText('Title');
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetClose>Done</SheetClose>
        </SheetContent>
      </Sheet>
    );
    await user.click(screen.getByText('Open'));
    await screen.findByText('Title');
    await user.click(screen.getByText('Done'));
    // After closing, the sheet content should disappear
    await expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });
});
