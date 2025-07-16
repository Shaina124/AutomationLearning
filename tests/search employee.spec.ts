import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { readFileSync } from "fs";
import { customClick } from "../utils/clickHelper";
import { createEmp } from "../utils/createEmp";
import { writeFileSync } from "fs";
import { customFill } from "../utils/fillHelper";
import { PIMPage } from "../page_objects/PIMPage";

test.describe("Search Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        await createEmp(page);

        const pimPage = new PIMPage(page);

        const search_employeeIdInput = pimPage.getEmployeeIdInput();
        const search_employeeId = await search_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${search_employeeId}`);

        writeFileSync(
            "data/search employee.json",
            JSON.stringify({ search_employeeId }, null, 4),
        );

        await customClick(page, pimPage.getSaveButton(), "Save Button");

        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();
    });
    test("Search for employee", async ({ page }) => {
        const pimPage = new PIMPage(page);

        const data = JSON.parse(
            readFileSync("data/search employee.json", "utf-8"),
        );
        const search_employeeId = data.search_employeeId;

        //await safeClick(page, "text=PIM", "PIM link");

        await customClick(page, "text=Employee List", "Employee List link");

        await customFill(
            page,
            pimPage.getSearchEmployeeIdInput(),
            search_employeeId,
            "Search Employee ID Input",
        );
        //await page.getByRole("textbox").nth(2).fill(search_employeeId);

        await customClick(page, "button:has-text('Search')", "Search button");

        console.log(`Searched for Employee ID: ${search_employeeId}`);

        await expect.soft(page.getByText(search_employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));
    });
});
