import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { VoiceAgentsPage } from "./VoiceAgentsPage"

describe("VoiceAgentsPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <VoiceAgentsPage />
        </ThemeProvider>
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })
})
