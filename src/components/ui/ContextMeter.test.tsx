import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ContextMeter } from "./ContextMeter"

describe("ContextMeter", () => {
  it("renders with required props", () => {
    render(<ContextMeter used={4000} total={8000} />)
    expect(screen.getByRole("meter")).toBeInTheDocument()
  })

  it("displays used/total text in default size", () => {
    render(<ContextMeter used={4000} total={8000} />)
    expect(screen.getByText(/4,000/)).toBeInTheDocument()
    expect(screen.getByText(/8,000/)).toBeInTheDocument()
  })

  it("shows percentage in compact size", () => {
    render(<ContextMeter used={4000} total={8000} size="compact" />)
    expect(screen.getByText("50%")).toBeInTheDocument()
  })

  it("shows breakdown in expanded size", () => {
    render(
      <ContextMeter
        used={6000}
        total={8000}
        size="expanded"
        breakdown={{ system: 30, user: 40, assistant: 30 }}
      />
    )
    expect(screen.getByText("System: 30%")).toBeInTheDocument()
    expect(screen.getByText("User: 40%")).toBeInTheDocument()
    expect(screen.getByText("Assistant: 30%")).toBeInTheDocument()
  })

  it("applies success color for low usage", () => {
    render(<ContextMeter used={2000} total={8000} />)
    expect(screen.getByText("Normal")).toBeInTheDocument()
  })

  it("applies warning color for medium usage", () => {
    render(<ContextMeter used={5600} total={8000} />)
    expect(screen.getByText("Elevated")).toBeInTheDocument()
  })

  it("applies destructive color for high usage", () => {
    render(<ContextMeter used={7000} total={8000} />)
    expect(screen.getByText("Critical")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ContextMeter ref={ref} used={0} total={100} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <ContextMeter used={0} total={100} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })

  it("has correct aria attributes", () => {
    render(<ContextMeter used={4000} total={8000} />)
    const meter = screen.getByRole("meter")
    expect(meter).toHaveAttribute("aria-valuenow", "4000")
    expect(meter).toHaveAttribute("aria-valuemax", "8000")
  })

  it("clamps percentage at 100 when used exceeds total", () => {
    render(<ContextMeter used={10000} total={8000} size="compact" />)
    expect(screen.getByText("100%")).toBeInTheDocument()
  })
})
