import { expect, test } from "@playwright/test";

async function openAndAssertAudio(page: import("@playwright/test").Page, path: string, expectedSrcPart: string) {
  await page.goto(path);
  await page.getByRole("button", { name: "Buka undangan" }).click();
  await page.waitForTimeout(1200);
  const audio = page.locator("audio");
  await expect(audio).toHaveAttribute("src", new RegExp(expectedSrcPart.replace(/%/g, "%")));
  const paused = await audio.evaluate((el: HTMLAudioElement) => el.paused);
  expect(paused).toBe(false);
  await expect(page.locator(".background-music-toggle")).toBeVisible();
}

test.describe("song variants", () => {
  test("default route plays song 1 and honors query params", async ({ page }) => {
    await page.goto("/?to=Rani&invitation=1");
    await expect(page.locator("[data-guest-name]")).toHaveText("Rani");
    await page.getByRole("button", { name: "Buka undangan" }).click();
    await page.waitForTimeout(1200);
    const src = await page.locator("audio").getAttribute("src");
    expect(src).toContain("Love%20Love%20Love");
    const paused = await page.locator("audio").evaluate((el: HTMLAudioElement) => el.paused);
    expect(paused).toBe(false);
    await expect(page.locator(".background-music-toggle")).toBeVisible();
    await expect(page.getByText("10:30 - 12:00 WIB")).toBeVisible();
  });

  test("/song2 plays song 2 with family fallback", async ({ page }) => {
    await openAndAssertAudio(page, "/song2", "Stephen%20Sanchez");
    await expect(page.getByText("10:30 - 12:00 WIB")).toBeVisible();
  });

  test("/song2/family plays song 2 with family time", async ({ page }) => {
    await openAndAssertAudio(page, "/song2/family", "Stephen%20Sanchez");
    await expect(page.getByText("10:30 - 12:00 WIB")).toBeVisible();
  });

  test("/song2/sesi2 plays song 2 with friend time", async ({ page }) => {
    await openAndAssertAudio(page, "/song2/sesi2", "Stephen%20Sanchez");
    await expect(page.getByText("12:30 - 14:00 WIB")).toBeVisible();
  });

  test("/sesi2 still plays song 1 (original route preserved)", async ({ page }) => {
    await openAndAssertAudio(page, "/sesi2", "Love%20Love%20Love");
    await expect(page.getByText("12:30 - 14:00 WIB")).toBeVisible();
  });

  test("/family still plays song 1 (original route preserved)", async ({ page }) => {
    await openAndAssertAudio(page, "/family", "Love%20Love%20Love");
    await expect(page.getByText("10:30 - 12:00 WIB")).toBeVisible();
  });

  test("/song2/sesi2?to=Dewi&invitation=2 preserves query params", async ({ page }) => {
    await page.goto("/song2/sesi2?to=Dewi&invitation=2");
    await expect(page.locator("[data-guest-name]")).toHaveText("Dewi");
    await page.getByRole("button", { name: "Buka undangan" }).click();
    await page.waitForTimeout(1200);
    await expect(page.getByText("12:30 - 14:00 WIB")).toBeVisible();
    const src = await page.locator("audio").getAttribute("src");
    expect(src).toContain("Stephen%20Sanchez");
  });
});
