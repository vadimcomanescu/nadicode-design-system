import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { BlocksShowcase } from "@/components/pages/showcase/BlocksShowcase"
import { ComponentsShowcase } from "@/components/pages/showcase/ComponentsShowcase"
import { VoiceAgentsPage } from "@/components/pages/VoiceAgentsPage"
import { LandingPage } from "@/components/pages/LandingPage"

const VIEWPORT_WIDTHS = [375, 768, 1280] as const

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  })
  window.dispatchEvent(new Event("resize"))
}

describe("Opinion: Responsive Route Smoke", () => {
  it.each(VIEWPORT_WIDTHS)(
    "core showcase and page surfaces render at %ipx",
    (width) => {
      setViewportWidth(width)

      const blocks = render(
        <ThemeProvider>
          <BlocksShowcase />
        </ThemeProvider>
      )
      expect(screen.getByText("AI & Voice")).toBeInTheDocument()
      blocks.unmount()

      const components = render(
        <ThemeProvider>
          <ComponentsShowcase
            toast={vi.fn()}
            date={new Date("2026-01-01")}
            setDate={vi.fn()}
            progress={42}
          />
        </ThemeProvider>
      )
      expect(screen.getByText("Actions & Inputs")).toBeInTheDocument()
      components.unmount()

      const voiceAgents = render(
        <ThemeProvider>
          <VoiceAgentsPage />
        </ThemeProvider>
      )
      expect(screen.getByText("Voice Agents")).toBeInTheDocument()
      voiceAgents.unmount()

      const landing = render(
        <ThemeProvider>
          <LandingPage />
        </ThemeProvider>
      )
      expect(landing.container.querySelector(".min-h-dvh")).toBeTruthy()
      landing.unmount()
    },
    15_000
  )
})
