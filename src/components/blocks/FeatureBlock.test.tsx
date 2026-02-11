import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { FeatureGrid, FeatureList } from "./FeatureBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("FeatureGrid", () => {
  it("renders without crashing", () => {
    render(<FeatureGrid />, { wrapper })
    expect(screen.getByText("Everything you need to build")).toBeInTheDocument()
  })

  it("renders feature cards", () => {
    render(<FeatureGrid />, { wrapper })
    expect(screen.getByText("Edge Network")).toBeInTheDocument()
    expect(screen.getByText("Vector Database")).toBeInTheDocument()
    expect(screen.getByText("API First")).toBeInTheDocument()
  })

  it("renders capabilities badge", () => {
    render(<FeatureGrid />, { wrapper })
    expect(screen.getByText("Capabilities")).toBeInTheDocument()
  })
})

describe("FeatureList", () => {
  it("renders without crashing", () => {
    render(<FeatureList />, { wrapper })
    expect(screen.getByText("Unified Component Architecture")).toBeInTheDocument()
  })

  it("renders both feature sections", () => {
    render(<FeatureList />, { wrapper })
    expect(screen.getByText("Secure by Default")).toBeInTheDocument()
  })
})
