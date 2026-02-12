import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordRecoveryBlock } from "./PasswordRecoveryBlock"
import { describe, it, expect, vi } from "vitest"

describe("PasswordRecoveryBlock", () => {
  describe("reset mode", () => {
    it("renders forgot password title and email input", () => {
      render(<PasswordRecoveryBlock mode="reset" />)
      expect(screen.getByText("Forgot password?")).toBeInTheDocument()
      expect(screen.getByLabelText("Email")).toBeInTheDocument()
    })

    it("renders send reset link button", () => {
      render(<PasswordRecoveryBlock mode="reset" />)
      expect(screen.getByRole("button", { name: /send reset link/i })).toBeInTheDocument()
    })

    it("calls onSubmit with email when form is submitted", async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn()
      render(<PasswordRecoveryBlock mode="reset" onSubmit={onSubmit} />)
      await user.type(screen.getByLabelText("Email"), "test@example.com")
      await user.click(screen.getByRole("button", { name: /send reset link/i }))
      expect(onSubmit).toHaveBeenCalledWith("test@example.com")
    })
  })

  describe("magic-link mode", () => {
    it("renders magic link title and email input", () => {
      render(<PasswordRecoveryBlock mode="magic-link" />)
      expect(screen.getByText("Sign in with magic link")).toBeInTheDocument()
      expect(screen.getByLabelText("Email")).toBeInTheDocument()
    })

    it("renders send magic link button", () => {
      render(<PasswordRecoveryBlock mode="magic-link" />)
      expect(screen.getByRole("button", { name: /send magic link/i })).toBeInTheDocument()
    })

    it("shows password alternative link", () => {
      render(<PasswordRecoveryBlock mode="magic-link" />)
      expect(screen.getByText(/prefer password/i)).toBeInTheDocument()
    })
  })

  it("shows back to login link", () => {
    render(<PasswordRecoveryBlock />)
    expect(screen.getByText(/back to login/i)).toBeInTheDocument()
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<PasswordRecoveryBlock onBackToLogin={onBack} />)
    await user.click(screen.getByText(/back to login/i))
    expect(onBack).toHaveBeenCalled()
  })
})
