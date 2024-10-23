import { expect, test } from "@playwright/test";

test.describe("Main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Remix/);
  });

  test("has image", async ({ page }) => {
    const image = page.locator("img[alt='Remix']:visible");

    await expect(image).toBeVisible();
  });

  test("interactive", async ({ page }) => {
    const toggle = page.locator("label[for='toggle-alert']");
    const alert = page.locator("div[role='alert']");

    await expect(alert).not.toBeVisible();
    await toggle.click();
    await expect(alert).toBeVisible();
  });
});
