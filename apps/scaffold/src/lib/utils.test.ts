import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra")
  })

  it("should resolve Tailwind conflicts in favor of last class", () => {
    expect(cn("px-4", "px-8")).toBe("px-8")
  })

  it("should handle undefined and null inputs", () => {
    expect(cn("a", undefined, null, "b")).toBe("a b")
  })

  it("should handle empty input", () => {
    expect(cn()).toBe("")
  })

  it("should handle array inputs", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar")
  })
})
