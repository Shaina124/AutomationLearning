import { test, Page } from "@playwright/test";
import { login } from "../utils/login";
import { importCSVFile } from "../utils/importCSVFile";

test.describe("Employee List Pagination", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });

    test("Employee List Pagination", async ({ page }) => {
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();

        const nextButton = page.locator(".oxd-icon.bi-chevron-right").nth(0);
        const prevButton = page.locator(".oxd-icon.bi-chevron-left").nth(0);

        try {
            await nextButton.waitFor({ state: "visible", timeout: 10000 });

            if (await nextButton.isVisible()) {
                await nextButton.click();
                console.log("pagination is visible");

                // eslint-disable-next-line playwright/no-wait-for-timeout
                await page.waitForTimeout(2000);

                await prevButton.click();
            } else {
                console.log("Next button is not visible");
                await importCSVFile(page);
            }
        } catch (error) {
            console.log("pagination not found");
            await importCSVFile(page);

            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList",
            );

            await nextButton.waitFor({ state: "visible", timeout: 10000 });
            await nextButton.click();

            await prevButton.waitFor({ state: "visible", timeout: 10000 });
            await prevButton.click();
        }
    });
});
