import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EmailVerifiedBlock } from "./EmailVerifiedBlock"
import { describe, it, expect, vi } from "vitest"

describe("EmailVerifiedBlock", () => {
  it("renders success message", () => {
    render(<EmailVerifiedBlock />)
    expect(screen.getByText("Email verified!")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument()
  })

  it("calls onContinue when button is clicked", async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    render(<EmailVerifiedBlock onContinue={onContinue} />)

    await user.click(screen.getByRole("button", { name: /continue/i }))
    expect(onContinue).toHaveBeenCalled()
  })

  it("shows countdown when autoRedirectSeconds is set", () => {
    render(<EmailVerifiedBlock autoRedirectSeconds={3} />)
    expect(screen.getByText(/redirecting in 3/i)).toBeInTheDocument()
  })
})
