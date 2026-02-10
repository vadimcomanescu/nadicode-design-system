import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CheckEmailBlock } from "./CheckEmailBlock"
import { describe, it, expect, vi } from "vitest"

describe("CheckEmailBlock", () => {
  it("renders verification title by default", () => {
    render(<CheckEmailBlock />)
    expect(screen.getByText("Verify your email")).toBeInTheDocument()
  })

  it("renders reset title when type is reset", () => {
    render(<CheckEmailBlock type="reset" />)
    expect(screen.getByText("Check your email")).toBeInTheDocument()
  })

  it("displays email in a badge when provided", () => {
    render(<CheckEmailBlock email="test@example.com" />)
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
  })

  it("calls onResend when resend button is clicked", async () => {
    const user = userEvent.setup()
    const onResend = vi.fn()
    render(<CheckEmailBlock onResend={onResend} />)

    await user.click(screen.getByRole("button", { name: /resend email/i }))
    expect(onResend).toHaveBeenCalled()
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<CheckEmailBlock onBackToLogin={onBack} />)

    await user.click(screen.getByText("Back to login"))
    expect(onBack).toHaveBeenCalled()
  })
})
