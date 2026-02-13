import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from './stepper';
import { Step } from './step';

describe('Step', () => {
  it('marks the active step title with primary text color', () => {
    render(
      <Stepper initialStep={1}>
        <Step index={0} title="Profile" />
        <Step index={1} title="Verification" />
      </Stepper>
    );

    expect(screen.getByText('Verification')).toHaveClass('text-primary');
    expect(screen.getByText('Profile')).not.toHaveClass('text-primary');
  });

  it('uses custom icon when provided and step is not completed', () => {
    render(
      <Stepper initialStep={0}>
        <Step
          index={1}
          title="Review"
          icon={<span data-testid="custom-step-icon">I</span>}
        />
      </Stepper>
    );

    expect(screen.getByTestId('custom-step-icon')).toBeInTheDocument();
  });

  it('respects explicit completed override', () => {
    render(
      <Stepper initialStep={2}>
        <Step index={0} title="Account" completed={false} />
      </Stepper>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
