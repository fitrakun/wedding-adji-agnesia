import { expect, test } from "@playwright/test";

async function openInvitation(page: import("@playwright/test").Page) {
  await page.goto("/sesi2");
  await page.getByRole("button", { name: "Buka undangan" }).click();
  await page.waitForTimeout(1200);
}

test("RSVP submits once in Android Chrome", async ({ page }) => {
  let submissions = 0;
  let submittedData: unknown;
  await page.route("**/api/rsvp", async (route) => {
    submissions++;
    submittedData = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: "{\"success\":true}",
    });
  });

  await openInvitation(page);
  await page.getByLabel("Nama").fill("Rafi");
  await page.getByLabel("Konfirmasi Kehadiran").selectOption("attending");
  await page.getByLabel("Jumlah Tamu").selectOption("2");
  await page.getByLabel("Ucapan / Doa").fill("Semoga menjadi keluarga sakinah.");
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).tap();

  await expect(page.getByRole("status")).toContainText("Terima kasih");
  expect(submissions).toBe(1);
  expect(submittedData).toEqual({
    guestName: "Rafi",
    attendanceStatus: "attending",
    attendeeCount: 2,
    message: "Semoga menjadi keluarga sakinah.",
    guestType: "friend",
  });
});

test("RSVP keeps entered values after an Android network failure", async ({ page }) => {
  await page.route("**/api/rsvp", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
  );

  await openInvitation(page);
  await page.getByLabel("Nama").fill("Agnes");
  await page.getByLabel("Konfirmasi Kehadiran").selectOption("not_attending");
  await page.getByRole("button", { name: "Kirim Konfirmasi" }).tap();

  await expect(page.getByText(/belum dapat dikirim/)).toBeVisible();
  await expect(page.getByLabel("Nama")).toHaveValue("Agnes");
});
