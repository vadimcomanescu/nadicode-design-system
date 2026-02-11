import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PagesShowcase } from "./PagesShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";

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
