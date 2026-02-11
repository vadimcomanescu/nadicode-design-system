import { createRef } from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Alert>Default</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-surface');
  });

  it('applies destructive variant classes', () => {
    render(<Alert variant="destructive">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-destructive/50');
  });

  it('applies custom className', () => {
    render(<Alert className="custom-alert">Test</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref test</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('AlertTitle', () => {
  it('renders heading content', () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<AlertTitle ref={ref}>Title</AlertTitle>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe('AlertDescription', () => {
  it('renders description content', () => {
    render(<AlertDescription>Description text</AlertDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<AlertDescription ref={ref}>Desc</AlertDescription>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
