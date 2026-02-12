import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/lib/ThemeProvider";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { PagesShowcase } from "./PagesShowcase";

describe("PagesShowcase", () => {
  it("renders without crashing and shows section heading", () => {
    render(
      <ThemeProvider>
        <PagesShowcase />
      </ThemeProvider>
    );
    expect(screen.getByText("Example Pages")).toBeInTheDocument();
  });
});
