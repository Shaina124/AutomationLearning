import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        );
        await page.getByPlaceholder("Username").fill("Admin");
        await page.getByPlaceholder("Password").fill("admin123");
        await page.getByRole("button", { name: "Login" }).click();

        //CREATE EMPLOYEE
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();
        await page.getByPlaceholder("First Name").fill("Sally");
        await page.getByPlaceholder("Last Name").fill("Walker");

        const edit_employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const edit_employeeId = await edit_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${edit_employeeId}`);

        writeFileSync(
            "data/edit employee id.json",
            JSON.stringify({ edit_employeeId }, null, 4),
        );

        const utcTimeMillis: number = Date.now();
        console.log(utcTimeMillis);

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
    });

    test("Edit an existing employee", async ({ page }) => {
        //SEARCH FOR EMPLOYEE
        const { edit_employeeId } = JSON.parse(
            readFileSync("data/edit employee id.json", "utf-8"),
        );

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(edit_employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${edit_employeeId}`);

        await expect.soft(page.getByText(edit_employeeId)).toBeVisible();

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
