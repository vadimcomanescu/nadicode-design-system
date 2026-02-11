import * as React from "react"
import { EyeIcon } from "@/components/ui/icons/eye"
import { EyeOffIcon } from "@/components/ui/icons/eye-off"
import { inputVariants, type InputProps } from "./Input"
import { Label } from "./Label"
import { cn } from "../../lib/utils"

export type PasswordInputProps = Omit<InputProps, "type" | "startIcon" | "endIcon">

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, id, size, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="w-full space-y-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            id={inputId}
            className={cn(
              inputVariants({ size }),
              "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm p-0.5"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
        {typeof error === "string" && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
