'use client'

import * as React from 'react';
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useTheme } from "../../lib/ThemeProvider";
import { SunIcon } from "@/components/ui/icons/sun";
import { MoonIcon } from "@/components/ui/icons/moon";

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className }, ref) => {
    const { setTheme, style } = useTheme();
    const isBloom = style === 'bloom';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            ref={ref}
            className={className}
            disabled={isBloom}
            title={isBloom ? 'Theme locked to light in Bloom style' : 'Toggle theme'}
          >
            <SunIcon size={19} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon size={19} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} disabled={isBloom}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} disabled={isBloom}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
