import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { OnboardingPage } from "./OnboardingPage"

describe("OnboardingPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <OnboardingPage />
        </ThemeProvider>
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })
})
