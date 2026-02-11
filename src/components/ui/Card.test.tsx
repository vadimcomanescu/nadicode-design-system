import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card disablePixelBackground>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card disablePixelBackground className="custom-card">Test</Card>);
    expect(container.firstChild).toHaveClass('custom-card');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} disablePixelBackground>Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders corner accent decorations', () => {
    const { container } = render(<Card disablePixelBackground>Accents</Card>);
    const accents = container.querySelectorAll('.border-primary\\/40');
    expect(accents.length).toBe(4);
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>H</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H3');
  });
});

describe('CardDescription', () => {
  it('renders as p', () => {
    render(<CardDescription>Desc</CardDescription>);
    expect(screen.getByText('Desc').tagName).toBe('P');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
