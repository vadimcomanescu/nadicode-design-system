import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatsGeneric } from "./StatsBlock"

describe("StatsGeneric", () => {
  it("renders without crashing", () => {
    render(<StatsGeneric />)
    expect(screen.getByText("Total Revenue")).toBeInTheDocument()
  })

  it("renders all stat cards", () => {
    render(<StatsGeneric />)
    expect(screen.getByText("Subscriptions")).toBeInTheDocument()
    expect(screen.getByText("Sales")).toBeInTheDocument()
    expect(screen.getByText("Active Now")).toBeInTheDocument()
  })

  it("renders percentage changes", () => {
    render(<StatsGeneric />)
    expect(screen.getByText("+20.1%")).toBeInTheDocument()
  })
})
