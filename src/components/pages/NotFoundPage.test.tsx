import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { NotFoundPage } from "./NotFoundPage"

describe("NotFoundPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <NotFoundPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
