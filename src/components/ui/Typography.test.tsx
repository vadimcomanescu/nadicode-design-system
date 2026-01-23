import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';
import { describe, it, expect } from 'vitest';

describe('Typography', () => {
  it('renders default body text', () => {
    render(<Typography>Hello World</Typography>);
    const text = screen.getByText('Hello World');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('leading-7');
  });

  it('renders h1 variant', () => {
    render(<Typography variant="h1">Title</Typography>);
    const text = screen.getByRole('heading', { level: 1 });
    expect(text).toHaveTextContent('Title');
    expect(text).toHaveClass('text-4xl');
  });

  it('renders h2 variant', () => {
    render(<Typography variant="h2">Subtitle</Typography>);
    const text = screen.getByRole('heading', { level: 2 });
    expect(text).toHaveTextContent('Subtitle');
    expect(text).toHaveClass('text-3xl');
  });

  it('renders h3 variant', () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    const text = screen.getByRole('heading', { level: 3 });
    expect(text).toHaveTextContent('Heading 3');
    expect(text).toHaveClass('text-2xl');
  });

  it('renders h4 variant', () => {
    render(<Typography variant="h4">Heading 4</Typography>);
    const text = screen.getByRole('heading', { level: 4 });
    expect(text).toHaveTextContent('Heading 4');
    expect(text).toHaveClass('text-xl');
  });

  it('renders small variant', () => {
    render(<Typography variant="small">Small Text</Typography>);
    const text = screen.getByText('Small Text');
    expect(text.tagName).toBe('SMALL');
    expect(text).toHaveClass('text-sm');
  });

  it('renders muted variant', () => {
    render(<Typography variant="muted">Muted Text</Typography>);
    const text = screen.getByText('Muted Text');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-text-tertiary');
  });

  it('renders custom element', () => {
    render(<Typography as="span">Span Text</Typography>);
    const text = screen.getByText('Span Text');
    expect(text.tagName).toBe('SPAN');
  });

  it('renders custom element with variant styles', () => {
    render(<Typography as="span" variant="h1">Styled Span</Typography>);
    const text = screen.getByText('Styled Span');
    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveClass('text-4xl');
  });
});
