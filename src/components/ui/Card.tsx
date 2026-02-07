import React from 'react';
import { cn } from '../../lib/utils';
import { PixelBackground } from './PixelBackground';
import type { PixelTheme } from './PixelBackground';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  pixelTheme?: PixelTheme;
  disablePixelBackground?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, pixelTheme = "cyber", disablePixelBackground = false, ...props }, ref) => {

    const interactiveStyles = interactive
      ? "transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-lg p-6 overflow-hidden",
          "glass-panel", // Restored premium glass effect (emboss, shadows, noise)
          interactiveStyles,
          className
        )}
        {...props}
      >
        {/* Mandated Pixel Background - Super Mega Futuristic */}
        {!disablePixelBackground && <PixelBackground theme={pixelTheme} />}

        {/* Mandated Corner Accents - Kept crisp */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />

        <div className="relative z-20">
          {props.children}
        </div>
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
