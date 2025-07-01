import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        //CREATE EMPLOYEE
        await createEmp(page);

        const edit_employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const edit_employeeId = await edit_employeeIdInput.inputValue();

        const empfirstnameInput = page.getByPlaceholder("First Name");
        const empfirstname = await empfirstnameInput.inputValue();

        console.log(`Captured Employee First Name: ${empfirstname}`);
        console.log(`Captured Employee ID: ${edit_employeeId}`);

        writeFileSync(
            "data/edit employee id.json",
            JSON.stringify({ edit_employeeId, empfirstname }, null, 4),
            "utf-8",
        );

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
    });

    test("Edit an existing employee", async ({ page }) => {
        //SEARCH FOR EMPLOYEE
        const { edit_employeeId, empfirstname } = JSON.parse(
            readFileSync("data/edit employee id.json", "utf-8"),
        );

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(edit_employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${edit_employeeId}`);

        await expect.soft(page.getByText(empfirstname)).toBeVisible();

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
