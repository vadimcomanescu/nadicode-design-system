import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { AgentMetricsCard, type Metric } from "./AgentMetricsCard"

const mockMetrics: Metric[] = [
  { label: "Latency", value: "120", unit: "ms", trend: "down" },
  { label: "Tokens/s", value: 85, trend: "up" },
  { label: "Success Rate", value: "99.2", unit: "%", trend: "flat" },
  { label: "Active Agents", value: 3 },
]

describe("AgentMetricsCard", () => {
  it("renders all metrics", () => {
    render(<AgentMetricsCard metrics={mockMetrics} />)
    expect(screen.getByText("Latency")).toBeInTheDocument()
    expect(screen.getByText("120")).toBeInTheDocument()
    expect(screen.getByText("ms")).toBeInTheDocument()
    expect(screen.getByText("Tokens/s")).toBeInTheDocument()
    expect(screen.getByText("85")).toBeInTheDocument()
  })

  it("shows trend indicators", () => {
    render(<AgentMetricsCard metrics={mockMetrics} />)
    expect(screen.getByLabelText("trending up")).toBeInTheDocument()
    expect(screen.getByLabelText("trending down")).toBeInTheDocument()
    expect(screen.getByLabelText("flat")).toBeInTheDocument()
  })

  it("renders refresh button when onRefresh provided", async () => {
    const onRefresh = vi.fn()
    const user = userEvent.setup()
    render(<AgentMetricsCard metrics={mockMetrics} onRefresh={onRefresh} />)

    const btn = screen.getByRole("button", { name: "Refresh metrics" })
    await user.click(btn)
    expect(onRefresh).toHaveBeenCalledOnce()
  })

  it("does not render refresh button without onRefresh", () => {
    render(<AgentMetricsCard metrics={mockMetrics} />)
    expect(screen.queryByRole("button", { name: "Refresh metrics" })).not.toBeInTheDocument()
  })

  it("applies row layout", () => {
    const { container } = render(
      <AgentMetricsCard metrics={mockMetrics} layout="row" />
    )
    const inner = container.querySelector(".flex.gap-4")
    expect(inner).toBeInTheDocument()
  })

  it("applies grid layout by default", () => {
    const { container } = render(<AgentMetricsCard metrics={mockMetrics} />)
    const inner = container.querySelector(".grid")
    expect(inner).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AgentMetricsCard ref={ref} metrics={mockMetrics} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <AgentMetricsCard metrics={mockMetrics} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
