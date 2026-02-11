import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactBlock } from "./ContactBlock"

describe("ContactBlock", () => {
  it("renders without crashing", () => {
    render(<ContactBlock />)
    expect(screen.getByText("Get in touch")).toBeInTheDocument()
  })

  it("renders form fields", () => {
    render(<ContactBlock />)
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Tell us what you need...")).toBeInTheDocument()
  })

  it("renders send button", () => {
    render(<ContactBlock />)
    expect(screen.getByText("Send message")).toBeInTheDocument()
  })
})
