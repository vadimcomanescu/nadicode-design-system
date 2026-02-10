import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MagicLinkBlock } from "./MagicLinkBlock"
import { describe, it, expect, vi } from "vitest"

describe("MagicLinkBlock", () => {
  it("renders title and email input", () => {
    render(<MagicLinkBlock />)
    expect(screen.getByText("Sign in with magic link")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("calls onSubmit with email when form is submitted", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MagicLinkBlock onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.click(screen.getByRole("button", { name: /send magic link/i }))

    expect(onSubmit).toHaveBeenCalledWith("test@example.com")
  })

  it("shows expiration notice", () => {
    render(<MagicLinkBlock />)
    expect(screen.getByText(/expires in 15 minutes/i)).toBeInTheDocument()
  })

  it("shows password alternative link", () => {
    render(<MagicLinkBlock />)
    expect(screen.getByText(/prefer password/i)).toBeInTheDocument()
  })
})
