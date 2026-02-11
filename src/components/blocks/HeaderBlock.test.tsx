import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { HeroHeader } from "./HeaderBlock"

describe("HeroHeader", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    )
    expect(screen.getAllByText("Features").length).toBeGreaterThan(0)
  })

  it("renders login and sign up buttons", () => {
    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    )
    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })
})
