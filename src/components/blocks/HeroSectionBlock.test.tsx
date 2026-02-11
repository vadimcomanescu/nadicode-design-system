import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroSection } from "./HeroSectionBlock"

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(<HeroSection />)
    expect(screen.getByText(/Build 10x Faster/)).toBeInTheDocument()
  })

  it("renders start building button", () => {
    render(<HeroSection />)
    expect(screen.getByText("Start Building")).toBeInTheDocument()
  })
})
