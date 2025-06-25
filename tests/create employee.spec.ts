import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { writeFileSync } from "fs";

test.describe("Create Employee", () => {
    test("Create a new employee", async ({ page }) => {
        await login(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await page.getByRole("link", { name: "Add Employee" }).click();
        await page.getByPlaceholder("First Name").fill("Sally");
        await page.getByPlaceholder("Last Name").fill("Walker");

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

        const utcTimeMillis: number = Date.now();
        console.log(utcTimeMillis);

        await page.getByRole("button", { name: "Save" }).click();
        await expect
            .soft(page.getByText("Personal DetailsEmployee Full"))
            .toBeVisible();
    });
});
