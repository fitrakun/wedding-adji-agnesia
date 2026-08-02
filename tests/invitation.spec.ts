import { expect, test } from "@playwright/test";

async function openInvitation(page: import("@playwright/test").Page, path = "/family") {
  await page.goto(path);
  await page.getByRole("button", { name: "Buka undangan" }).click();
}

test.describe("semantic layered invitation", () => {
  test("personalizes the opening and RSVP name from the to query", async ({ page }) => {
    await page.goto("/family?to=Bapak%20Andi%20%26%20Ibu%20Sari");
    await expect(page.locator("[data-guest-name]")).toHaveText("Bapak Andi & Ibu Sari");
    await page.getByRole("button", { name: "Buka undangan" }).click();
    await expect(page.getByLabel("Nama")).toHaveValue("Bapak Andi & Ibu Sari");
  });

  test("uses Fitra when the to query is missing or empty", async ({ page }) => {
    await page.goto("/family?to=%20%20");
    await expect(page.locator("[data-guest-name]")).toHaveText("Fitra");
  });

  test("uses real text and separate decorative layers", async ({ page }) => {
    await page.goto("/family");
    await expect(page.getByRole("heading", { name: "Agnesia & Adji" })).toBeVisible();
    await expect(page.locator("[data-opening-title]")).toContainText("Agnesia");
    await expect(page.locator('[data-flower-layer="far"] img, img[data-flower-layer="far"]')).not.toHaveCount(0);
    await expect(page.locator('img[src*="assets/pages"], img[src*="invitation-0"]')).toHaveCount(0);
  });

  test("date, route time, and RSVP controls are HTML", async ({ page }) => {
    await openInvitation(page);
    await expect(page.getByText("Sabtu, 22 Agustus 2026")).toBeVisible();
    await expect(page.getByText("10:30 - 12:00 WIB")).toBeVisible();
    await expect(page.getByLabel("Nama")).toHaveJSProperty("tagName", "INPUT");
    await expect(page.getByLabel("Konfirmasi Kehadiran")).toHaveJSProperty("tagName", "SELECT");
    await expect(page.getByLabel("Ucapan / Doa")).toHaveJSProperty("tagName", "TEXTAREA");
  });

  test("countdown uses hari, jam, menit and the route-specific WIB start", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-08-21T10:00:00+07:00") });
    await openInvitation(page, "/family");
    const familyCards = page.getByLabel("Hitung mundur menuju acara").locator(".countdown-card");
    await expect(familyCards).toHaveCount(3);
    await expect(familyCards.nth(0)).toContainText("01");
    await expect(familyCards.nth(0)).toContainText("hari");
    await expect(familyCards.nth(1)).toContainText("00");
    await expect(familyCards.nth(1)).toContainText("jam");
    await expect(familyCards.nth(2)).toContainText("30");
    await expect(familyCards.nth(2)).toContainText("menit");

    await page.goto("/sesi2");
    await page.getByRole("button", { name: "Buka undangan" }).click();
    const friendCards = page.getByLabel("Hitung mundur menuju acara").locator(".countdown-card");
    await expect(friendCards.nth(0)).toContainText("01");
    await expect(friendCards.nth(1)).toContainText("02");
    await expect(friendCards.nth(2)).toContainText("30");
  });

  test("gallery contains individual photos", async ({ page }) => {
    await openInvitation(page);
    await expect(page.locator("[data-gallery-item] img")).toHaveCount(10);
    const sources = await page.locator("[data-gallery-item] img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
    expect(new Set(sources).size).toBe(10);
  });
});

test.describe("routing", () => {
  for (const [path, time] of [["/family", "10:30 - 12:00 WIB"], ["/sesi2", "12:30 - 14:00 WIB"], ["/", "10:30 - 12:00 WIB"], ["/unknown", "10:30 - 12:00 WIB"]] as const) {
    test(`${path} shows ${time}`, async ({ page }) => { await openInvitation(page, path); await expect(page.getByText(time)).toBeVisible(); await expect(page.getByText("404")).toHaveCount(0); });
  }
});

test("320px has no overflow and reduced motion keeps content visible", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openInvitation(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await expect(page.getByRole("heading", { name: "Photo Gallery" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "RSVP" })).toBeVisible();
});

test("RSVP validates, submits once, and shows success", async ({ page }) => {
  let inserts = 0;
  await page.route("**/rest/v1/rsvps*", async route => { if (route.request().method() === "POST") inserts++; await new Promise(r => setTimeout(r, 200)); await route.fulfill({ status: 201, contentType: "application/json", body: "[]" }); });
  await openInvitation(page, "/sesi2");
  await page.getByLabel("Nama").clear();
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).click();
  await expect(page.getByText("Nama minimal 2 karakter.")).toBeVisible();
  await page.getByLabel("Nama").fill("Rafi");
  await page.getByLabel("Konfirmasi Kehadiran").selectOption("attending");
  await page.getByLabel("Jumlah Tamu").selectOption("2");
  await page.getByLabel("Ucapan / Doa").fill("Semoga menjadi keluarga sakinah, mawaddah, warahmah.");
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).dblclick();
  await expect(page.getByRole("status")).toContainText("Terima kasih");
  expect(inserts).toBe(1);
});

test("Supabase failure retains form values", async ({ page }) => {
  await page.route("**/rest/v1/rsvps*", route => route.fulfill({ status: 500, contentType: "application/json", body: "{}" }));
  await openInvitation(page);
  await page.getByLabel("Nama").fill("Agnes");
  await page.getByLabel("Konfirmasi Kehadiran").selectOption("not_attending");
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).click();
  await expect(page.getByText(/belum dapat dikirim/)).toBeVisible();
  await expect(page.getByLabel("Nama")).toHaveValue("Agnes");
});

test("no console errors or missing images", async ({ page }) => {
  const errors: string[] = [];
  const badImages: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.request().resourceType() === "image" && response.status() >= 400) badImages.push(response.url()); });
  await openInvitation(page);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(errors).toEqual([]);
  expect(badImages).toEqual([]);
});
