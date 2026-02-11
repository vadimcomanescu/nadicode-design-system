import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { DataGridBlock } from "./DataGridBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("DataGridBlock", () => {
  it("renders without crashing", () => {
    render(<DataGridBlock />, { wrapper })
    expect(screen.getByText("Recent Transactions")).toBeInTheDocument()
  })

  it("renders table description", () => {
    render(<DataGridBlock />, { wrapper })
    expect(screen.getByText(/sophisticated data grid/)).toBeInTheDocument()
  })

  it("renders data rows", () => {
    render(<DataGridBlock />, { wrapper })
    expect(screen.getByText("m@example.com")).toBeInTheDocument()
  })
})
