import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./Button"
import { CheckIcon } from "./icons/check"

const formWizardVariants = cva(
  "flex flex-col",
  {
    variants: {
      variant: {
        default: "",
        card: "glass-panel rounded-xl border border-border p-6",
      },
      size: {
        sm: "gap-4",
        default: "gap-6",
        lg: "gap-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const stepIndicatorVariants = cva(
  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors border-2",
  {
    variants: {
      state: {
        pending: "border-border bg-surface text-text-tertiary",
        active: "border-accent bg-accent/10 text-accent",
        complete: "border-success bg-success text-success-foreground",
      },
    },
    defaultVariants: {
      state: "pending",
    },
  }
)

export interface WizardStep {
  id: string
  title: string
  description?: string
  content: React.ReactNode
  /** Optional validation, return true if step is valid */
  validate?: () => boolean
}

export interface FormWizardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formWizardVariants> {
  steps: WizardStep[]
  /** Current step index (controlled) */
  activeStep?: number
  /** Called when step changes */
  onStepChange?: (step: number) => void
  /** Called when wizard is completed (last step next) */
  onComplete?: () => void
  /** Custom labels */
  nextLabel?: string
  backLabel?: string
  completeLabel?: string
}

const FormWizard = React.forwardRef<HTMLDivElement, FormWizardProps>(
  (
    {
      className,
      variant,
      size,
      steps,
      activeStep: controlledStep,
      onStepChange,
      onComplete,
      nextLabel = "Continue",
      backLabel = "Back",
      completeLabel = "Complete",
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = React.useState(0)
    const currentStep = controlledStep ?? internalStep

    const goTo = (step: number) => {
      if (onStepChange) {
        onStepChange(step)
      } else {
        setInternalStep(step)
      }
    }

    const handleNext = () => {
      const step = steps[currentStep]
      if (step.validate && !step.validate()) return

      if (currentStep < steps.length - 1) {
        goTo(currentStep + 1)
      } else {
        onComplete?.()
      }
    }

    const handleBack = () => {
      if (currentStep > 0) goTo(currentStep - 1)
    }

    const isLastStep = currentStep === steps.length - 1

    return (
      <div
        ref={ref}
        className={cn(formWizardVariants({ variant, size }), className)}
        role="group"
        aria-label="Form wizard"
        {...props}
      >
        {/* Step indicators */}
        <nav aria-label="Wizard steps" className="flex items-center gap-2">
          {steps.map((step, index) => {
            const state =
              index < currentStep ? "complete" : index === currentStep ? "active" : "pending"

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div className={cn(stepIndicatorVariants({ state }))}>
                    {state === "complete" ? (
                      <CheckIcon size={14} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        state === "active" ? "text-text-primary" : "text-text-tertiary"
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-text-tertiary">{step.description}</p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-px flex-1 transition-colors",
                      index < currentStep ? "bg-success" : "bg-border"
                    )}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            )
          })}
        </nav>

        {/* Step content */}
        <div className="min-h-[120px]" role="tabpanel" aria-label={steps[currentStep]?.title}>
          {steps[currentStep]?.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            {backLabel}
          </Button>
          <div className="text-xs text-text-tertiary">
            Step {currentStep + 1} of {steps.length}
          </div>
          <Button onClick={handleNext}>
            {isLastStep ? completeLabel : nextLabel}
          </Button>
        </div>
      </div>
    )
  }
)
FormWizard.displayName = "FormWizard"

export { FormWizard, formWizardVariants }
