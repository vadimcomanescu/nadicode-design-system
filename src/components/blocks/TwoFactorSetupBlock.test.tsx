import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TwoFactorSetupBlock } from "./TwoFactorSetupBlock"
import { describe, it, expect, beforeAll } from "vitest"

beforeAll(() => {
  if (!globalThis.ResizeObserver) {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver
  }
  if (!document.elementFromPoint) {
    document.elementFromPoint = () => null
  }
})

describe("TwoFactorSetupBlock", () => {
  it("renders title and wizard steps", () => {
    render(<TwoFactorSetupBlock />)
    expect(screen.getByText("Set up two-factor authentication")).toBeInTheDocument()
    expect(screen.getByText("Scan QR code")).toBeInTheDocument()
    expect(screen.getByText("Verify code")).toBeInTheDocument()
    expect(screen.getByText("Save backup codes")).toBeInTheDocument()
  })

  it("renders QR code placeholder when no URL provided", () => {
    render(<TwoFactorSetupBlock />)
    expect(screen.getByText("QR Code")).toBeInTheDocument()
  })

  it("renders manual entry trigger", () => {
    render(<TwoFactorSetupBlock />)
    expect(screen.getByText(/can't scan/i)).toBeInTheDocument()
  })

  it("reveals secret when collapsible trigger is clicked", async () => {
    const user = userEvent.setup()
    render(<TwoFactorSetupBlock secret="CUSTOM-SECRET" />)

    await user.click(screen.getByText(/can't scan/i))
    expect(screen.getByText("CUSTOM-SECRET")).toBeInTheDocument()
  })
})
