import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { DirectoryBlock } from "./DirectoryBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("DirectoryBlock", () => {
  it("renders without crashing", () => {
    render(<DirectoryBlock />, { wrapper })
    expect(screen.getByText("Select a project to view details")).toBeInTheDocument()
  })

  it("renders navigation items", () => {
    render(<DirectoryBlock />, { wrapper })
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders project names", () => {
    render(<DirectoryBlock />, { wrapper })
    expect(screen.getByText("Design Engineering")).toBeInTheDocument()
    expect(screen.getByText("Sales & Marketing")).toBeInTheDocument()
  })
})
