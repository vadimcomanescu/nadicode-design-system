import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { OnboardingPage } from "./OnboardingPage"

describe("OnboardingPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <OnboardingPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
