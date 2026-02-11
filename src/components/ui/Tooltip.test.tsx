import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip content by default', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Hidden text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip content when open is controlled', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Visible tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Focus me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip on focus</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    await user.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('applies custom className to content', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Styled</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(document.querySelector('.custom-tooltip')).toBeInTheDocument();
  });
});
