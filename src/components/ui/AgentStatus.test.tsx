import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import { AgentStatus } from "./AgentStatus"

describe("AgentStatus", () => {
  it("renders with default idle status", () => {
    render(<AgentStatus />)
    expect(screen.getByRole("status")).toHaveTextContent("Idle")
  })

  it("displays correct label for each status", () => {
    const statuses = [
      { status: "thinking" as const, label: "Thinking..." },
      { status: "streaming" as const, label: "Streaming" },
      { status: "error" as const, label: "Error" },
      { status: "complete" as const, label: "Complete" },
    ]

    statuses.forEach(({ status, label }) => {
      const { unmount } = render(<AgentStatus status={status} />)
      expect(screen.getByRole("status")).toHaveTextContent(label)
      unmount()
    })
  })

  it("supports custom label override", () => {
    render(<AgentStatus status="thinking" label="Processing query..." />)
    expect(screen.getByRole("status")).toHaveTextContent("Processing query...")
  })

  it("hides dot when showDot is false", () => {
    const { container } = render(<AgentStatus showDot={false} />)
    expect(container.querySelector("[aria-hidden='true']")).not.toBeInTheDocument()
  })

  it("has accessible aria-label", () => {
    render(<AgentStatus status="streaming" />)
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Agent status: Streaming"
    )
  })

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<AgentStatus ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
