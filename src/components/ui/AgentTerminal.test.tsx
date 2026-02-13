import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { AgentTerminal, type TerminalLine } from "./AgentTerminal"

const mockLines: TerminalLine[] = [
  { text: "npm install", type: "stdin" },
  { text: "added 150 packages", type: "stdout" },
  { text: "WARN deprecated package", type: "stderr" },
  { text: "Done in 4.2s" },
]

describe("AgentTerminal", () => {
  it("renders all lines", () => {
    render(<AgentTerminal lines={mockLines} />)
    expect(screen.getByText("npm install")).toBeInTheDocument()
    expect(screen.getByText("added 150 packages")).toBeInTheDocument()
    expect(screen.getByText("WARN deprecated package")).toBeInTheDocument()
    expect(screen.getByText("Done in 4.2s")).toBeInTheDocument()
  })

  it("renders title when provided", () => {
    render(<AgentTerminal lines={mockLines} title="build-agent" />)
    expect(screen.getByText("build-agent")).toBeInTheDocument()
  })

  it("renders traffic light dots", () => {
    const { container } = render(<AgentTerminal lines={mockLines} />)
    const dots = container.querySelectorAll(".rounded-full")
    expect(dots.length).toBe(3)
  })

  it("applies stdin prefix for stdin lines", () => {
    const { container } = render(
      <AgentTerminal lines={[{ text: "echo hello", type: "stdin" }]} />
    )
    expect(container.textContent).toContain("$ echo hello")
  })

  it("applies text-accent for stdin", () => {
    const { container } = render(
      <AgentTerminal lines={[{ text: "cmd", type: "stdin" }]} />
    )
    const line = container.querySelector(".text-accent")
    expect(line).toBeInTheDocument()
  })

  it("applies text-destructive for stderr", () => {
    const { container } = render(
      <AgentTerminal lines={[{ text: "error", type: "stderr" }]} />
    )
    const line = container.querySelector(".text-destructive")
    expect(line).toBeInTheDocument()
  })

  it("calls onCopy when copy button clicked", async () => {
    const onCopy = vi.fn()
    const user = userEvent.setup()
    render(<AgentTerminal lines={mockLines} onCopy={onCopy} />)

    await user.click(screen.getByLabelText("Copy terminal output"))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it("does not render copy button without onCopy", () => {
    render(<AgentTerminal lines={mockLines} />)
    expect(screen.queryByLabelText("Copy terminal output")).not.toBeInTheDocument()
  })

  it("has log role for accessibility", () => {
    render(<AgentTerminal lines={mockLines} />)
    expect(screen.getByRole("log")).toBeInTheDocument()
  })

  it("uses monospace font", () => {
    render(<AgentTerminal lines={mockLines} />)
    const log = screen.getByRole("log")
    expect(log).toHaveClass("font-mono")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AgentTerminal ref={ref} lines={mockLines} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <AgentTerminal lines={mockLines} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
