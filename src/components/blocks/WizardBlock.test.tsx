import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WizardBlock } from "./WizardBlock"

describe("WizardBlock", () => {
  it("renders without crashing", () => {
    render(<WizardBlock />)
    expect(screen.getByText("Create Project")).toBeInTheDocument()
  })

  it("renders step titles", () => {
    render(<WizardBlock />)
    expect(screen.getByText("Account")).toBeInTheDocument()
    expect(screen.getByText("Profile")).toBeInTheDocument()
    expect(screen.getByText("Plan")).toBeInTheDocument()
    expect(screen.getByText("Launch")).toBeInTheDocument()
  })

  it("renders navigation buttons", () => {
    render(<WizardBlock />)
    expect(screen.getByText("Previous")).toBeInTheDocument()
    expect(screen.getByText("Next")).toBeInTheDocument()
  })

  it("disables Previous on first step", () => {
    render(<WizardBlock />)
    expect(screen.getByText("Previous")).toBeDisabled()
  })
})
