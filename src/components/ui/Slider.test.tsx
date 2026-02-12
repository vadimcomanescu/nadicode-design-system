import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

// Mock motion/react: motion.div/span render as plain HTML,
// motion value hooks return stubs that satisfy the component.
vi.mock("motion/react", () => {
  const cache = new Map<
    string,
    React.ForwardRefExoticComponent<Record<string, unknown>>
  >();

  function getMotionComponent(tag: string) {
    if (!cache.has(tag)) {
      const Comp = React.forwardRef<HTMLElement, Record<string, unknown>>(
        ({ children, style, ...rest }, ref) => {
          return React.createElement(
            tag,
            {
              ref,
              style: typeof style === "object" ? style : undefined,
              ...rest,
            },
            children as React.ReactNode
          );
        }
      );
      Comp.displayName = `motion.${tag}`;
      cache.set(tag, Comp);
    }
    return cache.get(tag)!;
  }

  const motionProxy = new Proxy(
    {},
    {
      get(_target, prop) {
        return getMotionComponent(String(prop));
      },
    }
  );

  // Minimal MotionValue stub
  function createMotionValue(initial: number) {
    let value = initial;
    return {
      get: () => value,
      set: (v: number) => {
        value = v;
      },
      onChange: () => () => {},
      on: () => () => {},
      destroy: () => {},
    };
  }

  return {
    motion: motionProxy,
    useMotionValue: (initial: number) => createMotionValue(initial),
    useSpring: (source: ReturnType<typeof createMotionValue>) => source,
    useTransform: (
      _source: ReturnType<typeof createMotionValue>,
      inputOrFn: number[] | ((v: number) => unknown),
      output?: number[]
    ) => {
      if (typeof inputOrFn === "function") {
        return createMotionValue(0);
      }
      return createMotionValue(output ? output[1] : 0);
    },
  };
});

import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with label and value displayed", () => {
    render(<Slider label="Opacity" defaultValue={0.5} />);
    expect(screen.getByText("Opacity")).toBeInTheDocument();
    expect(screen.getByText("0.50")).toBeInTheDocument();
  });

  it("renders with role='slider' and correct ARIA attributes", () => {
    render(
      <Slider label="Volume" defaultValue={50} min={0} max={100} step={1} />
    );
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-label", "Volume");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Slider label="Test" className="custom-slider" />
    );
    expect(container.querySelector(".custom-slider")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Slider label="Disabled" disabled />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
    expect(slider).toHaveAttribute("tabindex", "-1");
  });

  it("uses controlled value via value prop", () => {
    const { rerender } = render(
      <Slider label="Controlled" value={30} min={0} max={100} step={1} />
    );
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30");

    rerender(
      <Slider label="Controlled" value={70} min={0} max={100} step={1} />
    );
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "70");
  });

  it("renders with defaultValue as uncontrolled", () => {
    render(
      <Slider
        label="Uncontrolled"
        defaultValue={25}
        min={0}
        max={100}
        step={1}
      />
    );
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "25");
  });

  it("calls onChange when value changes via keyboard", async () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="Keyboard"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
    );
    const slider = screen.getByRole("slider");
    slider.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(handleChange).toHaveBeenCalledWith(51);
  });

  it("formats value with custom formatValue function", () => {
    render(
      <Slider
        label="Custom"
        defaultValue={0.75}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
    );
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("decreases value with ArrowLeft", async () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="Nav"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
    );
    const slider = screen.getByRole("slider");
    slider.focus();

    await userEvent.keyboard("{ArrowLeft}");
    expect(handleChange).toHaveBeenCalledWith(49);
  });

  it("jumps to min on Home and max on End", async () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="HomeEnd"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
    );
    const slider = screen.getByRole("slider");
    slider.focus();

    await userEvent.keyboard("{Home}");
    expect(handleChange).toHaveBeenCalledWith(0);

    await userEvent.keyboard("{End}");
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Slider ref={ref} label="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toHaveAttribute("role", "slider");
  });

  it("does not respond to keyboard when disabled", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="Disabled"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        disabled
        onChange={handleChange}
      />
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("displays formatted value for integer range", () => {
    render(
      <Slider label="Percent" defaultValue={50} min={0} max={100} step={1} />
    );
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("displays formatted value for 0-1 range", () => {
    render(<Slider label="Opacity" defaultValue={0.33} />);
    expect(screen.getByText("0.33")).toBeInTheDocument();
  });

  it("clamps keyboard values at min boundary", async () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="Clamp"
        defaultValue={0}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
    );
    const slider = screen.getByRole("slider");
    slider.focus();

    await userEvent.keyboard("{ArrowLeft}");
    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
