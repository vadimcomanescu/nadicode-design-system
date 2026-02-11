import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { PatternsPage } from "./PatternsPage"

describe("PatternsPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <PatternsPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
