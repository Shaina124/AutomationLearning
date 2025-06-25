import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";

test.describe("Delete Employee", () => {
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

        const delete_employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const delete_employeeId = await delete_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${delete_employeeId}`);

        writeFileSync(
            "data/delete employee id.json",
            JSON.stringify({ delete_employeeId }, null, 4),
        );

        const utcTimeMillis: number = Date.now();
        console.log(utcTimeMillis);

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
    });

    test("Delete an existing employee", async ({ page }) => {
        //SEARCH FOR EMPLOYEE
        const { delete_employeeId } = JSON.parse(
            readFileSync("data/delete employee id.json", "utf-8"),
        );

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(delete_employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${delete_employeeId}`);

        await expect.soft(page.getByText(delete_employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));

        await page.locator(".oxd-icon.bi-trash").nth(0).click();
        await page.getByRole("button", { name: " Yes, Delete" }).click();
    });
});
