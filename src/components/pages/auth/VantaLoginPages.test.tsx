import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"

// Mock VantaWrapper since it loads WebGL effects that don't work in jsdom
vi.mock("../../ui/vanta/VantaWrapper", () => ({
  VantaWrapper: ({ children }: { children: React.ReactNode }) => <div data-testid="vanta-wrapper">{children}</div>,
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}))

import {
  LoginBirdsDark,
  LoginGlobeDark,
  LoginNetDark,
  LoginCellsLight,
  LoginTrunkLight,
  LoginDotsLight,
  LoginTopologyDark,
} from "./VantaLoginPages"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("VantaLoginPages", () => {
  it("LoginBirdsDark renders without crashing", () => {
    const { container } = render(<LoginBirdsDark />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginGlobeDark renders without crashing", () => {
    const { container } = render(<LoginGlobeDark />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginNetDark renders without crashing", () => {
    const { container } = render(<LoginNetDark />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginCellsLight renders without crashing", () => {
    const { container } = render(<LoginCellsLight />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginTrunkLight renders without crashing", () => {
    const { container } = render(<LoginTrunkLight />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginDotsLight renders without crashing", () => {
    const { container } = render(<LoginDotsLight />, { wrapper })
    expect(container).toBeTruthy()
  })

  it("LoginTopologyDark renders without crashing", () => {
    const { container } = render(<LoginTopologyDark />, { wrapper })
    expect(container).toBeTruthy()
  })
})
