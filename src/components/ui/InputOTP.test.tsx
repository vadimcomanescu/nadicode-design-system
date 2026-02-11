import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './InputOTP'

describe('InputOTP', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders without crashing', () => {
    vi.useFakeTimers()
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(container).toBeTruthy()
  })

  it('renders separator', () => {
    vi.useFakeTimers()
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(container.querySelector('[role="separator"]')).toBeTruthy()
  })
})
