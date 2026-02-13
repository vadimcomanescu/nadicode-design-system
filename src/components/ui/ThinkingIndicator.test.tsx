import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { ThinkingIndicator } from "./ThinkingIndicator"

describe("ThinkingIndicator", () => {
  it("renders thinking text", () => {
    render(<ThinkingIndicator />)
    expect(screen.getByText("Thinking")).toBeInTheDocument()
  })

  it("renders three pulsing dots", () => {
    render(<ThinkingIndicator />)
    const dots = screen.getByLabelText("Thinking")
    expect(dots.children).toHaveLength(3)
  })

  it("does not show reasoning by default", () => {
    render(<ThinkingIndicator reasoning="Deep thought" />)
    const toggle = screen.getByRole("button", { name: "Show reasoning" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    const panelId = toggle.getAttribute("aria-controls")
    expect(panelId).toBeTruthy()
    const panel = document.getElementById(panelId!)
    expect(panel).toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "true")
  })

  it("expands reasoning on click", async () => {
    const user = userEvent.setup()
    render(<ThinkingIndicator reasoning="Deep thought" />)
    const toggle = screen.getByRole("button", { name: "Show reasoning" })
    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!)
    expect(panel).not.toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "false")
    expect(screen.getByText("Deep thought")).toBeInTheDocument()
  })

  it("applies size variant", () => {
    const { container } = render(<ThinkingIndicator size="lg" />)
    const indicator = container.querySelector(".px-4")
    expect(indicator).toBeTruthy()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ThinkingIndicator ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(<ThinkingIndicator className="my-class" />)
    expect(container.firstChild).toHaveClass("my-class")
  })
})
