import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the design system showcase', () => {
    render(<App />);
    
    // Check for main header
    expect(screen.getByText('Design System 2026')).toBeInTheDocument();
    
    // Check for section headers
    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Buttons')).toBeInTheDocument();
    expect(screen.getByText('Forms & Controls')).toBeInTheDocument();
    expect(screen.getByText('Dialogs')).toBeInTheDocument();
    expect(screen.getByText('Separators')).toBeInTheDocument();
    expect(screen.getByText('Cards & Glassmorphism')).toBeInTheDocument();
    
    // Check for specific components
    expect(screen.getByText('Primary Action')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms and conditions')).toBeInTheDocument();
    expect(screen.getByLabelText('Airplane Mode')).toBeInTheDocument();
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });
});
