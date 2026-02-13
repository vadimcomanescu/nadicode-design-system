import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { VoiceAgentCard } from "./VoiceAgentCard"

const agent = {
  id: "aria",
  name: "Aria",
  role: "Creative Director",
  avatar: "/avatars/agent-aria.webp",
}

describe("VoiceAgentCard", () => {
  it("renders as an interactive button when onSelect is provided", () => {
    render(<VoiceAgentCard agent={agent} state="idle" onSelect={() => {}} />)
    const card = screen.getByRole("button", { name: /Aria/i })
    expect(card).toHaveAttribute("aria-pressed", "false")
    expect(card).not.toBeDisabled()
  })

  it("calls onSelect on click", () => {
    const onSelect = vi.fn()
    render(<VoiceAgentCard agent={agent} state="idle" onSelect={onSelect} />)
    fireEvent.click(screen.getByRole("button", { name: /Aria/i }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it("disables interaction when no onSelect handler is passed", () => {
    render(<VoiceAgentCard agent={agent} state="idle" />)
    expect(screen.getByRole("button", { name: /Aria/i })).toBeDisabled()
  })

  it("shows selected state badge and aria-pressed", () => {
    render(<VoiceAgentCard agent={agent} state="speaking" selected onSelect={() => {}} />)
    expect(screen.getByRole("button", { name: /Aria/i })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByText("Speaking")).toBeInTheDocument()
  })
})
