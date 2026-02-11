import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TwoFactorChallengeBlock } from "./TwoFactorChallengeBlock"
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest"

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

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
  cleanup()
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

describe("TwoFactorChallengeBlock", () => {
  it("renders title and OTP input", () => {
    render(<TwoFactorChallengeBlock />)
    expect(screen.getByText("Two-factor authentication")).toBeInTheDocument()
    expect(screen.getByText(/enter the 6-digit code/i)).toBeInTheDocument()
  })

  it("shows error alert when error prop is provided", () => {
    render(<TwoFactorChallengeBlock error="Invalid code" />)
    expect(screen.getByText("Invalid code")).toBeInTheDocument()
  })

  it("renders backup code link", () => {
    const onUseBackup = vi.fn()
    render(<TwoFactorChallengeBlock onUseBackupCode={onUseBackup} />)
    expect(screen.getByText("Use a backup code")).toBeInTheDocument()
  })

  it("calls onUseBackupCode when backup link is clicked", async () => {
    const user = userEvent.setup()
    const onUseBackup = vi.fn()
    render(<TwoFactorChallengeBlock onUseBackupCode={onUseBackup} />)

    await user.click(screen.getByText("Use a backup code"))
    expect(onUseBackup).toHaveBeenCalled()
  })

  it("calls onBackToLogin when back link is clicked", async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<TwoFactorChallengeBlock onBackToLogin={onBack} />)

    await user.click(screen.getByText("Back to login"))
    expect(onBack).toHaveBeenCalled()
  })
})
