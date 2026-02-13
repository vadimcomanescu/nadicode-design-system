'use client'

import * as React from "react";
import { motion } from "motion/react";
import { useStyleMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SpringHoverProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  pressScale?: number;
  disabled?: boolean;
}

export const SpringHover = React.forwardRef<HTMLDivElement, SpringHoverProps>(
  ({ children, className, hoverScale = 1.03, pressScale = 0.95, disabled = false }, ref) => {
    const { spring, style } = useStyleMotion();

    if (disabled) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const hoverRotate = style === "bloom" ? 0.5 : 0;

    return (
      <motion.div
        ref={ref}
        className={cn("inline-block", className)}
        whileHover={{
          scale: hoverScale,
          rotate: hoverRotate,
          transition: spring.bouncy,
        }}
        whileTap={{
          scale: pressScale,
          rotate: 0,
          transition: spring.snappy,
        }}
      >
        {children}
      </motion.div>
    );
  }
);

SpringHover.displayName = "SpringHover";
