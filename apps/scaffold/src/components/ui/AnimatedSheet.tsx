'use client'

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { motion } from "motion/react"
import { XIcon } from "@/components/ui/icons"

import { cn } from "@/lib/utils"
import { motionSpring, useMotionConfig } from "@/lib/motion"

const AnimatedSheet = DialogPrimitive.Root

const AnimatedSheetTrigger = DialogPrimitive.Trigger

const AnimatedSheetClose = DialogPrimitive.Close

const AnimatedSheetPortal = DialogPrimitive.Portal

const AnimatedSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} asChild {...props}>
    <motion.div
      className={cn("fixed inset-0 z-50 bg-overlay/80", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  </DialogPrimitive.Overlay>
))
AnimatedSheetOverlay.displayName = "AnimatedSheetOverlay"

type Side = "top" | "bottom" | "left" | "right"

const slideVariants: Record<Side, { initial: Record<string, number>; animate: Record<string, number>; exit: Record<string, number> }> = {
  right: {
    initial: { x: 300 },
    animate: { x: 0 },
    exit: { x: 300 },
  },
  left: {
    initial: { x: -300 },
    animate: { x: 0 },
    exit: { x: -300 },
  },
  top: {
    initial: { y: -300 },
    animate: { y: 0 },
    exit: { y: -300 },
  },
  bottom: {
    initial: { y: 300 },
    animate: { y: 0 },
    exit: { y: 300 },
  },
}

const sideClasses: Record<Side, string> = {
  top: "inset-x-0 top-0 border-b border-border",
  bottom: "inset-x-0 bottom-0 border-t border-border pb-[max(1.5rem,env(safe-area-inset-bottom))]",
  left: "inset-y-0 left-0 h-full w-3/4 border-r border-border pl-[max(1.5rem,env(safe-area-inset-left))] sm:max-w-sm",
  right: "inset-y-0 right-0 h-full w-3/4 border-l border-border pr-[max(1.5rem,env(safe-area-inset-right))] sm:max-w-sm",
}

interface AnimatedSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: Side
  onClose?: () => void
}

const AnimatedSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  AnimatedSheetContentProps
>(({ side = "right", className, children, onClose, ...props }, ref) => {
  const motionConfig = useMotionConfig()
  const isHorizontal = side === "left" || side === "right"
  const variant = slideVariants[side]

  return (
    <AnimatedSheetPortal>
      <AnimatedSheetOverlay />
      <DialogPrimitive.Content ref={ref} asChild {...props}>
        <motion.div
          className={cn("fixed z-50 gap-4 glass-panel p-6 shadow-lg", sideClasses[side], className)}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{ ...motionSpring.gentle, ...motionConfig }}
          drag={isHorizontal ? "x" : undefined}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_e, info) => {
            if (isHorizontal) {
              const threshold = 100
              const shouldClose =
                side === "right" ? info.offset.x > threshold : info.offset.x < -threshold
              if (shouldClose) {
                onClose?.()
              }
            }
          }}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none">
            <XIcon size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </motion.div>
      </DialogPrimitive.Content>
    </AnimatedSheetPortal>
  )
})
AnimatedSheetContent.displayName = "AnimatedSheetContent"

const AnimatedSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
AnimatedSheetHeader.displayName = "AnimatedSheetHeader"

const AnimatedSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
AnimatedSheetFooter.displayName = "AnimatedSheetFooter"

const AnimatedSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-text-primary", className)}
    {...props}
  />
))
AnimatedSheetTitle.displayName = "AnimatedSheetTitle"

const AnimatedSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
))
AnimatedSheetDescription.displayName = "AnimatedSheetDescription"

export {
  AnimatedSheet,
  AnimatedSheetPortal,
  AnimatedSheetOverlay,
  AnimatedSheetTrigger,
  AnimatedSheetClose,
  AnimatedSheetContent,
  AnimatedSheetHeader,
  AnimatedSheetFooter,
  AnimatedSheetTitle,
  AnimatedSheetDescription,
}
