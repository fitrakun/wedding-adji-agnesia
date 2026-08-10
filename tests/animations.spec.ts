import { expect, test } from "@playwright/test";

async function openInvitation(page: import("@playwright/test").Page, path = "/family") {
  await page.goto(path);
  await page.getByRole("button", { name: "Buka undangan" }).click();
  // Let scroll entrance animations settle so interactive elements are stable.
  await page.waitForTimeout(1200);
}

test("opening content becomes visible", async ({ page }) => {
  await page.goto("/family");
  const items = page.locator("[data-opening-item]");
  await expect(items.first()).toBeVisible();
  await page.waitForTimeout(1800);
  const hidden = await items.evaluateAll((elements) =>
    elements.filter((element) => Number(getComputedStyle(element).opacity) < 0.99),
  );
  expect(hidden).toEqual([]);
});

test("scroll sections become visible after entering the viewport", async ({ page }) => {
  await openInvitation(page);
  const sections = page.locator("[data-reveal='section']");
  const count = await sections.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index++) {
    await sections.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(1200);

  const hiddenItems = await page.locator("[data-reveal-item], [data-reveal='fade'], [data-gallery-item]").evaluateAll((elements) =>
    elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
      return inViewport && Number(getComputedStyle(element).opacity) < 0.99;
    }),
  );
  expect(hiddenItems).toEqual([]);
});

test("gallery items reveal without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await openInvitation(page);
  await page.locator("[data-gallery]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);

  const hiddenCards = await page.locator("[data-gallery-item]").evaluateAll((elements) =>
    elements.filter((element) => Number(getComputedStyle(element).opacity) < 0.99),
  );
  expect(hiddenCards).toEqual([]);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});

test("RSVP success state appears only after a successful mocked response", async ({ page }) => {
  let requestSeen = false;
  let releaseResponse = false;
  await page.route("**/api/rsvp", async (route) => {
    if (route.request().method() === "POST") {
      requestSeen = true;
      // Hold the response until the test releases the gate.
      await new Promise<void>((resolve) => {
        const poll = () => (releaseResponse ? resolve() : setTimeout(poll, 25));
        poll();
      });
    }
    await route.fulfill({ status: 201, contentType: "application/json", body: "[]" });
  });

  await openInvitation(page, "/sesi2");
  await expect(page.locator(".success-state")).toHaveCount(0);

  await page.getByLabel("Nama").fill("Rafi");
  await page.getByLabel("Konfirmasi Kehadiran").selectOption("attending");
  await page.getByLabel("Jumlah Tamu").selectOption("2");
  await page.getByLabel("Ucapan / Doa").fill("Semoga menjadi keluarga sakinah.");
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).click();

  // Loading state shows while the request is in flight; success must not.
  await expect(page.getByText("Mengirim konfirmasi…")).toBeVisible();
  await expect(page.getByRole("button", { name: "Mengirim…" })).toBeDisabled();
  expect(requestSeen).toBe(true);
  await expect(page.locator(".success-state")).toHaveCount(0);

  // Only after Supabase confirms the insertion does the success card appear.
  releaseResponse = true;
  await expect(page.getByRole("status")).toContainText("Terima kasih");
});

test("with reduced motion, all content is immediately visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/family");
  const openingItems = page.locator("[data-opening-item]");
  await expect(openingItems.first()).toBeVisible();

  await page.getByRole("button", { name: "Buka undangan" }).click();
  const sections = page.locator("[data-reveal='section']");
  const count = await sections.count();
  for (let index = 0; index < count; index++) {
    await sections.nth(index).scrollIntoViewIfNeeded();
  }

  const hidden = await page.locator("[data-opening-item], [data-reveal-item], [data-reveal='fade'], [data-gallery-item]").evaluateAll((elements) =>
    elements.filter((element) => {
      const style = getComputedStyle(element);
      return Number(style.opacity) < 0.99 || style.visibility === "hidden" || style.display === "none";
    }),
  );
  expect(hidden).toEqual([]);
});

test("with reduced motion, floral elements have no continuous animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openInvitation(page);
  const animated = await page.locator(".petal, .corner-bouquet, .verse-flower, .rsvp-floral, .gallery-flower, .couple-floral").evaluateAll((elements) =>
    elements.filter((element) => {
      const name = getComputedStyle(element).animationName;
      return name && name !== "none";
    }),
  );
  expect(animated).toEqual([]);
});

test("no animation leaves elements permanently hidden", async ({ page }) => {
  await openInvitation(page);
  const sections = page.locator("[data-reveal='section']");
  const count = await sections.count();
  for (let index = 0; index < count; index++) {
    await sections.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1200);

  const hidden = await page.locator("[data-opening-item], [data-reveal-item], [data-reveal='fade'], [data-gallery-item]").evaluateAll((elements) =>
    elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
      return inViewport && Number(getComputedStyle(element).opacity) < 0.99;
    }),
  );
  expect(hidden).toEqual([]);
});

test("gift account card stays visible after its entrance animation", async ({ page }) => {
  await openInvitation(page);
  await page.locator(".gift-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "Lihat Nomor Rekening" }).click();
  const card = page.locator(".account-card-container").filter({ hasText: "2300990528" });
  await expect(card).toBeVisible();
  await expect(card.getByText("2300990528")).toBeVisible();

  // After the entrance animation finishes the card must remain fully visible.
  await page.waitForTimeout(1000);
  await expect(card).toBeVisible();
  const state = await card.evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: Number(style.opacity), height: element.getBoundingClientRect().height };
  });
  expect(state.opacity).toBeGreaterThan(0.99);
  expect(state.height).toBeGreaterThan(10);

  // It only disappears when the user hides it again.
  await page.getByRole("button", { name: "Sembunyikan Rekening" }).click();
  await expect(card).toHaveCount(0);
});

test("no browser console or page errors occur", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));

  await openInvitation(page);
  const sections = page.locator("[data-reveal='section']");
  const count = await sections.count();
  for (let index = 0; index < count; index++) {
    await sections.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});
