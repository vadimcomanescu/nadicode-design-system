'use client'

import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  by?: "word" | "char"
  delay?: number
  className?: string
}

export const TextReveal = React.forwardRef<HTMLSpanElement, TextRevealProps>(
  ({ text, by = "word", delay = 0, className }, ref) => {
    const prefersReduced = useReducedMotion()
    const units = by === "word" ? text.split(" ") : text.split("")
    const separator = by === "word" ? "\u00A0" : ""

    if (prefersReduced) {
      return (
        <span ref={ref} className={className}>
          {text}
        </span>
      )
    }

    return (
      <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
        {units.map((unit, i) => (
          <span
            key={`${unit}-${i}`}
            className="animate-blur-reveal opacity-0"
            style={{
              animationDelay: `${delay + i * 80}ms`,
              animationFillMode: "both",
            }}
          >
            {unit}
            {i < units.length - 1 ? separator : ""}
          </span>
        ))}
      </span>
    )
  }
)
TextReveal.displayName = "TextReveal"
