import * as React from "react"

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
    onStepChange?: (step: number) => void
    orientation?: "horizontal" | "vertical"
    children: React.ReactNode
}

export function Stepper({
    initialStep = 0,
    onStepChange,
    orientation = "horizontal",
    children,
    className,
    ...props
}: StepperProps) {
    const [activeStep, setActiveStep] = React.useState(initialStep)
    const [steps, setSteps] = React.useState(0)

    const nextStep = () => {
        setActiveStep((prev) => Math.min(prev + 1, steps - 1))
    }

    const prevStep = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    const handleStepChange = (step: number) => {
        setActiveStep(step)
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
                className={`flex w-full gap-4 ${orientation === "vertical" ? "flex-col" : "flex-row"
                    } ${className}`}
                {...props}
            >
                {children}
            </div>
        </StepperContext.Provider>
    )
}
