import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/hooks/use-is-in-view'
import { cn } from '@/lib/utils'

type HighlightTextProps = React.ComponentProps<'span'> & {
  color?: string
  duration?: number
  delay?: number
} & UseIsInViewOptions

function HighlightText({
  ref,
  children,
  className,
  color = 'var(--color-accent)',
  duration = 0.6,
  delay = 0,
  inView = true,
  inViewOnce = true,
  inViewMargin = '0px',
  ...props
}: HighlightTextProps) {
  const prefersReduced = useReducedMotion()
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    { inView, inViewOnce, inViewMargin },
  )

  return (
    <span
      ref={localRef}
      className={cn('relative inline-block', className)}
      {...props}
    >
      <motion.span
        className="absolute inset-0 -mx-1 rounded-sm"
        style={{
          backgroundColor: color,
          opacity: 0.15,
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: prefersReduced ? 1 : 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: prefersReduced ? 0 : duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </span>
  )
}

export { HighlightText, type HighlightTextProps }
