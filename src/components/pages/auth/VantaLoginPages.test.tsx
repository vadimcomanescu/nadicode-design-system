import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"

vi.mock("../../ui/vanta/VantaWrapper", () => ({
  VantaWrapper: ({ children }: { children: React.ReactNode }) => <div data-testid="vanta-wrapper">{children}</div>,
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}))

import { VantaLoginPage } from "./VantaLoginPages"
import type { VantaEffect } from "./VantaLoginPages"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

const effects: VantaEffect[] = ['birds', 'globe', 'net', 'cells', 'trunk', 'dots', 'topology']

describe("VantaLoginPage", () => {
  effects.forEach((effect) => {
    it(`renders ${effect} effect without crashing`, () => {
      const { container } = render(<VantaLoginPage effect={effect} />, { wrapper })
      expect(container).toBeTruthy()
    })
  })

  it("accepts custom title and description", () => {
    const { getByText } = render(
      <VantaLoginPage effect="birds" title="Custom Title" description="Custom Desc" />,
      { wrapper }
    )
    expect(getByText("Custom Title")).toBeTruthy()
    expect(getByText("Custom Desc")).toBeTruthy()
  })
})
