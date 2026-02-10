import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { FormWizard, type WizardStep } from "./FormWizard"

const mockSteps: WizardStep[] = [
  { id: "1", title: "Account", content: <div>Step 1 Content</div> },
  { id: "2", title: "Profile", content: <div>Step 2 Content</div> },
  { id: "3", title: "Review", content: <div>Step 3 Content</div> },
]

describe("FormWizard", () => {
  it("renders first step content by default", () => {
    render(<FormWizard steps={mockSteps} />)
    expect(screen.getByText("Step 1 Content")).toBeInTheDocument()
  })

  it("shows step counter", () => {
    render(<FormWizard steps={mockSteps} />)
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument()
  })

  it("navigates to next step on Continue click", async () => {
    const user = userEvent.setup()
    render(<FormWizard steps={mockSteps} />)

    await user.click(screen.getByText("Continue"))
    expect(await screen.findByText("Step 2 Content")).toBeInTheDocument()
    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument()
  })

  it("navigates back on Back click", async () => {
    const user = userEvent.setup()
    render(<FormWizard steps={mockSteps} />)

    await user.click(screen.getByText("Continue"))
    await screen.findByText("Step 2 Content")
    await user.click(screen.getByText("Back"))
    expect(await screen.findByText("Step 1 Content")).toBeInTheDocument()
  })

  it("disables Back on first step", () => {
    render(<FormWizard steps={mockSteps} />)
    expect(screen.getByText("Back")).toBeDisabled()
  })

  it("shows Complete button on last step", async () => {
    const user = userEvent.setup()
    render(<FormWizard steps={mockSteps} />)

    await user.click(screen.getByText("Continue"))
    await screen.findByText("Step 2 Content")
    await user.click(screen.getByText("Continue"))
    expect(await screen.findByText("Complete")).toBeInTheDocument()
  })

  it("calls onComplete when completing last step", async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<FormWizard steps={mockSteps} onComplete={onComplete} />)

    await user.click(screen.getByText("Continue"))
    await screen.findByText("Step 2 Content")
    await user.click(screen.getByText("Continue"))
    await screen.findByText("Complete")
    await user.click(screen.getByText("Complete"))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it("respects step validation", async () => {
    const user = userEvent.setup()
    const stepsWithValidation: WizardStep[] = [
      { id: "1", title: "Name", content: <div>Enter name</div>, validate: () => false },
      { id: "2", title: "Done", content: <div>All done</div> },
    ]
    render(<FormWizard steps={stepsWithValidation} />)

    await user.click(screen.getByText("Continue"))
    // Should not advance since validation returns false
    expect(screen.getByText("Enter name")).toBeInTheDocument()
  })

  it("has accessible wizard navigation", () => {
    render(<FormWizard steps={mockSteps} />)
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Form wizard")
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Wizard steps")
  })

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<FormWizard ref={ref} steps={mockSteps} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
