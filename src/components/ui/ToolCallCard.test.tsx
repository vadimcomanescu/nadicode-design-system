import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { ToolCallCard } from "./ToolCallCard"

describe("ToolCallCard", () => {
  it("renders tool name", () => {
    render(<ToolCallCard toolName="search" />)
    expect(screen.getByText("search")).toBeInTheDocument()
  })

  it("renders args as JSON", () => {
    render(<ToolCallCard toolName="fetch" args={{ url: "https://example.com" }} />)
    expect(screen.getByText(/"url"/)).toBeInTheDocument()
  })

  it("renders duration", () => {
    render(<ToolCallCard toolName="fetch" duration={120} />)
    expect(screen.getByText("120ms")).toBeInTheDocument()
  })

  it("toggles result visibility", async () => {
    const user = userEvent.setup()
    render(<ToolCallCard toolName="fetch" result="OK" />)
    const toggle = screen.getByRole("button", { name: "Show result" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!)
    expect(panel).toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "true")

    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")
    expect(panel).not.toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "false")
    expect(screen.getByText("OK")).toBeInTheDocument()
  })

  it("shows result when defaultExpanded", () => {
    render(<ToolCallCard toolName="fetch" result="OK" defaultExpanded />)
    expect(screen.getByText("OK")).toBeInTheDocument()
  })

  it("applies status variant classes", () => {
    const { container } = render(<ToolCallCard toolName="fetch" status="error" />)
    expect(container.firstChild).toHaveClass("border-destructive/40")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ToolCallCard ref={ref} toolName="test" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <ToolCallCard toolName="test" className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
