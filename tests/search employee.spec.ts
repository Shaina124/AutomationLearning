import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { readFileSync } from "fs";
import { safeClick } from "../utils/clickHelper";

test.describe("Search Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });
    test("Search for employee", async ({ page }) => {
        const data = JSON.parse(readFileSync("data/employee.json", "utf-8"));
        const employeeId = data.employeeId;

        await safeClick(page, "text=PIM", "PIM link");

        //await page.getByRole("link", { name: "PIM" }).click();

        await safeClick(page, "text=Employee List", "Employee List link");

        //await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);

        await safeClick(page, "button:has-text('Search')", "Search button");

        //await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${employeeId}`);

        await expect.soft(page.getByText(employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));
    });
});
