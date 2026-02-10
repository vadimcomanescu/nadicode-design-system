import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordChangedBlock } from "./PasswordChangedBlock"
import { describe, it, expect, vi } from "vitest"

describe("PasswordChangedBlock", () => {
  it("renders success message", () => {
    render(<PasswordChangedBlock />)
    expect(screen.getByText("Password changed!")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /continue to login/i })).toBeInTheDocument()
  })

  it("calls onContinue when button is clicked", async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    render(<PasswordChangedBlock onContinue={onContinue} />)

    await user.click(screen.getByRole("button", { name: /continue to login/i }))
    expect(onContinue).toHaveBeenCalled()
  })

  it("shows countdown when autoRedirectSeconds is set", () => {
    render(<PasswordChangedBlock autoRedirectSeconds={5} />)
    expect(screen.getByText(/redirecting in 5/i)).toBeInTheDocument()
  })
})
