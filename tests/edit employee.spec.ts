import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";
import { customClick } from "../utils/clickHelper";
import { customFill } from "../utils/fillHelper";
import { PIMPage } from "../page_objects/PIMPage";

/**
 * Test suite for editing an employee in the OrangeHRM system.
 *
 * <p>The suite includes:
 * <ul>
 *   <li>Setup steps that log in, create a new employee, capture and save the employee ID and first name</li>
 *   <li>A test that searches for the created employee, verifies details, edits the first name, and saves changes</li>
 * </ul>
 *
 * <p>Utilizes custom utility functions and the Page Object Model (POM) for modular and maintainable test automation.
 */

test.describe("Edit Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        //CREATE EMPLOYEE
        await createEmp(page);

        const pimPage = new PIMPage(page);

        const edit_employeeIdInput = pimPage.getEmployeeIdInput();
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

        await customClick(page, pimPage.getSaveButton(), "Save Button");

        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();
    });

    test("Edit an existing employee", async ({ page }) => {
        //SEARCH FOR EMPLOYEE
        const pimPage = new PIMPage(page);

        const { edit_employeeId, empfirstname } = JSON.parse(
            readFileSync("data/edit employee id.json", "utf-8"),
        );

        await customClick(page, pimPage.getpimTab(), "PIM Tab");
        await customClick(
            page,
            pimPage.getemployeeListTab(),
            "Employee List Tab",
        );
        await customFill(
            page,
            pimPage.getSearchEmployeeIdInput(),
            edit_employeeId,
            "Search Employee ID Input",
        );
        await customClick(page, pimPage.getSearchButton(), "Search Button");

        console.log(`Searched for Employee ID: ${edit_employeeId}`);

        await expect.soft(page.getByText(empfirstname)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));

        //EDIT EMPLOYEE
        await customClick(page, pimPage.getEditButton(), "Edit Button");
        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();
        await customFill(
            page,
            pimPage.getFirstNameInput(),
            "123",
            "Edit First Name Input",
        );
        await customClick(
            page,
            pimPage.getEditSaveButton(),
            "Edit Save Button",
        );
        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();

        // await page
        //     .locator(".oxd-icon.bi-pencil-fill")
        //     .nth(0)
        //     // eslint-disable-next-line playwright/no-force-option
        //     .click({ force: true });
        // await expect
        //     .soft(page.getByText("Personal DetailsEmployee Full"))
        //     .toBeVisible();
        // await page.getByPlaceholder("First Name").fill("123");

        // await page
        //     .locator("form")
        //     .filter({ hasText: "Employee Full" })
        //     .getByRole("button")
        //     .click();
        // await expect
        //     .soft(page.getByText("Personal DetailsEmployee Full"))
        //     .toBeVisible();
    });
});
