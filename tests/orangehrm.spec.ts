import { test, expect } from "@playwright/test";
import { TIMEOUT } from "dns";

test.describe("OrangeHRM Employee Management", () => {
    test("login, create, edit, delete employee and pagination", async ({
        page,
    }) => {
        await page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        );

        //LOGIN
        await page.getByPlaceholder("Username").fill("Admin");
        await page.getByPlaceholder("Password").fill("admin123");
        await page.getByRole("button", { name: "Login" }).click();

        //CREATE EMPLOYEE
        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();
        await page.getByPlaceholder("First Name").fill("shaina123");
        await page.getByPlaceholder("Last Name").fill("ferdous");

        const employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const employeeId = await employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${employeeId}`);

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();

        //SEARCH FOR CREATED EMPLOYEE
        await page.getByRole("link", { name: "Employee List" }).click();
        await page.getByRole("textbox").nth(2).fill(employeeId);
        await page.getByRole("button", { name: "Search" }).click();
        console.log(`Searched for Employee ID: ${employeeId}`);

        await expect.soft(page.getByText(employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));

        //EDIT CREATED EMPLOYEE
        // eslint-disable-next-line playwright/no-force-option
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
            .filter({ hasText: "Employee Full NameEmployee" })
            .getByRole("button")
            .click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();

        //DELETE CREATED EMPLOYEE
        await page.getByRole("link", { name: "Employee List" }).click();
        await page
            .getByPlaceholder("Type for hints...")
            .first()
            .fill("123 ferdous");
        await page.getByRole("button", { name: "Search" }).click();
        await page.evaluate(() => window.scrollBy(0, 300));
        // eslint-disable-next-line playwright/no-force-option
        await page.locator(".oxd-icon.bi-trash").nth(0).click({ force: true });
        await page.getByRole("button", { name: " Yes, Delete" }).click();

        //PAGINATION
        await page.getByRole("button", { name: "Reset" }).click();
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
        );
        await page
            .locator(".oxd-icon.bi-chevron-right")
            .nth(0)
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });

        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight),
        );
        await page
            .locator(".oxd-icon.bi-chevron-left")
            .nth(0)
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });
    });
});
