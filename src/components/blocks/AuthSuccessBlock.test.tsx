import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthSuccessBlock } from "./AuthSuccessBlock"
import { describe, it, expect, vi } from "vitest"

describe("AuthSuccessBlock", () => {
  it("renders title, description, and button", () => {
    render(
      <AuthSuccessBlock
        icon={<span data-testid="icon" />}
        title="Email verified!"
        description="Your email has been verified."
      />
    )
    expect(screen.getByText("Email verified!")).toBeInTheDocument()
    expect(screen.getByText("Your email has been verified.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument()
  })

  it("renders custom button text", () => {
    render(
      <AuthSuccessBlock
        icon={<span />}
        title="Password changed!"
        description="Updated."
        buttonText="Continue to login"
      />
    )
    expect(screen.getByRole("button", { name: /continue to login/i })).toBeInTheDocument()
  })

  it("calls onContinue when button is clicked", async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    render(
      <AuthSuccessBlock
        icon={<span />}
        title="Done"
        description="All set."
        onContinue={onContinue}
      />
    )
    await user.click(screen.getByRole("button", { name: /continue/i }))
    expect(onContinue).toHaveBeenCalled()
  })

  it("shows countdown when autoRedirectSeconds is set", () => {
    render(
      <AuthSuccessBlock
        icon={<span />}
        title="Done"
        description="All set."
        autoRedirectSeconds={5}
      />
    )
    expect(screen.getByText(/redirecting in 5/i)).toBeInTheDocument()
  })

  it("renders the provided icon", () => {
    render(
      <AuthSuccessBlock
        icon={<span data-testid="custom-icon" />}
        title="Done"
        description="All set."
      />
    )
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
  })
})
