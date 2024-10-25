import items from "@mocks/items";
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

    await toggle.scrollIntoViewIfNeeded();
    await expect(alert).not.toBeVisible();

    await toggle.click();
    await alert.scrollIntoViewIfNeeded();

    await expect(alert).toBeVisible();
  });
});

test.describe("Posts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/posts");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Available items/);
  });

  test("has posts", async ({ page }) => {
    const listItems = page.locator("ul li");

    // API has 13 items, mocks has 6, if this works this means mocking server is working
    expect(await listItems.count()).toBe(items.length);
  });
});
