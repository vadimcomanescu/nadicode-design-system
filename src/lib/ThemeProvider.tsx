/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
type Style = 'arctic' | 'bloom';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultStyle?: Style;
  storageKey?: string;
  styleStorageKey?: string;
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  style: Style;
  setTheme: (theme: Theme) => void;
  setStyle: (style: Style) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme, style: Style): ResolvedTheme {
  // Bloom is light-only
  if (style === 'bloom') return 'light';
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultStyle = 'arctic',
  storageKey = 'design-system-theme',
  styleStorageKey = 'design-system-style',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return defaultTheme;
  });

  const [style, setStyleState] = React.useState<Style>(() => {
    if (typeof window === 'undefined') return defaultStyle;
    const stored = localStorage.getItem(styleStorageKey);
    if (stored === 'arctic' || stored === 'bloom') {
      return stored;
    }
    return defaultStyle;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
    resolveTheme(theme, style)
  );

  // Apply theme and style classes to document
  React.useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveTheme(theme, style);

    root.classList.remove('light', 'dark', 'bloom');
    root.classList.add(resolved);
    if (style === 'bloom') {
      root.classList.add('bloom');
    }
    setResolvedTheme(resolved);
  }, [theme, style]);

  // Listen for system theme changes when theme is 'system'
  React.useEffect(() => {
    if (theme !== 'system' || style === 'bloom') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const resolved = getSystemTheme();
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      setResolvedTheme(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, style]);

  const setTheme = React.useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  }, [storageKey]);

  const setStyle = React.useCallback((newStyle: Style) => {
    localStorage.setItem(styleStorageKey, newStyle);
    setStyleState(newStyle);
  }, [styleStorageKey]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, style, setTheme, setStyle }),
    [theme, resolvedTheme, style, setTheme, setStyle]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export type { Theme, ResolvedTheme, Style, ThemeContextValue };
