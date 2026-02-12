'use client'

import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 md:px-6 lg:px-8",
          !fluid && "max-w-7xl",
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = 'md', ...props }, ref) => {
    const colsClass = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
    };

    const gapClass = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-12",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", colsClass[cols], gapClass[gap], className)}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";
