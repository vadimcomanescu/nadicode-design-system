import { render, screen } from '@testing-library/react';
import { Separator } from './Separator';
import { describe, it, expect } from 'vitest';

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('h-[1px] w-full');
  });

  it('renders vertical separator', () => {
    render(<Separator orientation="vertical" data-testid="separator-vertical" />);
    const separator = screen.getByTestId('separator-vertical');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('h-full w-[1px]');
  });
});
