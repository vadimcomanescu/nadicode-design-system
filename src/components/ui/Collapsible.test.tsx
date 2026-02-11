import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';

describe('Collapsible', () => {
  it('renders the trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('hides content by default when not open', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows content when open is true', () => {
    render(
      <Collapsible open>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText('Visible content')).toBeVisible();
  });

  it('toggles content visibility on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await user.click(screen.getByText('Toggle'));
    expect(screen.getByText('Content')).toBeVisible();

    await user.click(screen.getByText('Toggle'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('supports keyboard activation with Enter', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    screen.getByText('Toggle').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Content')).toBeVisible();
  });

  it('supports keyboard activation with Space', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    screen.getByText('Toggle').focus();
    await user.keyboard(' ');
    expect(screen.getByText('Content')).toBeVisible();
  });
});
