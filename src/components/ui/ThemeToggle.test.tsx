import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders as a button with accessible name', () => {
    renderWithTheme();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('opens dropdown menu on click', async () => {
    const user = userEvent.setup();
    renderWithTheme();
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('sets theme to light when Light option is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme('dark');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    await user.click(screen.getByText('Light'));
    expect(localStorage.getItem('design-system-theme')).toBe('light');
  });

  it('is keyboard accessible', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).not.toHaveAttribute('tabIndex', '-1');
  });

  it('accepts custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('custom-class');
  });
});
