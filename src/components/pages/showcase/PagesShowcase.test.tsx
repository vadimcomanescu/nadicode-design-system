import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PagesShowcase } from "./PagesShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { MemoryRouter } from "react-router-dom";

describe("PagesShowcase", () => {
  it("renders without crashing and shows section heading", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <PagesShowcase />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Example Pages")).toBeInTheDocument();
  });
});
