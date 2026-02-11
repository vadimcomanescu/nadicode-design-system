import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartsShowcase } from "./ChartsShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";

describe("ChartsShowcase", () => {
  it("renders without crashing and shows section heading", () => {
    render(
      <ThemeProvider>
        <ChartsShowcase />
      </ThemeProvider>
    );
    expect(screen.getByText("Data Visualization & Charts")).toBeInTheDocument();
  });
});
