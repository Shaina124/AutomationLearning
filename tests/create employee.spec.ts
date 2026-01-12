import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";
import { writeFileSync } from "fs";
import { customClick } from "../utils/clickHelper";
import { PIMPage } from "../page_objects/PIMPage";

/**
 * Creates a new employee in the HRM system and verifies successful creation.
 *
 * <p>Logs in, generates employee data, saves the employee ID, submits the form,
 * and checks that the Personal Details page is displayed.
 *
 * <p>Uses utility functions and the POM for clean, maintainable test automation.
 *
 * @throws Exception if any test step fails
 */

test.describe("Create Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);
    });

    test("Create a new employee", async ({ page }) => {
        await createEmp(page);

        const pimPage = new PIMPage(page);

        const employeeIdInput = pimPage.getEmployeeIdInput();
        const employeeId = await employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${employeeId}`);

        writeFileSync(
            "data/employee.json",
            JSON.stringify({ employeeId }, null, 4),
        );

        await customClick(page, pimPage.getSaveButton(), "Save Button");

        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();
    });
});
