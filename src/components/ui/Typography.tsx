import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const typographyVariants = cva(
  "",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary text-balance",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary text-balance",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-primary text-balance",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight text-primary text-balance",
        body: "leading-7 text-text-primary [&:not(:first-child)]:mt-6 text-pretty",
        small: "text-sm font-medium leading-none text-text-secondary",
        muted: "text-sm text-text-tertiary",
      },
    },
    defaultVariants: {
      variant: "body",
    },
  }
)

const defaultTags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "small",
  muted: "p",
} as const

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || defaultTags[variant || "body"]
    
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"
