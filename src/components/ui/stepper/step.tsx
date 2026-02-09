import * as React from "react"
import { cn } from "@/lib/utils"
import { useStepper } from "./stepper"
import { Check } from "lucide-react"
import { AnimatedIcon } from "../AnimatedIcon"

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number
    title?: string
    description?: string
    icon?: React.ReactNode
    completed?: boolean
}

export function Step({
    index,
    title,
    description,
    icon,
    completed,
    className,
    children,
    ...props
}: StepProps) {
    const { activeStep } = useStepper()

    const isActive = activeStep === index
    const isCompleted = completed ?? activeStep > index

    return (
        <div
            className={cn(
                "flex flex-1 flex-col transition-all duration-300",
                isActive ? "opacity-100" : "opacity-60 hover:opacity-80",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors duration-300",
                        isActive
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_0_10px_2px_rgba(var(--primary),0.3)]"
                            : isCompleted
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-text-tertiary/30 bg-background text-text-tertiary"
                    )}
                >
                    {isCompleted ? (
                        <AnimatedIcon icon={Check} className="h-4 w-4" />
                    ) : icon ? (
                        icon
                    ) : (
                        index + 1
                    )}
                </div>
                <div className="flex flex-col">
                    {title && <span className={cn("text-sm font-medium leading-none", isActive && "text-primary")}>{title}</span>}
                    {description && <span className="text-xs text-text-tertiary">{description}</span>}
                </div>
            </div>
            {/* Connector Line (Horizontal) - Only render if not the last step */}
            {/* Note: This is a simplified version. For full layout connect lines, we'd need to know total steps or inspect siblings. 
          For now, we rely on the flex-gap for spacing. */}
        </div>
    )
}
