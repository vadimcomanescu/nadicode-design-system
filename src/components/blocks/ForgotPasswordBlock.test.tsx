import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ForgotPasswordBlock } from "./ForgotPasswordBlock"
import { describe, it, expect, vi } from "vitest"

describe("ForgotPasswordBlock", () => {
  it("renders title and email input", () => {
    render(<ForgotPasswordBlock />)
    expect(screen.getByText("Forgot password?")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("calls onSubmit with email when form is submitted", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ForgotPasswordBlock onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.click(screen.getByRole("button", { name: /send reset link/i }))

    expect(onSubmit).toHaveBeenCalledWith("test@example.com")
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<ForgotPasswordBlock onBackToLogin={onBack} />)

    await user.click(screen.getByText("Back to login"))
    expect(onBack).toHaveBeenCalled()
  })
})
