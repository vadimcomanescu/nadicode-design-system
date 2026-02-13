'use client'

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { motionSpring } from '@/lib/motion';
import { PixelBackground } from './PixelBackground';
import type { PixelTheme } from './PixelBackground';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  pixelTheme?: PixelTheme;
  disablePixelBackground?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, pixelTheme, disablePixelBackground = false, children, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const useSpring = interactive && !prefersReduced;

    const interactiveCss = interactive
      ? "transition-colors duration-fast hover:border-primary/50 hover:shadow-xl/20"
      : "";

    const classes = cn(
      "group relative rounded-lg p-6 overflow-hidden",
      "glass-panel",
      interactiveCss,
      className
    );

    const inner = (
      <>
        {!disablePixelBackground && <PixelBackground theme={pixelTheme} />}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
        <div className="relative z-20">
          {children}
        </div>
      </>
    );

    if (useSpring) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          whileHover={{ y: -2 }}
          transition={motionSpring.snappy}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
        >
          {inner}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {inner}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />
))
CardFooter.displayName = "CardFooter"
