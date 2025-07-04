import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";
import { writeFileSync } from "fs";

test.describe("Create Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });

    test("Create a new employee", async ({ page }) => {
        await createEmp(page);

        const employeeIdInput = page
            .locator("form")
            .getByRole("textbox")
            .nth(4);
        const employeeId = await employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${employeeId}`);

        writeFileSync(
            "data/employee.json",
            JSON.stringify({ employeeId }, null, 4),
        );

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByRole("heading", { name: "Personal Details" }))
            .toBeVisible();
    });
});
