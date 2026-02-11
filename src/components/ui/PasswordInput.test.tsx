import { createRef } from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordInput } from "./PasswordInput"
import { describe, it, expect } from "vitest"

describe("PasswordInput", () => {
  it("renders as password type by default", () => {
    render(<PasswordInput label="Password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toHaveAttribute("type", "password")
  })

  it("toggles visibility when toggle button is clicked", async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" />)
    const input = screen.getByLabelText("Password")
    const toggle = screen.getByRole("button", { name: "Show password" })

    expect(input).toHaveAttribute("type", "password")

    await user.click(toggle)
    expect(input).toHaveAttribute("type", "text")
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Hide password" }))
    expect(input).toHaveAttribute("type", "password")
  })

  it("forwards ref to input element", () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordInput ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("renders label and error", () => {
    render(<PasswordInput label="Password" error="Required" />)
    expect(screen.getByText("Password")).toBeInTheDocument()
    expect(screen.getByText("Required")).toBeInTheDocument()
  })
})
