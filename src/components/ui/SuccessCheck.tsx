'use client'

import * as React from "react";
import { motion } from "motion/react";
import { useStyleMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SuccessCheckProps {
  size?: number;
  className?: string;
  onComplete?: () => void;
}

export const SuccessCheck = React.forwardRef<HTMLDivElement, SuccessCheckProps>(
  ({ size = 48, className, onComplete }, ref) => {
    const { spring, style } = useStyleMotion();

    const strokeColor = style === "bloom" ? "#3DD6A0" : "#3DD68C";
    const circleColor = style === "bloom" ? "#E8573A" : "#38BDB8";

    return (
      <div ref={ref} className={cn("inline-flex items-center justify-center", className)}>
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={spring.bouncy}
          style={{ display: 'inline-flex' }}
        >
          <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              stroke={circleColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ ...spring.gentle, delay: 0.1 }}
            />
            <motion.path
              d="M14 24L21 31L34 18"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ ...spring.bouncy, delay: 0.3 }}
              onAnimationComplete={onComplete}
            />
          </svg>
        </motion.div>
      </div>
    );
  }
);

SuccessCheck.displayName = "SuccessCheck";
