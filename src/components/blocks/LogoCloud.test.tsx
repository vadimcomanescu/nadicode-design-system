import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LogoCloud } from "./LogoCloud"

describe("LogoCloud (standalone)", () => {
  it("renders without crashing", () => {
    render(<LogoCloud />)
    expect(screen.getByText("Your favorite companies are our partners.")).toBeInTheDocument()
  })

  it("renders partner logos", () => {
    render(<LogoCloud />)
    expect(screen.getByAltText("Nvidia Logo")).toBeInTheDocument()
    expect(screen.getByAltText("GitHub Logo")).toBeInTheDocument()
  })
})
