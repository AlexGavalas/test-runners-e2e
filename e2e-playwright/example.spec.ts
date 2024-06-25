import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await page.getByRole("link", { name: "Get started" }).click();

  await expect(page).toHaveURL(/.*intro/);
});

test("it can take a screenshot of part of the screen", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const nav = await page.$("nav");

  await expect(page).toHaveScreenshot("nav.png", {
    clip: (await nav?.boundingBox()) ?? undefined,
  });
});

test("it can ignore an element when taking a screenshot", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const nav = page.locator("nav");

  await expect(page).toHaveScreenshot("page-with-nav-masked.png", {
    mask: [nav],
  });
});

test("it can take a full screen screenshot", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveScreenshot("full-page.png", { fullPage: true });
});

test("it can take a screenshot of a specific coordinates bound box", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveScreenshot("specific-coordinates-bound-box.png", {
    clip: {
      x: 20,
      y: 30,
      width: 100,
      height: 100,
    },
  });
});
