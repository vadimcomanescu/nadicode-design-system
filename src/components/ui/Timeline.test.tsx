import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';

const items = [
  { title: 'First event', description: 'Started', timestamp: '10:00' },
  { title: 'Second event', description: 'Completed', timestamp: '11:00' },
];

describe('Timeline', () => {
  it('renders all timeline items', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Started')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders timestamps', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Timeline items={items} className="custom-timeline" />);
    expect(container.firstChild).toHaveClass('custom-timeline');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Timeline ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with empty items array', () => {
    const { container } = render(<Timeline items={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
