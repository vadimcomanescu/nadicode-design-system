import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { ArrowRightIcon } from '@/components/ui/icons';

describe('Utility Libraries', () => {
  it('class-variance-authority works', () => {
    const button = cva('base', {
      variants: {
        intent: {
          primary: 'bg-primary',
          secondary: 'bg-muted',
        },
      },
      defaultVariants: {
        intent: 'primary',
      },
    });

    expect(button({ intent: 'secondary' })).toContain('bg-muted');
    expect(button()).toContain('bg-primary');
  });

  it('radix-ui/react-slot works', () => {
    render(
      <Slot data-testid="slot">
        <div>Content</div>
      </Slot>
    );
    const element = screen.getByTestId('slot');
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Content');
  });

  it('lucide-react renders icons', () => {
    const { container } = render(<ArrowRightIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
