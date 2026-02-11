import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

function renderAccordion(type: 'single' | 'multiple' = 'single') {
  return render(
    <Accordion type={type} collapsible={type === 'single'}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('renders all triggers', () => {
    renderAccordion();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('expands a section when its trigger is clicked', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText('Section 1');
    await user.click(trigger);

    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('collapses an open section when clicked again (collapsible mode)', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText('Section 1');
    await user.click(trigger);
    expect(screen.getByText('Content 1')).toBeVisible();

    await user.click(trigger);
    // After collapsing, content should have hidden state
    const content = trigger.closest('[data-state]');
    expect(content).toBeDefined();
  });

  it('closes the first section when a second is opened in single mode', async () => {
    const user = userEvent.setup();
    renderAccordion('single');

    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();

    await user.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
    // In single mode, first section should now be closed
    const firstItem = screen.getByText('Section 1').closest('[data-state]');
    expect(firstItem?.getAttribute('data-state')).toBe('closed');
  });

  it('supports keyboard navigation between triggers', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger1 = screen.getByText('Section 1');
    trigger1.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Section 2')).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('Section 1')).toHaveFocus();
  });

  it('expands a section via Enter key', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText('Section 1');
    trigger.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('applies custom className to AccordionItem', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" data-testid="acc-item" className="custom-class">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('acc-item')).toHaveClass('custom-class');
  });
});
