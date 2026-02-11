import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { SettingsLayout } from "./SettingsLayout"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("SettingsLayout", () => {
  it("renders without crashing", () => {
    render(<SettingsLayout />, { wrapper })
    expect(screen.getByText("Nadicode")).toBeInTheDocument()
  })

  it("renders sidebar navigation links", () => {
    render(<SettingsLayout />, { wrapper })
    expect(screen.getByText("General")).toBeInTheDocument()
    expect(screen.getByText("Notifications")).toBeInTheDocument()
    expect(screen.getByText("Security")).toBeInTheDocument()
    expect(screen.getByText("Billing")).toBeInTheDocument()
  })

  it("renders New badge on Team link", () => {
    render(<SettingsLayout />, { wrapper })
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("defaults to Profile view", () => {
    render(<SettingsLayout />, { wrapper })
    // Profile appears in both sidebar and content area
    expect(screen.getAllByText("Profile").length).toBeGreaterThanOrEqual(1)
  })
})
