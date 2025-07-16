import { test, Page } from "@playwright/test";
import { login } from "../utils/login";
import { importCSVFile } from "../utils/importCSVFile";
import { customClick } from "../utils/clickHelper";
import { PIMPage } from "../page_objects/PIMPage";

/**
 * Test suite for verifying employee list pagination functionality in OrangeHRM.
 *
 * <p>Includes:
 * <ul>
 *   <li>Login before each test</li>
 *   <li>Test to navigate to the Employee List and verify pagination controls (Next and Previous buttons)</li>
 *   <li>Handles cases where pagination is not visible by importing CSV data and retrying</li>
 * </ul>
 *
 * <p>Uses custom click wrappers and the Page Object Model (POM) for maintainable test automation.
 */

test.describe("Employee List Pagination", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });

    test("Employee List Pagination", async ({ page }) => {
        const pimPage = new PIMPage(page);

        await customClick(page, pimPage.getpimTab(), "PIM Tab");
        await customClick(
            page,
            pimPage.getemployeeListTab(),
            "Employee List Tab",
        );

        const nextButton = pimPage.getNextPageButton();
        const prevButton = pimPage.getPreviousPageButton();

        try {
            await nextButton.waitFor({ state: "visible", timeout: 10000 });

            if (await nextButton.isVisible()) {
                await customClick(page, nextButton, "Next Button");

                console.log("pagination is visible");

                // eslint-disable-next-line playwright/no-wait-for-timeout
                await page.waitForTimeout(2000);

                await customClick(page, prevButton, "Previous Button");
            } else {
                console.log("Next button is not visible");
                await importCSVFile(page);
            }
        } catch (error) {
            console.log("pagination not found");
            await importCSVFile(page);

            await page.waitForTimeout(5000);

            await page.goto(
                "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList",
            );

            await nextButton.waitFor({ state: "visible", timeout: 10000 });
            await customClick(page, nextButton, "Next Button");

            await prevButton.waitFor({ state: "visible", timeout: 10000 });
            await customClick(page, prevButton, "Previous Button");
        }
    });
});
