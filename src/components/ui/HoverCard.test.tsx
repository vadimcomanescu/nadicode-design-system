import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard';

describe('HoverCard', () => {
  it('renders the trigger', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    );
    expect(screen.queryByText('Card content')).not.toBeInTheDocument();
  });

  it('shows content when open is controlled', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className to content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent className="custom-class">Card content</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Card content').closest('[class*="custom-class"]')).toBeInTheDocument();
  });
});
