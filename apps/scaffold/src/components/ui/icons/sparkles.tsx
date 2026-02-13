'use client'

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPARKLE_VARIANTS: Variants = {
  normal: { y: 0, fill: "none" },
  animate: {
    y: [0, -2, 0],
    fill: ["none", "currentColor", "none"],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const STAR_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.4, 1],
    scale: [1, 0.8, 1],
    transition: { delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 },
  },
};

const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const sparkleControls = useAnimation();
    const starControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { sparkleControls.start("animate"); starControls.start("animate"); },
        stopAnimation: () => { sparkleControls.start("normal"); starControls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) { sparkleControls.start("animate"); starControls.start("animate"); }
        onMouseEnter?.(e);
      },
      [sparkleControls, starControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) { sparkleControls.start("normal"); starControls.start("normal"); }
        onMouseLeave?.(e);
      },
      [sparkleControls, starControls, onMouseLeave]
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
          <motion.path animate={sparkleControls} d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" variants={SPARKLE_VARIANTS} />
          <motion.path animate={starControls} d="M20 3v4" variants={STAR_VARIANTS} />
          <motion.path animate={starControls} d="M22 5h-4" variants={STAR_VARIANTS} />
          <motion.path animate={starControls} d="M4 17v2" variants={STAR_VARIANTS} />
          <motion.path animate={starControls} d="M5 18H3" variants={STAR_VARIANTS} />
        </svg>
      </div>
    );
  }
);

SparklesIcon.displayName = "SparklesIcon";
export { SparklesIcon };
