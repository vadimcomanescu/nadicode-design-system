/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cn } from "../../../lib/utils"

interface StepperContextValue {
    activeStep: number
    setActiveStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    steps: number
    setSteps: (steps: number) => void
}

const StepperContext = React.createContext<StepperContextValue>({
    activeStep: 0,
    setActiveStep: () => { },
    nextStep: () => { },
    prevStep: () => { },
    steps: 0,
    setSteps: () => { },
})

export function useStepper() {
    const context = React.useContext(StepperContext)
    if (!context) {
        throw new Error("useStepper must be used within a StepperProvider")
    }
    return context
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    initialStep?: number
    activeStep?: number
    onStepChange?: (step: number) => void
    orientation?: "horizontal" | "vertical"
    children: React.ReactNode
}

export function Stepper({
    initialStep = 0,
    activeStep: controlledActiveStep,
    onStepChange,
    orientation = "horizontal",
    children,
    className,
    ...props
}: StepperProps) {
    const [internalStep, setInternalStep] = React.useState(initialStep)
    const isControlled = controlledActiveStep !== undefined
    const activeStep = isControlled ? controlledActiveStep : internalStep
    const [steps, setSteps] = React.useState(0)

    const nextStep = () => {
        const next = Math.min(activeStep + 1, steps - 1)
        if (!isControlled) setInternalStep(next)
        onStepChange?.(next)
    }

    const prevStep = () => {
        const prev = Math.max(activeStep - 1, 0)
        if (!isControlled) setInternalStep(prev)
        onStepChange?.(prev)
    }

    const handleStepChange = (step: number) => {
        if (!isControlled) setInternalStep(step)
        onStepChange?.(step)
    }

    return (
        <StepperContext.Provider
            value={{
                activeStep,
                setActiveStep: handleStepChange,
                nextStep,
                prevStep,
                steps,
                setSteps,
            }}
        >
            <div
                className={cn(
                    "flex w-full gap-4",
                    orientation === "vertical" ? "flex-col" : "flex-row",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </StepperContext.Provider>
    )
}
