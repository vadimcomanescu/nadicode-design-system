import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from './Dialog';
import { describe, it, expect } from 'vitest';

describe('Dialog', () => {
  it('opens and closes correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <DialogClose>Close Dialog</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText('Open Dialog');
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    
    // Check for accessibility role
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    
    // Check title and description
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    
    // Test close button in footer
    const closeButton = screen.getByText('Close Dialog');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });

  it('can be controlled', () => {
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <button onClick={() => setOpen(true)}>Open</button>
          <DialogContent>
            <DialogTitle>Controlled Title</DialogTitle>
            <DialogDescription>Controlled Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
    };
    
    render(<ControlledDialog />);
    
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Controlled Title')).toBeInTheDocument();
    
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByText('Controlled Title')).not.toBeInTheDocument();
  });
});
