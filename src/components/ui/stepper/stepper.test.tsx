import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper, useStepper } from './stepper';

function StepperProbe() {
  const { activeStep, nextStep, prevStep, setSteps, setActiveStep } = useStepper();

  React.useEffect(() => {
    setSteps(3);
  }, [setSteps]);

  return (
    <div>
      <p>Active: {activeStep}</p>
      <button type="button" onClick={nextStep}>
        Next
      </button>
      <button type="button" onClick={prevStep}>
        Prev
      </button>
      <button type="button" onClick={() => setActiveStep(1)}>
        Set One
      </button>
    </div>
  );
}

describe('Stepper', () => {
  it('uses vertical orientation classes when requested', () => {
    render(
      <Stepper orientation="vertical" data-testid="stepper">
        <div>Step content</div>
      </Stepper>
    );

    expect(screen.getByTestId('stepper')).toHaveClass('flex-col');
  });

  it('handles next/prev within configured step bounds', async () => {
    const user = userEvent.setup();

    render(
      <Stepper initialStep={1}>
        <StepperProbe />
      </Stepper>
    );

    expect(screen.getByText('Active: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Active: 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Active: 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Prev' }));
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
  });

  it('invokes onStepChange in controlled mode', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={2} onStepChange={onStepChange}>
        <StepperProbe />
      </Stepper>
    );

    expect(screen.getByText('Active: 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Set One' }));
    expect(onStepChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
  });
});
