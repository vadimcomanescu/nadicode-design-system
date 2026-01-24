import * as React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../../lib/ThemeProvider';

type Theme = 'light' | 'dark' | 'system';

const themeOrder: Theme[] = ['system', 'light', 'dark'];

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels: Record<Theme, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System theme',
};

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className }, ref) => {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
      const currentIndex = themeOrder.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      setTheme(themeOrder[nextIndex]);
    };

    const Icon = themeIcons[theme];

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        className={className}
        aria-label={`Current theme: ${themeLabels[theme]}. Click to change.`}
      >
        <Icon className="h-5 w-5" />
      </Button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
