import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Features } from "./FeatureGridBlock"

describe("Features", () => {
  it("renders without crashing", () => {
    render(<Features />)
    expect(screen.getByText(/Built to cover your needs/)).toBeInTheDocument()
  })

  it("renders feature cards", () => {
    render(<Features />)
    expect(screen.getByText("Customizable")).toBeInTheDocument()
    expect(screen.getByText("You have full control")).toBeInTheDocument()
    expect(screen.getByText("Powered By AI")).toBeInTheDocument()
  })
})
