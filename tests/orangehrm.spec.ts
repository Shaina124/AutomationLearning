import { test, expect } from "@playwright/test";
import { TIMEOUT } from "dns";

test("has title", async ({ page }) => {
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
    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User1");

    await page.waitForTimeout(5000);

    await page.getByRole("button", { name: "Save" }).click();

    await page.waitForTimeout(5000);

    //await page.getByRole("heading", { name: "Personal Details" });
    await expect
        .soft(page.getByText("Personal DetailsEmployee Full"))
        .toBeVisible();

    //SEARCH FOR CREATED EMPLOYEE
    await page.getByRole("link", { name: "Employee List" }).click();
    await page.getByPlaceholder("Type for hints...").first().fill("Test User1");
    await page.getByRole("button", { name: "Search" }).click();

    await page.evaluate(() => window.scrollBy(0, 300));

    await page.waitForTimeout(5000);

    //EDIT CREATED EMPLOYEE
    //await page.waitForTimeout(4000);
    // eslint-disable-next-line playwright/no-force-option
    await page
        .locator(".oxd-icon.bi-pencil-fill")
        .nth(0)
        // eslint-disable-next-line playwright/no-force-option
        .click({ force: true });
    await expect
        .soft(page.getByText("Personal DetailsEmployee Full"))
        .toBeVisible();
    await page.waitForTimeout(5000);
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
    await page.getByPlaceholder("Type for hints...").first().fill("123 User");
    await page.getByRole("button", { name: "Search" }).click();
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(5000);
    // eslint-disable-next-line playwright/no-force-option
    await page.locator(".oxd-icon.bi-trash").nth(0).click({ force: true });
    await page.getByRole("button", { name: " Yes, Delete" }).click();

    //PAGINATION
    await page.getByRole("button", { name: "Reset" }).click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page
        .locator(".oxd-icon.bi-chevron-right")
        .nth(0)
        // eslint-disable-next-line playwright/no-force-option
        .click({ force: true });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page
        .locator(".oxd-icon.bi-chevron-left")
        .nth(0)
        // eslint-disable-next-line playwright/no-force-option
        .click({ force: true });
    await page.waitForTimeout(10000);
});
