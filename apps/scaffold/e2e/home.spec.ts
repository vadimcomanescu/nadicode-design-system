import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should render the heading", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Scaffold Next.js SaaS" })
    ).toBeVisible();
  });

  test("should use glass-panel design system class", async ({ page }) => {
    await page.goto("/");
    const panel = page.locator(".glass-panel");
    await expect(panel).toBeVisible();
  });

  test("should show Get Started button", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Get Started" })
    ).toBeVisible();
  });
});
