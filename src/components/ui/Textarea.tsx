/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Label } from "./Label"

const textareaVariants = cva(
  "flex w-full rounded-md border border-border bg-surface shadow-sm placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 text-text-primary",
  {
    variants: {
      size: {
        sm: "min-h-[60px] px-2.5 py-1.5 text-xs",
        default: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants> {
  label?: React.ReactNode
  error?: string | boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, size, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || generatedId

    return (
      <div className="w-full space-y-2">
        {label && <Label htmlFor={textareaId}>{label}</Label>}
        <textarea
          className={cn(
            textareaVariants({ size }),
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          id={textareaId}
          {...props}
        />
        {typeof error === "string" && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
