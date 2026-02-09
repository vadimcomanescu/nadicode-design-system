import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './lib/ThemeProvider';

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </MemoryRouter>
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

    expect(screen.getByText('Nadicode System')).toBeInTheDocument();
    expect(screen.getByText('Core Principles')).toBeInTheDocument();
    expect(screen.getByText('Synthetic AI Aesthetics')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    renderApp();
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });
});
