# Component Patterns

Four real patterns from the Seed codebase, from simplest to most complex.

---

## Pattern 1: Simple CVA + Slot (Button)

The canonical Seed pattern. CVA for variants, Slot for polymorphism, forwardRef for DOM access.

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-medium " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "active:scale-[0.97] transition-all duration-fast ease-out-cubic " +
  "hover:-translate-y-0.5 hover:shadow-lg",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent hover:bg-surface-hover text-text-primary",
        ghost: "hover:bg-surface-hover text-text-primary",
        link: "text-text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent",
        glass: "glass hover:bg-surface/80 text-text-primary",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Key takeaways:**
- `cn()` wraps CVA output + user `className` for safe merging
- `asChild` + `Slot` lets consumers render as `<a>`, `<Link>`, etc.
- Export both the component and the variants function

---

## Pattern 2: Form Input with Label/Error/Icons (Input)

Extends the base pattern with label, error messages, and icon slots.

```tsx
import * as React from 'react';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils';
import { Label } from './Label';

const inputVariants = cva(
  "flex w-full rounded-md border border-border bg-surface shadow-sm " +
  "transition-[border-color,box-shadow] duration-fast ease-out-cubic " +
  "file:border-0 file:bg-transparent file:font-medium " +
  "placeholder:text-text-tertiary hover:border-primary/40 " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent " +
  "disabled:cursor-not-allowed disabled:opacity-50 text-text-primary",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 py-0.5 text-xs file:text-xs",
        default: "h-9 px-3 py-1 text-sm file:text-sm",
        lg: "h-11 px-4 py-2 text-base file:text-base",
      },
    },
    defaultVariants: { size: "default" },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  error?: string | boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, startIcon, endIcon, id, size, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ size }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        {typeof error === 'string' && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
```

**Key takeaways:**
- `React.useId()` for accessible label association
- Icons positioned absolutely with pointer-events-none
- Error state adds `border-destructive` via `cn()` conditional
- `Omit<..., "size">` avoids conflict with CVA's `size` variant

---

## Pattern 3: Compound Radix Wrapper (Dialog)

Wraps Radix primitives into styled sub-components, re-exports as a compound set.

```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

// Pass-through re-exports (no styling needed)
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// Styled overlay with backdrop blur
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-overlay/80 backdrop-blur-sm " +
      "data-[state=open]:animate-in data-[state=closed]:animate-out " +
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))

// Styled content with glass-panel and close button
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg " +
        "translate-x-[-50%] translate-y-[-50%] gap-4 glass-panel p-6 " +
        "duration-normal ease-out-cubic " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
        "sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ...">
        <XIcon size={16} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

// Layout sub-components (no Radix, just styled divs)
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

const DialogTitle = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-text-primary", className)}
    {...props}
  />
))

const DialogDescription = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
))

export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
}
```

**Key takeaways:**
- Radix primitives are re-exported directly when no styling needed
- Content uses `glass-panel` class for the glassmorphism tier
- Overlay uses `bg-overlay/80 backdrop-blur-sm`
- Close button uses animated `XIcon` from the icon system
- `data-[state=open/closed]` attributes drive enter/exit animations
- Use `React.ElementRef<typeof Primitive>` and `React.ComponentPropsWithoutRef<typeof Primitive>` for types

---

## Pattern 4: Block Composition (LoginBlock)

Blocks compose UI primitives into page-ready sections.

```tsx
import React from "react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { GoogleIcon } from "../ui/BrandIcons"
import { cn } from "../../lib/utils"

interface LoginBlockProps {
  className?: string
  type?: "login" | "signup"
  showSocial?: boolean
  title?: string
  description?: string
  onLogin?: (e: React.FormEvent) => void
}

export function LoginBlock({
  className,
  type = "login",
  showSocial = true,
  title,
  description,
  onLogin,
}: LoginBlockProps) {
  const defaultTitle = type === "login" ? "Welcome back" : "Create an account"
  const buttonText = type === "login" ? "Sign In" : "Sign Up"

  return (
    <Card className={cn("w-full max-w-[400px] border-border/50", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{title || defaultTitle}</CardTitle>
        <CardDescription className="text-center">...</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {showSocial && (
          <>
            <Button variant="outline" className="w-full ...">
              <GoogleIcon className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
            <div className="flex items-center gap-3 text-xs uppercase text-text-tertiary">
              <div className="h-px flex-1 bg-border/50" />
              <span>Or continue with</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>
          </>
        )}
        <form onSubmit={onLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90">{buttonText}</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-text-tertiary">
          Don't have an account? <a href="#" className="text-accent">Create account</a>
        </p>
      </CardFooter>
    </Card>
  )
}
```

**Key takeaways:**
- Blocks are NOT forwardRef (they are not primitives)
- Blocks always accept `className` for placement flexibility
- Blocks compose multiple UI primitives (Card, Button, Input, Label)
- Props control behavior variants (type, showSocial) not visual variants
- Block naming convention: `*Block.tsx` suffix
- Use semantic tokens (`text-text-tertiary`, `bg-border/50`, `bg-accent`)
