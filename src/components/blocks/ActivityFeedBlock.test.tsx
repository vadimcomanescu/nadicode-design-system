import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { ActivityFeedBlock } from "./ActivityFeedBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("ActivityFeedBlock", () => {
  it("renders without crashing", () => {
    render(<ActivityFeedBlock />, { wrapper })
    expect(screen.getByText("Recent activity")).toBeInTheDocument()
  })

  it("renders default activities", () => {
    render(<ActivityFeedBlock />, { wrapper })
    expect(screen.getByText("Nadia")).toBeInTheDocument()
    expect(screen.getByText(/deployed v2.1.0/)).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<ActivityFeedBlock title="Team Feed" />, { wrapper })
    expect(screen.getByText("Team Feed")).toBeInTheDocument()
  })

  it("renders custom activities", () => {
    const activities = [
      { id: "1", user: "Test User", action: "did something", timestamp: "now" },
    ]
    render(<ActivityFeedBlock activities={activities} />, { wrapper })
    expect(screen.getByText("Test User")).toBeInTheDocument()
  })
})
