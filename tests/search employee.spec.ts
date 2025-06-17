import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { readFileSync } from "fs";

test.describe("Search Employee", () => {
    test("Search for employee", async ({ page }) => {
        await login(page);

        const data = JSON.parse(readFileSync("data/employee.json", "utf-8"));
        const employeeId = data.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${employeeId}`);

        await expect.soft(page.getByText(employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));
    });
});
