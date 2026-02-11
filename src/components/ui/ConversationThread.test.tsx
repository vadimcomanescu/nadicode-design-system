import { createRef } from "react";
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ConversationThread, type Message } from "./ConversationThread"

const mockMessages: Message[] = [
  { id: "1", role: "user", content: "Hello there", timestamp: "10:00" },
  { id: "2", role: "assistant", content: "Hi! How can I help?", timestamp: "10:01" },
  { id: "3", role: "system", content: "Context updated" },
]

describe("ConversationThread", () => {
  it("renders all messages", () => {
    render(<ConversationThread messages={mockMessages} />)
    expect(screen.getByText("Hello there")).toBeInTheDocument()
    expect(screen.getByText("Hi! How can I help?")).toBeInTheDocument()
    expect(screen.getByText("Context updated")).toBeInTheDocument()
  })

  it("has accessible role=log", () => {
    render(<ConversationThread messages={mockMessages} />)
    expect(screen.getByRole("log")).toBeInTheDocument()
  })

  it("shows timestamps when enabled", () => {
    render(<ConversationThread messages={mockMessages} showTimestamps />)
    expect(screen.getByText("10:00")).toBeInTheDocument()
    expect(screen.getByText("10:01")).toBeInTheDocument()
  })

  it("hides timestamps by default", () => {
    render(<ConversationThread messages={mockMessages} />)
    expect(screen.queryByText("10:00")).not.toBeInTheDocument()
  })

  it("renders empty state with no messages", () => {
    const { container } = render(<ConversationThread messages={[]} />)
    expect(container.querySelector("[role='log']")?.childElementCount).toBe(0)
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ConversationThread ref={ref} messages={[]} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
