import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { AgentTimeline } from "./AgentTimeline"

const events = [
  {
    id: "1",
    timestamp: "12:00",
    type: "tool_call" as const,
    agent: "Coder",
    title: "Called search API",
    detail: "Searched for 'react patterns'",
  },
  {
    id: "2",
    timestamp: "12:01",
    type: "message" as const,
    title: "Agent responded",
  },
  {
    id: "3",
    timestamp: "12:02",
    type: "error" as const,
    title: "Rate limit hit",
  },
]

describe("AgentTimeline", () => {
  it("renders all event titles", () => {
    render(<AgentTimeline events={events} />)
    expect(screen.getByText("Called search API")).toBeInTheDocument()
    expect(screen.getByText("Agent responded")).toBeInTheDocument()
    expect(screen.getByText("Rate limit hit")).toBeInTheDocument()
  })

  it("renders timestamps", () => {
    render(<AgentTimeline events={events} />)
    expect(screen.getByText("12:00")).toBeInTheDocument()
  })

  it("renders agent name", () => {
    render(<AgentTimeline events={events} />)
    expect(screen.getByText("Coder")).toBeInTheDocument()
  })

  it("expands detail on click", async () => {
    const user = userEvent.setup()
    render(<AgentTimeline events={events} />)
    expect(
      screen.queryByText("Searched for 'react patterns'")
    ).not.toBeInTheDocument()
    const buttons = screen.getAllByRole("button")
    await user.click(buttons[0])
    expect(
      screen.getByText("Searched for 'react patterns'")
    ).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AgentTimeline ref={ref} events={events} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <AgentTimeline events={events} className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
