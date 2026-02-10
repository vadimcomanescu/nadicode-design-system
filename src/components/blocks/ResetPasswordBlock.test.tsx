import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ResetPasswordBlock } from "./ResetPasswordBlock"
import { describe, it, expect, vi } from "vitest"

describe("ResetPasswordBlock", () => {
  it("renders title and password fields", () => {
    render(<ResetPasswordBlock />)
    expect(screen.getByText("Set new password")).toBeInTheDocument()
    expect(screen.getByLabelText("New password")).toBeInTheDocument()
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument()
  })

  it("shows password requirements that update as user types", async () => {
    const user = userEvent.setup()
    render(<ResetPasswordBlock />)

    const list = screen.getByRole("list", { name: "Password requirements" })
    expect(list).toBeInTheDocument()

    await user.type(screen.getByLabelText("New password"), "Abcdefg1!")
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument()
  })

  it("submit button is disabled when requirements are not met", () => {
    render(<ResetPasswordBlock />)
    expect(screen.getByRole("button", { name: /reset password/i })).toBeDisabled()
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<ResetPasswordBlock onBackToLogin={onBack} />)

    await user.click(screen.getByText("Back to login"))
    expect(onBack).toHaveBeenCalled()
  })
})
