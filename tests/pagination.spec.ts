import { test } from "@playwright/test";
import { login } from "../utils/login";

test.describe("Employee List Pagination", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });

    test("Employee List Pagination", async ({ page }) => {
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
        );
        await page
            .locator(".oxd-icon.bi-chevron-right")
            .nth(0)
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });

        test.setTimeout(300_000);

        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
        );
        await page
            .locator(".oxd-icon.bi-chevron-left")
            .nth(0)
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });

        test.setTimeout(300_000);
    });
});
