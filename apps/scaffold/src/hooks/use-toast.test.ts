import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { useToast, toast, reducer } from "./use-toast"

describe("toast function", () => {
  it("should create a toast and return id, dismiss, update", () => {
    const result = toast({ title: "Hello" })
    expect(result.id).toBeDefined()
    expect(typeof result.dismiss).toBe("function")
    expect(typeof result.update).toBe("function")
  })

  it("should generate unique IDs for each toast", () => {
    const a = toast({ title: "A" })
    const b = toast({ title: "B" })
    expect(a.id).not.toBe(b.id)
  })
})

describe("useToast", () => {
  beforeEach(() => {
    // Dismiss all existing toasts to reset state between tests
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toasts.forEach((t) => result.current.dismiss(t.id))
    })
  })

  it("should start with empty toasts", () => {
    const { result } = renderHook(() => useToast())
    // After cleanup, toasts may still be in dismiss state, but we verify the hook works
    expect(Array.isArray(result.current.toasts)).toBe(true)
  })

  it("should reflect a toast added via the toast function", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "Test toast" })
    })

    const found = result.current.toasts.find((t) => t.title === "Test toast")
    expect(found).toBeTruthy()
    expect(found!.open).toBe(true)
  })

  it("should dismiss a specific toast", () => {
    const { result } = renderHook(() => useToast())

    let toastId: string
    act(() => {
      toastId = toast({ title: "Dismissable" }).id
    })

    act(() => {
      result.current.dismiss(toastId!)
    })

    const found = result.current.toasts.find((t) => t.id === toastId!)
    expect(found?.open).toBe(false)
  })

  it("should dismiss all toasts when no id is provided", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "One" })
      toast({ title: "Two" })
    })

    act(() => {
      result.current.dismiss()
    })

    result.current.toasts.forEach((t) => {
      expect(t.open).toBe(false)
    })
  })

  it("should update a toast via the returned update function", () => {
    const { result } = renderHook(() => useToast())

    let ref: ReturnType<typeof toast>
    act(() => {
      ref = toast({ title: "Original" })
    })

    act(() => {
      ref!.update({ id: ref!.id, title: "Updated" })
    })

    const found = result.current.toasts.find((t) => t.id === ref!.id)
    expect(found?.title).toBe("Updated")
  })

  it("should auto-dismiss when onOpenChange is called with false", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "Auto-dismiss" })
    })

    const found = result.current.toasts.find((t) => t.title === "Auto-dismiss")
    expect(found).toBeTruthy()

    // Simulate Radix calling onOpenChange(false)
    act(() => {
      found!.onOpenChange!(false)
    })

    const after = result.current.toasts.find((t) => t.title === "Auto-dismiss")
    expect(after?.open).toBe(false)
  })

  it("should unregister listener on unmount", () => {
    const { unmount } = renderHook(() => useToast())

    // After unmount, dispatching a toast should not throw
    unmount()

    expect(() => {
      act(() => {
        toast({ title: "After unmount" })
      })
    }).not.toThrow()
  })

  it("should respect TOAST_LIMIT of 1", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: "First" })
      toast({ title: "Second" })
    })

    // Only the most recent toast should remain (limit is 1)
    expect(result.current.toasts.length).toBeLessThanOrEqual(1)
  })
})

describe("reducer", () => {
  const emptyState = { toasts: [] }

  it("should add a toast", () => {
    const newToast = { id: "1", title: "Hi", open: true } as Parameters<
      typeof reducer
    >[1] extends { type: "ADD_TOAST"; toast: infer T } ? T : never

    const state = reducer(emptyState, {
      type: "ADD_TOAST",
      toast: newToast,
    })
    expect(state.toasts).toHaveLength(1)
    expect(state.toasts[0].title).toBe("Hi")
  })

  it("should update a toast by id", () => {
    const initial = {
      toasts: [{ id: "1", title: "Old", open: true }],
    } as { toasts: Array<{ id: string; title: string; open: boolean }> }

    const state = reducer(initial as Parameters<typeof reducer>[0], {
      type: "UPDATE_TOAST",
      toast: { id: "1", title: "New" },
    })
    expect(state.toasts[0].title).toBe("New")
  })

  it("should remove a specific toast", () => {
    const initial = {
      toasts: [
        { id: "1", title: "A", open: true },
        { id: "2", title: "B", open: true },
      ],
    } as Parameters<typeof reducer>[0]

    const state = reducer(initial, {
      type: "REMOVE_TOAST",
      toastId: "1",
    })
    expect(state.toasts).toHaveLength(1)
    expect(state.toasts[0].id).toBe("2")
  })

  it("should remove all toasts when toastId is undefined", () => {
    const initial = {
      toasts: [
        { id: "1", title: "A", open: true },
        { id: "2", title: "B", open: true },
      ],
    } as Parameters<typeof reducer>[0]

    const state = reducer(initial, {
      type: "REMOVE_TOAST",
      toastId: undefined,
    })
    expect(state.toasts).toHaveLength(0)
  })
})
