import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        //CREATE EMPLOYEE
        await createEmp(page);

        const delete_employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const delete_employeeId = await delete_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${delete_employeeId}`);

        console.log(delete_employeeId);

        writeFileSync(
            "data/delete employee id.json",
            JSON.stringify({ delete_employeeId }, null, 4),
        );

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
