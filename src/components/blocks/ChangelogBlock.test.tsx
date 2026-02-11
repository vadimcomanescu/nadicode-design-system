import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { ChangelogBlock } from "./ChangelogBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("ChangelogBlock", () => {
  it("renders without crashing", () => {
    render(<ChangelogBlock />, { wrapper })
    expect(screen.getByText("Changelog")).toBeInTheDocument()
  })

  it("renders version badges", () => {
    render(<ChangelogBlock />, { wrapper })
    expect(screen.getByText("v2.1.0")).toBeInTheDocument()
    expect(screen.getByText("v2.0.0")).toBeInTheDocument()
  })

  it("renders Latest badge for first entry", () => {
    render(<ChangelogBlock />, { wrapper })
    expect(screen.getByText("Latest")).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<ChangelogBlock title="What's New" />, { wrapper })
    expect(screen.getByText("What's New")).toBeInTheDocument()
  })
})
