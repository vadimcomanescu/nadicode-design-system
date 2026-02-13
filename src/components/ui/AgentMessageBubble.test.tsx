import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { AgentMessageBubble } from "./AgentMessageBubble"

describe("AgentMessageBubble", () => {
  it("renders message content", () => {
    render(<AgentMessageBubble role="agent" content="Hello world" />)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("applies agent role styling", () => {
    const { container } = render(
      <AgentMessageBubble role="agent" content="Hi" />
    )
    expect(container.querySelector(".glass-panel")).toBeTruthy()
  })

  it("applies user role styling", () => {
    const { container } = render(
      <AgentMessageBubble role="user" content="Hi" />
    )
    expect(container.querySelector(".bg-primary\\/10")).toBeTruthy()
  })

  it("renders timestamp", () => {
    render(
      <AgentMessageBubble role="agent" content="Hi" timestamp="12:30 PM" />
    )
    expect(screen.getByText("12:30 PM")).toBeInTheDocument()
  })

  it("renders avatar", () => {
    render(
      <AgentMessageBubble
        role="agent"
        content="Hi"
        avatar={<div data-testid="avatar">A</div>}
      />
    )
    expect(screen.getByTestId("avatar")).toBeInTheDocument()
  })

  it("renders tool calls slot", () => {
    render(
      <AgentMessageBubble
        role="agent"
        content="Hi"
        toolCalls={<div data-testid="tools">tool</div>}
      />
    )
    expect(screen.getByTestId("tools")).toBeInTheDocument()
  })

  it("calls onCopy action", async () => {
    const onCopy = vi.fn()
    const user = userEvent.setup()
    render(
      <AgentMessageBubble
        role="agent"
        content="Hi"
        actions={{ onCopy }}
      />
    )
    await user.click(screen.getByLabelText("Copy message"))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it("calls onRetry action", async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(
      <AgentMessageBubble
        role="agent"
        content="Hi"
        actions={{ onRetry }}
      />
    )
    await user.click(screen.getByLabelText("Retry message"))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AgentMessageBubble ref={ref} role="agent" content="Hi" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <AgentMessageBubble role="agent" content="Hi" className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
