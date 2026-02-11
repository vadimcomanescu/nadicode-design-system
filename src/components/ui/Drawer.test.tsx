import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';

describe('Drawer', () => {
  it('renders the trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description.</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByText('Open Drawer')).toBeInTheDocument();
  });

  it('opens drawer when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    await user.click(screen.getByText('Open Drawer'));
    expect(screen.getByText('Title')).toBeVisible();
    expect(screen.getByText('Description')).toBeVisible();
  });

  it('renders header and footer sections', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader data-testid="header">
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter data-testid="footer">
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders a drag handle inside drawer content', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Desc</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    await user.click(screen.getByText('Open'));
    // The drawer content includes a drag handle div with rounded-full class
    // Portaled content is outside RTL container, so search document.body
    const handle = document.body.querySelector('[class*="rounded-full"]');
    expect(handle).toBeInTheDocument();
  });
});
