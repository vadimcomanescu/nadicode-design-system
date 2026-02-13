'use client'

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface DotIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DotIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DotIcon = forwardRef<DotIconHandle, DotIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) { onMouseEnter?.(e); } else { controls.start("animate"); }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) { onMouseLeave?.(e); } else { controls.start("normal"); }
      },
      [controls, onMouseLeave]
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            animate={controls}
            cx="12.1"
            cy="12.1"
            r="1"
            initial="normal"
            variants={{
              normal: { scale: 1, opacity: 1 },
              animate: {
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1],
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  }
);

DotIcon.displayName = "DotIcon";

export { DotIcon };
