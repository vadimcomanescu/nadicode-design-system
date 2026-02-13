'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("grid gap-6", className)}
    {...props}
  />
))
FieldSet.displayName = "FieldSet"

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement> & { variant?: "legend" | "label" }
>(({ className, variant = "legend", ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary",
      variant === "legend" && "text-base font-semibold",
      className
    )}
    {...props}
  />
))
FieldLegend.displayName = "FieldLegend"

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-4 @container/field-group", className)}
    {...props}
  />
))
FieldGroup.displayName = "FieldGroup"

const fieldVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-cols-[1fr_2fr] items-center gap-4",
      responsive: "grid-cols-1 @[30rem]/field-group:grid-cols-[1fr_2fr] @[30rem]/field-group:items-center @[30rem]/field-group:gap-4",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof fieldVariants>
>(({ className, orientation, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    className={cn(fieldVariants({ orientation }), className)}
    {...props}
  />
))
Field.displayName = "Field"

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
))
FieldContent.displayName = "FieldContent"

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "label"
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary",
        className
      )}
      {...props}
    />
  )
})
FieldLabel.displayName = "FieldLabel"

const FieldTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-text-primary", className)}
    {...props}
  />
))
FieldTitle.displayName = "FieldTitle"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-text-tertiary", className)}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex items-center py-4", className)}
    {...props}
  >
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-border" />
    </div>
    {children && (
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-text-tertiary">{children}</span>
      </div>
    )}
  </div>
))
FieldSeparator.displayName = "FieldSeparator"

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { errors?: (string | { message?: string })[] | string }
>(({ className, children, errors, ...props }, ref) => {
  const errorMessages = Array.isArray(errors)
    ? errors.map((e) => (typeof e === "string" ? e : e?.message)).filter(Boolean)
    : typeof errors === "string"
    ? [errors]
    : []

  if (errorMessages.length === 0 && !children) return null

  return (
    <div ref={ref} className={cn("text-xs font-medium text-destructive", className)} {...props}>
      {children || errorMessages.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  )
})
FieldError.displayName = "FieldError"

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  fieldVariants,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
}
