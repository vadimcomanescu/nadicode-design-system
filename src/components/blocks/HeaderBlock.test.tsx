import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroHeader } from "./HeaderBlock"

describe("HeroHeader", () => {
  it("renders without crashing", () => {
    render(<HeroHeader />)
    expect(screen.getAllByText("Features").length).toBeGreaterThan(0)
  })

  it("renders login and sign up buttons", () => {
    render(<HeroHeader />)
    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })
})
