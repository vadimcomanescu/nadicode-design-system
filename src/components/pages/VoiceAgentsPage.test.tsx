import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { VoiceAgentsPage } from "./VoiceAgentsPage"

describe("VoiceAgentsPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <VoiceAgentsPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
