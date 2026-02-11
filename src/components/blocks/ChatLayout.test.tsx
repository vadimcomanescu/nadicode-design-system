import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ChatLayout } from "./ChatLayout"

describe("ChatLayout", () => {
  it("renders without crashing", () => {
    render(<ChatLayout />)
    expect(screen.getByText("AI Assistant")).toBeInTheDocument()
  })

  it("renders initial assistant message", () => {
    render(<ChatLayout />)
    expect(screen.getByText("Hello! How can I help you today?")).toBeInTheDocument()
  })

  it("renders message input", () => {
    render(<ChatLayout />)
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument()
  })

  it("renders online status", () => {
    render(<ChatLayout />)
    expect(screen.getByText("Online")).toBeInTheDocument()
  })
})
