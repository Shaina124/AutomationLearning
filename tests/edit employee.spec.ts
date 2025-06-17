import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { readFileSync } from "fs";

test.describe("Edit Employee", () => {
    test("Edit an existing employee", async ({ page }) => {
        await login(page);

        //SEARCH FOR EMPLOYEE
        const data = JSON.parse(readFileSync("data/employee.json", "utf-8"));
        const employeeId = data.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${employeeId}`);

        await expect.soft(page.getByText(employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));

        //EDIT EMPLOYEE
        await page
            .locator(".oxd-icon.bi-pencil-fill")
            .nth(0)
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
        await page.getByPlaceholder("First Name").fill("123");

        await page
            .locator("form")
            .filter({ hasText: "Employee Full" })
            .getByRole("button")
            .click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
    });
});
