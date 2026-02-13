'use client'

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface Trash2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Trash2IconProps extends HTMLAttributes<HTMLDivElement> {
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

const Trash2Icon = forwardRef<Trash2IconHandle, Trash2IconProps>(
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
          <motion.path animate={controls} d="M3 6h18" initial="normal" variants={PATH_VARIANTS} />
          <motion.path animate={controls} d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.4, delay: 0.1, ease: "linear", opacity: { duration: 0.1, delay: 0.1 } } } }} />
          <motion.path animate={controls} d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.4, delay: 0.2, ease: "linear", opacity: { duration: 0.1, delay: 0.2 } } } }} />
          <motion.path animate={controls} d="M10 11v6" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.3, delay: 0.4, ease: "linear", opacity: { duration: 0.1, delay: 0.4 } } } }} />
          <motion.path animate={controls} d="M14 11v6" initial="normal" variants={{ ...PATH_VARIANTS, animate: { ...PATH_VARIANTS.animate, transition: { duration: 0.3, delay: 0.5, ease: "linear", opacity: { duration: 0.1, delay: 0.5 } } } }} />
        </svg>
      </div>
    );
  }
);

Trash2Icon.displayName = "Trash2Icon";

export { Trash2Icon };
