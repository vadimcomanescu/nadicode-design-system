import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  it('renders group items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a" aria-label="Option A">A</ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Option B">B</ToggleGroupItem>
        <ToggleGroupItem value="c" aria-label="Option C">C</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('selects item on click in single mode', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByText('A'));
    expect(screen.getByText('A').closest('button')).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('B').closest('button')).toHaveAttribute('data-state', 'off');
  });

  it('only allows one selection in single mode', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByText('A'));
    await user.click(screen.getByText('B'));
    expect(screen.getByText('A').closest('button')).toHaveAttribute('data-state', 'off');
    expect(screen.getByText('B').closest('button')).toHaveAttribute('data-state', 'on');
  });

  it('allows multiple selections in multiple mode', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByText('A'));
    await user.click(screen.getByText('B'));
    expect(screen.getByText('A').closest('button')).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('B').closest('button')).toHaveAttribute('data-state', 'on');
  });

  it('supports defaultValue in single mode', () => {
    render(
      <ToggleGroup type="single" defaultValue="b">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('B').closest('button')).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('A').closest('button')).toHaveAttribute('data-state', 'off');
  });

  it('applies custom className', () => {
    render(
      <ToggleGroup type="single" className="custom-group">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(document.querySelector('.custom-group')).toBeInTheDocument();
  });
});
