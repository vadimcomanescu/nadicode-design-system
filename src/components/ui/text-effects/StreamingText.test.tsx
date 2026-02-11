import { createRef } from "react";
import { describe, it, expect, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { StreamingText } from "./StreamingText"

describe("StreamingText", () => {
  it("renders with role=status for accessibility", () => {
    render(<StreamingText text="Hello" streaming={false} />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("streams text character by character", async () => {
    vi.useFakeTimers()
    render(<StreamingText text="Hi" speed={1} interval={50} />)

    // Initially empty
    expect(screen.getByRole("status")).toHaveTextContent("")

    // After one tick
    act(() => { vi.advanceTimersByTime(50) })
    expect(screen.getByRole("status")).toHaveTextContent("H")

    // After two ticks
    act(() => { vi.advanceTimersByTime(50) })
    expect(screen.getByRole("status")).toHaveTextContent("Hi")

    vi.useRealTimers()
  })

  it("calls onComplete when streaming finishes", () => {
    vi.useFakeTimers()
    const onComplete = vi.fn()
    render(<StreamingText text="AB" speed={2} interval={10} onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(10) })
    // speed=2 reveals both chars in one tick
    act(() => { vi.advanceTimersByTime(10) })

    expect(onComplete).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it("hides cursor when streaming is complete", () => {
    vi.useFakeTimers()
    const { container } = render(
      <StreamingText text="A" speed={1} interval={10} showCursor />
    )

    // Cursor visible while streaming
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(10) })
    // After complete, trigger re-render cycle
    act(() => { vi.advanceTimersByTime(10) })

    // Cursor hidden after completion
    expect(container.querySelector("[aria-hidden='true']")).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<StreamingText ref={ref} text="Test" streaming={false} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

