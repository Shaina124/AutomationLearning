import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { login } from "../utils/login";
import { createEmp } from "../utils/createEmp";
import { customClick } from "../utils/clickHelper";
import { customFill } from "../utils/fillHelper";
import { PIMPage } from "../page_objects/PIMPage";

test.describe("Delete Employee", () => {
    test.beforeEach(async ({ page }) => {
        //LOGIN
        await login(page);

        //CREATE EMPLOYEE
        await createEmp(page);

        const pimPage = new PIMPage(page);

        const delete_employeeIdInput = pimPage.getEmployeeIdInput();

        const delete_employeeId = await delete_employeeIdInput.inputValue();
        console.log(`Captured Employee ID: ${delete_employeeId}`);

        console.log(delete_employeeId);

        writeFileSync(
            "data/delete employee id.json",
            JSON.stringify({ delete_employeeId }, null, 4),
        );

        await customClick(page, pimPage.getSaveButton(), "Save Button");

        await expect.soft(pimPage.getPersonalDetailsHeading()).toBeVisible();
    });

    test("Delete an existing employee", async ({ page }) => {
        //SEARCH FOR EMPLOYEE
        const pimPage = new PIMPage(page);

        const { delete_employeeId } = JSON.parse(
            readFileSync("data/delete employee id.json", "utf-8"),
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
            delete_employeeId,
            "Search Employee ID Input",
        );
        await customClick(page, pimPage.getSearchButton(), "Search Button");

        console.log(`Searched for Employee ID: ${delete_employeeId}`);

        await expect.soft(page.getByText(delete_employeeId)).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 300));

        await customClick(page, pimPage.getDeleteButton(), "Delete Button");
        await customClick(
            page,
            pimPage.getConfirmDeleteButton(),
            "Confirm Delete Button",
        );
    });
});
