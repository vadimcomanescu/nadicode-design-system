'use client'

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "../../lib/utils"
import { motionSpring, useMotionConfig } from "../../lib/motion"

const AnimatedTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, onValueChange, value: controlledValue, defaultValue, id, ...props }, ref) => {
  const [prevIndex, setPrevIndex] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [activeValue, setActiveValue] = React.useState<string>(
    (controlledValue ?? defaultValue ?? '') as string
  )
  const generatedId = React.useId()
  const baseId = React.useMemo(() => {
    if (id) return String(id)
    return `animated-tabs-${generatedId.replace(/:/g, '')}`
  }, [generatedId, id])
  const tabValues = React.useRef<string[]>([])

  // Sync controlled value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setActiveValue(controlledValue as string)
    }
  }, [controlledValue])

  const handleValueChange = React.useCallback(
    (val: string) => {
      const newIndex = tabValues.current.indexOf(val)
      if (newIndex !== -1) {
        setPrevIndex(currentIndex)
        setCurrentIndex(newIndex)
      }
      setActiveValue(val)
      onValueChange?.(val)
    },
    [currentIndex, onValueChange]
  )

  return (
    <AnimatedTabsContext.Provider value={{ prevIndex, currentIndex, activeValue, baseId, registerTab: (val: string) => {
      if (!tabValues.current.includes(val)) {
        tabValues.current.push(val)
      }
    }}}>
      <TabsPrimitive.Root
        ref={ref}
        id={id}
        className={className}
        value={controlledValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </AnimatedTabsContext.Provider>
  )
})
AnimatedTabs.displayName = "AnimatedTabs"

interface AnimatedTabsContextValue {
  prevIndex: number
  currentIndex: number
  activeValue: string
  baseId: string
  registerTab: (value: string) => void
}

const AnimatedTabsContext = React.createContext<AnimatedTabsContextValue>({
  prevIndex: 0,
  currentIndex: 0,
  activeValue: '',
  baseId: 'animated-tabs',
  registerTab: () => {},
})

const AnimatedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-secondary p-1 text-text-secondary",
      className
    )}
    {...props}
  />
))
AnimatedTabsList.displayName = "AnimatedTabsList"

const AnimatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, children, ...props }, ref) => {
  const { registerTab, activeValue, baseId } = React.useContext(AnimatedTabsContext)
  const isActive = value === activeValue
  const triggerId = props.id ?? `${baseId}-trigger-${value}`
  const contentId = props["aria-controls"] ?? `${baseId}-content-${value}`

  React.useEffect(() => {
    if (value) registerTab(value)
  }, [value, registerTab])

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      id={triggerId}
      aria-controls={contentId}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-text-primary data-[state=active]:shadow-sm hover:bg-background/50 hover:text-text-primary",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId="active-tab-indicator"
          className="absolute inset-0 rounded-sm bg-surface"
          transition={motionSpring.snappy}
          style={{ zIndex: 0 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
  )
})
AnimatedTabsTrigger.displayName = "AnimatedTabsTrigger"

type AnimatedTabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

const AnimatedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  AnimatedTabsContentProps
>(({ className, children, ...props }, ref) => {
  const { prevIndex, currentIndex, baseId } = React.useContext(AnimatedTabsContext)
  const motionConfig = useMotionConfig()
  const direction = currentIndex > prevIndex ? 1 : -1
  const contentId = props.id ?? `${baseId}-content-${props.value}`
  const labelledBy = props["aria-labelledby"] ?? `${baseId}-trigger-${props.value}`

  return (
    <TabsPrimitive.Content
      ref={ref}
      id={contentId}
      aria-labelledby={labelledBy}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )}
      forceMount
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={props.value}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ ...motionSpring.snappy, ...motionConfig }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsPrimitive.Content>
  )
})
AnimatedTabsContent.displayName = "AnimatedTabsContent"

export {
  AnimatedTabs,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
}
