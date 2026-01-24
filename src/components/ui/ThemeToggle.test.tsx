import { render, screen, act } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../lib/ThemeProvider';
import { describe, it, expect, beforeEach, vi } from 'vitest';

function renderWithTheme(defaultTheme: 'light' | 'dark' | 'system' = 'system') {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
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

  it('renders as a button', () => {
    renderWithTheme();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light mode'));
  });

  it('cycles through themes on click: system -> light -> dark -> system', () => {
    renderWithTheme('system');
    const button = screen.getByRole('button');

    // Initial state: system
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('System theme'));

    // Click 1: system -> light
    act(() => {
      button.click();
    });
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light mode'));
    expect(localStorage.getItem('design-system-theme')).toBe('light');

    // Click 2: light -> dark
    act(() => {
      button.click();
    });
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark mode'));
    expect(localStorage.getItem('design-system-theme')).toBe('dark');

    // Click 3: dark -> system
    act(() => {
      button.click();
    });
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('System theme'));
    expect(localStorage.getItem('design-system-theme')).toBe('system');
  });

  it('is keyboard accessible', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('tabIndex', '-1');
  });

  it('accepts custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
