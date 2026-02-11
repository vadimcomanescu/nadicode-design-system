import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radio buttons', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
  });

  it('selects default value', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option A')).toBeChecked();
    expect(screen.getByLabelText('Option B')).not.toBeChecked();
  });

  it('changes selection on click', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText('Option B'));
    expect(screen.getByLabelText('Option B')).toBeChecked();
    expect(screen.getByLabelText('Option A')).not.toBeChecked();
  });

  it('supports disabled state', () => {
    render(
      <RadioGroup defaultValue="a" disabled>
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option A')).toBeDisabled();
    expect(screen.getByLabelText('Option B')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <RadioGroup defaultValue="a" className="custom-group">
        <RadioGroupItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(document.querySelector('.custom-group')).toBeInTheDocument();
  });
});
