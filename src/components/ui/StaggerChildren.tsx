import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motionSpring } from "@/lib/motion";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  staggerMs = 80,
  direction = "up",
  distance = 16,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
    }
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerMs / 1000 } },
        hidden: {},
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, ...getOffset() },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: motionSpring.snappy,
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
