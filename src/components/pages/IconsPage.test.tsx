import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { IconsPage } from "./IconsPage"

describe("IconsPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <IconsPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })

  it("displays the icons heading", () => {
    render(
      <ThemeProvider>
        <IconsPage />
      </ThemeProvider>
    )
    expect(screen.getByText("Icons")).toBeTruthy()
  })
})
