/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const itemVariants = cva("flex items-center gap-4 transition-colors", {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "rounded-lg border border-border bg-surface p-4 shadow-sm",
      muted: "rounded-lg bg-secondary/50 p-4",
    },
    size: {
      default: "py-3",
      sm: "py-2 px-3 gap-3",
      xs: "py-1.5 px-2 gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof itemVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
})
Item.displayName = "Item"

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-1", className)} {...props} />
))
ItemGroup.displayName = "ItemGroup"

const ItemSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
ItemSeparator.displayName = "ItemSeparator"

const itemMediaVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    variant: {
      default: "",
      icon: "h-9 w-9 rounded-md bg-secondary text-text-secondary [&>svg]:h-5 [&>svg]:w-5",
      avatar: "h-10 w-10 overflow-hidden rounded-full",
      image: "h-12 w-12 overflow-hidden rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const ItemMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof itemMediaVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(itemMediaVariants({ variant }), className)}
    {...props}
  />
))
ItemMedia.displayName = "ItemMedia"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-0.5 min-w-0", className)}
    {...props}
  />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium leading-none text-text-primary truncate", className)}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-text-tertiary truncate", className)}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto flex items-center gap-2", className)}
    {...props}
  />
))
ItemActions.displayName = "ItemActions"

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 flex items-center justify-between", className)}
    {...props}
  />
))
ItemHeader.displayName = "ItemHeader"

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2 flex items-center justify-between", className)}
    {...props}
  />
))
ItemFooter.displayName = "ItemFooter"

export {
  Item,
  itemVariants,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  itemMediaVariants,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
}
