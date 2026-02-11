import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/ThemeProvider';
import { Snowflake, Sun } from 'lucide-react';

export interface StyleToggleProps {
  className?: string;
}

export const StyleToggle = React.forwardRef<HTMLDivElement, StyleToggleProps>(
  ({ className }, ref) => {
    const { style, setStyle } = useTheme();

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border border-border p-0.5 gap-0.5 bg-surface',
          className
        )}
        role="radiogroup"
        aria-label="Design style"
      >
        <button
          role="radio"
          aria-checked={style === 'arctic'}
          onClick={() => setStyle('arctic')}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
            style === 'arctic'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          <Snowflake size={14} />
          Arctic
        </button>
        <button
          role="radio"
          aria-checked={style === 'bloom'}
          onClick={() => setStyle('bloom')}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
            style === 'bloom'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          <Sun size={14} />
          Bloom
        </button>
      </div>
    );
  }
);

StyleToggle.displayName = 'StyleToggle';
