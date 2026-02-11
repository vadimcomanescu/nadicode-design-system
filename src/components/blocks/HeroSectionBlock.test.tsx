import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { HeroSection } from "./HeroSectionBlock"

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    )
    expect(screen.getByText(/Build 10x Faster/)).toBeInTheDocument()
  })

  it("renders start building button", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    )
    expect(screen.getByText("Start Building")).toBeInTheDocument()
  })
})
