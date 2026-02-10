import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AccountLockedBlock } from "./AccountLockedBlock"
import { describe, it, expect, vi } from "vitest"

describe("AccountLockedBlock", () => {
  it("renders locked title", () => {
    render(<AccountLockedBlock />)
    expect(screen.getByText("Account locked")).toBeInTheDocument()
  })

  it("shows too_many_attempts message with minutes", () => {
    render(<AccountLockedBlock reason="too_many_attempts" unlockMinutes={15} />)
    expect(screen.getByText(/too many failed login attempts.*15 minutes/i)).toBeInTheDocument()
  })

  it("shows suspicious_activity message", () => {
    render(<AccountLockedBlock reason="suspicious_activity" />)
    expect(screen.getByText(/unusual activity/i)).toBeInTheDocument()
  })

  it("shows admin message", () => {
    render(<AccountLockedBlock reason="admin" />)
    expect(screen.getByText(/locked by an administrator/i)).toBeInTheDocument()
  })

  it("calls onContactSupport when button is clicked", async () => {
    const user = userEvent.setup()
    const onSupport = vi.fn()
    render(<AccountLockedBlock onContactSupport={onSupport} />)

    await user.click(screen.getByRole("button", { name: /contact support/i }))
    expect(onSupport).toHaveBeenCalled()
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<AccountLockedBlock onBackToLogin={onBack} />)

    await user.click(screen.getByText("Back to login"))
    expect(onBack).toHaveBeenCalled()
  })
})
