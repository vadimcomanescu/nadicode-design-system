import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from './Dialog';
import { describe, it, expect } from 'vitest';

describe('Dialog', () => {
  it('opens and closes correctly', async () => {
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

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    await screen.findByRole('dialog');
    
    // Check title and description
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    
    // Test close button in footer
    const closeButton = screen.getByRole('button', { name: 'Close Dialog' });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('can be controlled', async () => {
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
    
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await screen.findByRole('dialog');
    expect(screen.getByText('Controlled Title')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
