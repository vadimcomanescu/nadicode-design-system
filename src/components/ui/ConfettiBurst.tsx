'use client'

import * as React from "react";
import { motion } from "motion/react";
import { useStyleMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ConfettiBurstProps {
  count?: number;
  spread?: number;
  className?: string;
  trigger?: boolean;
}

const ARCTIC_COLORS = ["#38BDB8", "#6B7A8A", "#A0AEBB", "#3E96F4", "#8B5CF6"];
const BLOOM_COLORS = ["#E8573A", "#8B5CF6", "#3DD6A0", "#F5A623", "#5AB4F5"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const ConfettiBurst = React.forwardRef<HTMLDivElement, ConfettiBurstProps>(
  ({ count = 12, spread = 80, className, trigger = true }, ref) => {
    const { spring, style } = useStyleMotion();
    const colors = style === "bloom" ? BLOOM_COLORS : ARCTIC_COLORS;

    const [particles, setParticles] = React.useState<
      { id: number; color: string; x: number; y: number; rotate: number; size: number }[]
    >([]);

    React.useEffect(() => {
      if (!trigger) return;
      setParticles(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          color: colors[i % colors.length],
          x: randomBetween(-spread, spread),
          y: randomBetween(-spread, -spread / 3),
          rotate: randomBetween(-180, 180),
          size: randomBetween(4, 8),
        }))
      );
    }, [count, spread, colors, trigger]);

    if (!trigger || particles.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn("pointer-events-none relative inline-block", className)}
        aria-hidden
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-sm"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              scale: 0.8,
              rotate: p.rotate,
              opacity: [1, 1, 0],
            }}
            transition={{
              ...spring.bouncy,
              scale: { type: "tween", duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { type: "tween", duration: 0.8, delay: 0.3 },
            }}
          />
        ))}
      </div>
    );
  }
);

ConfettiBurst.displayName = "ConfettiBurst";
