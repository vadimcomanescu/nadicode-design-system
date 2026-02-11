import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroCentered, HeroSplit } from "./HeroBlock"

describe("HeroCentered", () => {
  it("renders without crashing", () => {
    render(<HeroCentered />)
    expect(screen.getByText("Get Started")).toBeInTheDocument()
  })

  it("renders custom headline", () => {
    render(<HeroCentered headline="Custom Headline Here" />)
    expect(screen.getByText(/Custom/)).toBeInTheDocument()
  })

  it("renders announcement badge", () => {
    render(<HeroCentered />)
    expect(screen.getByText("New")).toBeInTheDocument()
  })
})

describe("HeroSplit", () => {
  it("renders without crashing", () => {
    render(<HeroSplit />)
    expect(screen.getByText("Start Building")).toBeInTheDocument()
  })

  it("renders AI-Powered Components badge", () => {
    render(<HeroSplit />)
    expect(screen.getByText("AI-Powered Components")).toBeInTheDocument()
  })
})
