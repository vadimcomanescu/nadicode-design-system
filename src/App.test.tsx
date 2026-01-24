import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './lib/ThemeProvider';

function renderApp() {
  return render(
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  );
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));
  });

  it('renders the design system showcase', () => {
    renderApp();

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

  it('renders the theme toggle', () => {
    renderApp();
    const themeToggle = screen.getByRole('button', { name: /theme/i });
    expect(themeToggle).toBeInTheDocument();
  });
});
