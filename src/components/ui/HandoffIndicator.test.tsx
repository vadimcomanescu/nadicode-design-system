import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HandoffIndicator } from "./HandoffIndicator"

describe("HandoffIndicator", () => {
  const from = { name: "Planner" }
  const to = { name: "Coder" }

  it("renders from agent name", () => {
    render(<HandoffIndicator fromAgent={from} toAgent={to} />)
    expect(screen.getByText("Planner")).toBeInTheDocument()
  })

  it("renders to agent name", () => {
    render(<HandoffIndicator fromAgent={from} toAgent={to} />)
    expect(screen.getByText("Coder")).toBeInTheDocument()
  })

  it("renders reason text", () => {
    render(
      <HandoffIndicator fromAgent={from} toAgent={to} reason="Needs coding" />
    )
    expect(screen.getByText("Needs coding")).toBeInTheDocument()
  })

  it("renders avatars when provided", () => {
    const fromWithAvatar = {
      name: "Planner",
      avatar: <div data-testid="from-av">P</div>,
    }
    const toWithAvatar = {
      name: "Coder",
      avatar: <div data-testid="to-av">C</div>,
    }
    render(<HandoffIndicator fromAgent={fromWithAvatar} toAgent={toWithAvatar} />)
    expect(screen.getByTestId("from-av")).toBeInTheDocument()
    expect(screen.getByTestId("to-av")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<HandoffIndicator ref={ref} fromAgent={from} toAgent={to} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <HandoffIndicator fromAgent={from} toAgent={to} className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
