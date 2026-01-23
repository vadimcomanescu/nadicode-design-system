import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';
import * as React from 'react';

describe('Input', () => {
  it('renders input', () => {
    render(<Input placeholder="test input" />);
    expect(screen.getByPlaceholderText('test input')).toBeInTheDocument();
  });
  
  it('renders label', () => {
    render(<Input label="My Label" />);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });
  
  it('renders error message', () => {
    render(<Input error="Error Message" />);
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('renders start icon', () => {
    render(<Input startIcon={<span data-testid="start-icon">Icon</span>} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });
  
  it('renders end icon', () => {
     render(<Input endIcon={<span data-testid="end-icon">Icon</span>} />);
     expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });
  
   it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
