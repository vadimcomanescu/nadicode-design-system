'use client'

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/ThemeProvider';
import { SnowflakeIcon } from '@/components/ui/icons/snowflake';
import { SunIcon } from '@/components/ui/icons/sun';

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
          'inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1',
          className
        )}
        role="radiogroup"
        aria-label="Design style"
      >
        <button
          role="radio"
          aria-checked={style === 'arctic'}
          onClick={() => setStyle('arctic')}
          aria-label="Select arctic style"
          className={cn(
            'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-all sm:px-3.5 sm:text-sm',
            style === 'arctic'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          <SnowflakeIcon size={14} />
          <span className="sm:hidden">Arc</span>
          <span className="hidden sm:inline">Arctic</span>
        </button>
        <button
          role="radio"
          aria-checked={style === 'bloom'}
          onClick={() => setStyle('bloom')}
          aria-label="Select bloom style"
          className={cn(
            'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-all sm:px-3.5 sm:text-sm',
            style === 'bloom'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          <SunIcon size={14} />
          <span className="sm:hidden">Blo</span>
          <span className="hidden sm:inline">Bloom</span>
        </button>
      </div>
    );
  }
);

StyleToggle.displayName = 'StyleToggle';
