import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { readFileSync } from "fs";
import { customClick } from "../utils/clickHelper";
import { createEmp } from "../utils/createEmp";
import { writeFileSync } from "fs";

test.describe("Search Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        await createEmp(page);

        const search_employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const search_employeeId = await search_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${search_employeeId}`);

        writeFileSync(
            "data/search employee.json",
            JSON.stringify({ search_employeeId }, null, 4),
        );

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByRole("heading", { name: "Personal Details" }))
            .toBeVisible();
    });
    test("Search for employee", async ({ page }) => {
        const data = JSON.parse(
            readFileSync("data/search employee.json", "utf-8"),
        );
        const search_employeeId = data.search_employeeId;

        //await safeClick(page, "text=PIM", "PIM link");

        await customClick(page, "text=Employee List", "Employee List link");

        await page.getByRole("textbox").nth(2).fill(search_employeeId);

        await customClick(page, "button:has-text('Search')", "Search button");

        console.log(`Searched for Employee ID: ${search_employeeId}`);

        await expect.soft(page.getByText(search_employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));
    });
});
