'use client'

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface Code2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Code2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: "linear", opacity: { duration: 0.1 } },
  },
};

const Code2Icon = forwardRef<Code2IconHandle, Code2IconProps>(
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
          <motion.path animate={controls} d="m18 16 4-4-4-4" initial="normal" variants={PATH_VARIANTS} />
          <motion.path animate={controls} d="m6 8-4 4 4 4" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.4, ease: "linear", delay: 0.15, opacity: { duration: 0.1, delay: 0.15 } } } }} />
          <motion.path animate={controls} d="m14.5 4-5 16" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.4, ease: "linear", delay: 0.3, opacity: { duration: 0.1, delay: 0.3 } } } }} />
        </svg>
      </div>
    );
  }
);

Code2Icon.displayName = "Code2Icon";

export { Code2Icon };
