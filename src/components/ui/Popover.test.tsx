import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';

describe('Popover', () => {
  it('renders the trigger button', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    expect(await screen.findByText('Popover body')).toBeInTheDocument();
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="my-popover">Styled content</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    const content = await screen.findByText('Styled content');
    expect(content.closest('[class*="my-popover"]')).toBeInTheDocument();
  });
});
