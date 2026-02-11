import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { IntegrationsSection } from "./IntegrationsBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </ThemeProvider>
)

describe("IntegrationsSection", () => {
  it("renders without crashing", () => {
    render(<IntegrationsSection />, { wrapper })
    expect(screen.getByText(/Integrate with your favorite tools/)).toBeInTheDocument()
  })

  it("renders integration cards", () => {
    render(<IntegrationsSection />, { wrapper })
    expect(screen.getByText("Google Gemini")).toBeInTheDocument()
    expect(screen.getByText("Replit")).toBeInTheDocument()
    expect(screen.getByText("Magic UI")).toBeInTheDocument()
  })
})
